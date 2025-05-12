"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Dictionary } from "@/i18n"

interface AboutPreviewProps {
  dictionary: Dictionary
  lang: string
}

export default function AboutPreview({ dictionary, lang }: AboutPreviewProps) {
  const dict = dictionary

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {dict.home.about.title}
          </h2>
          <div className="w-20 h-1 bg-petrol mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">{dict.home.about.subtitle}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">{dict.home.about.description}</p>
            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center text-petrol hover:text-petrol/80 font-medium transition-colors"
            >
              {dict.home.about.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
                {dict.home.about.skills[0]}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {dict.home.about.skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-petrol mr-3"></div>
                    <span className="text-neutral-700 dark:text-neutral-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
