"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Language } from "./translations"

type Theme = "light" | "dark"

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  t: typeof translations.en
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar")
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    const savedTheme = localStorage.getItem("theme") as Theme

    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en" || savedLanguage === "ru")) {
      setLanguageState(savedLanguage)
    }

    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setThemeState(savedTheme)
    }

    setMounted(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  // Save language preference
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem("language", language)

    // Set document direction for RTL languages
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const t = translations[language]

  return <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
