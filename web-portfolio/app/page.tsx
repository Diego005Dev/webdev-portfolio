import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Supported languages
const locales = ["en", "es"]
const defaultLocale = "en"

// Function to get the preferred language from the browser
function getLocale() {
  const headersList = headers()
  const acceptLanguage = headersList.get("accept-language") || ""

  // Create a negotiator instance with the headers
  const negotiatorHeaders = { "accept-language": acceptLanguage }

  // Get the list of languages from the negotiator
  let languages = []
  try {
    languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  } catch (error) {
    console.error("Error parsing Accept-Language header:", error)
    return defaultLocale
  }

  // If no languages are available, return the default locale
  if (!languages || languages.length === 0) {
    return defaultLocale
  }

  // Use intl-localematcher to find the best match
  try {
    return match(languages, locales, defaultLocale)
  } catch (error) {
    console.error("Error matching locale:", error)
    return defaultLocale
  }
}

export default function RootPage() {
  // Get the locale from the browser
  const locale = getLocale()

  // Redirect to the localized home page
  redirect(`/${locale}`)
}
