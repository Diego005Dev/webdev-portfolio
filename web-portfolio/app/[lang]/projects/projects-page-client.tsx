"use client"

import ProjectCard from "@/components/project-card"
import { projects } from "@/data/projects"
import PageTransition from "@/components/page-transition"
import type { Dictionary } from "@/i18n"

interface ProjectsPageClientProps {
  dictionary: Dictionary
  lang: string
}

export default function ProjectsPageClient({ dictionary, lang }: ProjectsPageClientProps) {
  const dict = dictionary

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-neutral-900 dark:text-white">
          {dict.projects.title}
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl mb-12">{dict.projects.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} dictionary={dict} />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
