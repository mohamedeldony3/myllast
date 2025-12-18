"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/app-context"
import { Moon, Sun, Languages } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const { language, setLanguage, theme, setTheme, t } = useApp()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-mono text-lg font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-xl font-bold">Arabdevs</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/#services" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.services}
            </Link>
            <Link href="/#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.about}
            </Link>
            <Link href="/#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.contact}
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.privacy}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {t.terms}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("ar")} className={language === "ar" ? "bg-accent" : ""}>
                  العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")} className={language === "en" ? "bg-accent" : ""}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ru")} className={language === "ru" ? "bg-accent" : ""}>
                  Русский
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-primary/10"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button asChild>
              <Link href="/#contact">{t.getStarted}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
