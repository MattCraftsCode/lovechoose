"use client"

import { ArrowRight, Check, Gauge, LoaderCircle, RotateCcw } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { FormEvent, useState } from "react"

type CheckState = "idle" | "loading" | "success" | "error"

type CheckResult = {
  domain: string
  domainRating: number
}

function getRatingLabel(rating: number) {
  if (rating < 20) return "Early authority signal"
  if (rating < 50) return "Growing authority signal"
  return "Established authority signal"
}

export function FreeDrChecker() {
  const [domain, setDomain] = useState("")
  const [status, setStatus] = useState<CheckState>("idle")
  const [error, setError] = useState("")
  const [result, setResult] = useState<CheckResult | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const input = domain.trim()
    if (!input) {
      setResult(null)
      setError("Enter a domain to get started.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/dr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: input }),
      })
      const data = (await response.json()) as CheckResult | { error?: string }

      if (!response.ok || !("domainRating" in data)) {
        throw new Error(
          "error" in data && data.error
            ? data.error
            : "We could not retrieve this domain's rating. Please try again."
        )
      }

      setResult(data)
      setStatus("success")
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "We could not retrieve this domain's rating. Please try again."
      )
      setStatus("error")
    }
  }

  function reset() {
    setDomain("")
    setStatus("idle")
    setError("")
    setResult(null)
  }

  const rating = result?.domainRating ?? 0
  const ringDegrees = Math.max(0, Math.min(rating, 100)) * 3.6

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
            aria-describedby="dr-checker-help"
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
              Check DR
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p id="dr-checker-help" className="mt-3 text-sm/6 text-muted-foreground">
        Enter a root domain or a full URL. Your query is sent securely to the
        rating provider.
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
                  Ready to check
                </p>
                <p className="mt-3 max-w-md font-serif text-3xl leading-[1.05] tracking-[-0.03em]">
                  One domain. One clear reading.
                </p>
              </div>
              <Gauge
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
                <span className="grid size-10 place-items-center border border-foreground bg-secondary">
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className="font-bold">Reading domain signals</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Checking {domain.trim()} with Ahrefs.
                  </p>
                </div>
              </div>
              <div className="mt-8 h-2 overflow-hidden border border-foreground bg-muted">
                <div className="h-full w-1/2 animate-[dr-scan_1.15s_ease-in-out_infinite] bg-[#5368ff]" />
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
              className="grid gap-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"
            >
              <div
                className="grid size-28 place-items-center rounded-full p-2"
                style={{
                  background: `conic-gradient(#dfff47 0deg ${ringDegrees}deg, #e8e4da ${ringDegrees}deg 360deg)`,
                }}
                aria-label={`Domain Rating ${rating.toFixed(1)} out of 100`}
              >
                <div className="grid size-full place-items-center rounded-full border border-foreground bg-card text-center">
                  <output className="font-serif text-4xl leading-none tracking-[-0.05em]">
                    {rating.toFixed(1)}
                  </output>
                  <span className="-mt-2 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                    DR
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#5368ff] uppercase">
                  Domain Rating
                </p>
                <p className="mt-2 font-serif text-3xl leading-none tracking-[-0.03em]">
                  {result.domain}
                </p>
                <p className="mt-3 text-sm/6 text-muted-foreground">
                  {getRatingLabel(rating)}. The score is shown on a 0-100 scale.
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
                <p className="font-bold">The check did not complete.</p>
                <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground">
                  {error}
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
