import type { Metadata } from "next"
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  WandSparkles,
} from "lucide-react"

import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { FreeMozChecker } from "@/components/tools/free-moz-checker"
import { MozMetricsStory } from "@/components/tools/moz-metrics-story"

export const metadata: Metadata = {
  title: "Free DA, PA & Spam Checker",
  description:
    "Check Moz Domain Authority, Page Authority and Spam Score for a domain in one focused lookup.",
}

const benefits = [
  {
    icon: BarChart3,
    title: "Three signals together",
    body: "Read DA, PA and Spam Score in one response instead of switching between separate checks.",
  },
  {
    icon: ShieldCheck,
    title: "A clearer first pass",
    body: "Pair authority with a risk signal before deciding which domains deserve deeper research.",
  },
  {
    icon: WandSparkles,
    title: "No dashboard detour",
    body: "Paste a domain, get the readings, and return to the work you were already doing.",
  },
]

const faqs = [
  {
    question: "What do DA and PA measure?",
    answer:
      "Domain Authority and Page Authority are Moz metrics that help compare the relative ranking strength of domains and pages on a 0-100 scale.",
  },
  {
    question: "What does Spam Score tell me?",
    answer:
      "Spam Score is a risk signal. A higher score is a reason to investigate further, not a standalone conclusion about a website.",
  },
  {
    question: "Can I paste a full URL?",
    answer:
      "Yes. The checker accepts a root domain or a full HTTP(S) URL, then runs the lookup against its domain.",
  },
]

export default function FreeDaPaSpamCheckerPage() {
  return (
    <main id="top" className="overflow-hidden">
      <section className="mx-auto grid max-w-7xl gap-10 border-b border-foreground px-5 pt-14 pb-16 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:pt-20 lg:pb-20">
        <Slide inView direction="right" offset={34} className="self-center">
          <p className="eyebrow">Tools / Site authority</p>
          <h1 className="mt-4 max-w-2xl font-serif text-[clamp(3.2rem,6vw,6.15rem)] leading-[0.9] tracking-[-0.05em]">
            Free DA, PA
            <br />
            <em className="font-medium text-[#ff7659]">&amp; Spam.</em>
          </h1>
          <p className="mt-7 max-w-lg text-lg/8 text-muted-foreground">
            Read a domain&apos;s Moz authority metrics and Spam Score in one
            focused lookup, with the context needed to use the numbers well.
          </p>
          <a
            href="#how-it-works"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-6 hover:text-[#5368ff]"
          >
            How the checker works
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </Slide>

        <Slide inView direction="left" delay={80} offset={34}>
          <FreeMozChecker />
        </Slide>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <Slide inView offset={30}>
          <div className="flex flex-col gap-7 border-b border-foreground pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Made for clear comparisons</p>
              <h2 className="mt-3 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                More context. Less tab switching.
              </h2>
            </div>
            <p className="max-w-md text-sm/6 text-muted-foreground md:text-right">
              Use the three readings to sort opportunities and competitors, then
              investigate the pages, links and relevance behind them.
            </p>
          </div>
        </Slide>

        <div className="mt-10 grid border-t border-foreground md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <Slide key={benefit.title} inView delay={index * 70} offset={24}>
                <article className="h-full border-r border-b border-foreground p-6 last:border-r-0 md:border-b-0">
                  <span className="grid size-11 place-items-center border border-foreground bg-[#ff7659]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 font-serif text-3xl leading-none tracking-[-0.03em]">
                    {benefit.title}
                  </h3>
                  <p className="mt-4 text-sm/7 text-muted-foreground">
                    {benefit.body}
                  </p>
                </article>
              </Slide>
            )
          })}
        </div>
      </section>

      <MozMetricsStory />

      <section
        id="how-it-works"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.76fr_1.24fr] lg:px-8 lg:py-24"
      >
        <Slide inView offset={28}>
          <p className="eyebrow">A short path</p>
          <h2 className="mt-4 max-w-sm font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
            Check the signal, then the story.
          </h2>
        </Slide>
        <div className="border-t border-foreground">
          {[
            ["01", "Add a domain", "Paste the website you want to assess."],
            [
              "02",
              "Read the three metrics",
              "The checker returns DA, PA and Spam Score together.",
            ],
            [
              "03",
              "Decide what needs a closer look",
              "Use the readings as a filter before you inspect links, content and relevance.",
            ],
          ].map(([number, title, body], index) => (
            <Slide key={number} inView delay={index * 70} offset={22}>
              <article className="grid gap-4 border-b border-foreground py-7 sm:grid-cols-[72px_1fr_auto] sm:items-baseline">
                <span className="font-serif text-3xl text-[#5368ff]">
                  {number}
                </span>
                <h3 className="font-serif text-3xl leading-none tracking-[-0.03em]">
                  {title}
                </h3>
                <p className="max-w-sm text-sm/6 text-muted-foreground">
                  {body}
                </p>
              </article>
            </Slide>
          ))}
        </div>
      </section>

      <section className="border-y border-foreground bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.76fr_1.24fr] lg:px-8 lg:py-24">
          <Slide inView offset={28}>
            <p className="eyebrow">Questions, answered</p>
            <h2 className="mt-4 max-w-sm font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Treat metrics as a prompt to look closer.
            </h2>
          </Slide>
          <div className="border-t border-foreground">
            {faqs.map((faq, index) => (
              <Slide key={faq.question} inView delay={index * 70} offset={20}>
                <details className="group border-b border-foreground py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-2xl leading-tight tracking-[-0.02em] marker:content-none">
                    {faq.question}
                    <span className="grid size-8 shrink-0 place-items-center border border-foreground font-sans text-lg transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-sm/7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-16 lg:flex-row lg:items-end lg:px-8 lg:py-20">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#dfff47] uppercase">
              Free tool / three useful readings
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Find the signals. Keep the context.
            </h2>
          </div>
          <a
            href="#top"
            className="hard-hover inline-flex h-12 items-center justify-center gap-2 border border-[#dfff47] bg-[#dfff47] px-5 text-sm font-bold text-primary hover:bg-white"
          >
            Check a domain
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  )
}
