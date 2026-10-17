"use client"

import {
  ArrowRight,
  Check,
  LoaderCircle,
  RotateCcw,
  ShieldCheck,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { FormEvent, useState } from "react"

type CheckState = "idle" | "loading" | "success" | "error"

type MozResult = {
  domain: string
  domainAuthority: number
  pageAuthority: number
  spamScore: number
}

type CheckerError = {
  error?: string
  code?: string
}

function getSpamLabel(score: number) {
  if (score < 5) return "Low"
  if (score < 15) return "Moderate"
  return "Elevated"
}

function getErrorTitle(code?: string) {
  switch (code) {
    case "invalid_domain":
      return "Enter a valid domain."
    case "no_result":
    case "empty_result":
      return "No Moz metrics were found."
    case "partial_result":
      return "Moz returned only part of the result."
    case "provider_auth":
      return "The Moz provider is not configured."
    case "rate_limited":
      return "Moz is rate limiting checks."
    case "provider_unavailable":
      return "Moz is temporarily unavailable."
    case "timeout":
      return "The Moz lookup timed out."
    case "network_error":
      return "We could not reach Moz."
    case "invalid_response":
      return "Moz returned unusable data."
    default:
      return "The check did not complete."
  }
}

export function FreeMozChecker() {
  const [domain, setDomain] = useState("")
  const [status, setStatus] = useState<CheckState>("idle")
  const [error, setError] = useState<CheckerError | null>(null)
  const [result, setResult] = useState<MozResult | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = domain.trim()
    if (!input) {
      setResult(null)
      setError({
        code: "invalid_domain",
        error: "Enter a domain to get started.",
      })
      setStatus("error")
      return
    }

    setStatus("loading")
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/moz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: input }),
      })
      const data = (await response.json().catch(() => null)) as
        MozResult | CheckerError | null

      if (!data) {
        throw {
          code: "invalid_response",
          error:
            "The checker returned an unreadable response. Please try again later.",
        } satisfies CheckerError
      }

      if (!response.ok || !("domainAuthority" in data)) {
        throw data
      }

      setResult(data)
      setStatus("success")
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? { error: requestError.message, code: "network_error" }
          : typeof requestError === "object" && requestError !== null
            ? (requestError as CheckerError)
            : {
                error:
                  "The Moz request could not be completed. Please try again.",
                code: "network_error",
              }
      )
      setStatus("error")
    }
  }

  function reset() {
    setDomain("")
    setStatus("idle")
    setError(null)
    setResult(null)
  }

  return (
    <section className="border border-foreground bg-card p-4 shadow-[10px_10px_0_rgba(25,26,23,0.14)] sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 sm:grid-cols-[1fr_auto]"
      >
        <label className="group relative block">
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase transition-colors group-focus-within:text-[#5368ff]">
            Domain
          </span>
          <input
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
            name="domain"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            placeholder="example.com"
            className="h-16 w-full border border-foreground bg-background px-4 pt-5 text-base font-semibold transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground focus:border-[#5368ff] focus:shadow-[4px_4px_0_rgba(83,104,255,0.2)]"
            aria-describedby="moz-checker-help"
            disabled={status === "loading"}
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-16 items-center justify-center gap-2 border border-foreground bg-primary px-6 text-sm font-bold text-primary-foreground transition-[background-color,transform] hover:bg-[#5368ff] active:translate-y-px disabled:cursor-wait disabled:bg-primary/70 sm:min-w-44"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
              Checking
            </>
          ) : (
            <>
              Check metrics
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p id="moz-checker-help" className="mt-3 text-sm/6 text-muted-foreground">
        Enter a root domain or full URL to read DA, PA and Spam Score in one
        request.
      </p>

      <div
        className="mt-6 min-h-52 border-t border-foreground pt-5"
        aria-live="polite"
        aria-busy={status === "loading"}
      >
        <AnimatePresence initial={false} mode="wait">
          {status === "idle" ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-40 flex-col justify-between sm:flex-row sm:items-end"
            >
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#5368ff] uppercase">
                  Ready to compare
                </p>
                <p className="mt-3 max-w-md font-serif text-3xl leading-[1.05] tracking-[-0.03em]">
                  Authority and risk, in one reading.
                </p>
              </div>
              <ShieldCheck
                className="mt-6 size-16 text-foreground/20 sm:mt-0"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </motion.div>
          ) : null}

          {status === "loading" ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-40 flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center border border-foreground bg-[#ff7659]">
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="font-bold">Reading authority metrics</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Checking {domain.trim()} with Moz.
                  </p>
                </div>
              </div>
              <div className="mt-8 h-2 overflow-hidden border border-foreground bg-muted">
                <div className="h-full w-1/2 animate-[dr-scan_1.15s_ease-in-out_infinite] bg-[#ff7659]" />
              </div>
            </motion.div>
          ) : null}

          {status === "success" && result ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#5368ff] uppercase">
                    Moz site metrics
                  </p>
                  <p className="mt-2 font-serif text-3xl leading-none tracking-[-0.03em]">
                    {result.domain}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-10 items-center justify-center gap-2 border border-foreground bg-background px-3 text-xs font-bold transition-colors hover:bg-secondary"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  Check another
                </button>
              </div>
              <div className="mt-5 grid divide-y divide-foreground border border-foreground sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <MetricReadout
                  label="DA"
                  title="Domain Authority"
                  value={result.domainAuthority}
                  accentClassName="bg-secondary"
                />
                <MetricReadout
                  label="PA"
                  title="Page Authority"
                  value={result.pageAuthority}
                  accentClassName="bg-[#cfe7ff]"
                />
                <MetricReadout
                  label="Spam"
                  title={`${getSpamLabel(result.spamScore)} Spam Score`}
                  value={result.spamScore}
                  suffix="%"
                  accentClassName="bg-[#ff7659]"
                />
              </div>
            </motion.div>
          ) : null}

          {status === "error" ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex min-h-40 flex-col justify-between border-l-4 border-[#ff7659] bg-[#ff7659]/10 p-5 sm:flex-row sm:items-end"
              role="alert"
            >
              <div>
                <p className="font-bold">{getErrorTitle(error?.code)}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                  {error?.error}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 inline-flex h-10 items-center justify-center gap-2 border border-foreground bg-card px-3 text-xs font-bold hover:bg-secondary sm:mt-0"
              >
                <Check className="size-3.5" aria-hidden="true" />
                Try again
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  )
}

function MetricReadout({
  label,
  title,
  value,
  suffix = "",
  accentClassName,
}: {
  label: string
  title: string
  value: number
  suffix?: string
  accentClassName: string
}) {
  return (
    <div className="min-w-0 p-4">
      <span
        className={`inline-flex border border-foreground px-2 py-1 text-[10px] font-bold tracking-[0.16em] uppercase ${accentClassName}`}
      >
        {label}
      </span>
      <output className="mt-6 block font-serif text-5xl leading-none tracking-[-0.05em]">
        {value.toFixed(0)}
        {suffix}
      </output>
      <p className="mt-3 text-xs/5 text-muted-foreground">{title}</p>
    </div>
  )
}
