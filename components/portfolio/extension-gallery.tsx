"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  CloudMoon,
  ExternalLink,
  Link2,
  ListFilter,
  MoonStar,
  Play,
  ScanSearch,
  Volume2,
  Waves,
} from "lucide-react"

import { Button } from "@/components/animate-ui/components/buttons/button"
import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import type { Project } from "@/data/projects"

export function PortfolioGallery({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Slide
          key={project.slug}
          delay={100 + index * 70}
          offset={30}
          inViewMargin="-8% 0px -8% 0px"
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 24,
            mass: 0.9,
          }}
        >
          <article id={project.slug} className="min-w-0">
            <div className="border-y border-foreground/20 py-3">
              <h2 className="font-serif text-2xl leading-tight text-foreground">
                {project.name}
              </h2>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="group hard-hover relative mt-4 aspect-[4/5] transform-gpu overflow-hidden border border-foreground bg-card p-2 shadow-[5px_5px_0_rgba(25,26,23,0.1)]">
              {project.cover ? (
                <div className="relative h-full overflow-hidden border border-foreground/20 bg-[#f5f2ea]">
                  <Image
                    src={project.cover}
                    alt={project.coverAlt ?? project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-[object-position] duration-[6000ms] ease-in-out group-hover:object-bottom"
                  />
                </div>
              ) : project.category === "mini" ? (
                <MiniProgramPreview projectName={project.name} />
              ) : (
                <ExtensionPreview projectName={project.name} />
              )}
              <div className="absolute inset-x-2 bottom-2 flex items-end justify-between gap-3 border border-foreground/25 bg-background/95 p-3 shadow-lg backdrop-blur-md transition-transform duration-[420ms] ease-in-out sm:translate-y-[calc(100%+1rem)] sm:group-focus-within:translate-y-0 sm:group-hover:translate-y-0">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#5368ff] uppercase">
                    {project.category === "mini"
                      ? "WeChat mini program"
                      : "Browser extension"}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    Hover, tap or open the project
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="h-9 shrink-0 rounded-sm border border-primary px-3 shadow-none"
                >
                  <Link href={project.href} aria-label={`View ${project.name}`}>
                    View
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </Slide>
      ))}
    </div>
  )
}

function MiniProgramPreview({ projectName }: { projectName: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-foreground bg-[#191a17] text-white">
      <div className="flex items-center justify-between px-4 pt-4">
        <div>
          <p className="text-[9px] font-bold tracking-[0.2em] text-[#dfff47] uppercase">
            {projectName}
          </p>
          <p className="mt-1 font-serif text-xl">Good evening</p>
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-white/10">
          <MoonStar className="size-3.5 text-[#dfff47]" aria-hidden="true" />
        </span>
      </div>

      <div className="relative mx-4 mt-5 flex aspect-square items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#9dbf7c]/20">
        <span className="absolute size-[78%] rounded-full border border-white/10" />
        <span className="absolute size-[56%] rounded-full border border-white/15" />
        <span className="absolute size-[34%] rounded-full bg-[#dfff47]/90 shadow-[0_0_50px_rgba(223,255,71,0.24)]" />
        <CloudMoon
          className="relative z-10 size-9 text-[#35452f]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-auto bg-white/[0.07] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold">Quiet rain</p>
            <p className="mt-1 text-[9px] text-white/55">
              45 minute sleep ritual
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-[#dfff47] text-[#191a17]">
            <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
          </span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-1 text-[#dfff47]">
          {[10, 18, 13, 24, 16, 29, 12, 21, 15, 25, 11, 18].map(
            (height, index) => (
              <span
                key={index}
                className="w-1 flex-1 rounded-full bg-current"
                style={{ height }}
              />
            )
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-[9px] text-white/55">
          <Volume2 className="size-3" aria-hidden="true" />
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-[#dfff47]" />
          </div>
          <Waves className="size-3" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function ExtensionPreview({ projectName }: { projectName: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-foreground/20 bg-[#f5f2ea]">
      <div className="flex h-10 items-center gap-2 border-b border-foreground/20 bg-white px-3">
        <span className="size-2 rounded-full bg-[#f0b7a7]" />
        <span className="size-2 rounded-full bg-[#efd889]" />
        <span className="size-2 rounded-full bg-[#a9c88b]" />
        <div className="ml-2 flex h-6 min-w-0 flex-1 items-center gap-2 rounded-md bg-[#f2f5ec] px-2 text-[9px] text-[#7a8672]">
          <Link2 className="size-2.5 shrink-0" aria-hidden="true" />
          <span className="truncate">lovechoose.com/projects</span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[44px_1fr]">
        <div className="flex flex-col items-center gap-3 border-r border-foreground/20 bg-white py-4 text-[#5368ff]">
          <span className="grid size-7 place-items-center rounded-sm bg-[#dfff47]">
            <ScanSearch className="size-3.5" aria-hidden="true" />
          </span>
          <Link2 className="size-3.5" aria-hidden="true" />
          <ListFilter className="size-3.5" aria-hidden="true" />
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </div>

        <div className="min-w-0 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#5368ff] uppercase">
                {projectName}
              </p>
              <p className="mt-1 font-serif text-xl">Links on this page</p>
            </div>
            <span className="rounded-sm bg-[#191a17] px-2 py-1 text-[9px] font-bold text-white">
              24 found
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1 border border-foreground/15 bg-[#dfff47] p-1 text-center text-[9px] font-bold text-[#191a17]">
            <span className="rounded-sm bg-white py-1.5 shadow-sm">All</span>
            <span className="py-1.5">Internal</span>
            <span className="py-1.5">External</span>
          </div>

          <div className="mt-4 space-y-2.5">
            <PreviewRow label="Portfolio home" domain="lovechoose.com" active />
            <PreviewRow label="GitHub profile" domain="github.com" />
            <PreviewRow label="Product notes" domain="lovechoose.com" />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-[#dfe9cf] pt-3 text-[9px] text-[#718069]">
            <span className="inline-flex items-center gap-1">
              <Check className="size-3 text-[#6f934d]" aria-hidden="true" />
              No broken links
            </span>
            <span>nofollow: 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewRow({
  label,
  domain,
  active = false,
}: {
  label: string
  domain: string
  active?: boolean
}) {
  return (
    <div
      className={`rounded-lg border p-2.5 ${
        active ? "border-[#b9d19e] bg-[#f0f6e6]" : "border-[#e0e8d5] bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[10px] font-bold">{label}</span>
        <ExternalLink
          className="size-2.5 shrink-0 text-[#8b9884]"
          aria-hidden="true"
        />
      </div>
      <p className="mt-1 truncate text-[9px] text-[#889481]">{domain}</p>
    </div>
  )
}
