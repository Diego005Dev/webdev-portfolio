"use client"

import type React from "react"

import { useState, useRef } from "react"
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname()

  // Helper to preserve locale base (e.g. /en or /es). If the app is rooted
  // at /[lang], we need to post to /{lang}/api/contact. Otherwise fallback to ''
  const routerBase = () => {
    // pathname like '/en/contact' -> base '/en'
    if (!pathname) return ''
    const parts = pathname.split('/')
    if (parts.length > 1 && parts[1].length === 2) return `/${parts[1]}`
    return ''
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const subjectRef = useRef<HTMLInputElement | null>(null)
  const messageRef = useRef<HTMLTextAreaElement | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // clear error for this field while typing
    setErrors((prev) => {
      const { [name]: _, ...rest } = prev
      return rest
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = dict.contact.form.errors?.name ?? "Please enter your name."
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) newErrors.email = dict.contact.form.errors?.emailRequired ?? "Please enter your email."
    else if (!emailPattern.test(formData.email)) newErrors.email = dict.contact.form.errors?.emailInvalid ?? "Please enter a valid email address."
    if (!formData.subject.trim()) newErrors.subject = dict.contact.form.errors?.subject ?? "Please enter a subject."
    if (!formData.message.trim()) newErrors.message = dict.contact.form.errors?.message ?? "Please enter a message."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // focus first invalid
      if (newErrors.name) nameRef.current?.focus()
      else if (newErrors.email) emailRef.current?.focus()
      else if (newErrors.subject) subjectRef.current?.focus()
      else if (newErrors.message) messageRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: null })

    try {
      const res = await fetch(`/${routerBase()}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.status === 201) {
        setSubmitStatus({ type: 'success', message: dict.contact.form.success })
      } else {
        const body = await res.json().catch(() => ({}))
        setSubmitStatus({ type: 'error', message: body?.error || dict.contact.form.error })
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus({ type: "error", message: dict.contact.form.error })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2" data-invalid={Boolean(errors.name)}>
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
            ref={nameRef}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600"
          />
          {errors.name && (
            <div id="error-name" role="alert" className="text-sm text-red-700 dark:text-red-200">
              {errors.name}
            </div>
          )}
        </div>
        <div className="space-y-2" data-invalid={Boolean(errors.email)}>
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
            ref={emailRef}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600"
          />
          {errors.email && (
            <div id="error-email" role="alert" className="text-sm text-red-700 dark:text-red-200">
              {errors.email}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-2" data-invalid={Boolean(errors.subject)}>
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
          ref={subjectRef}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'error-subject' : undefined}
          className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600"
        />
        {errors.subject && (
          <div id="error-subject" role="alert" className="text-sm text-red-700 dark:text-red-200">
            {errors.subject}
          </div>
        )}
      </div>
      <div className="space-y-2" data-invalid={Boolean(errors.message)}>
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
          ref={messageRef}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className="bg-neutral-50 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-600 resize-none"
        />
        {errors.message && (
          <div id="error-message" role="alert" className="text-sm text-red-700 dark:text-red-200">
            {errors.message}
          </div>
        )}
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
