"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Check } from "lucide-react"
import { getDictionary } from "@/i18n"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
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
      if (dictionary) setDict(dictionary)
      else {
        const loadedDict = await getDictionary(currentLang)
        setDict(loadedDict)
      }
    }
    loadDictionary()
  }, [currentLang, dictionary])

  if (!dict) return null

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' }
  ]

  const switchLanguage = (newLang: string) => {
    if (newLang === currentLang) return
    localStorage.setItem("preferredLanguage", newLang)
    const pathWithoutLang = pathname.replace(/^\/(en|es)/, "")
    const newPath = `/${newLang}${pathWithoutLang}`
    router.push(newPath)
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-2 px-3 py-2 h-9 text-neutral-700 dark:text-neutral-300",
              "hover:text-petrol dark:hover:text-petrol-light hover:bg-neutral-100 dark:hover:bg-neutral-800",
              "focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-offset-2 dark:focus:ring-offset-neutral-900",
              "transition-all duration-200 rounded-md"
            )}
            aria-label={`${dict.ui.languageSwitcher.currentLanguage.replace('{language}', currentLang === 'en' ? 'English' : 'Español')}. ${dict.ui.languageSwitcher.changeLanguage}`}
          >
            <Globe size={16} className="flex-shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">{currentLang === 'en' ? 'EN' : 'ES'}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={8} className="w-48">
          <DropdownMenuLabel>{dict.ui.languageSwitcher.changeLanguage}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onSelect={() => switchLanguage(lang.code)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 text-left",
                "hover:bg-neutral-50 dark:hover:bg-neutral-700",
                currentLang === lang.code && "bg-petrol/10 dark:bg-petrol/20 text-petrol dark:text-petrol-light"
              )}
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{lang.nativeName}</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{lang.name}</span>
              </div>
              {currentLang === lang.code && <Check size={16} className="text-petrol dark:text-petrol-light flex-shrink-0" aria-hidden="true" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
