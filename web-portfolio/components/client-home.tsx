"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { PortfolioContent } from "@/components/portfolio-content"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { EightBitTheme } from "@/components/eight-bit-theme"
import { SixteenBitTheme } from "@/components/sixteen-bit-theme"
import { ThirtyTwoBitTheme } from "@/components/thirty-two-bit-theme"
import { Preloader } from "@/components/preloader"

export function ClientHome({ lang, dictionary }: { lang: string; dictionary: any }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const eraParam = searchParams.get("era")
  const isRetroPage = pathname.includes("/retro")

  // Set initial era from URL parameter or default based on page type
  // Default to "32bit" for main portfolio, "8bit" for retro portfolio
  const [currentEra, setCurrentEra] = useState<"8bit" | "16bit" | "32bit">(
    (eraParam as "8bit" | "16bit" | "32bit") || (isRetroPage ? "8bit" : "32bit"),
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Reset loading state when era changes
    setLoading(true)

    // Hide loading after timeout
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [currentEra])

  // Update URL when era changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set("era", currentEra)

    // Update URL without full navigation
    window.history.replaceState(null, "", `/${lang}${isRetroPage ? "/retro" : ""}?${params.toString()}`)
  }, [currentEra, lang, isRetroPage])

  const handleForwardEra = () => {
    let nextEra: "8bit" | "16bit" | "32bit" = "8bit"
    if (currentEra === "8bit") nextEra = "16bit"
    else if (currentEra === "16bit") nextEra = "32bit"
    else if (currentEra === "32bit") nextEra = "8bit"

    setCurrentEra(nextEra)

    // Update URL while preserving the current language
    const params = new URLSearchParams(window.location.search)
    params.set("era", nextEra)

    // Update URL without full navigation
    window.history.replaceState(null, "", `/${lang}${isRetroPage ? "/retro" : ""}?${params.toString()}`)
  }

  const handleBackwardEra = () => {
    let prevEra: "8bit" | "16bit" | "32bit" = "32bit"
    if (currentEra === "8bit") prevEra = "32bit"
    else if (currentEra === "16bit") prevEra = "8bit"
    else if (currentEra === "32bit") prevEra = "16bit"

    setCurrentEra(prevEra)

    // Update URL while preserving the current language
    const params = new URLSearchParams(window.location.search)
    params.set("era", prevEra)

    // Update URL without full navigation
    window.history.replaceState(null, "", `/${lang}${isRetroPage ? "/retro" : ""}?${params.toString()}`)
  }

  // Add this useEffect to ensure theme is properly synchronized
  useEffect(() => {
    // This will ensure the theme is properly synchronized with system/user preferences
    const syncTheme = async () => {
      // Wait a bit for theme system to initialize
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Force theme refresh
      document.documentElement.classList.remove("no-transitions")
    }

    syncTheme()
  }, [])

  return (
    <main className="min-h-screen">
      {loading && <Preloader currentEra={currentEra} />}

      {currentEra === "8bit" && <EightBitTheme />}
      {currentEra === "16bit" && <SixteenBitTheme />}
      {currentEra === "32bit" && <ThirtyTwoBitTheme />}

      <div className="container mx-auto px-4 py-8">
        <ThemeSwitcher
          currentEra={currentEra}
          onForward={handleForwardEra}
          onBackward={handleBackwardEra}
          dictionary={dictionary}
          lang={lang}
        />
        <PortfolioContent currentEra={currentEra} dictionary={dictionary} />
      </div>
    </main>
  )
}
