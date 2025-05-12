import { getDictionary } from "@/i18n"
import { ClientHome } from "@/components/client-home"

export default async function RetroPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return <ClientHome lang={params.lang} dictionary={dict} />
}
