"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Github, Mail, Linkedin, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useRef } from "react"

interface PortfolioContentProps {
  currentEra: "8bit" | "16bit" | "32bit"
  dictionary: any
}

export function PortfolioContent({ currentEra, dictionary }: PortfolioContentProps) {
  const dict = dictionary
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // State to track which project descriptions are expanded
  const [expandedProjects, setExpandedProjects] = useState<Record<number, boolean>>({})

  // Refs to track project card elements
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  // Toggle expanded state for a project
  const toggleProjectExpand = (index: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the parent onClick

    // Toggle the expanded state
    setExpandedProjects((prev) => {
      const newState = {
        ...prev,
        [index]: !prev[index],
      }

      // Schedule scrolling into view after state update and DOM rendering
      setTimeout(() => {
        if (newState[index] && projectRefs.current[index]) {
          projectRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          })
        }
      }, 100)

      return newState
    })
  }

  // Usar las traducciones del diccionario para los proyectos
  const projects = [
    {
      title: dict.projects.project4.title,
      summary: dict.projects.project4.summary,
      description: dict.projects.project4.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FVDibet.jpg-xyifaTJIV0Za1SW2pFVIXPUDh4ZHHQ.jpeg",
      link: "https://www.fvdibet.com/",
    },
    {
      title: dict.projects.project1.title,
      summary: dict.projects.project1.summary,
      description: dict.projects.project1.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clima.jpg-K7lkjh2iJIXtsxhD570T72EDUZAZAP.jpeg",
      link: "https://app-web-clima.vercel.app/",
    },
    {
      title: dict.projects.project2.title,
      summary: dict.projects.project2.summary,
      description: dict.projects.project2.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prompts.jpg-146tQXu0hCzKMcYtBQAvBO6i5dQzhS.jpeg",
      link: "https://projects-pied.vercel.app/",
    },
    {
      title: dict.projects.project3.title,
      summary: dict.projects.project3.summary,
      description: dict.projects.project3.description,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carrusel%20animado.jpg-qsgUXZTUaGNs5xcHE1iYeeI6U7PIcm.jpeg",
      link: "https://carrusel-animado.vercel.app/",
    },
  ]

  // Get overlay colors based on era and theme
  const getOverlayColor = () => {
    if (currentEra === "8bit") {
      return isDark ? "bg-[#0f380f]/70" : "bg-[#306230]/80"
    } else if (currentEra === "16bit") {
      return isDark ? "bg-[#2c3cd4]/70" : "bg-[#4a6cd4]/80"
    } else {
      return isDark
        ? "bg-gradient-to-t from-black/80 to-transparent"
        : "bg-gradient-to-t from-[#1a2a6c]/80 to-transparent"
    }
  }

  // Get text color for project titles and buttons
  const getTextColor = () => {
    return "text-white dark:text-white"
  }

  // Get button background color
  const getButtonBgColor = () => {
    if (currentEra === "8bit") {
      return isDark ? "bg-[#306230]/80 hover:bg-[#306230]" : "bg-[#306230]/90 hover:bg-[#306230]"
    } else if (currentEra === "16bit") {
      return isDark ? "bg-[#2c3cd4]/80 hover:bg-[#2c3cd4]" : "bg-[#2c3cd4]/90 hover:bg-[#2c3cd4]"
    } else {
      return isDark ? "bg-white/10 hover:bg-white/20" : "bg-[#1a2a6c]/30 hover:bg-[#1a2a6c]/50"
    }
  }

  return (
    <div
      className={cn(
        "transition-all duration-300",
        currentEra === "8bit" && "pixel-container",
        currentEra === "16bit" && "semi-pixel-container",
        currentEra === "32bit" && "modern-container",
      )}
    >
      {/* About Section */}
      <section
        className={cn(
          "mb-12",
          currentEra === "8bit" && "pixel-section",
          currentEra === "16bit" && "semi-pixel-section",
          currentEra === "32bit" && "rounded-lg p-6 shadow-lg",
        )}
      >
        <h2
          className={cn(
            "mb-4 font-bold",
            currentEra === "8bit" && "pixel-text text-xl",
            currentEra === "16bit" && "semi-pixel-text text-2xl",
            currentEra === "32bit" && "text-3xl",
          )}
        >
          {dict.sections.about.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div
            className={cn(
              "relative overflow-hidden",
              currentEra === "8bit" && "pixel-avatar w-32 h-32",
              currentEra === "16bit" && "semi-pixel-avatar w-40 h-40",
              currentEra === "32bit" && "rounded-full w-48 h-48",
            )}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opcion1%281%29.jpg-OxlzXTJYH8I63eiSIxrEUIRxKMvmrY.jpeg"
              alt={dict.sections.about.profileAlt}
              width={300}
              height={300}
              className={cn(
                "object-cover w-full h-full",
                currentEra === "8bit" && "pixel-image scale-110",
                currentEra === "16bit" && "semi-pixel-image scale-105",
              )}
              style={{
                objectPosition: "center 25%",
              }}
              priority
            />
          </div>

          <div className="flex-1">
            <p
              className={cn(
                "mb-4 text-justify",
                currentEra === "8bit" && "pixel-text",
                currentEra === "16bit" && "semi-pixel-text",
              )}
            >
              {dict.sections.about.paragraph1}
            </p>
            <p
              className={cn(
                "text-justify",
                currentEra === "8bit" && "pixel-text",
                currentEra === "16bit" && "semi-pixel-text",
              )}
            >
              {dict.sections.about.paragraph2}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-12">
        <h2
          className={cn(
            "mb-6 font-bold",
            currentEra === "8bit" && "pixel-text text-xl",
            currentEra === "16bit" && "semi-pixel-text text-2xl",
            currentEra === "32bit" && "text-3xl",
          )}
        >
          {dict.sections.projects.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                if (projectRefs.current) {
                  projectRefs.current[index] = el;
                }
              }}
              className={cn(
                "group relative overflow-hidden transition-all duration-300",
                currentEra === "8bit" && "border-4 border-[#8bac0f] dark:border-[#8bac0f]",
                currentEra === "16bit" && "border-3 border-[#2c3cd4] dark:border-[#ffffff] rounded-md",
                currentEra === "32bit" && "rounded-xl shadow-xl",
                "hover:shadow-2xl hover:-translate-y-1",
                // Adjust height based on expanded state for mobile
                expandedProjects[index] ? "min-h-[300px]" : "min-h-[200px]",
              )}
              style={{ cursor: project.link ? "pointer" : "default" }}
            >
              {/* Full-size image background */}
              <div
                className="w-full aspect-[16/9] relative"
                onClick={project.link ? () => window.open(project.link, "_blank") : undefined}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  className={cn(
                    "object-cover",
                    currentEra === "8bit" && "pixel-image",
                    currentEra === "16bit" && "semi-pixel-image",
                  )}
                  style={project.title === dict.projects.project1.title ? { objectPosition: "center 70%" } : {}}
                />

                {/* Overlay for text readability - Adjusted for light/dark mode */}
                <div className={cn("absolute inset-0", getOverlayColor())}></div>
              </div>

              {/* Content positioned over the image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <h3
                  className={cn(
                    "font-bold mb-2",
                    getTextColor(),
                    currentEra === "8bit" && "pixel-text text-lg",
                    currentEra === "16bit" && "semi-pixel-text text-xl",
                    currentEra === "32bit" && "text-2xl",
                  )}
                >
                  {project.title}
                </h3>

                {/* Description container with dynamic height */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    getTextColor(),
                    currentEra === "8bit" && "pixel-text text-sm",
                    currentEra === "16bit" && "semi-pixel-text",
                    // Improved mobile responsiveness for expanded state
                    expandedProjects[index] ? "max-h-[200px] overflow-y-auto pb-10" : "max-h-0 group-hover:max-h-24",
                  )}
                >
                  {/* Show summary when not expanded, full description when expanded */}
                  <div className="flex justify-between items-start">
                    <p className="flex-1">{expandedProjects[index] ? project.description : project.summary}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={cn(
                      "font-medium flex items-center gap-1",
                      getTextColor(),
                      currentEra === "8bit" && "pixel-text text-xs",
                      currentEra === "16bit" && "semi-pixel-text text-base",
                      currentEra === "32bit" && "text-sm",
                      "opacity-80 hover:opacity-100",
                    )}
                    onClick={project.link ? () => window.open(project.link, "_blank") : undefined}
                    style={{ textShadow: isDark ? "none" : "0px 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {currentEra === "8bit"
                      ? dict.sections.projects.openProject
                      : currentEra === "16bit"
                        ? dict.sections.projects.viewProject
                        : dict.sections.projects.visitProject}
                    <span className="inline-flex items-center justify-center">
                      <ExternalLink
                        className="w-3 h-3"
                        style={{ display: "inline-block", width: "12px", height: "12px" }}
                      />
                    </span>
                  </span>

                  {/* Expand/collapse button with special styling for each era */}
                  <button
                    onClick={(e) => toggleProjectExpand(index, e)}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      getTextColor(),
                      // Different styling based on era
                      currentEra === "8bit" && "pixel-text text-xs",
                      currentEra === "16bit" && "semi-pixel-text text-base",
                      currentEra === "32bit" &&
                        `text-xs font-medium ${getButtonBgColor()} px-2 py-1 rounded-md backdrop-blur-sm`,
                      "opacity-80 hover:opacity-100",
                    )}
                    style={{ textShadow: isDark ? "none" : "0px 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {expandedProjects[index] ? (
                      <>
                        {currentEra === "32bit" ? (
                          <span className="inline-flex items-center justify-center">
                            <ChevronUp
                              className="w-3 h-3"
                              style={{ display: "inline-block", width: "12px", height: "12px" }}
                            />
                          </span>
                        ) : (
                          <>
                            {dict.ui.showLess}{" "}
                            <span className="inline-flex items-center justify-center">
                              <ChevronUp
                                className="w-3 h-3"
                                style={{ display: "inline-block", width: "12px", height: "12px" }}
                              />
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {currentEra === "32bit" ? (
                          <span className="inline-flex items-center justify-center">
                            <ChevronDown
                              className="w-3 h-3"
                              style={{ display: "inline-block", width: "12px", height: "12px" }}
                            />
                          </span>
                        ) : (
                          <>
                            {dict.ui.readMore}{" "}
                            <span className="inline-flex items-center justify-center">
                              <ChevronDown
                                className="w-3 h-3"
                                style={{ display: "inline-block", width: "12px", height: "12px" }}
                              />
                            </span>
                          </>
                        )}
                      </>
                    )}
                    {/* Screen reader text for 32-bit era */}
                    {currentEra === "32bit" && (
                      <span className="sr-only">{expandedProjects[index] ? dict.ui.showLess : dict.ui.readMore}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section - Fixed for mobile in 8-bit era */}
      <section>
        <h2
          className={cn(
            "mb-6 font-bold",
            currentEra === "8bit" && "pixel-text text-xl",
            currentEra === "16bit" && "semi-pixel-text text-2xl",
            currentEra === "32bit" && "text-3xl",
          )}
        >
          {dict.sections.contact.title}
        </h2>

        <div
          className={cn(
            "flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6",
            currentEra === "8bit" && "pixel-contact p-4",
            currentEra === "16bit" && "semi-pixel-contact",
            currentEra === "32bit" && "rounded-lg p-6 shadow-lg",
          )}
        >
          <a
            href="mailto:metallica3999@gmail.com"
            className={cn(
              "flex items-center gap-2 break-all p-2 transition-all",
              // 8-bit era: blocky highlight with no transition
              currentEra === "8bit" && "hover:bg-[#306230] hover:border-2 hover:border-[#8bac0f]",
              // 16-bit era: slightly smoother highlight
              currentEra === "16bit" && "hover:bg-[#2c3cd4]/50 hover:border hover:border-[#ffffff] rounded-sm",
              // 32-bit era: modern smooth highlight
              currentEra === "32bit" && "hover:bg-white/10 hover:scale-105 rounded-md duration-300",
            )}
          >
            <span className="inline-flex items-center justify-center">
              <Mail
                className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                  currentEra === "8bit" && "pixel-icon",
                  currentEra === "16bit" && "semi-pixel-icon",
                  "group-hover:scale-110",
                )}
                aria-hidden="true"
                style={{ display: "inline-block", width: "20px", height: "20px" }}
              />
            </span>
            <span
              className={cn(
                "text-sm",
                currentEra === "8bit" && "pixel-text",
                currentEra === "16bit" && "semi-pixel-text",
              )}
            >
              metallica3999@gmail.com
            </span>
          </a>

          <a
            href="https://github.com/Diego005Dev"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 break-all p-2 transition-all",
              // 8-bit era: blocky highlight with no transition
              currentEra === "8bit" && "hover:bg-[#306230] hover:border-2 hover:border-[#8bac0f]",
              // 16-bit era: slightly smoother highlight
              currentEra === "16bit" && "hover:bg-[#2c3cd4]/50 hover:border hover:border-[#ffffff] rounded-sm",
              // 32-bit era: modern smooth highlight
              currentEra === "32bit" && "hover:bg-white/10 hover:scale-105 rounded-md duration-300",
            )}
          >
            <span className="inline-flex items-center justify-center">
              <Github
                className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                  currentEra === "8bit" && "pixel-icon",
                  currentEra === "16bit" && "semi-pixel-icon",
                  "group-hover:scale-110",
                )}
                aria-hidden="true"
                style={{ display: "inline-block", width: "20px", height: "20px" }}
              />
            </span>
            <span
              className={cn(
                "text-sm",
                currentEra === "8bit" && "pixel-text",
                currentEra === "16bit" && "semi-pixel-text",
              )}
            >
              github.com/Diego005Dev
            </span>
          </a>

          <a
            href="https://linkedin.com/in/diego-ramírez-67b227238"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 break-all p-2 transition-all",
              // 8-bit era: blocky highlight with no transition
              currentEra === "8bit" && "hover:bg-[#306230] hover:border-2 hover:border-[#8bac0f]",
              // 16-bit era: slightly smoother highlight
              currentEra === "16bit" && "hover:bg-[#2c3cd4]/50 hover:border hover:border-[#ffffff] rounded-sm",
              // 32-bit era: modern smooth highlight
              currentEra === "32bit" && "hover:bg-white/10 hover:scale-105 rounded-md duration-300",
            )}
          >
            <span className="inline-flex items-center justify-center">
              <Linkedin
                className={cn(
                  "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                  currentEra === "8bit" && "pixel-icon",
                  currentEra === "16bit" && "semi-pixel-icon",
                  "group-hover:scale-110",
                )}
                aria-hidden="true"
                style={{ display: "inline-block", width: "20px", height: "20px" }}
              />
            </span>
            <span
              className={cn(
                "text-sm",
                currentEra === "8bit" && "pixel-text",
                currentEra === "16bit" && "semi-pixel-text",
              )}
            >
              linkedin.com/in/diego-ramírez-67b227238
            </span>
          </a>
        </div>
      </section>
    </div>
  )
}
