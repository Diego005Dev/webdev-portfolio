import type { Metadata } from "next"
import { getDictionary } from "@/i18n"
import ContactPageClient from "./contact-page-client"

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return {
    title: `${dict.contact.title} | Diego Ramírez`,
    description: dict.contact.description,
  }
}

export default async function ContactPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const dict = await getDictionary(params.lang)

  return <ContactPageClient dictionary={dict} lang={params.lang} />
}
