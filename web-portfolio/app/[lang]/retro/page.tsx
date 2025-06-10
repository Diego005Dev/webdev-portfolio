import { getDictionary } from "@/i18n"
import { ClientHome } from "@/components/client-home"
import { ThemeProvider } from "@/components/theme-provider"

export default async function RetroPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClientHome lang={params.lang} dictionary={dict} />
    </ThemeProvider>
  )
}
