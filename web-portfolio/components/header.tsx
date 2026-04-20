"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { motion } from "framer-motion"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import LanguageSwitcher from "./language-switcher"
import { getDictionary } from "@/i18n"
import type { Dictionary } from "@/i18n"

interface HeaderProps {
  lang: string
}

export default function Header({ lang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const pathname = usePathname()

  // menu open state is controlled by the Sheet component via setIsMenuOpen

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang)
      setDictionary(dict)
    }

    loadDictionary()
  }, [lang])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!dictionary) return null

  const navItems = [
    { name: dictionary.navigation.home, path: `/${lang}` },
    { name: dictionary.navigation.about, path: `/${lang}/about` },
    { name: dictionary.navigation.projects, path: `/${lang}/projects` },
    { name: dictionary.navigation.services, path: `/${lang}/services` },
    { name: dictionary.navigation.contact, path: `/${lang}/contact` },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href={`/${lang}`}
            className="text-xl md:text-2xl font-display font-bold text-neutral-900 dark:text-white"
          >
            Diego<span className="text-petrol">R</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-medium transition-colors ${
                  pathname === item.path
                    ? "text-petrol dark:text-petrol-light"
                    : "text-neutral-700 hover:text-petrol dark:text-neutral-300 dark:hover:text-petrol-light"
                }`}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-0.5 w-full bg-petrol dark:bg-petrol-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            <LanguageSwitcher currentLang={lang} />
            <div className="inline-flex items-center justify-center">
              <ThemeToggle dictionary={dictionary} />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher currentLang={lang} />
            <div className="inline-flex items-center justify-center">
              <ThemeToggle dictionary={dictionary} />
            </div>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="ml-4 p-2 text-neutral-700 dark:text-neutral-300 hover:text-petrol dark:hover:text-petrol-light"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-navigation-sheet"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </SheetTrigger>

              <SheetContent side="top" id="mobile-navigation-sheet" className="md:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-0 py-4">
                <nav className="container mx-auto px-4 flex flex-col space-y-4" aria-label="Mobile navigation">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`py-2 font-medium ${
                        pathname === item.path
                          ? "text-petrol dark:text-petrol-light"
                          : "text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mobile navigation now handled by accessible Sheet (Radix) */}
    </header>
  )
}
