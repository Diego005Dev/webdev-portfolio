import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import ServicesPageClient from "./services-page-client"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.services.title} | Diego Ramírez`,
    description: "Professional web development services offered by Diego Ramírez",
  }
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <ServicesPageClient dictionary={dict} lang={params.lang} />
}
