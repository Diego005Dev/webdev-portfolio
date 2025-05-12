"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 text-neutral-700 dark:text-neutral-300 hover:text-petrol dark:hover:text-petrol-light"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <span className="inline-flex items-center justify-center">
          <Sun size={18} style={{ display: "inline-block", width: "18px", height: "18px" }} />
        </span>
      ) : (
        <span className="inline-flex items-center justify-center">
          <Moon size={18} style={{ display: "inline-block", width: "18px", height: "18px" }} />
        </span>
      )}
    </Button>
  )
}
