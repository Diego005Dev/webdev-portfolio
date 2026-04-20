import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import ProjectsPageClient from "./projects-page-client"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.projects.title} | Diego Ramírez`,
    description: dict.projects.description,
  }
}

export default async function ProjectsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return <ProjectsPageClient dictionary={dict} lang={params.lang} />
}
