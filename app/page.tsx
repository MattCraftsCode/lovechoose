import Link from "next/link"
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react"

import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { StudioVisual } from "@/components/portfolio/studio-visual"
import { WorkFilter } from "@/components/portfolio/work-filter"
import { projects } from "@/data/projects"

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <section className="mx-auto grid max-w-7xl gap-12 border-b border-foreground px-5 pt-14 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pt-20">
        <Slide inView direction="right" offset={42} className="self-center">
          <div className="inline-flex items-center gap-2 border-y border-foreground py-2 text-[11px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
            <span className="mini-dot size-2 rounded-full bg-primary" />
            Independent product studio / 001
          </div>
          <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.6rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.04em]">
            Small products.
            <br />
            <em className="font-medium text-[#5368ff]">Sharp edges.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg/8 text-muted-foreground">
            Websites, browser extensions and mini programs for people who want
            the useful version first, then the version that feels right.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="hard-hover inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-primary bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-[#5368ff] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              See selected work
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="hard-hover inline-flex h-12 items-center justify-center rounded-sm border border-foreground bg-card px-5 text-sm font-bold hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              About me
            </Link>
          </div>
        </Slide>

        <Slide inView direction="left" delay={120} offset={42}>
          <div className="hero-stack relative min-h-[430px]">
            <div className="absolute inset-3 rotate-2 border border-foreground bg-[#ff7659]" />
            <div className="absolute inset-3 -rotate-2 border border-foreground bg-secondary" />
            <div className="relative flex min-h-[430px] flex-col justify-between overflow-hidden border border-foreground bg-primary p-7 text-primary-foreground shadow-[10px_10px_0_rgba(25,26,23,0.16)] sm:p-8">
              <div className="flex items-start justify-between">
                <span className="border border-white/40 px-3 py-1 text-[11px] font-bold tracking-[0.15em] uppercase">
                  lovechoose / index
                </span>
                <span className="grid size-12 place-items-center border border-white/45 bg-[#5368ff] text-white">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>
              </div>
              <div className="absolute top-[28%] right-[-9%] size-52 rounded-full border border-white/20" />
              <div className="absolute top-[37%] right-[14%] size-20 rounded-full border border-[#dfff47] bg-[#dfff47]/40" />
              <div className="absolute right-[10%] bottom-[21%] h-1 w-28 bg-[#ff7659]" />
              <div className="relative z-10">
                <p className="font-serif text-5xl leading-[0.98] text-white sm:text-6xl">
                  Useful by default.
                  <br />
                  Distinct by choice.
                </p>
                <p className="mt-5 max-w-sm text-sm/6 text-white/70">
                  A working archive of tools, experiments and small bets on the
                  internet.
                </p>
              </div>
            </div>
          </div>
        </Slide>
      </section>

      <section
        id="work"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8"
      >
        <Slide inView offset={30}>
          <div className="flex flex-col gap-7 border-b border-foreground pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">02 / Selected work</p>
              <h2 className="mt-3 font-serif text-5xl leading-[0.98] tracking-[-0.03em] sm:text-6xl">
                Built to be used.
              </h2>
            </div>
            <p className="max-w-md text-sm/6 text-muted-foreground md:text-right">
              Four small products, three categories, one recurring question:
              what is the shortest path to a useful result?
            </p>
          </div>
        </Slide>
        <div className="mt-9">
          <WorkFilter projects={projects} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Slide inView offset={34}>
          <div className="grid gap-8 border border-foreground bg-primary p-6 text-white shadow-[10px_10px_0_rgba(25,26,23,0.14)] md:grid-cols-[0.78fr_1.22fr] md:p-10 lg:p-12">
            <StudioVisual className="mx-auto w-full max-w-[420px]" />
            <div className="self-center md:py-6">
              <p className="eyebrow text-[#dfff47]">03 / About the maker</p>
              <h2 className="mt-4 font-serif text-5xl leading-[1.02]">
                Developer, product thinker,
                <br />
                curious internet builder.
              </h2>
              <p className="mt-6 max-w-2xl text-base/8 text-white/70">
                I like turning overlooked little problems into polished, focused
                products. Naming, information architecture, micro-interactions,
                page speed and the tiny moment when a tool simply feels right
                all matter.
              </p>
              <Link
                href="/about"
                className="hard-hover mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-[#dfff47] bg-[#dfff47] px-5 text-sm font-bold text-primary hover:bg-white focus-visible:ring-2 focus-visible:ring-[#dfff47] focus-visible:outline-none"
              >
                More about me
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Slide>
      </section>
    </main>
  )
}
