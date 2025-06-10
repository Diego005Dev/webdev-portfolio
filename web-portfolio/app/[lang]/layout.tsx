import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Press_Start_2P, VT323, Orbitron } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/i18n"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

// Add the retro fonts
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start-2p",
})

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang)

  return {
    title: "Diego Ramírez | Frontend Developer",
    description: "Frontend Developer specializing in modern web technologies like React, Next.js, and TypeScript",
    keywords: ["frontend developer", "web development", "React", "Next.js", "TypeScript"],
    authors: [{ name: "Diego Ramírez" }],
    openGraph: {
      type: "website",
      locale: params.lang === "es" ? "es_ES" : "en_US",
      url: "https://webdevdiegor005.com",
      title: "Diego Ramírez | Frontend Developer",
      description: "Frontend Developer specializing in modern web technologies like React, Next.js, and TypeScript",
      siteName: "Diego Ramírez Portfolio",
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }]
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
      <body
        className={`${inter.variable} ${playfair.variable} ${pressStart2P.variable} ${vt323.variable} ${orbitron.variable} font-sans bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header lang={params.lang} />
            <main className="flex-grow">{children}</main>
            <Footer lang={params.lang} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
