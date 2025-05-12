"use client"

import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react"
import ContactForm from "@/components/contact-form"
import PageTransition from "@/components/page-transition"
import type { Dictionary } from "@/i18n"

interface ContactPageClientProps {
  dictionary: Dictionary
  lang: string
}

export default function ContactPageClient({ dictionary, lang }: ContactPageClientProps) {
  const dict = dictionary

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-petrol" />,
      label: dict.contact.info.email,
      value: "metallica3999@gmail.com",
      link: "mailto:metallica3999@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-petrol" />,
      label: dict.contact.info.phone,
      value: "+52 771 364 9377",
      link: "tel:+527713649377",
    },
    {
      icon: <Linkedin className="h-6 w-6 text-petrol" />,
      label: dict.contact.info.linkedin,
      value: "diego-ramírez-67b227238",
      link: "https://linkedin.com/in/diego-ramírez-67b227238",
    },
    {
      icon: <Github className="h-6 w-6 text-petrol" />,
      label: dict.contact.info.github,
      value: "Diego005Dev",
      link: "https://github.com/Diego005Dev",
    },
    {
      icon: <MapPin className="h-6 w-6 text-petrol" />,
      label: dict.contact.info.location,
      value: "Mexico",
      link: null,
    },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 text-neutral-900 dark:text-white">
          {dict.contact.title}
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 max-w-3xl mb-12">{dict.contact.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-display font-semibold mb-6 text-neutral-900 dark:text-white">
                {dict.contact.form.name}
              </h2>
              <ContactForm dictionary={dict} />
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-display font-semibold mb-6 text-neutral-900 dark:text-white">
                {dict.contact.info.title}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-white">{item.label}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-petrol hover:text-petrol/80 transition-colors"
                          target={
                            item.label !== dict.contact.info.email && item.label !== dict.contact.info.phone
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.label !== dict.contact.info.email && item.label !== dict.contact.info.phone
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-neutral-700 dark:text-neutral-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
