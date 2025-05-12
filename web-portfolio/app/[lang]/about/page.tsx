import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import AboutPageClient from "./about-page-client"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.about.title} | Diego Ramírez`,
    description: "Learn more about Diego Ramírez, a Frontend Developer specializing in modern web technologies",
  }
}

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <AboutPageClient dictionary={dict} lang={params.lang} />
}
