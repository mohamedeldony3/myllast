import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { AppProvider } from "@/lib/app-context"

export const metadata: Metadata = {
  title: "Arabdevs - Professional Web Development Solutions",
  description:
    "Arabdevs is a leading web development company specializing in modern web applications, mobile solutions, and digital transformation services.",
  keywords: "web development, mobile apps, software development, digital solutions, Arabdevs",
  authors: [{ name: "Arabdevs" }],
  creator: "Arabdevs",
  publisher: "Arabdevs",
  metadataBase: new URL("https://arabdevs.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://arabdevs.com",
    title: "Arabdevs - Professional Web Development Solutions",
    description: "Leading web development company specializing in modern web applications and digital solutions.",
    siteName: "Arabdevs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arabdevs - Professional Web Development Solutions",
    description: "Leading web development company specializing in modern web applications and digital solutions.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AppProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
