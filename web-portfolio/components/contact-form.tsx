"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import type { Dictionary } from "@/i18n"

interface ContactFormProps {
  dictionary: Dictionary
}

export default function ContactForm({ dictionary }: ContactFormProps) {
  const dict = dictionary

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: null })

    // Simulate form submission
    try {
      // In a real application, you would send the form data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus({
        type: "success",
        message: dict.contact.form.success,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: dict.contact.form.error,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {dict.contact.form.name}
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={dict.contact.form.placeholders?.name ?? dict.contact.form.name}
            required
            className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {dict.contact.form.email}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={dict.contact.form.placeholders?.email ?? dict.contact.form.email}
            required
            className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {dict.contact.form.subject}
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={dict.contact.form.placeholders?.subject ?? dict.contact.form.subject}
          required
          className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {dict.contact.form.message}
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={dict.contact.form.placeholders?.message ?? dict.contact.form.message}
          required
          rows={6}
          className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 resize-none"
        />
      </div>

      {submitStatus.message && (
        <div
          className={`p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200"
              : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="bg-petrol hover:bg-petrol/90 text-white w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {dict.contact.form.sending}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" /> {dict.contact.form.send}
          </>
        )}
      </Button>
    </form>
  )
}
