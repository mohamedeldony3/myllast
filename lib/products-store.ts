export interface Product {
  id: string
  name: string
  description: string
  price: string
  icon: string
  features: string[]
  category: string
  available: boolean
}

export interface SiteSettings {
  whatsappNumber: string
  companyName: string
  companyEmail: string
}

export interface Category {
  id: string
  name: string
  nameEn: string
  nameRu: string
  icon: string
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "VPS 4GB RAM",
    description: "خادم افتراضي بمواصفات قوية",
    price: "150EGP",
    icon: "Server",
    features: ["4GB RAM", "2 CPU Cores", "50GB SSD", "Unlimited Bandwidth"],
    category: "vps",
    available: true,
  },
  {
    id: "2",
    name: "VPS 8GB RAM",
    description: "خادم افتراضي بأداء عالي",
    price: "250EGP",
    icon: "Server",
    features: ["8GB RAM", "4 CPU Cores", "100GB SSD", "Unlimited Bandwidth"],
    category: "vps",
    available: true,
  },
  {
    id: "3",
    name: "VPS 16GB RAM",
    description: "خادم افتراضي للمشاريع الكبيرة",
    price: "300EGP",
    icon: "Server",
    features: ["16GB RAM", "6 CPU Cores", "200GB SSD", "Unlimited Bandwidth"],
    category: "vps",
    available: true,
  },
  {
    id: "4",
    name: "VPS 32GB RAM",
    description: "خادم افتراضي احترافي",
    price: "350EGP",
    icon: "Server",
    features: ["32GB RAM", "8 CPU Cores", "400GB SSD", "Unlimited Bandwidth"],
    category: "vps",
    available: true,
  },
  {
    id: "5",
    name: "ChatGPT Account",
    description: "حساب ChatGPT Plus مفعل",
    price: "50EGP",
    icon: "MessageSquare",
    features: ["GPT-4 Access", "Priority Support", "Faster Response"],
    category: "account",
    available: true,
  },
  {
    id: "6",
    name: "Heroku Account",
    description: "حساب Heroku مفعل",
    price: "50EGP",
    icon: "Cloud",
    features: ["Verified Account", "Full Access", "Ready to Use"],
    category: "account",
    available: true,
  },
  {
    id: "7",
    name: "Render Account",
    description: "حساب Render مفعل",
    price: "50EGP",
    icon: "Cloud",
    features: ["Verified Account", "Full Access", "Ready to Use"],
    category: "account",
    available: true,
  },
  {
    id: "8",
    name: "Platform Bots",
    description: "بوتات جاهزة للاستخدام",
    price: "500EGP",
    icon: "Bot",
    features: ["Custom Bots", "Full Support", "Easy Integration"],
    category: "bot",
    available: true,
  },
]

const DEFAULT_SETTINGS: SiteSettings = {
  whatsappNumber: "201061419002",
  companyName: "Arabdevs",
  companyEmail: "mohamedeldony3@gmail.com",
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "vps", name: "VPS", nameEn: "VPS", nameRu: "VPS", icon: "Server" },
  { id: "account", name: "حسابات", nameEn: "Accounts", nameRu: "Аккаунты", icon: "User" },
  { id: "bot", name: "بوتات", nameEn: "Bots", nameRu: "Боты", icon: "Bot" },
]

export function getProducts(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS

  const stored = localStorage.getItem("arabdevs_products")
  if (!stored) {
    localStorage.setItem("arabdevs_products", JSON.stringify(DEFAULT_PRODUCTS))
    return DEFAULT_PRODUCTS
  }
  return JSON.parse(stored)
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("arabdevs_products", JSON.stringify(products))
}

export function getCategories(): Category[] {
  if (typeof window === "undefined") return DEFAULT_CATEGORIES

  const stored = localStorage.getItem("arabdevs_categories")
  if (!stored) {
    localStorage.setItem("arabdevs_categories", JSON.stringify(DEFAULT_CATEGORIES))
    return DEFAULT_CATEGORIES
  }
  return JSON.parse(stored)
}

export function saveCategories(categories: Category[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("arabdevs_categories", JSON.stringify(categories))
}

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS

  const stored = localStorage.getItem("arabdevs_settings")
  if (!stored) {
    localStorage.setItem("arabdevs_settings", JSON.stringify(DEFAULT_SETTINGS))
    return DEFAULT_SETTINGS
  }
  return JSON.parse(stored)
}

export function saveSiteSettings(settings: SiteSettings): void {
  if (typeof window === "undefined") return
  localStorage.setItem("arabdevs_settings", JSON.stringify(settings))
}

export function exportData(): string {
  const data = {
    products: getProducts(),
    categories: getCategories(),
    settings: getSiteSettings(),
    exportDate: new Date().toISOString(),
  }
  return JSON.stringify(data, null, 2)
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString)
    if (data.products) saveProducts(data.products)
    if (data.categories) saveCategories(data.categories)
    if (data.settings) saveSiteSettings(data.settings)
    return true
  } catch (error) {
    console.error("Import failed:", error)
    return false
  }
}

export function createBackup(): void {
  if (typeof window === "undefined") return
  const backupKey = `arabdevs_backup_${Date.now()}`
  const data = exportData()
  localStorage.setItem(backupKey, data)

  // Keep only last 5 backups
  const allKeys = Object.keys(localStorage).filter((key) => key.startsWith("arabdevs_backup_"))
  if (allKeys.length > 5) {
    allKeys.sort()
    localStorage.removeItem(allKeys[0])
  }
}

export function getBackups(): Array<{ key: string; date: Date }> {
  if (typeof window === "undefined") return []
  const allKeys = Object.keys(localStorage).filter((key) => key.startsWith("arabdevs_backup_"))
  return allKeys
    .map((key) => ({
      key,
      date: new Date(Number.parseInt(key.split("_")[2])),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function restoreBackup(backupKey: string): boolean {
  if (typeof window === "undefined") return false
  const backup = localStorage.getItem(backupKey)
  if (!backup) return false
  return importData(backup)
}
