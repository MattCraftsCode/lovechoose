import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react"

import { Button } from "@/components/animate-ui/components/buttons/button"
import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { projects, type Project } from "@/data/projects"

export function ProjectDetail({ project }: { project: Project }) {
  const related = projects
    .filter((item) => item.slug !== project.slug && item.slug !== "mianyu")
    .slice(0, 3)

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
      <Slide inView offset={20}>
        <Link
          href={project.category === "website" ? "/websites" : "/extensions"}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#708d4e] uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {project.categoryLabel}
        </Link>
      </Slide>

      <section className="mt-6 grid gap-10 lg:grid-cols-[320px_1fr]">
        <Slide inView delay={80} offset={30}>
          <aside className="lg:sticky lg:top-28">
            <div
              className="poster relative min-h-[365px] overflow-hidden rounded-2xl p-6 shadow-[0_22px_60px_rgba(58,79,49,0.12)]"
              style={{ backgroundColor: project.color }}
            >
              <span className="relative z-10 inline-flex rounded-full bg-white/65 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                {project.category === "website" ? "Website" : "Extension"}
              </span>
              <div className="absolute inset-x-6 bottom-7 z-10">
                <h1 className="font-serif text-4xl leading-tight">
                  {project.name}
                </h1>
                <p className="mt-3 text-sm/6 text-[#40513b]">
                  {project.description}
                </p>
              </div>
              <div className="absolute -right-[24%] -bottom-[24%] size-[70%] rounded-full bg-white/25" />
              <div className="absolute top-[32%] right-[18%] size-16 rounded-full border border-white/45 bg-white/15" />
            </div>
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
              <Button
                variant="outline"
                className="h-11 justify-between rounded-xl border-border bg-white px-4 shadow-none"
                type="button"
              >
                Open live project
                <ExternalLink className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-11 justify-between rounded-xl border-border bg-white px-4 shadow-none"
                type="button"
              >
                Source / Store
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </aside>
        </Slide>

        <Slide inView delay={140} offset={34}>
          <article>
            <nav
              className="flex flex-wrap gap-2 border-b border-border pb-4"
              aria-label="On this page"
            >
              <a href="#overview" className="detail-pill active">
                Overview
              </a>
              <a href="#features" className="detail-pill">
                Features
              </a>
              <a href="#story" className="detail-pill">
                Story
              </a>
              <a href="#stack" className="detail-pill">
                Stack
              </a>
            </nav>

            <div id="overview" className="scroll-mt-28 pt-8">
              <p className="eyebrow">{project.label}</p>
              <h2 className="mt-3 font-serif text-6xl leading-[1.02] sm:text-7xl">
                {project.name}
              </h2>
              <p className="mt-5 max-w-3xl text-lg/8 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <section
              id="features"
              className="mt-10 scroll-mt-28 rounded-2xl border border-[#dfe9cd] bg-[#f5f8eb] p-7 sm:p-8"
            >
              <h2 className="font-serif text-3xl">Features</h2>
              <ul className="mt-5 grid gap-3 text-sm/7 text-[#52614d]">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-white text-[#708d4e] shadow-sm">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="story" className="mt-10 scroll-mt-28">
              <p className="eyebrow">Product note</p>
              <h2 className="mt-3 font-serif text-3xl">Why I built it</h2>
              <p className="mt-4 text-base/8 text-muted-foreground">
                {project.story}
              </p>
            </section>

            <section id="stack" className="mt-10 scroll-mt-28">
              <h2 className="font-serif text-3xl">Built with</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d8e4c6] bg-[#eef5df] px-3 py-2 text-xs font-bold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </article>
        </Slide>
      </section>

      <section className="mt-20 border-t border-border pt-12">
        <Slide inView offset={28}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">More work</p>
              <h2 className="mt-2 font-serif text-4xl">You may also like</h2>
            </div>
            <Link
              href="/#work"
              className="hidden text-sm font-bold sm:inline-flex"
            >
              View all →
            </Link>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="group rounded-2xl border border-border bg-white p-3 transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-serif text-2xl">{item.name}</h3>
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="mt-12 text-sm font-semibold">{item.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </Slide>
      </section>
    </main>
  )
}
