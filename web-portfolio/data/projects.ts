import type { Dictionary } from "@/i18n"

// Función para obtener los proyectos según el idioma
export const getProjects = (dict: Dictionary) => [
  {
    title: dict.projects.project4.title,
    description: dict.projects.project4.description,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FVDibet.jpg-xyifaTJIV0Za1SW2pFVIXPUDh4ZHHQ.jpeg",
    technologies: ["Next.js 13", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://www.fvdibet.com/",
    githubUrl: "https://github.com/Diego005/FVDibet",
  },
  {
    title: dict.projects.project3.title,
    description: dict.projects.project3.description,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carrusel%20animado.jpg-qsgUXZTUaGNs5xcHE1iYeeI6U7PIcm.jpeg",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://carrusel-animado.vercel.app/",
    githubUrl: "https://github.com/Diego005Dev/animated-carousel",
  },
  {
    title: dict.projects.project1.title,
    description: dict.projects.project1.description,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clima.jpg-K7lkjh2iJIXtsxhD570T72EDUZAZAP.jpeg",
    technologies: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
    liveUrl: "https://app-web-clima.vercel.app/",
    githubUrl: "https://github.com/Diego005Dev/weather-app",
  },
  {
    title: dict.projects.project2.title,
    description: dict.projects.project2.description,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Prompts.jpg-146tQXu0hCzKMcYtBQAvBO6i5dQzhS.jpeg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://projects-pied.vercel.app/",
    githubUrl: "https://github.com/Diego005Dev/prompt-generator",
  },
]
