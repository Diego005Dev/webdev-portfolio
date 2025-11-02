"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Check } from "lucide-react"
import { getDictionary } from "@/i18n"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  const [isOpen, setIsOpen] = useState(false)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!dict) return null

  const switchLanguage = (newLang: string) => {
    if (newLang === currentLang) return

    // Guardar la preferencia de idioma en localStorage
    localStorage.setItem("preferredLanguage", newLang)

    // Get the path without the language prefix
    const pathWithoutLang = pathname.replace(/^\/(en|es)/, "")

    // Create the new path
    const newPath = `/${newLang}${pathWithoutLang}`

    // Navigate to the new path
    router.push(newPath)
    setIsOpen(false)
  }

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' }
  ]

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
              className={cn(
                "flex items-center gap-2 px-3 py-2 h-9 text-neutral-700 dark:text-neutral-300",
                "hover:text-petrol dark:hover:text-petrol-light hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-offset-2 dark:focus:ring-offset-neutral-900",
                "transition-all duration-200 rounded-md",
                isOpen && "bg-neutral-100 dark:bg-neutral-800 text-petrol dark:text-petrol-light"
              )}
              aria-label={`${dict.ui.languageSwitcher.currentLanguage.replace('{language}', currentLang === 'en' ? 'English' : 'Español')}. ${dict.ui.languageSwitcher.changeLanguage}`}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              <Globe size={16} className="flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">
                {currentLang === 'en' ? 'EN' : 'ES'}
              </span>
              <svg
                className={cn(
                  "w-4 h-4 transition-transform duration-200 flex-shrink-0",
                  isOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{dict.ui.languageSwitcher.changeLanguage} ({currentLang === 'en' ? dict.navigation.switchToSpanish : dict.navigation.switchToEnglish})</p>
          </TooltipContent>
        </Tooltip>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg border border-neutral-200 dark:border-neutral-700 z-50"
          role="listbox"
          aria-label="Language selection"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-left",
                "hover:bg-neutral-50 dark:hover:bg-neutral-700",
                "focus:outline-none focus:bg-neutral-50 dark:focus:bg-neutral-700",
                "transition-colors duration-150 first:rounded-t-md last:rounded-b-md",
                currentLang === lang.code && "bg-petrol/10 dark:bg-petrol/20 text-petrol dark:text-petrol-light"
              )}
              role="option"
              aria-selected={currentLang === lang.code}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {lang.nativeName}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {lang.name}
                </span>
              </div>
              {currentLang === lang.code && (
                <Check size={16} className="text-petrol dark:text-petrol-light flex-shrink-0" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
    </TooltipProvider>
  )
}
