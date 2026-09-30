"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import type { Project } from "@/data/projects"
import { cn } from "@/lib/utils"

type ProjectCardProps = {
  project: Project
  delay?: number
  compact?: boolean
}

export function ProjectCard({
  project,
  delay = 0,
  compact = false,
}: ProjectCardProps) {
  return (
    <Slide
      delay={delay}
      offset={32}
      inViewMargin="-8% 0px -8% 0px"
      className="h-full"
    >
      <Link
        id={project.slug}
        href={project.href}
        className={cn(
          "project-card group block h-full overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-[0_12px_34px_rgba(58,79,49,0.06)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#abc28f] hover:shadow-[0_24px_55px_rgba(58,79,49,0.14)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          compact && "grid gap-4 md:grid-cols-[260px_1fr]"
        )}
      >
        <div
          className={cn(
            "poster relative isolate min-h-[240px] overflow-hidden rounded-xl p-6",
            compact && "min-h-[220px]"
          )}
          style={{ backgroundColor: project.color }}
        >
          <div className="relative z-10 flex items-center justify-between">
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              {project.label}
            </span>
            <span className="grid size-8 place-items-center rounded-full bg-white/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </div>
          <div className="absolute inset-x-6 bottom-6 z-10">
            <h3 className="font-serif text-3xl leading-tight">
              {project.name}
            </h3>
            {!compact ? (
              <p className="mt-2 max-w-xs text-sm/6 text-[#40513b]">
                {project.description}
              </p>
            ) : null}
          </div>
          <div className="poster-orbit absolute -right-[25%] -bottom-[44%] size-[72%] rounded-full bg-white/25 transition-transform duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:scale-110" />
          <div className="absolute right-[13%] bottom-[22%] size-4 rounded-full border border-white/55 bg-white/20" />
        </div>

        {compact ? (
          <div className="flex min-w-0 flex-col justify-center px-3 py-5 md:px-7">
            <p className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
              {project.categoryLabel}
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight">
              {project.name}
            </h2>
            <p className="mt-4 max-w-2xl text-base/7 text-muted-foreground">
              {project.description}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">
              View project
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between px-2 pt-4 pb-2">
            <span className="text-xs font-bold tracking-[0.18em] text-muted-foreground uppercase">
              {project.categoryLabel}
            </span>
            <span className="text-sm font-bold">View project</span>
          </div>
        )}
      </Link>
    </Slide>
  )
}
