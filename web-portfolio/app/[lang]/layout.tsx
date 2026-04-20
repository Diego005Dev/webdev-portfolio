import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/i18n"
import { TooltipProvider } from "@/components/ui/tooltip"

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: `Diego Ramírez | ${dict.home.hero.title}`,
    description: dict.home.hero.description,
    keywords: ["full stack web developer", "web development", "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "MERN stack", "backend development", "frontend development"],
    authors: [{ name: "Diego Ramírez" }],
    openGraph: {
      type: "website",
      locale: params.lang === "es" ? "es_ES" : "en_US",
      url: "https://webdevdiegor005.com",
      title: `Diego Ramírez | ${dict.home.hero.title}`,
      description: dict.home.hero.description,
      siteName: "Diego Ramírez Portfolio",
    },
  }
}

export default async function LangLayout(
  props: Readonly<{
    children: React.ReactNode
    params: { lang: string } | Promise<{ lang: string }>
  }>
) {
  const params = await props.params
  const { children } = props

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header lang={params.lang} />
          <main className="flex-grow">{children}</main>
          <Footer lang={params.lang} />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}
