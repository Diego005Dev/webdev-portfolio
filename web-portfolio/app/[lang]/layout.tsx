import type React from "react"
import type { Metadata } from "next"
// import { Inter, Playfair_Display } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/i18n"
import { TooltipProvider } from "@/components/ui/tooltip"

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// })

// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
// })

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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: string }
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#22c55e" />
      </head>
      <body
        className={`font-sans bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header lang={params.lang} />
              <main className="flex-grow">{children}</main>
              <Footer lang={params.lang} />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
