"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Dictionary } from "@/i18n"

interface HeroProps {
  dictionary: Dictionary
  lang: string
}

export default function Hero({ dictionary, lang }: HeroProps) {
  const dict = dictionary

  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="order-2 md:order-1"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white leading-tight">
            <span className="block">{dict.home.hero.greeting}</span>
            <span className="text-petrol dark:text-petrol-light">{dict.home.hero.title}</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-700 dark:text-neutral-300 max-w-lg">{dict.home.hero.description}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-petrol hover:bg-petrol/90 text-white">
              <Link href={`/${lang}/projects`}>
                {dict.home.hero.viewWork} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${lang}/contact`}>{dict.home.hero.contactMe}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-br from-petrol/20 to-petrol/5 p-1">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-petrol to-petrol/50 opacity-10 blur-2xl" />
            <div className="h-full w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full text-petrol dark:text-petrol-light opacity-20"
              >
                <path
                  fill="currentColor"
                  d="M45.7,-51.9C59.5,-41.5,71.3,-27.4,74.8,-11.1C78.3,5.2,73.5,23.7,63.1,37.8C52.7,51.9,36.6,61.5,19.2,67.2C1.9,72.9,-16.8,74.7,-32.8,68.1C-48.8,61.5,-62.1,46.6,-69.3,28.8C-76.5,11.1,-77.5,-9.5,-70.3,-25.8C-63.1,-42.1,-47.7,-54.1,-32.1,-63.8C-16.5,-73.5,-0.8,-80.9,13.2,-77.8C27.1,-74.7,31.9,-62.2,45.7,-51.9Z"
                  transform="translate(100 100)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opcion1%281%29.jpg-OxlzXTJYH8I63eiSIxrEUIRxKMvmrY.jpeg"
                    alt="Diego Ramírez"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
