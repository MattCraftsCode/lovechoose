"use client"

import { useState } from "react"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs"
import { ProjectCard } from "@/components/portfolio/project-card"
import type { Project, ProjectCategory } from "@/data/projects"

type FilterValue = "all" | ProjectCategory

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "website", label: "Websites" },
  { value: "extension", label: "Extensions" },
  { value: "mini", label: "Mini Programs" },
]

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterValue>("all")
  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => setFilter(value as FilterValue)}
    >
      <TabsList className="h-auto w-full flex-wrap justify-start gap-1 rounded-xl bg-[#eef5df] p-1.5 sm:w-fit">
        {filters.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="h-8 min-w-fit rounded-lg px-3 text-xs font-bold data-[state=active]:text-foreground"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div
        className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        aria-live="polite"
      >
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            delay={index * 60}
          />
        ))}
      </div>
    </Tabs>
  )
}
