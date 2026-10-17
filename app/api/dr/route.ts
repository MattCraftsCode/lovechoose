import { NextResponse } from "next/server"

const AHREFS_ENDPOINT = "https://api.ahrefs.com/v3/public/domain-rating-free"
const REQUEST_LIMIT = 8
const REQUEST_WINDOW_MS = 60_000

type RateLimitEntry = {
  count: number
  resetAt: number
}

type CheckerErrorCode =
  | "invalid_domain"
  | "rate_limited"
  | "provider_auth"
  | "provider_unavailable"
  | "provider_rejected"
  | "no_result"
  | "empty_result"
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

  const clientId = getClientId(request)

  if (isRateLimited(clientId)) {
    return errorResponse(
      "Too many checks were submitted from this connection. Wait one minute before trying again.",
      "rate_limited",
      429
    )
  }

  const apiKey = process.env.AHREFS_API_KEY

  if (!apiKey) {
    console.error("AHREFS_API_KEY is not configured")
    return errorResponse(
      "The DR checker is unavailable because its provider key is not configured.",
      "provider_auth",
      503
    )
  }

  const url = new URL(AHREFS_ENDPOINT)
  url.searchParams.set("target", domain)

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    })

    if (!response.ok) {
      console.error("Ahrefs Domain Rating request failed", response.status)

      if (response.status === 404) {
        return errorResponse(
          `Ahrefs has no Domain Rating data for ${domain}. The domain may not be indexed yet.`,
          "no_result",
          404
        )
      }

      if (response.status === 401 || response.status === 403) {
        return errorResponse(
          "The DR provider rejected this site's credentials. Please contact the site owner.",
          "provider_auth",
          503
        )
      }

      if (response.status === 429) {
        return errorResponse(
          "Ahrefs is temporarily limiting requests. Please wait a minute and try again.",
          "rate_limited",
          429
        )
      }

      if (response.status >= 500) {
        return errorResponse(
          "Ahrefs is temporarily unavailable. Please try again shortly.",
          "provider_unavailable",
          503
        )
      }

      return errorResponse(
        "Ahrefs rejected this domain lookup. Check the domain and try again.",
        "provider_rejected",
        502
      )
    }

    const data = (await response.json().catch(() => null)) as {
      domain_rating?: { domain_rating?: unknown }
    } | null

    if (!data) {
      console.error("Ahrefs response was empty or unreadable")
      return errorResponse(
        "Ahrefs returned an empty or unreadable response. Please try again later.",
        "invalid_response",
        502
      )
    }

    const value = data?.domain_rating?.domain_rating

    if (value === undefined || value === null) {
      console.error("Ahrefs response did not include a domain rating")
      return errorResponse(
        `Ahrefs returned an empty result for ${domain}. No Domain Rating is available for this domain.`,
        "empty_result",
        404
      )
    }

    if (typeof value !== "number" || !Number.isFinite(value)) {
      console.error("Ahrefs response included an invalid domain rating")
      return errorResponse(
        "Ahrefs returned a Domain Rating in an unsupported format. Please try again later.",
        "invalid_response",
        502
      )
    }

    const domainRating = value

    return NextResponse.json(
      { domain, domainRating },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    )
  } catch (error) {
    console.error("Ahrefs Domain Rating request failed", error)

    if (error instanceof Error && error.name === "TimeoutError") {
      return errorResponse(
        "Ahrefs did not respond within 12 seconds. Please try again.",
        "timeout",
        504
      )
    }

    return errorResponse(
      "We could not reach Ahrefs. Check your connection and try again.",
      "network_error",
      502
    )
  }
}
