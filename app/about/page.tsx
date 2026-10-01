import type { Metadata } from "next"
import { ArrowUpRight, Layers3, Search, WandSparkles } from "lucide-react"

import { Button } from "@/components/animate-ui/components/buttons/button"
import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { StudioVisual } from "@/components/portfolio/studio-visual"
import { siteLinks, siteProfile } from "@/data/site"

export const metadata: Metadata = {
  title: "About",
  description: "About the independent developer behind lovechoose.",
}

const principles = [
  {
    icon: Search,
    title: "Start with intent",
    body: "Understand the exact question, task or frustration before adding features.",
  },
  {
    icon: Layers3,
    title: "Keep the system small",
    body: "Use a clear product language so every new page feels familiar instead of heavier.",
  },
  {
    icon: WandSparkles,
    title: "Polish the useful parts",
    body: "Spend craft where it improves comprehension, trust and the rhythm of repeated use.",
  },
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
      <section className="grid gap-12 md:grid-cols-[0.82fr_1.18fr] md:items-center">
        <Slide inView direction="right" offset={36}>
          <StudioVisual className="w-full" />
        </Slide>
        <Slide inView direction="left" delay={100} offset={36}>
          <p className="eyebrow">
            Hello, I&apos;m the person behind lovechoose
          </p>
          <h1 className="mt-4 font-serif text-6xl leading-[1.02] sm:text-7xl">
            I like building useful things with a little personality.
          </h1>
          <p className="mt-7 text-lg/8 text-muted-foreground">
            lovechoose is my independent product studio for focused web tools,
            browser extensions and lightweight app experiments. I care about the
            complete shape of a product: the name, search intent, information
            architecture, interface details and the speed at which someone
            reaches a useful result.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Fact label="Focus" value="Web tools" color="#f3f8e8" />
            <Fact label="Style" value="Small & polished" color="#fff8cf" />
            <Fact
              label="Languages"
              value="EN · 中文 · 日本語"
              color="#edf4df"
            />
          </div>
        </Slide>
      </section>

      <section className="mt-24 border-t border-border pt-16">
        <Slide inView offset={30}>
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow">How I work</p>
              <h2 className="mt-3 font-serif text-5xl leading-tight">
                Quiet process, clear output.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_30px_rgba(58,79,49,0.05)]"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-secondary text-[#637c48]">
                    <principle.icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm/6 text-muted-foreground">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Slide>
      </section>

      <Slide inView offset={30}>
        <section className="mt-20 flex flex-col items-start justify-between gap-7 rounded-[2rem] bg-[#fff2a6] p-7 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-[#65744f] uppercase">
              Have a thoughtful small project?
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight">
              Let&apos;s make the useful version, then make it feel right.
            </h2>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full px-5 shadow-none"
            >
              <a href={`mailto:${siteProfile.email}`}>
                Say hello
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
              {siteLinks.slice(0, 2).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  {item.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </Slide>
    </main>
  )
}

function Fact({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: color }}>
      <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold">{value}</p>
    </div>
  )
}
