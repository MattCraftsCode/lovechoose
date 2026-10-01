import { Slide } from "@/components/animate-ui/primitives/effects/slide"
import { ExtensionGallery } from "@/components/portfolio/extension-gallery"
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
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
      <Slide inView offset={28}>
        <p className="eyebrow">{content.eyebrow}</p>
        <h1 className="mt-3 font-serif text-6xl leading-none sm:text-7xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg/8 text-muted-foreground">
          {content.description}
        </p>
      </Slide>

      {category === "extension" ? (
        <ExtensionGallery projects={categoryProjects} />
      ) : (
        <div className="mt-12 grid gap-6">
          {categoryProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              compact
              delay={100 + index * 70}
            />
          ))}
        </div>
      )}
    </main>
  )
}
