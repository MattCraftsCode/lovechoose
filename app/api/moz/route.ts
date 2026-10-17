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

const requestLimits = new Map<string, RateLimitEntry>()

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
    return NextResponse.json(
      { error: "Enter a valid domain, such as example.com." },
      { status: 400 }
    )
  }

  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: "Too many checks. Please wait a minute and try again." },
      { status: 429 }
    )
  }

  const apiToken = process.env.MOZ_API_TOKEN

  if (!apiToken) {
    console.error("MOZ_API_TOKEN is not configured")
    return NextResponse.json(
      {
        error:
          "The checker is temporarily unavailable. Please try again later.",
      },
      { status: 503 }
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
    })
    const data = (await response.json().catch(() => null)) as {
      error?: { message?: string }
      result?: {
        results_by_site?: Array<{ site_metrics?: MozMetrics }>
      }
    } | null

    if (!response.ok || data?.error) {
      console.error("Moz metrics request failed", response.status)

      return NextResponse.json(
        {
          error:
            response.status === 429
              ? "The data provider is busy. Please wait a moment and try again."
              : "We could not retrieve this domain's metrics. Please try again.",
        },
        { status: response.status || 502 }
      )
    }

    const metrics = data?.result?.results_by_site?.[0]?.site_metrics
    const domainAuthority = Number(metrics?.domain_authority)
    const pageAuthority = Number(metrics?.page_authority)
    const spamScore = Number(metrics?.spam_score)

    if (
      !isMetric(domainAuthority) ||
      !isMetric(pageAuthority) ||
      !isMetric(spamScore)
    ) {
      console.error("Moz response did not include complete site metrics")
      return NextResponse.json(
        {
          error:
            "The data provider returned an unexpected response. Please try again.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { domain, domainAuthority, pageAuthority, spamScore },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    )
  } catch (error) {
    console.error("Moz metrics request failed", error)
    return NextResponse.json(
      {
        error:
          "The checker is temporarily unavailable. Please try again later.",
      },
      { status: 502 }
    )
  }
}
