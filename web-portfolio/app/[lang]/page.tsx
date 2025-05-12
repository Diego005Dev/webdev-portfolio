import { getDictionary } from "@/i18n"
import ClientPage from "./client-page"

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <ClientPage dictionary={dict} lang={params.lang} />
}
