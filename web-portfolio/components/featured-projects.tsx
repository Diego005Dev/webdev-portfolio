"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getProjects } from "@/data/projects"
import ProjectCard from "./project-card"
import type { Dictionary } from "@/i18n"

interface FeaturedProjectsProps {
  dictionary: Dictionary
  lang: string
}

export default function FeaturedProjects({ dictionary, lang }: FeaturedProjectsProps) {
  const dict = dictionary

  // Obtener los proyectos usando el diccionario
  const projects = getProjects(dict)

  // Solo mostrar los primeros 2 proyectos en la página de inicio
  const featuredProjects = projects.slice(0, 2)

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
            {dict.home.projects.title}
          </h2>
          <div className="w-20 h-1 bg-petrol mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ProjectCard project={project} dictionary={dict} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${lang}/projects`}
            className="inline-flex items-center text-petrol hover:text-petrol/80 font-medium transition-colors"
          >
            {dict.home.projects.viewAll} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
