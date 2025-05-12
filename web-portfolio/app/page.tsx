import { redirect } from "next/navigation"

// For static export, we can't use headers() to detect the browser language
// Instead, we'll redirect to the English version by default
export default function RootPage() {
  // Redirect to the English version by default
  redirect("/en")
}
