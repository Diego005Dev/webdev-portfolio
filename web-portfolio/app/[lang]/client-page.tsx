"use client"

import Hero from "@/components/hero"
import FeaturedProjects from "@/components/featured-projects"
import AboutPreview from "@/components/about-preview"
import ContactCTA from "@/components/contact-cta"
import RetroPortfolioSection from "@/components/retro-portfolio-section"
import type { Dictionary } from "@/i18n"

interface ClientPageProps {
  dictionary: Dictionary
  lang: string
}

export default function ClientPage({ dictionary, lang }: ClientPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-24">
      <Hero dictionary={dictionary} lang={lang} />
      <AboutPreview dictionary={dictionary} lang={lang} />
      <FeaturedProjects dictionary={dictionary} lang={lang} />
      <RetroPortfolioSection dictionary={dictionary} />
      <ContactCTA dictionary={dictionary} lang={lang} />
    </div>
  )
}
