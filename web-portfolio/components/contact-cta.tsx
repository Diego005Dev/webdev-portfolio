"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/i18n"

interface ContactCTAProps {
  dictionary: Dictionary
  lang: string
}

export default function ContactCTA({ dictionary, lang }: ContactCTAProps) {
  const dict = dictionary

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-gradient-to-r from-petrol/10 to-petrol/5 dark:from-petrol/20 dark:to-neutral-800 rounded-lg p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          {dict.home.contact.title}
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto mb-8">{dict.home.contact.description}</p>
        <Button asChild className="bg-petrol hover:bg-petrol/90 text-white">
          <Link href={`/${lang}/contact`}>{dict.home.contact.cta}</Link>
        </Button>
      </motion.div>
    </section>
  )
}
