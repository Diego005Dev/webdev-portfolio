import { redirect } from "next/navigation"

export default function RetroPortfolioRedirect({
  searchParams,
}: {
  searchParams: { lang?: string; era?: string }
}) {
  // Get the language from search params or default to "en"
  const lang = searchParams.lang || "en"

  // Get the era from search params or default to "8bit"
  const era = searchParams.era || "8bit"

  // Redirect to the retro view in the main portfolio with the specified era
  redirect(`/${lang}/retro?era=${era}`)
}
