import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import AboutPageClient from "./about-page-client"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.about.title} | Diego Ramírez`,
    description: dict.about.professionalSummary.description,
  }
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <AboutPageClient dictionary={dict} lang={params.lang} />
}
