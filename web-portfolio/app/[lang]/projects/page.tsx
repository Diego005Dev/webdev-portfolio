import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import ProjectsPageClient from "./projects-page-client"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.projects.title} | Diego Ramírez`,
    description: dict.projects.description,
  }
}

export default async function ProjectsPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <ProjectsPageClient dictionary={dict} lang={params.lang} />
}
