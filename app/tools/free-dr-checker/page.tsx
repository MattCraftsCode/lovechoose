import type { Metadata } from "next"
import { ArrowDown, ArrowRight, Globe2, Link2, Search } from "lucide-react"

import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { DrScaleStory } from "@/components/tools/dr-scale-story"
import { FreeDrChecker } from "@/components/tools/free-dr-checker"

export const metadata: Metadata = {
  title: "Free DR Checker",
  description:
    "Check a domain's Ahrefs Domain Rating quickly with a free, focused domain rating checker.",
}

const benefits = [
  {
    icon: Search,
    title: "One focused metric",
    body: "Get the Domain Rating reading without a crowded dashboard or a sign-up flow.",
  },
  {
    icon: Globe2,
    title: "URLs or root domains",
    body: "Paste a full URL or a root domain. The checker normalizes it before the lookup.",
  },
  {
    icon: Link2,
    title: "Useful for comparison",
    body: "Put domains on the same 0-100 scale when researching opportunities and competitors.",
  },
]

const faqs = [
  {
    question: "What is Domain Rating?",
    answer:
      "Domain Rating is an Ahrefs metric that represents the relative strength of a website's backlink profile on a 0-100 scale.",
  },
  {
    question: "Can I enter a full URL?",
    answer:
      "Yes. Paste a root domain or a full HTTP(S) URL. The checker extracts the domain before it makes the request.",
  },
  {
    question: "Why should I use DR alongside other checks?",
    answer:
      "A single score cannot explain relevance, organic traffic, link quality or the fit of a specific page. Use it to orient research, then inspect the context.",
  },
]

export default function FreeDrCheckerPage() {
  return (
    <main id="top" className="overflow-hidden">
      <section className="mx-auto grid max-w-7xl gap-10 border-b border-foreground px-5 pt-14 pb-16 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:pt-20 lg:pb-20">
        <Slide inView direction="right" offset={34} className="self-center">
          <p className="eyebrow">Tools / Search visibility</p>
          <h1 className="mt-4 max-w-xl font-serif text-[clamp(3.6rem,7vw,6.5rem)] leading-[0.9] tracking-[-0.05em]">
            Free DR
            <br />
            <em className="font-medium text-[#5368ff]">Checker.</em>
          </h1>
          <p className="mt-7 max-w-lg text-lg/8 text-muted-foreground">
            Check a domain&apos;s Ahrefs Domain Rating with one clean lookup. No
            dashboard detour, just the signal you came for.
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
          <FreeDrChecker />
        </Slide>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <Slide inView offset={30}>
          <div className="flex flex-col gap-7 border-b border-foreground pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Made for fast research</p>
              <h2 className="mt-3 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                The useful number, first.
              </h2>
            </div>
            <p className="max-w-md text-sm/6 text-muted-foreground md:text-right">
              Whether you&apos;re screening outreach prospects or comparing
              search competitors, a quick reading should stay quick.
            </p>
          </div>
        </Slide>

        <div className="mt-10 grid border-t border-foreground md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon

            return (
              <Slide key={benefit.title} inView delay={index * 70} offset={24}>
                <article className="h-full border-r border-b border-foreground p-6 last:border-r-0 md:border-b-0">
                  <span className="grid size-11 place-items-center border border-foreground bg-secondary">
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

      <DrScaleStory />

      <section
        id="how-it-works"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[0.76fr_1.24fr] lg:px-8 lg:py-24"
      >
        <Slide inView offset={28}>
          <p className="eyebrow">A short path</p>
          <h2 className="mt-4 max-w-sm font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
            Check, compare, decide.
          </h2>
        </Slide>
        <div className="border-t border-foreground">
          {[
            ["01", "Add a domain", "Paste the website you want to research."],
            [
              "02",
              "Read the score",
              "The checker returns its current 0-100 Domain Rating.",
            ],
            [
              "03",
              "Use it in context",
              "Compare similar domains, then review the links and relevance behind the number.",
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
              Keep the metric in perspective.
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
              Free tool / one clear answer
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Find the rating. Keep moving.
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
