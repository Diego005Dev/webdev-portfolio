"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function RootPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const preferredLang = localStorage.getItem("preferredLanguage")
    const browserLang = navigator.language.split("-")[0]

    let targetLang = "en" // Default a inglés

    if (preferredLang === "en" || preferredLang === "es") {
      targetLang = preferredLang
    } else if (browserLang === "es") {
      targetLang = "es"
    }

    // Guardar la preferencia (incluso si es la predeterminada 'en' por primera vez)
    localStorage.setItem("preferredLanguage", targetLang)

    // Redirigir a la página de inicio del idioma correspondiente
    router.replace(`/${targetLang}`)

    // No es necesario setLoading(false) aquí porque la redirección cambiará la página.
    // Sin embargo, si hubiera un retraso visible, se podría manejar.
  }, [router])

  // Muestra un indicador de carga mientras se realiza la detección y redirección.
  // Esto es útil si la redirección no es instantánea.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-petrol mb-4"></div>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">Determining language...</p>
        </div>
      </div>
    )
  }

  return null // No se renderizará nada una vez que la redirección ocurra.
}
