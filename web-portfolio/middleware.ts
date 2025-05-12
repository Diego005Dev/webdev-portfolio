import { type NextRequest, NextResponse } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// Supported languages
const locales = ["en", "es"]
const defaultLocale = "en"

// Function to get the preferred language from the browser
function getLocale(request: NextRequest) {
  // Get the Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || ""

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

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Special case for the retro portfolio paths
  if (pathname === "/retro-portfolio" || pathname.startsWith("/retro-portfolio/")) {
    // If it's just /retro-portfolio, redirect to /retro-portfolio/redirect with default params
    if (pathname === "/retro-portfolio") {
      // Get the locale from the browser
      const locale = getLocale(request)
      return NextResponse.redirect(new URL(`/retro-portfolio/redirect?lang=${locale}&era=8bit`, request.url))
    }
    return
  }

  // If the pathname already has a locale, do nothing
  if (pathnameHasLocale) return

  // Get the locale from the browser
  const locale = getLocale(request)

  // Create a new URL with the locale
  const newUrl = new URL(`/${locale}${pathname}`, request.url)

  // Preserve the search params
  newUrl.search = request.nextUrl.search

  // Redirect to the new URL
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: [
    // Exclude internal paths (_next) and api routes
    "/((?!_next|api|favicon.ico|resume.pdf).*)",
  ],
}
