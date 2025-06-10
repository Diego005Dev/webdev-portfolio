"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThirtyTwoBitTheme() {
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
      background: ${
        isDark
          ? "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)"
          : "linear-gradient(135deg, #c4d8ff, #ffcaca, #fff5d6)"
      };
      color: ${isDark ? "#ffffff" : "#1a2a6c"};
      font-family: var(--font-orbitron), sans-serif;
    }
    
    .modern-container {
      background-color: ${isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"};
      backdrop-filter: blur(10px);
      padding: 24px;
      border-radius: 12px;
      box-shadow: ${isDark ? "0 10px 30px rgba(0, 0, 0, 0.3)" : "0 10px 30px rgba(0, 0, 0, 0.1)"};
    }
    
    button {
      background: ${isDark ? "linear-gradient(135deg, #6a11cb, #2575fc)" : "linear-gradient(135deg, #a78bfa, #93c5fd)"};
      color: ${isDark ? "white" : "#1a2a6c"};
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      font-family: var(--font-orbitron), sans-serif;
      text-transform: uppercase;
      transition: all 0.3s;
      box-shadow: ${isDark ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "0 4px 15px rgba(0, 0, 0, 0.1)"};
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: ${isDark ? "0 6px 20px rgba(0, 0, 0, 0.3)" : "0 6px 20px rgba(0, 0, 0, 0.15)"};
    }
    
    /* Fix for SVG icons */
    svg {
      display: inline-block !important;
      vertical-align: middle !important;
      width: 1em !important;
      height: 1em !important;
      overflow: visible !important;
      color: currentColor !important;
    }
    
    /* Fix for Lucide icons specifically */
    .lucide {
      color: currentColor !important;
      width: 1em !important;
      height: 1em !important;
      stroke-width: 2 !important;
      stroke: currentColor !important;
      fill: none !important;
      stroke-linecap: round !important;
      stroke-linejoin: round !important;
      display: inline-block !important;
      overflow: visible !important;
    }
    
    /* Override any conflicting styles */
    button svg, a svg, span svg {
      color: inherit !important;
      width: 1em !important;
      height: 1em !important;
      display: inline-block !important;
      vertical-align: middle !important;
      overflow: visible !important;
    }
    
    /* Fix for specific icon containers */
    .w-3, .w-4, .w-5, .h-3, .h-4, .h-5 {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    /* Light theme specific adjustments */
    h1, h2, h3, h4, h5, h6 {
      color: ${isDark ? "#ffffff" : "#1a2a6c"} !important;
    }
    
    p {
      color: ${isDark ? "#ffffff" : "#1a2a6c"};
    }
    
    a {
      color: ${isDark ? "#ffffff" : "#1a2a6c"};
    }
    
    a:hover {
      color: ${isDark ? "#fdbb2d" : "#b21f1f"};
    }
    
    /* Project card text visibility fix */
    .text-white {
      color: white !important;
      text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
    }
    
    .text-white\/90, .text-white\/80, .text-white\/70 {
      color: white !important;
      text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
    }
    `}</style>
  )
}
