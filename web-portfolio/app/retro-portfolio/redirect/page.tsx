import { redirect } from "next/navigation"

// For static export, we can't use searchParams
// Instead, we'll redirect to a default path
export default function RetroPortfolioRedirect() {
  // Redirect to the English retro view with 8-bit era by default
  redirect("/en/retro?era=8bit")
}
