"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { Dictionary } from "@/i18n"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface RetroPortfolioSectionProps {
  dictionary: Dictionary
}

export default function RetroPortfolioSection({ dictionary }: RetroPortfolioSectionProps) {
  const dict = dictionary
  const pathname = usePathname()
  const lang = pathname.split("/")[1] || "en"

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 rounded-lg overflow-hidden shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              {dict.home.retro.title}
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">{dict.home.retro.description}</p>
            <div>
              <Button asChild className="bg-petrol hover:bg-petrol/90 text-white">
                <Link href={`/retro-portfolio/redirect?lang=${lang}&era=8bit`}>
                  {dict.home.retro.viewRetro} <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 dark:to-black/40 z-10"></div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/RetroPortfolioScreenshot.jpg-m4UxRzY2SMteE6eazLreDNcArKibVG.jpeg"
              alt="Retro Portfolio Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
