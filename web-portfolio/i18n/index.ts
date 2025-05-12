export type Dictionary = {
  navigation: {
    home: string
    about: string
    projects: string
    services: string
    contact: string
    switchToEnglish: string
    switchToSpanish: string
  }
  home: {
    hero: {
      greeting: string
      title: string
      description: string
      viewWork: string
      contactMe: string
    }
    about: {
      title: string
      subtitle: string
      description: string
      learnMore: string
      skills: string[]
    }
    projects: {
      title: string
      viewAll: string
    }
    contact: {
      title: string
      description: string
      cta: string
    }
    retro: {
      title: string
      description: string
      viewRetro: string
    }
  }
  about: {
    title: string
    professionalSummary: {
      title: string
      description: string
    }
    education: {
      title: string
    }
    professionalGoal: {
      title: string
      description: string
    }
    technicalSkills: {
      title: string
      categories: {
        languages: string
        frameworks: string
        tools: string
        practices: string
      }
    }
    downloadResume: string
  }
  projects: {
    title: string
    description: string
    liveDemo: string
    viewCode: string
  }
  services: {
    title: string
    description: string
    cta: {
      title: string
      description: string
      button: string
    }
    comingSoon: string
  }
  contact: {
    title: string
    description: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      sending: string
      send: string
      success: string
      error: string
    }
    info: {
      title: string
      email: string
      phone: string
      linkedin: string
      github: string
      location: string
    }
  }
  footer: {
    description: string
    rights: string
  }
}

// Import dictionaries directly
import enDict from "./en.json"
import esDict from "./es.json"

const dictionaries: Record<string, Dictionary> = {
  en: enDict,
  es: esDict,
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Fallback to 'en' if the locale is not supported
  return dictionaries[locale in dictionaries ? locale : "en"]
}
