"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  ExternalLink,
  Link2,
  ListFilter,
  ScanSearch,
} from "lucide-react"

import { Button } from "@/components/animate-ui/components/buttons/button"
import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import type { Project } from "@/data/projects"

export function ExtensionGallery({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Slide
          key={project.slug}
          delay={100 + index * 70}
          offset={30}
          inViewMargin="-8% 0px -8% 0px"
        >
          <article id={project.slug} className="group min-w-0">
            <div className="px-2 text-center">
              <h2 className="font-serif text-2xl leading-tight text-[#5f7d41]">
                {project.name}
              </h2>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="relative mt-4 aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-[0_14px_40px_rgba(58,79,49,0.08)] transition-[transform,box-shadow,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-[#abc28f] group-hover:shadow-[0_24px_60px_rgba(58,79,49,0.16)]">
              <ExtensionPreview projectName={project.name} />
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3 rounded-xl border border-white/65 bg-[#fffef8]/90 p-3 shadow-lg backdrop-blur-md transition-transform duration-300 sm:translate-y-[calc(100%+1rem)] sm:group-focus-within:translate-y-0 sm:group-hover:translate-y-0">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#708d4e] uppercase">
                    Browser extension
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    Hover, tap or open the project
                  </p>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="h-9 shrink-0 rounded-full px-3 shadow-none"
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

function ExtensionPreview({ projectName }: { projectName: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[#dfe9cf] bg-[#f8faF1]">
      <div className="flex h-10 items-center gap-2 border-b border-[#dfe9cf] bg-white px-3">
        <span className="size-2 rounded-full bg-[#f0b7a7]" />
        <span className="size-2 rounded-full bg-[#efd889]" />
        <span className="size-2 rounded-full bg-[#a9c88b]" />
        <div className="ml-2 flex h-6 min-w-0 flex-1 items-center gap-2 rounded-md bg-[#f2f5ec] px-2 text-[9px] text-[#7a8672]">
          <Link2 className="size-2.5 shrink-0" aria-hidden="true" />
          <span className="truncate">lovechoose.com/projects</span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[44px_1fr]">
        <div className="flex flex-col items-center gap-3 border-r border-[#dfe9cf] bg-white py-4 text-[#708d4e]">
          <span className="grid size-7 place-items-center rounded-lg bg-[#e6f0c3]">
            <ScanSearch className="size-3.5" aria-hidden="true" />
          </span>
          <Link2 className="size-3.5" aria-hidden="true" />
          <ListFilter className="size-3.5" aria-hidden="true" />
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </div>

        <div className="min-w-0 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-[#78984f] uppercase">
                {projectName}
              </p>
              <p className="mt-1 font-serif text-xl">Links on this page</p>
            </div>
            <span className="rounded-full bg-[#24321f] px-2 py-1 text-[9px] font-bold text-white">
              24 found
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-1 rounded-lg bg-[#eaf1dc] p-1 text-center text-[9px] font-bold text-[#607052]">
            <span className="rounded-md bg-white py-1.5 shadow-sm">All</span>
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
