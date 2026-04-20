import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import ServicesPageClient from "./services-page-client"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.services.title} | Diego Ramírez`,
    description: dict.services.description,
  }
}

export default async function ServicesPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return <ServicesPageClient dictionary={dict} lang={params.lang} />
}
