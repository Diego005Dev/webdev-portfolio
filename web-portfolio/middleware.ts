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
  const pathname = request.nextUrl.pathname

  // Evitar el procesamiento del middleware para la página raíz
  // ya que ahora se maneja en el cliente en `app/page.tsx`
  if (pathname === "/") {
    return NextResponse.next()
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Special case for the retro portfolio paths - simplified for static export
  if (pathname === "/retro-portfolio" || pathname.startsWith("/retro-portfolio/")) {
    // For static export, we'll handle this with a simple redirect in the page component
    return NextResponse.next()
  }

  // If the pathname already has a locale, do nothing
  if (pathnameHasLocale) return NextResponse.next()

  // Para `output: 'export'`, la detección de idioma del `middleware` no redirigirá dinámicamente
  // al usuario en la primera visita. Esta lógica es más para la generación de las páginas estáticas.
  // La redirección real para la primera visita ahora la maneja `app/page.tsx` en el cliente.
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url)
  newUrl.search = request.nextUrl.search

  // En un entorno de `output: 'export'`, esta redirección del middleware
  // no funcionará como en un entorno de servidor dinámico para la primera visita.
  // Es importante que `app/page.tsx` maneje la redirección inicial.
  // Sin embargo, mantener esta lógica puede ser útil si el modo de salida cambia.
  // Para `output: 'export'`, Next.js usa esto para saber qué versiones de idioma generar.
  if (pathname === "/index.html") {
    // Caso específico si se accede a index.html directamente
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return NextResponse.rewrite(newUrl) // Usar rewrite para que Next.js genere la página correcta
}

export const config = {
  matcher: [
    // Exclude internal paths (_next), api routes, y archivos estáticos comunes
    // Asegúrate de que la página raíz "/" no esté aquí para que app/page.tsx funcione.
    "/((?!_next|api|favicon.ico|resume.pdf|images).*)",
    // Incluir explícitamente index.html si se accede directamente
    "/index.html",
  ],
}
