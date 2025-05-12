"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Dictionary } from "@/i18n"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
  }
  dictionary: Dictionary
}

export default function ProjectCard({ project, dictionary }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const dict = dictionary

  return (
    <motion.div
      className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-sm h-full flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-neutral-100 dark:bg-neutral-700">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex gap-4 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-petrol hover:text-petrol/80 font-medium transition-colors"
            >
              {dict.projects.liveDemo} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-neutral-700 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 font-medium transition-colors"
            >
              {dict.projects.viewCode} <Github className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
