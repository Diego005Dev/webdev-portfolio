import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import ContactPageClient from "./contact-page-client"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.contact.title} | Diego Ramírez`,
    description: dict.contact.description,
  }
}

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <ContactPageClient dictionary={dict} lang={params.lang} />
}
