import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectDetail } from "@/components/portfolio/project-detail"
import { projectMap } from "@/data/projects"

type ProjectPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return Array.from(projectMap.keys()).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projectMap.get(slug)

  if (!project) return {}

  return {
    title: project.name,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projectMap.get(slug)

  if (!project) notFound()

  return <ProjectDetail project={project} />
}
