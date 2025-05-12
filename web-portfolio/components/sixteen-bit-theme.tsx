"use client"

import { useTheme } from "next-themes"

export function SixteenBitTheme() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <style jsx global>{`
      body {
        background-color: ${isDark ? "#4a6cd4" : "#c4d8ff"};
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
        font-family: var(--font-vt323), monospace;
        image-rendering: crisp_edges;
        font-size: 22px;
      }
      
      .semi-pixel-text {
        font-family: var(--font-vt323), monospace;
        letter-spacing: 0.5px;
        line-height: 1.4;
        font-size: 1.3rem !important;
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
      }
      
      /* Make headings larger */
      h2.semi-pixel-text {
        font-size: 2rem !important;
        color: ${isDark ? "#ffffff" : "#2c3cd4"} !important;
      }
      
      h3.semi-pixel-text {
        font-size: 1.7rem !important;
        color: ${isDark ? "#ffffff" : "#2c3cd4"} !important;
      }
      
      /* Increase text size in specific components */
      .semi-pixel-section p {
        font-size: 1.3rem !important;
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
      }
      
      /* Ensure buttons have readable text */
      .pixel-button-16bit {
        background-color: ${isDark ? "#d42c64" : "#ff6b9e"};
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
        border: 3px solid ${isDark ? "#ffffff" : "#2c3cd4"};
        box-shadow: 3px 3px 0 ${isDark ? "#2c3cd4" : "#a0b8ff"};
        padding: 8px 16px;
        font-family: var(--font-vt323), monospace;
        text-transform: uppercase;
        image-rendering: crisp-edges;
        transition: all 0.1s;
        font-size: 1.2rem !important;
      }
      
      .pixel-button-16bit:hover {
        transform: translate(1px, 1px);
        box-shadow: 2px 2px 0 ${isDark ? "#2c3cd4" : "#a0b8ff"};
      }
      
      .semi-pixel-container {
        border: 3px solid ${isDark ? "#ffffff" : "#2c3cd4"};
        padding: 16px;
        background-color: ${isDark ? "#2c3cd4" : "#a0b8ff"};
        border-radius: 4px;
      }
      
      .semi-pixel-section {
        border: 3px solid ${isDark ? "#ffffff" : "#2c3cd4"};
        padding: 16px;
        margin-bottom: 24px;
        border-radius: 4px;
        background-color: ${isDark ? "#2c3cd4" : "#a0b8ff"};
      }
      
      .semi-pixel-card {
        border: 3px solid ${isDark ? "#ffffff" : "#2c3cd4"};
        background-color: ${isDark ? "#2c3cd4" : "#a0b8ff"};
        border-radius: 4px;
      }
      
      .semi-pixel-image {
        image-rendering: crisp-edges;
        filter: ${isDark ? "brightness(1) contrast(1.1)" : "brightness(1) contrast(1)"};
        image-rendering: crisp-edges !important;
      }
      
      .semi-pixel-icon {
        image-rendering: crisp-edges;
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
      }
      
      .semi-pixel-avatar {
        border: 3px solid ${isDark ? "#ffffff" : "#2c3cd4"};
        border-radius: 4px;
        overflow: hidden;
      }
      
      .semi-pixel-contact {
        border: 3px solid ${isDark ? "#ffffff" : "#2c3cd4"};
        padding: 16px;
        border-radius: 4px;
        background-color: ${isDark ? "#2c3cd4" : "#a0b8ff"};
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
      
      /* Increase font size for contact links */
      .semi-pixel-contact a span {
        font-size: 1.2rem !important;
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
      }
      
      /* Increase font size for project descriptions */
      .semi-pixel-text.text-white\/90 {
        font-size: 1.2rem !important;
        color: ${isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(44, 60, 212, 0.9)"};
      }
      
      /* Light theme specific adjustments */
      h1, h2, h3, h4, h5, h6 {
        color: ${isDark ? "#ffffff" : "#2c3cd4"} !important;
      }
      
      a {
        color: ${isDark ? "#ffffff" : "#2c3cd4"};
      }
      
      a:hover {
        color: ${isDark ? "#d42c64" : "#ff6b9e"};
      }
      
      /* Project card text visibility fix */
      .text-white {
        color: white !important;
        text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
      }
    `}</style>
  )
}
