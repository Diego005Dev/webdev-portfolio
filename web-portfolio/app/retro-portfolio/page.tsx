import { redirect } from "next/navigation"

// Simple redirect to the default retro portfolio page
export default function RetroPortfolioIndex() {
  // Redirect to the English retro view with 8-bit era by default
  redirect("/en/retro?era=8bit")
}
