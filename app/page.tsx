import Link from "next/link"
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react"

import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { StudioVisual } from "@/components/portfolio/studio-visual"
import { WorkFilter } from "@/components/portfolio/work-filter"
import { projects } from "@/data/projects"

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-14 pb-14 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:pt-20">
        <Slide inView direction="right" offset={42} className="self-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[#f7fbe9] px-3 py-2 text-xs font-bold text-[#506247]">
            <span className="mini-dot size-2 rounded-full bg-primary" />
            Available for thoughtful indie projects
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.65rem,7vw,5.5rem)] leading-[0.96] tracking-[-0.035em]">
            I build small things
            <br />
            <em className="font-medium text-[#78984f]">people enjoy using.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg/8 text-muted-foreground">
            An indie developer portfolio for websites, browser extensions and
            mini programs, designed with a calm visual language and a strong
            bias toward useful details.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#work"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Explore my work
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-medium transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              About me
            </Link>
          </div>
        </Slide>

        <Slide inView direction="left" delay={120} offset={42}>
          <div className="hero-stack relative min-h-[430px]">
            <div className="absolute inset-4 rotate-3 rounded-[2rem] bg-[#c7ddaa]" />
            <div className="absolute inset-4 -rotate-3 rounded-[2rem] bg-[#fff2a6]" />
            <div className="relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#a7bc9a] p-7 shadow-[0_24px_70px_rgba(58,79,49,0.15)] sm:p-8">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  lovechoose.com
                </span>
                <span className="grid size-12 place-items-center rounded-full border border-white/45 bg-white/15 text-white">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>
              </div>
              <div className="absolute top-[28%] right-[-8%] size-44 rounded-full border border-white/25 bg-white/10" />
              <div className="absolute top-[36%] right-[13%] size-20 rounded-full border border-white/35 bg-[#fff2a6]/35" />
              <div className="relative z-10">
                <p className="font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
                  Quiet interface.
                  <br />
                  Useful work.
                </p>
                <p className="mt-5 max-w-sm text-sm/6 text-white/90">
                  A portfolio that feels more like a personal studio than a
                  résumé.
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
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 font-serif text-5xl leading-none sm:text-6xl">
                Everything I&apos;ve made
              </h2>
            </div>
            <p className="max-w-md text-sm/6 text-muted-foreground md:text-right">
              Small, useful products shaped around one clear job and the details
              that make it feel easy.
            </p>
          </div>
        </Slide>
        <div className="mt-9">
          <WorkFilter projects={projects} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <Slide inView offset={34}>
          <div className="grid gap-8 rounded-[2rem] bg-[#24321f] p-6 text-white md:grid-cols-[0.78fr_1.22fr] md:p-10 lg:p-12">
            <StudioVisual className="mx-auto w-full max-w-[420px]" />
            <div className="self-center md:py-6">
              <p className="eyebrow text-[#c7ddaa]">About the maker</p>
              <h2 className="mt-4 font-serif text-5xl leading-[1.06]">
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
                className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#fff2a6] px-5 text-sm font-medium text-[#24321f] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#fff6c5] focus-visible:ring-2 focus-visible:ring-[#fff2a6] focus-visible:outline-none"
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
