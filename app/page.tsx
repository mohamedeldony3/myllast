"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Server, Bot, Cloud, Sparkles, ShoppingCart, MessageCircle, Check, Search, Filter } from "lucide-react"
import Link from "next/link"
import { getProducts, getSiteSettings, getCategories, type Product } from "@/lib/products-store"
import { useApp } from "@/lib/app-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [whatsappNumber, setWhatsappNumber] = useState("201061419002")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("default")
  const { t } = useApp()

  useEffect(() => {
    const loadedProducts = getProducts()
    const settings = getSiteSettings()
    setProducts(loadedProducts)
    setFilteredProducts(loadedProducts)
    setWhatsappNumber(settings.whatsappNumber)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let result = [...products]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "priceAsc":
        result.sort(
          (a, b) =>
            Number.parseFloat(a.price.replace(/[^0-9.]/g, "")) - Number.parseFloat(b.price.replace(/[^0-9.]/g, "")),
        )
        break
      case "priceDesc":
        result.sort(
          (a, b) =>
            Number.parseFloat(b.price.replace(/[^0-9.]/g, "")) - Number.parseFloat(a.price.replace(/[^0-9.]/g, "")),
        )
        break
      case "nameAsc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "nameDesc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategory, sortBy, products])

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  const categories = getCategories()
  const vpsProducts = filteredProducts.filter((p) => p.category === "vps")
  const otherProducts = filteredProducts.filter((p) => p.category !== "vps")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white text-xl">{t.loading}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* ... existing hero section code ... */}
      <section className="relative pt-32 pb-20 overflow-hidden scanlines">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-accent/10 to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0020_1px,transparent_1px),linear-gradient(to_bottom,#00ffff20_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent animate-bounce" style={{ animationDelay: "0.5s" }} />
        <div
          className="absolute bottom-20 left-1/4 w-5 h-5 bg-chart-3 animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-none bg-primary/20 px-4 py-2 text-sm font-bold text-primary mb-6 pixel-border border-2 border-primary">
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: "3s" }} />
              {t.premiumServices}
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance mb-6 neon-glow">
              {t.heroTitle} <span className="text-primary">{t.heroTitleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-pretty max-w-2xl mx-auto">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 btn-pulse"
              >
                <Link href="#services">
                  <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  {t.browseServices}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchProducts}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-none border-2 pixel-border"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="rounded-none border-2 pixel-border">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder={t.filterByCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allCategories}</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="rounded-none border-2 pixel-border">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t.sortBy}</SelectItem>
                  <SelectItem value="priceAsc">{t.priceAsc}</SelectItem>
                  <SelectItem value="priceDesc">{t.priceDesc}</SelectItem>
                  <SelectItem value="nameAsc">{t.nameAsc}</SelectItem>
                  <SelectItem value="nameDesc">{t.nameDesc}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* ... existing VPS section with availability badge ... */}
      <section id="vps-plans" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-primary">{t.vpsPlans}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.vpsDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {vpsProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col rounded-none border-2 pixel-corners relative overflow-hidden ${
                  index === 1
                    ? "border-accent hover:shadow-accent/30 hover:border-accent"
                    : "hover:shadow-primary/30 hover:border-primary"
                } ${!product.available ? "opacity-60" : ""}`}
              >
                {!product.available && (
                  <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-none text-xs font-bold border-2 border-destructive pixel-border z-20">
                    {t.outOfStock}
                  </div>
                )}
                {index === 1 && product.available && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-none text-xs font-bold border-2 border-accent pixel-border z-20">
                    {t.popular}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-none bg-gradient-to-br border-2 group-hover:scale-110 transition-transform duration-300 ${
                      index === 1
                        ? "from-accent/30 to-accent/10 border-accent"
                        : "from-primary/30 to-primary/10 border-primary"
                    }`}
                  >
                    <Server
                      className={`h-7 w-7 group-hover:animate-pulse ${index === 1 ? "text-accent" : "text-primary"}`}
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col relative z-10">
                  <div className="mb-6">
                    <div className={`text-3xl font-bold mb-2 ${index === 1 ? "text-accent" : "text-primary"}`}>
                      {product.price}
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    asChild
                    disabled={!product.available}
                    className={`w-full mt-auto group/btn hover:scale-105 transition-all duration-300 hover:shadow-lg rounded-none font-bold ${
                      index === 1
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-accent/50"
                        : "hover:shadow-primary/50"
                    }`}
                  >
                    <a
                      href={product.available ? getWhatsAppLink(`${t.interestedIn} ${product.name}`) : "#"}
                      target={product.available ? "_blank" : undefined}
                      rel={product.available ? "noopener noreferrer" : undefined}
                    >
                      <MessageCircle className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                      {product.available ? t.orderNow : t.outOfStock}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ... existing services section with availability ... */}
      <section id="services" className="py-20 bg-card/50 scanlines">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-accent">{t.otherServices}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.servicesDescription}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {otherProducts.map((product) => (
              <Card
                key={product.id}
                className={`group hover:shadow-2xl hover:shadow-accent/30 transition-all duration-500 hover:border-accent hover:-translate-y-2 flex flex-col rounded-none border-2 pixel-corners relative overflow-hidden ${!product.available ? "opacity-60" : ""}`}
              >
                {!product.available && (
                  <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-none text-xs font-bold border-2 border-destructive pixel-border z-20">
                    {t.outOfStock}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-none bg-gradient-to-br from-accent/30 to-accent/10 border-2 border-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {product.category === "bot" ? (
                      <Bot className="h-7 w-7 text-accent group-hover:animate-bounce" />
                    ) : (
                      <Cloud className="h-7 w-7 text-accent group-hover:animate-pulse" />
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                  <CardDescription className="leading-relaxed">{product.description}</CardDescription>
                  {product.price && <div className="text-2xl font-bold text-accent mt-2">{product.price}</div>}
                </CardHeader>
                <CardContent className="mt-auto relative z-10">
                  <Button
                    asChild
                    disabled={!product.available}
                    className="w-full group/btn hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 rounded-none font-bold bg-transparent"
                    variant="outline"
                  >
                    <a
                      href={product.available ? getWhatsAppLink(`${t.interestedIn} ${product.name}`) : "#"}
                      target={product.available ? "_blank" : undefined}
                      rel={product.available ? "noopener noreferrer" : undefined}
                    >
                      <MessageCircle className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                      {product.available ? t.orderNow : t.outOfStock}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ... existing about and contact sections ... */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-primary">{t.aboutTitle}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t.aboutP1}</p>
              <p>{t.aboutP2}</p>
              <p>{t.aboutP3}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-card/50 scanlines">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-accent">{t.contactTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{t.contactDescription}</p>
            <Card className="border-primary/50 rounded-none border-2 pixel-corners relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <CardContent className="pt-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      size="lg"
                      asChild
                      className="w-full sm:w-auto group hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 rounded-none font-bold btn-pulse"
                    >
                      <a href={getWhatsAppLink(t.helloInterested)} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        {t.whatsappUs}
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="w-full sm:w-auto hover:scale-105 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent rounded-none font-bold bg-transparent"
                    >
                      <a href="mailto:mohamedeldony3@gmail.com">{t.emailUs}</a>
                    </Button>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span>{t.email}:</span>
                      <a
                        href="mailto:mohamedeldony3@gmail.com"
                        className="text-primary hover:underline font-medium hover:text-accent transition-colors"
                      >
                        mohamedeldony3@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
