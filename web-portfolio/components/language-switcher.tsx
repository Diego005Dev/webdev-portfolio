"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { getDictionary } from "@/i18n"
import { useEffect, useState } from "react"
import type { Dictionary } from "@/i18n"

interface LanguageSwitcherProps {
  currentLang: string
  currentEra?: "8bit" | "16bit" | "32bit"
  dictionary?: any
}

export default function LanguageSwitcher({ currentLang, currentEra, dictionary }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [dict, setDict] = useState<Dictionary | null>(null)

  useEffect(() => {
    const loadDictionary = async () => {
      if (dictionary) {
        setDict(dictionary)
      } else {
        const loadedDict = await getDictionary(currentLang)
        setDict(loadedDict)
      }
    }

    loadDictionary()
  }, [currentLang, dictionary])

  if (!dict) return null

  const switchLanguage = () => {
    const newLang = currentLang === "en" ? "es" : "en"

    // Guardar la preferencia de idioma en localStorage
    localStorage.setItem("preferredLanguage", newLang)

    // Get the path without the language prefix
    const pathWithoutLang = pathname.replace(/^\/(en|es)/, "")

    // Create the new path
    const newPath = `/${newLang}${pathWithoutLang}`

    // Navigate to the new path
    router.push(newPath)
  }

  return (
    <Button
      onClick={switchLanguage}
      variant="ghost"
      size="icon"
      className="w-9 h-9 text-neutral-700 dark:text-neutral-300 hover:text-petrol dark:hover:text-petrol-light"
      aria-label={currentLang === "en" ? "Switch to Spanish" : "Switch to English"}
    >
      <span className="inline-flex items-center justify-center">
        <Globe size={18} style={{ display: "inline-block", width: "18px", height: "18px" }} />
      </span>
      <span className="sr-only">
        {currentLang === "en" ? dict.navigation.switchToSpanish : dict.navigation.switchToEnglish}
      </span>
    </Button>
  )
}
