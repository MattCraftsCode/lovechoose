import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ExternalLink,
  Flame,
  Globe2,
  ShieldCheck,
  Store,
} from "lucide-react"

import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import type { Project } from "@/data/projects"
import { cn } from "@/lib/utils"

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <Slide inView offset={20}>
        <Link
          href={project.category === "website" ? "/websites" : "/extensions"}
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#5368ff] uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {project.categoryLabel}
        </Link>
      </Slide>

      <section className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
        <Slide inView delay={80} offset={30}>
          <aside className="lg:sticky lg:top-28">
            <ProjectMedia project={project} />

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hard-hover mt-5 inline-flex h-12 w-full cursor-pointer items-center justify-between border border-foreground bg-card px-4 text-sm font-bold shadow-[5px_5px_0_rgba(25,26,23,0.1)] hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Open live project
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            ) : null}

            {project.storeUrl ? (
              <DownloadOptions storeUrl={project.storeUrl} />
            ) : null}
          </aside>
        </Slide>

        <Slide inView delay={140} offset={34}>
          <article>
            <nav
              className="flex flex-wrap gap-2 border-b border-foreground pb-4"
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
              {project.privacy ? (
                <a href="#privacy" className="detail-pill">
                  Privacy
                </a>
              ) : null}
            </nav>

            <div id="overview" className="scroll-mt-28 pt-8">
              <p className="eyebrow">{project.label}</p>
              <h1 className="mt-3 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                {project.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg/8 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <section
              id="features"
              className="mt-10 scroll-mt-28 border border-foreground bg-secondary/45 p-7 sm:p-8"
            >
              <h2 className="font-serif text-3xl">Features</h2>
              <ul className="mt-5 grid gap-3 text-sm/7 text-foreground/75">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1 grid size-5 shrink-0 place-items-center border border-foreground bg-card text-[#5368ff] shadow-sm">
                      <Check className="size-3" aria-hidden="true" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="story" className="mt-10 scroll-mt-28">
              <p className="eyebrow">Product note</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em]">
                Why I built it
              </h2>
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
                    className="rounded-sm border border-foreground/25 bg-card px-3 py-2 text-xs font-bold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {project.privacy ? (
              <section
                id="privacy"
                className="mt-14 scroll-mt-28 border-t border-border pt-10"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center border border-foreground bg-secondary text-primary">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow">Privacy policy</p>
                    <h2 className="mt-2 font-serif text-4xl">
                      Backlink Inspector Privacy Policy
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Last updated: {project.privacy.lastUpdated}
                    </p>
                  </div>
                </div>

                <p className="mt-7 text-base/8 text-muted-foreground">
                  {project.privacy.introduction}
                </p>

                <div className="mt-8 divide-y divide-border border-y border-border">
                  {project.privacy.sections.map((section) => (
                    <section key={section.title} className="py-7">
                      <h3 className="text-lg font-bold">{section.title}</h3>
                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-3 text-sm/7 text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets ? (
                        <ul className="mt-4 grid gap-2 text-sm/7 text-muted-foreground">
                          {section.bullets.map((item) => (
                            <li key={item} className="flex gap-3">
                              <Check
                                className="mt-1.5 size-3.5 shrink-0 text-[#5368ff]"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </Slide>
      </section>
    </main>
  )
}

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div
      className="group relative aspect-video overflow-hidden border border-foreground shadow-[8px_8px_0_rgba(25,26,23,0.14)]"
      style={{ backgroundColor: project.color }}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt ?? project.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
          className={cn(
            "object-cover object-top",
            project.coverScroll &&
              "transition-[object-position] duration-[6000ms] ease-in-out group-hover:object-bottom"
          )}
        />
      ) : (
        <div className="absolute inset-0 p-6">
          <span className="inline-flex border border-foreground/20 bg-white/65 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {project.category === "website" ? "Website" : "Extension"}
          </span>
          <div className="absolute inset-x-6 bottom-7">
            <h2 className="font-serif text-4xl leading-tight">
              {project.name}
            </h2>
          </div>
        </div>
      )}

      <span className="absolute top-4 left-4 border border-foreground/60 bg-card/90 px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-sm">
        {project.category === "website" ? "Website" : "Chrome extension"}
      </span>

      {project.coverScroll ? (
        <span className="absolute right-4 bottom-4 border border-foreground/60 bg-card/90 px-3 py-1 text-[11px] font-bold shadow-sm backdrop-blur-sm">
          Hover to scroll
        </span>
      ) : null}
    </div>
  )
}

function DownloadOptions({ storeUrl }: { storeUrl: string }) {
  return (
    <section className="mt-5 border border-foreground bg-card p-5 shadow-[5px_5px_0_rgba(25,26,23,0.1)]">
      <p className="font-serif text-2xl">Download</p>
      <div className="mt-4 grid gap-2">
        <a
          href={storeUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex cursor-pointer items-center gap-4 border border-border px-4 py-3 transition-[transform,background-color,border-color] hover:-translate-y-0.5 hover:border-foreground hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span className="grid size-11 shrink-0 place-items-center border border-foreground bg-[#5368ff] text-white shadow-sm">
            <span className="grid size-5 place-items-center border-2 border-white bg-[#ff7659]">
              <Store className="size-2.5" aria-hidden="true" />
            </span>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs text-muted-foreground">
              Available in the
            </span>
            <span className="mt-0.5 block font-bold">Chrome Web Store</span>
          </span>
          <ArrowUpRight
            className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>

        <DownloadComingSoon
          icon={Globe2}
          iconClassName="bg-linear-to-br from-[#0aa7d8] via-[#2fc9b5] to-[#1769e0]"
          label="Microsoft Edge Add-ons"
        />
        <DownloadComingSoon
          icon={Flame}
          iconClassName="bg-linear-to-br from-[#ffcf33] via-[#ff6a3d] to-[#9e35dc]"
          label="Firefox Add-ons"
        />
      </div>
    </section>
  )
}

function DownloadComingSoon({
  icon: Icon,
  iconClassName,
  label,
}: {
  icon: typeof Globe2
  iconClassName: string
  label: string
}) {
  return (
    <div className="flex items-center gap-4 border border-dashed border-border px-4 py-3 text-muted-foreground">
      <span
        className={cn(
          "grid size-11 shrink-0 place-items-center text-white",
          iconClassName
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs">Coming soon on</span>
        <span className="mt-0.5 block font-bold text-foreground/70">
          {label}
        </span>
      </span>
    </div>
  )
}
