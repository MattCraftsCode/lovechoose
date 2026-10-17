import { NextResponse } from "next/server"

const MOZ_ENDPOINT = "https://api.moz.com/jsonrpc"
const REQUEST_LIMIT = 8
const REQUEST_WINDOW_MS = 60_000

type RateLimitEntry = {
  count: number
  resetAt: number
}

type MozMetrics = {
  domain_authority?: unknown
  page_authority?: unknown
  spam_score?: unknown
}

type CheckerErrorCode =
  | "invalid_domain"
  | "rate_limited"
  | "provider_auth"
  | "provider_unavailable"
  | "provider_rejected"
  | "no_result"
  | "empty_result"
  | "partial_result"
  | "invalid_response"
  | "timeout"
  | "network_error"

const requestLimits = new Map<string, RateLimitEntry>()

function errorResponse(error: string, code: CheckerErrorCode, status: number) {
  return NextResponse.json({ error, code }, { status })
}

function getClientId(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local"
  )
}

function isRateLimited(clientId: string) {
  const now = Date.now()
  const entry = requestLimits.get(clientId)

  if (!entry || entry.resetAt <= now) {
    requestLimits.set(clientId, { count: 1, resetAt: now + REQUEST_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > REQUEST_LIMIT
}

function normalizeDomain(value: unknown) {
  if (typeof value !== "string") return null

  const input = value.trim()
  if (!input || input.length > 2_048) return null

  try {
    const url = new URL(input.includes("://") ? input : `https://${input}`)

    if (url.protocol !== "http:" && url.protocol !== "https:") return null

    const domain = url.hostname.toLowerCase().replace(/^www\./, "")
    const looksLikeDomain =
      domain.length <= 253 &&
      /^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
        domain
      )

    return looksLikeDomain ? domain : null
  } catch {
    return null
  }
}

function isMetric(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= 100
}

function readMetric(value: unknown) {
  return typeof value === "number" && isMetric(value) ? value : null
}

export async function POST(request: Request) {
  let payload: { domain?: unknown }

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Please enter a domain to check." },
      { status: 400 }
    )
  }

  const domain = normalizeDomain(payload.domain)

  if (!domain) {
    return errorResponse(
      "Enter a valid domain, such as example.com.",
      "invalid_domain",
      400
    )
  }

  if (isRateLimited(getClientId(request))) {
    return errorResponse(
      "Too many checks were submitted from this connection. Wait one minute before trying again.",
      "rate_limited",
      429
    )
  }

  const apiToken = process.env.MOZ_API_TOKEN

  if (!apiToken) {
    console.error("MOZ_API_TOKEN is not configured")
    return errorResponse(
      "The Moz checker is unavailable because its provider token is not configured.",
      "provider_auth",
      503
    )
  }

  try {
    const response = await fetch(MOZ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-moz-token": apiToken,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: crypto.randomUUID(),
        method: "data.site.metrics.fetch.multiple",
        params: {
          data: {
            site_queries: [{ query: domain, scope: "domain" }],
          },
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    })
    const data = (await response.json().catch(() => null)) as {
      error?: { code?: unknown; message?: string }
      result?: {
        results_by_site?: Array<{ site_metrics?: MozMetrics }>
      }
    } | null

    if (!data) {
      console.error("Moz response was empty or unreadable")
      return errorResponse(
        "Moz returned an empty or unreadable response. Please try again later.",
        "invalid_response",
        502
      )
    }

    if (!response.ok || data?.error) {
      console.error("Moz metrics request failed", response.status, data?.error)

      if (response.status === 401 || response.status === 403) {
        return errorResponse(
          "The Moz provider rejected this site's credentials. Please contact the site owner.",
          "provider_auth",
          503
        )
      }

      if (response.status === 429) {
        return errorResponse(
          "Moz is temporarily limiting requests. Please wait a minute and try again.",
          "rate_limited",
          429
        )
      }

      if (response.status >= 500) {
        return errorResponse(
          "Moz is temporarily unavailable. Please try again shortly.",
          "provider_unavailable",
          503
        )
      }

      return errorResponse(
        data?.error?.message
          ? "Moz rejected this domain lookup. Check the domain and try again."
          : "Moz returned no usable response for this domain lookup.",
        "provider_rejected",
        502
      )
    }

    const results = data?.result?.results_by_site

    if (!data?.result) {
      console.error("Moz response did not include a result payload")
      return errorResponse(
        `Moz returned an empty response for ${domain}. No metrics are available for this domain.`,
        "empty_result",
        404
      )
    }

    if (!results || results.length === 0) {
      console.error("Moz response did not include site results")
      return errorResponse(
        `Moz found no DA, PA, or Spam Score data for ${domain}. The domain may not be indexed yet.`,
        "no_result",
        404
      )
    }

    const metrics = results[0]?.site_metrics

    if (!metrics) {
      console.error("Moz response did not include site metrics")
      return errorResponse(
        `Moz returned a result for ${domain}, but the metrics were empty.`,
        "empty_result",
        404
      )
    }

    const domainAuthority = readMetric(metrics.domain_authority)
    const pageAuthority = readMetric(metrics.page_authority)
    const spamScore = readMetric(metrics.spam_score)
    const missingMetrics = [
      domainAuthority === null ? "DA" : null,
      pageAuthority === null ? "PA" : null,
      spamScore === null ? "Spam Score" : null,
    ].filter((metric): metric is string => metric !== null)

    if (missingMetrics.length > 0) {
      console.error("Moz response did not include complete site metrics")
      return errorResponse(
        `Moz returned an incomplete result for ${domain}. Missing: ${missingMetrics.join(", ")}.`,
        "partial_result",
        404
      )
    }

    return NextResponse.json(
      { domain, domainAuthority, pageAuthority, spamScore },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    )
  } catch (error) {
    console.error("Moz metrics request failed", error)

    if (error instanceof Error && error.name === "TimeoutError") {
      return errorResponse(
        "Moz did not respond within 12 seconds. Please try again.",
        "timeout",
        504
      )
    }

    return errorResponse(
      "We could not reach Moz. Check your connection and try again.",
      "network_error",
      502
    )
  }
}
