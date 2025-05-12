"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import LanguageSwitcher from "./language-switcher"

interface ThemeSwitcherProps {
  currentEra: "8bit" | "16bit" | "32bit"
  onForward: () => void
  onBackward: () => void
  dictionary: any
  lang: string
}

export function ThemeSwitcher({ currentEra, onForward, onBackward, dictionary, lang }: ThemeSwitcherProps) {
  const dict = dictionary

  // Custom button text based on current era
  const getBackwardButtonText = () => {
    if (currentEra === "32bit") {
      return dict.navigation.sixteenBitVersion
    } else if (currentEra === "16bit") {
      return dict.navigation.eightBitVersion
    }
    return dict.navigation.backward
  }

  // Custom button text for forward button based on current era
  const getForwardButtonText = () => {
    if (currentEra === "8bit") {
      return dict.navigation.sixteenBitVersion
    } else if (currentEra === "16bit") {
      return dict.navigation.thirtyTwoBitVersion
    }
    return dict.navigation.forward
  }

  // Safely get era text with fallback
  const getEraText = (era: "8bit" | "16bit" | "32bit") => {
    if (dict.eras && dict.eras[era]) {
      return dict.eras[era]
    }

    // Fallback values if eras is undefined
    const fallbackEras = {
      "8bit": "8-bit Era",
      "16bit": "16-bit Era",
      "32bit": "32-bit Era",
    }

    return fallbackEras[era]
  }

  return (
    <div className="mb-8">
      {/* Language Switcher */}
      <div className="flex justify-center mb-2">
        <LanguageSwitcher currentLang={lang} dictionary={dictionary} />
      </div>

      {/* Era Navigation */}
      <div className="flex justify-between items-center">
        {/* Only show backward button if not in 8-bit era */}
        {currentEra !== "8bit" && (
          <Button
            onClick={onBackward}
            className={cn(
              "flex items-center gap-2 transition-all",
              currentEra === "16bit" && "pixel-button-16bit text-lg", // Added text-lg
              currentEra === "32bit" && "rounded-md shadow-md",
            )}
          >
            <span className="inline-flex items-center justify-center">
              <ArrowLeft
                className={cn("h-4 w-4", currentEra === "16bit" && "semi-pixel-icon")}
                aria-hidden="true"
                style={{ display: "inline-block", width: "16px", height: "16px" }}
              />
            </span>
            <span>{getBackwardButtonText()}</span>
          </Button>
        )}

        {/* If in 8-bit era, add an empty div to maintain layout */}
        {currentEra === "8bit" && <div></div>}

        <div
          className={cn(
            "font-bold text-center",
            currentEra === "8bit" && "pixel-text text-lg",
            currentEra === "16bit" && "semi-pixel-text text-2xl", // Increased from text-xl
            currentEra === "32bit" && "text-2xl",
          )}
        >
          {getEraText(currentEra)}
        </div>

        {/* Only show forward button if not in 32-bit era */}
        {currentEra !== "32bit" && (
          <Button
            onClick={onForward}
            className={cn(
              "flex items-center gap-2 transition-all",
              currentEra === "8bit" && "pixel-button-8bit",
              currentEra === "16bit" && "pixel-button-16bit text-lg", // Added text-lg
            )}
          >
            <span>{getForwardButtonText()}</span>
            <span className="inline-flex items-center justify-center">
              <ArrowRight
                className={cn(
                  "h-4 w-4",
                  currentEra === "8bit" && "pixel-icon",
                  currentEra === "16bit" && "semi-pixel-icon",
                )}
                aria-hidden="true"
                style={{ display: "inline-block", width: "16px", height: "16px" }}
              />
            </span>
          </Button>
        )}

        {/* If in 32-bit era, add an empty div to maintain layout */}
        {currentEra === "32bit" && <div></div>}
      </div>
    </div>
  )
}
