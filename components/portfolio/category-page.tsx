import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { PortfolioGallery } from "@/components/portfolio/extension-gallery"
import { ProjectCard } from "@/components/portfolio/project-card"
import {
  categoryContent,
  getProjectsByCategory,
  type ProjectCategory,
} from "@/data/projects"

export function CategoryPage({ category }: { category: ProjectCategory }) {
  const content = categoryContent[category]
  const categoryProjects = getProjectsByCategory(category)

  return (
    <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <Slide inView offset={28}>
        <div className="flex items-end justify-between gap-8 border-b border-foreground pb-7">
          <div>
            <p className="eyebrow">01 / {content.eyebrow}</p>
            <h1 className="mt-3 font-serif text-6xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">
              {content.title}
            </h1>
          </div>
          <p className="hidden max-w-sm text-right text-sm/6 text-muted-foreground md:block">
            {content.description}
          </p>
        </div>
        <p className="mt-5 max-w-2xl text-base/7 text-muted-foreground md:hidden">
          {content.description}
        </p>
      </Slide>

      {category === "extension" || category === "mini" ? (
        <PortfolioGallery projects={categoryProjects} />
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {categoryProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={100 + index * 70}
            />
          ))}
        </div>
      )}
    </main>
  )
}
