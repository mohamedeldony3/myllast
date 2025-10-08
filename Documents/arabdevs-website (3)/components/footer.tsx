import Link from "next/link"
import { Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useApp } from "@/lib/app-context"

export function Footer() {
  const { t } = useApp()

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary pixel-border">
                <span className="font-mono text-lg font-bold text-primary-foreground">A</span>
              </div>
              <span className="text-xl font-bold">Arabdevs</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.aboutP1.substring(0, 100)}...</p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t.about}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#about" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t.terms}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t.contact}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:mohamedeldony3@gmail.com" className="transition-colors hover:text-foreground">
                  mohamedeldony3@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Arabdevs. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
