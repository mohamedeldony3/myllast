"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  ArrowLeft,
  Lock,
  Download,
  Upload,
  BarChart3,
  Package,
  FolderOpen,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import {
  getProducts,
  saveProducts,
  getSiteSettings,
  saveSiteSettings,
  getCategories,
  saveCategories,
  exportData,
  importData,
  createBackup,
  type Product,
  type SiteSettings,
  type Category,
} from "@/lib/products-store"

const ADMIN_PASSWORD = "010614Rr"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const [products, setProducts] = useState<Product[]>([])
  const [settings, setSettings] = useState<SiteSettings>({
    whatsappNumber: "",
    companyName: "",
    companyEmail: "",
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Product>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false)
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({})
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)

  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      setProducts(getProducts())
      setSettings(getSiteSettings())
      setCategories(getCategories())
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("adminAuth", "true")
      setPasswordError("")
    } else {
      setPasswordError("كلمة المرور غير صحيحة")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("adminAuth")
    setPassword("")
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `arabdevs-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    alert("تم تصدير البيانات بنجاح!")
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (importData(content)) {
        setProducts(getProducts())
        setCategories(getCategories())
        setSettings(getSiteSettings())
        alert("تم استيراد البيانات بنجاح!")
      } else {
        alert("فشل استيراد البيانات. تأكد من صحة الملف.")
      }
    }
    reader.readAsText(file)
  }

  const handleCreateBackup = () => {
    createBackup()
    alert("تم إنشاء نسخة احتياطية بنجاح!")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center p-8">
        <Card className="pixel-border p-8 bg-[#1a1a2e] max-w-md w-full">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-center">لوحة التحكم</h1>
            <p className="text-gray-400 text-center mt-2">الرجاء إدخال كلمة المرور للوصول</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">كلمة المرور</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError("")
                }}
                className="pixel-border bg-[#0a0a0f] text-white"
                placeholder="أدخل كلمة المرور"
                autoFocus
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>

            <Button type="submit" className="pixel-btn w-full">
              <Lock className="ml-2" />
              دخول
            </Button>

            <Link href="/" className="block text-center">
              <Button type="button" variant="outline" className="pixel-border w-full bg-transparent">
                <ArrowLeft className="ml-2" />
                العودة للموقع
              </Button>
            </Link>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">كلمة المرور الافتراضية: 010614Rr</p>
        </Card>
      </div>
    )
  }

  const totalProducts = products.length
  const totalCategories = categories.length
  const availableProducts = products.filter((p) => p.available).length

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryForm.name || "قسم جديد",
      nameEn: categoryForm.nameEn || "New Category",
      nameRu: categoryForm.nameRu || "Новая категория",
      icon: categoryForm.icon || "Package",
    }
    const updated = [...categories, newCategory]
    setCategories(updated)
    saveCategories(updated)
    setShowAddCategoryForm(false)
    setCategoryForm({})
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id)
    setCategoryForm(category)
  }

  const handleSaveCategory = () => {
    if (!editingCategoryId) return
    const updated = categories.map((c) => (c.id === editingCategoryId ? ({ ...c, ...categoryForm } as Category) : c))
    setCategories(updated)
    saveCategories(updated)
    setEditingCategoryId(null)
    setCategoryForm({})
  }

  const handleDeleteCategory = (id: string) => {
    const productsInCategory = products.filter((p) => p.category === id)
    if (productsInCategory.length > 0) {
      alert(`لا يمكن حذف هذا القسم لأنه يحتوي على ${productsInCategory.length} منتج`)
      return
    }
    const updated = categories.filter((c) => c.id !== id)
    setCategories(updated)
    saveCategories(updated)
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setEditForm(product)
  }

  const handleSave = () => {
    if (!editingId) return
    const updated = products.map((p) => (p.id === editingId ? ({ ...p, ...editForm } as Product) : p))
    setProducts(updated)
    saveProducts(updated)
    setEditingId(null)
    setEditForm({})
  }

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
    saveProducts(updated)
  }

  const handleAdd = () => {
    if (!editForm.category) {
      alert("الرجاء اختيار قسم للمنتج")
      return
    }
    const newProduct: Product = {
      id: Date.now().toString(),
      name: editForm.name || "New Product",
      description: editForm.description || "",
      price: editForm.price || "$0",
      icon: editForm.icon || "Package",
      features: editForm.features || [],
      category: editForm.category,
      available: editForm.available !== undefined ? editForm.available : true,
    }
    const updated = [...products, newProduct]
    setProducts(updated)
    saveProducts(updated)
    setShowAddForm(false)
    setEditForm({})
  }

  const handleSettingsSave = () => {
    saveSiteSettings(settings)
    alert("تم حفظ الإعدادات بنجاح!")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold pixel-border p-4 bg-gradient-to-r from-cyan-500 to-purple-500">
            لوحة التحكم
          </h1>
          <div className="flex gap-2">
            <Button onClick={handleLogout} variant="outline" className="pixel-border bg-transparent">
              <Lock className="ml-2" />
              تسجيل الخروج
            </Button>
            <Link href="/">
              <Button className="pixel-btn">
                <ArrowLeft className="ml-2" />
                العودة للموقع
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="pixel-border p-6 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">إجمالي المنتجات</p>
                <p className="text-3xl font-bold text-cyan-400">{totalProducts}</p>
              </div>
              <Package className="h-12 w-12 text-cyan-400 opacity-50" />
            </div>
          </Card>
          <Card className="pixel-border p-6 bg-gradient-to-br from-purple-500/20 to-purple-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">إجمالي الفئات</p>
                <p className="text-3xl font-bold text-purple-400">{totalCategories}</p>
              </div>
              <FolderOpen className="h-12 w-12 text-purple-400 opacity-50" />
            </div>
          </Card>
          <Card className="pixel-border p-6 bg-gradient-to-br from-green-500/20 to-green-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">المنتجات المتوفرة</p>
                <p className="text-3xl font-bold text-green-400">{availableProducts}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-400 opacity-50" />
            </div>
          </Card>
        </div>

        <Card className="pixel-border p-6 mb-8 bg-[#1a1a2e]">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            إدارة البيانات
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleExport} className="pixel-btn">
              <Download className="ml-2" />
              تصدير البيانات
            </Button>
            <Button onClick={() => document.getElementById("import-file")?.click()} className="pixel-btn">
              <Upload className="ml-2" />
              استيراد البيانات
            </Button>
            <input id="import-file" type="file" accept=".json" onChange={handleImport} className="hidden" />
            <Button onClick={handleCreateBackup} variant="outline" className="pixel-border bg-transparent">
              <Save className="ml-2" />
              إنشاء نسخة احتياطية
            </Button>
          </div>
        </Card>

        {/* Settings Section */}
        <Card className="pixel-border p-6 mb-8 bg-[#1a1a2e]">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">إعدادات الموقع</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm mb-2">رقم الواتساب</label>
              <Input
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white"
                placeholder="201061419002"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">اسم الشركة</label>
              <Input
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">البريد الإلكتروني</label>
              <Input
                value={settings.companyEmail}
                onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white"
              />
            </div>
            <Button onClick={handleSettingsSave} className="pixel-btn w-fit">
              <Save className="ml-2" />
              حفظ الإعدادات
            </Button>
          </div>
        </Card>

        {/* Categories Section */}
        <Card className="pixel-border p-6 mb-8 bg-[#1a1a2e]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cyan-400">الأقسام</h2>
            <Button onClick={() => setShowAddCategoryForm(true)} className="pixel-btn">
              <Plus className="ml-2" />
              إضافة قسم
            </Button>
          </div>

          {/* Add Category Form */}
          {showAddCategoryForm && (
            <Card className="pixel-border p-6 mb-6 bg-[#1a1a2e]">
              <h3 className="text-xl font-bold mb-4 text-purple-400">قسم جديد</h3>
              <div className="grid gap-4">
                <Input
                  placeholder="اسم القسم بالعربية"
                  value={categoryForm.name || ""}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="pixel-border bg-[#1a1a2e] text-white"
                />
                <Input
                  placeholder="Category Name in English"
                  value={categoryForm.nameEn || ""}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                  className="pixel-border bg-[#1a1a2e] text-white"
                />
                <Input
                  placeholder="Название категории на русском"
                  value={categoryForm.nameRu || ""}
                  onChange={(e) => setCategoryForm({ ...categoryForm, nameRu: e.target.value })}
                  className="pixel-border bg-[#1a1a2e] text-white"
                />
                <Input
                  placeholder="أيقونة (مثال: Server, User, Bot)"
                  value={categoryForm.icon || ""}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  className="pixel-border bg-[#1a1a2e] text-white"
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddCategory} className="pixel-btn">
                    <Save className="ml-2" />
                    حفظ
                  </Button>
                  <Button
                    onClick={() => {
                      setShowAddCategoryForm(false)
                      setCategoryForm({})
                    }}
                    variant="outline"
                    className="pixel-border"
                  >
                    <X className="ml-2" />
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Categories List */}
          <div className="grid gap-4">
            {categories.map((category) => (
              <Card key={category.id} className="pixel-border p-4 bg-[#1a1a2e]">
                {editingCategoryId === category.id ? (
                  <div className="grid gap-4">
                    <Input
                      value={categoryForm.name || ""}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="pixel-border bg-[#1a1a2e] text-white"
                      placeholder="اسم القسم بالعربية"
                    />
                    <Input
                      value={categoryForm.nameEn || ""}
                      onChange={(e) => setCategoryForm({ ...categoryForm, nameEn: e.target.value })}
                      className="pixel-border bg-[#1a1a2e] text-white"
                      placeholder="Category Name in English"
                    />
                    <Input
                      value={categoryForm.nameRu || ""}
                      onChange={(e) => setCategoryForm({ ...categoryForm, nameRu: e.target.value })}
                      className="pixel-border bg-[#1a1a2e] text-white"
                      placeholder="Название категории на русском"
                    />
                    <Input
                      value={categoryForm.icon || ""}
                      onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                      className="pixel-border bg-[#1a1a2e] text-white"
                      placeholder="أيقونة (مثال: Server, User, Bot)"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSaveCategory} className="pixel-btn">
                        <Save className="ml-2" />
                        حفظ
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingCategoryId(null)
                          setCategoryForm({})
                        }}
                        variant="outline"
                        className="pixel-border"
                      >
                        <X className="ml-2" />
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400">
                        {category.name} / {category.nameEn} / {category.nameRu}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {products.filter((p) => p.category === category.id).length} منتج
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditCategory(category)}
                        variant="outline"
                        size="sm"
                        className="pixel-border"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCategory(category.id)}
                        variant="destructive"
                        size="sm"
                        className="pixel-border"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        {/* Products Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-400">المنتجات</h2>
          <Button onClick={() => setShowAddForm(true)} className="pixel-btn">
            <Plus className="ml-2" />
            إضافة منتج
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <Card className="pixel-border p-6 mb-6 bg-[#1a1a2e]">
            <h3 className="text-xl font-bold mb-4 text-purple-400">منتج جديد</h3>
            <div className="grid gap-4">
              <Input
                placeholder="اسم المنتج"
                value={editForm.name || ""}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white"
              />
              <Textarea
                placeholder="الوصف"
                value={editForm.description || ""}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white"
              />
              <Input
                placeholder="السعر (مثال: $20)"
                value={editForm.price || ""}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white"
              />
              <select
                value={editForm.category || ""}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="pixel-border bg-[#0a0a0f] text-white p-2 rounded"
              >
                <option value="">اختر القسم</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="pixel-border p-4 bg-[#0a0a0f]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.available !== false}
                    onChange={(e) => setEditForm({ ...editForm, available: e.target.checked })}
                    className="w-5 h-5 accent-cyan-500 cursor-pointer"
                  />
                  <span className="text-base font-medium">
                    حالة المنتج:{" "}
                    {editForm.available !== false ? (
                      <span className="text-green-400">متوفر ✓</span>
                    ) : (
                      <span className="text-red-400">غير متوفر ✗</span>
                    )}
                  </span>
                </label>
              </div>
              <Textarea
                placeholder="المميزات (سطر لكل ميزة)"
                value={editForm.features?.join("\n") || ""}
                onChange={(e) => setEditForm({ ...editForm, features: e.target.value.split("\n") })}
                className="pixel-border bg-[#0a0a0f] text-white"
              />
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="pixel-btn">
                  <Save className="ml-2" />
                  حفظ
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false)
                    setEditForm({})
                  }}
                  variant="outline"
                  className="pixel-border"
                >
                  <X className="ml-2" />
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Products List */}
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="pixel-border p-6 bg-[#1a1a2e]">
              {editingId === product.id ? (
                <div className="grid gap-4">
                  <Input
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="pixel-border bg-[#0a0a0f] text-white"
                  />
                  <Textarea
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="pixel-border bg-[#0a0a0f] text-white"
                  />
                  <Input
                    value={editForm.price || ""}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="pixel-border bg-[#0a0a0f] text-white"
                  />
                  <select
                    value={editForm.category || ""}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="pixel-border bg-[#0a0a0f] text-white p-2 rounded"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <div className="pixel-border p-4 bg-[#0a0a0f]">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editForm.available !== false}
                        onChange={(e) => setEditForm({ ...editForm, available: e.target.checked })}
                        className="w-5 h-5 accent-cyan-500 cursor-pointer"
                      />
                      <span className="text-base font-medium">
                        حالة المنتج:{" "}
                        {editForm.available !== false ? (
                          <span className="text-green-400">متوفر ✓</span>
                        ) : (
                          <span className="text-red-400">غير متوفر ✗</span>
                        )}
                      </span>
                    </label>
                  </div>
                  <Textarea
                    value={editForm.features?.join("\n") || ""}
                    onChange={(e) => setEditForm({ ...editForm, features: e.target.value.split("\n") })}
                    className="pixel-border bg-[#0a0a0f] text-white"
                    placeholder="المميزات (سطر لكل ميزة)"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="pixel-btn">
                      <Save className="ml-2" />
                      حفظ
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null)
                        setEditForm({})
                      }}
                      variant="outline"
                      className="pixel-border"
                    >
                      <X className="ml-2" />
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-cyan-400">{product.name}</h3>
                      {product.available ? (
                        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded pixel-border border border-green-500">
                          متوفر
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded pixel-border border border-red-500">
                          غير متوفر
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-2">{product.description}</p>
                    <p className="text-sm text-purple-400 mb-2">
                      القسم: {categories.find((c) => c.id === product.category)?.name || product.category}
                    </p>
                    <p className="text-2xl font-bold text-purple-400 mb-2">{product.price}</p>
                    <ul className="text-sm text-gray-300">
                      {product.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleEdit(product)} variant="outline" size="sm" className="pixel-border">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="destructive"
                      size="sm"
                      className="pixel-border"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
