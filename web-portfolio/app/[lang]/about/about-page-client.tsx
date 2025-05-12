"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import PageTransition from "@/components/page-transition"
import type { Dictionary } from "@/i18n"

interface AboutPageClientProps {
  dictionary: Dictionary
  lang: string
}

export default function AboutPageClient({ dictionary, lang }: AboutPageClientProps) {
  const dict = dictionary

  const skills = [
    {
      category: dict.about.technicalSkills.categories.languages,
      items: ["HTML5", "CSS3", "JavaScript", "TypeScript"],
    },
    {
      category: dict.about.technicalSkills.categories.frameworks,
      items: ["React.js", "Next.js", "Angular", "Vue.js"],
    },
    {
      category: dict.about.technicalSkills.categories.tools,
      items: ["Git", "GitHub", "Figma", "Tailwind CSS", "Vite", "Supabase"],
    },
    {
      category: dict.about.technicalSkills.categories.practices,
      items: ["Responsive Design", "Accessibility (a11y)", "Technical SEO"],
    },
  ]

  const education = [
    {
      degree: "Computer Systems Engineering",
      institution: "Universidad Utel",
      period: "2023 - Present",
    },
    {
      degree: "Mechatronics Technician",
      institution: "CECYTEH",
      period: "2014 - 2016",
    },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-neutral-900 dark:text-white">
          {dict.about.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="relative w-full aspect-square max-w-sm mx-auto md:mx-0 overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opcion1%281%29.jpg-OxlzXTJYH8I63eiSIxrEUIRxKMvmrY.jpeg"
                alt="Diego Ramírez"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="mt-6 text-center md:text-left">
              <Button className="bg-petrol hover:bg-petrol/90 text-white" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" /> {dict.about.downloadResume}
                </a>
              </Button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-display font-semibold mb-4 text-neutral-900 dark:text-white">
                {dict.about.professionalSummary.title}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {dict.about.professionalSummary.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold mb-4 text-neutral-900 dark:text-white">
                {dict.about.education.title}
              </h2>
              <div className="space-y-4">
                {education.map((item, index) => (
                  <div key={index} className="border-l-2 border-petrol pl-4 py-1">
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{item.degree}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{item.institution}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold mb-4 text-neutral-900 dark:text-white">
                {dict.about.professionalGoal.title}
              </h2>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {dict.about.professionalGoal.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-display font-semibold mb-6 text-neutral-900 dark:text-white">
            {dict.about.technicalSkills.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4 text-petrol dark:text-petrol-light">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="outline"
                      className="bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
