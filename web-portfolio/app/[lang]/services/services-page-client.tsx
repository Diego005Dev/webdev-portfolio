"use client"

import { ShoppingBag, Globe, Server, Code } from "lucide-react"
import PageTransition from "@/components/page-transition"
import type { Dictionary } from "@/i18n"
import Link from "next/link"

interface ServicesPageClientProps {
  dictionary: Dictionary
  lang: string
}

export default function ServicesPageClient({ dictionary, lang }: ServicesPageClientProps) {
  const dict = dictionary

  const services = [
    {
      title: "E-commerce Development",
      description:
        "Custom e-commerce solutions built with modern technologies like Next.js, Supabase, and PostgreSQL. Features include product management, shopping cart, order processing, and inventory management.",
      icon: <ShoppingBag className="h-10 w-10 text-petrol" />,
      available: true,
    },
    {
      title: "Website Development Package",
      description:
        "Complete website development package including design, development, hosting, and domain registration. Perfect for small businesses and personal brands looking to establish an online presence.",
      icon: <Globe className="h-10 w-10 text-petrol" />,
      available: true,
    },
    {
      title: "Frontend Development",
      description:
        "Custom frontend development using React, Next.js, and other modern frameworks. Focus on responsive design, accessibility, and performance optimization.",
      icon: <Code className="h-10 w-10 text-petrol" />,
      available: false,
      comingSoon: true,
    },
    {
      title: "API Integration",
      description:
        "Integration with third-party APIs and services to extend your website's functionality. Experience with RESTful APIs, GraphQL, and various service providers.",
      icon: <Server className="h-10 w-10 text-petrol" />,
      available: false,
      comingSoon: true,
    },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-neutral-900 dark:text-white">
          {dict.services.title}
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl mb-12">{dict.services.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-sm border-l-4 ${
                service.available ? "border-petrol" : "border-neutral-300 dark:border-neutral-700"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-4">{service.icon}</div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{service.title}</h3>
                    {!service.available && service.comingSoon && (
                      <span className="ml-3 text-xs font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded">
                        {dict.services.comingSoon}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-800 p-8 rounded-lg">
          <h2 className="text-2xl font-display font-semibold mb-4 text-neutral-900 dark:text-white">
            {dict.services.cta.title}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 mb-6">{dict.services.cta.description}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-block bg-petrol hover:bg-petrol/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            {dict.services.cta.button}
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
