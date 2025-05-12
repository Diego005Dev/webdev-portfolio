"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { getDictionary } from "@/i18n"
import { useEffect, useState } from "react"

interface FooterProps {
  lang: string
}

export default function Footer({ lang }: FooterProps) {
  const [dictionary, setDictionary] = useState<any>(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const loadDictionary = async () => {
      const dict = await getDictionary(lang)
      setDictionary(dict)
    }

    loadDictionary()
  }, [lang])

  if (!dictionary) return null

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href={`/${lang}`} className="text-xl font-display font-bold text-neutral-900 dark:text-white">
              Diego<span className="text-petrol">R</span>
            </Link>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{dictionary.footer.description}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/Diego005Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-petrol dark:text-neutral-400 dark:hover:text-petrol-light transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/diego-ramírez-67b227238"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 hover:text-petrol dark:text-neutral-400 dark:hover:text-petrol-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:metallica3999@gmail.com"
                className="text-neutral-700 hover:text-petrol dark:text-neutral-400 dark:hover:text-petrol-light transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              © {currentYear} Diego Ramírez. {dictionary.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
