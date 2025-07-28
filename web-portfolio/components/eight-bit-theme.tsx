"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"
import { Press_Start_2P } from "next/font/google"

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

export function EightBitTheme() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  // Ensure theme is properly initialized
  useEffect(() => {
    // Force theme refresh based on system preference or stored preference
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const storedTheme = localStorage.getItem("theme")

    // If there's a stored theme preference, use that
    if (storedTheme === "dark" || (!storedTheme && darkModeMediaQuery.matches)) {
      setTheme("dark")
    } else if (storedTheme === "light") {
      setTheme("light")
    }
  }, [setTheme])

  return (
    <style jsx global>{`
      body {
        ${pressStart2P.variable}
        background-color: ${isDark ? "#0f380f" : "#c8e8c8"};
        color: ${isDark ? "#8bac0f" : "#306230"};
        font-family: var(--font-press-start-2p), monospace;
        image-rendering: pixelated;
      }
      
      .pixel-text {
        font-family: var(--font-press-start-2p), monospace;
        letter-spacing: 1px;
        line-height: 1.6;
        color: ${isDark ? "#8bac0f" : "#306230"};
      }
      
      .pixel-button-8bit {
        background-color: ${isDark ? "#306230" : "#8bac0f"};
        color: ${isDark ? "#8bac0f" : "#306230"};
        border: 4px solid ${isDark ? "#8bac0f" : "#306230"};
        box-shadow: 4px 4px 0 ${isDark ? "#0f380f" : "#c8e8c8"};
        padding: 8px 16px;
        font-family: var(--font-press-start-2p), monospace;
        text-transform: uppercase;
        image-rendering: pixelated;
        transition: all 0.1s;
      }
      
      .pixel-button-8bit:hover {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0 ${isDark ? "#0f380f" : "#c8e8c8"};
      }
      
      .pixel-container {
        border: 4px solid ${isDark ? "#8bac0f" : "#306230"};
        padding: 16px;
        background-color: ${isDark ? "#306230" : "#9bbc0f"};
      }
      
      .pixel-section {
        border: 4px solid ${isDark ? "#8bac0f" : "#306230"};
        padding: 16px;
        margin-bottom: 24px;
        background-color: ${isDark ? "#306230" : "#9bbc0f"};
      }
      
      .pixel-card {
        border: 4px solid ${isDark ? "#8bac0f" : "#306230"};
        background-color: ${isDark ? "#306230" : "#9bbc0f"};
      }
      
      .pixel-image {
        image-rendering: pixelated;
        filter: ${isDark ? "brightness(0.9) contrast(1.2)" : "brightness(1) contrast(1)"};
        image-rendering: pixelated !important;
      }
      
      .pixel-icon {
        image-rendering: pixelated;
        filter: ${isDark ? "brightness(0.9) contrast(1.2)" : "brightness(1) contrast(1)"};
        color: ${isDark ? "#8bac0f" : "#306230"};
      }
      
      .pixel-avatar {
        border: 4px solid ${isDark ? "#8bac0f" : "#306230"};
        overflow: hidden;
      }
      
      .pixel-contact {
        border: 4px solid ${isDark ? "#8bac0f" : "#306230"};
        padding: 16px;
        background-color: ${isDark ? "#306230" : "#9bbc0f"};
      }
      
      /* Fix for SVG icons */
      svg {
        display: inline-block;
        vertical-align: middle;
        color: currentColor;
      }
      
      /* Ensure Lucide icons display properly */
      .lucide {
        color: currentColor;
        width: 1em;
        height: 1em;
        stroke-width: 2;
        stroke: currentColor;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        display: inline-block;
      }
      
      /* Light theme specific adjustments */
      h1, h2, h3, h4, h5, h6 {
        color: ${isDark ? "#8bac0f" : "#306230"} !important;
      }
      
      a {
        color: ${isDark ? "#8bac0f" : "#306230"};
      }
      
      a:hover {
        color: ${isDark ? "#9bbc0f" : "#0f380f"};
      }
      
      /* Project card text visibility fix */
      .text-white {
        color: white !important;
        text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
      }
    `}</style>
  )
}
