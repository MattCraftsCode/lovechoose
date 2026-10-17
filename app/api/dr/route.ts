import { NextResponse } from "next/server"

const AHREFS_ENDPOINT = "https://api.ahrefs.com/v3/public/domain-rating-free"
const REQUEST_LIMIT = 8
const REQUEST_WINDOW_MS = 60_000

type RateLimitEntry = {
  count: number
  resetAt: number
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

  const clientId = getClientId(request)

  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { error: "Too many checks. Please wait a minute and try again." },
      { status: 429 }
    )
  }

  const apiKey = process.env.AHREFS_API_KEY

  if (!apiKey) {
    console.error("AHREFS_API_KEY is not configured")
    return NextResponse.json(
      {
        error:
          "The checker is temporarily unavailable. Please try again later.",
      },
      { status: 503 }
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
    })

    if (!response.ok) {
      console.error("Ahrefs Domain Rating request failed", response.status)

      const message =
        response.status === 429
          ? "The data provider is busy. Please wait a moment and try again."
          : "We could not retrieve this domain's rating. Please try again."

      return NextResponse.json({ error: message }, { status: response.status })
    }

    const data = (await response.json()) as {
      domain_rating?: { domain_rating?: unknown }
    }
    const domainRating = Number(data.domain_rating?.domain_rating)

    if (!Number.isFinite(domainRating)) {
      console.error("Ahrefs response did not include a domain rating")
      return NextResponse.json(
        {
          error:
            "The data provider returned an unexpected response. Please try again.",
        },
        { status: 502 }
      )
    }

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
    return NextResponse.json(
      {
        error:
          "The checker is temporarily unavailable. Please try again later.",
      },
      { status: 502 }
    )
  }
}
