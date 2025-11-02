"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Dictionary } from "@/i18n"

interface ThemeToggleProps {
  dictionary?: Dictionary
}

export function ThemeToggle({ dictionary }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300)
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className={cn(
              "relative w-9 h-9 p-0 overflow-hidden",
              "text-neutral-700 dark:text-neutral-300",
              "hover:text-petrol dark:hover:text-petrol-light",
              "hover:bg-neutral-100 dark:hover:bg-neutral-800",
              "focus:outline-none focus:ring-2 focus:ring-petrol focus:ring-offset-2 dark:focus:ring-offset-neutral-900",
              "transition-all duration-200 rounded-md",
              isAnimating && "scale-110"
            )}
            aria-label={dictionary
              ? (isDark ? dictionary.ui.themeToggle.switchToLight : dictionary.ui.themeToggle.switchToDark)
              : `Switch to ${isDark ? 'light' : 'dark'} theme`
            }
            aria-pressed={isDark}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Sun Icon */}
              <Sun
                size={16}
                className={cn(
                  "absolute transition-all duration-300 ease-in-out",
                  "text-yellow-500",
                  isDark
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                )}
                aria-hidden="true"
              />

              {/* Moon Icon */}
              <Moon
                size={16}
                className={cn(
                  "absolute transition-all duration-300 ease-in-out",
                  "text-blue-400",
                  isDark
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                )}
                aria-hidden="true"
              />

              {/* Background indicator */}
              <div
                className={cn(
                  "absolute inset-0 rounded-md transition-all duration-300",
                  isDark
                    ? "bg-neutral-800/50"
                    : "bg-yellow-50/50 dark:bg-transparent"
                )}
                aria-hidden="true"
              />
            </div>

            {/* Screen reader text */}
            <span className="sr-only">
              {dictionary
                ? dictionary.ui.themeToggle.currentTheme.replace('{theme}', isDark ? 'oscuro' : 'claro') +
                  '. ' + (isDark ? dictionary.ui.themeToggle.switchToLight : dictionary.ui.themeToggle.switchToDark)
                : `Currently using ${isDark ? 'dark' : 'light'} theme. Click to switch to ${isDark ? 'light' : 'dark'} theme.`
              }
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{dictionary
            ? (isDark ? dictionary.ui.themeToggle.switchToLight : dictionary.ui.themeToggle.switchToDark)
            : `Switch to ${isDark ? 'light' : 'dark'} theme`
          }</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
