"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Kit {
  id: string
  nombre: string
  descripcion: string
  precio: number
  productor: string
  nombreProductor: string
}

export default function PanelProductorPage() {
  const [sesion, setSesion] = useState<any>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  })
  const [kits, setKits] = useState<Kit[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (!sesionActual) {
      router.push("/login")
      return
    }

    const usuario = JSON.parse(sesionActual)
    if (usuario.rol !== "productor") {
      router.push("/catalogo")
      return
    }

    setSesion(usuario)

    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    const kitsProductor = todosKits.filter((k: Kit) => k.productor === usuario.correo)
    setKits(kitsProductor)
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.nombre || !formData.descripcion || !formData.precio) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (isNaN(Number(formData.precio)) || Number.parseFloat(formData.precio) <= 0) {
      setError("El precio debe ser un número positivo")
      return
    }

    const nuevoKit: Kit = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number.parseFloat(formData.precio),
      productor: sesion.correo,
      nombreProductor: sesion.nombre,
    }

    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    todosKits.push(nuevoKit)
    localStorage.setItem("kitsAgrokit", JSON.stringify(todosKits))

    setKits([...kits, nuevoKit])
    setFormData({ nombre: "", descripcion: "", precio: "" })
    setSuccess("¡Kit creado exitosamente!")
  }

  const eliminarKit = (kitId: string) => {
    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    const kitsActualizados = todosKits.filter((k: Kit) => k.id !== kitId)
    localStorage.setItem("kitsAgrokit", JSON.stringify(kitsActualizados))

    setKits(kits.filter((k) => k.id !== kitId))
    setSuccess("Kit eliminado correctamente")
  }

  const cerrarSesion = () => {
    localStorage.removeItem("sesionAgrokit")
    router.push("/")
  }

  if (!sesion) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#2E7D32]">🌱 AgroKit</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Bienvenido, <strong className="text-foreground">{sesion.nombre}</strong>
            </span>
            <button onClick={cerrarSesion} className="text-destructive hover:text-destructive/80 font-medium text-sm">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E7D32] text-center mb-10">Panel del Productor</h1>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-border mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E7D32] mb-6">Crear Nuevo Kit Alimentario</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl mb-6">{error}</div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl mb-6">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="nombre" className="block mb-3 font-semibold text-foreground text-base">
                  Nombre del kit
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Kit de Verduras Frescas"
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base bg-input/30"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="descripcion" className="block mb-3 font-semibold text-foreground text-base">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe el contenido del kit"
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base resize-vertical bg-input/30"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="precio" className="block mb-3 font-semibold text-foreground text-base">
                  Precio (en pesos)
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base bg-input/30"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#45a049] text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
              >
                Agregar kit
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E7D32] mb-6">Mis Kits Creados</h2>

            {kits.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground bg-white rounded-2xl border border-border">
                <h3 className="text-xl font-semibold mb-2">No has creado kits todavía</h3>
                <p>Usa el formulario arriba para crear tu primer kit</p>
              </div>
            ) : (
              <div className="space-y-4">
                {kits.map((kit) => (
                  <div key={kit.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-border">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-[#2E7D32] mb-2">{kit.nombre}</h3>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{kit.descripcion}</p>
                        <p className="text-3xl font-bold text-primary">${kit.precio.toFixed(2)}</p>
                      </div>
                      <button
                        className="bg-destructive hover:bg-destructive/90 text-white px-6 py-3 rounded-xl transition-colors font-medium self-end md:self-auto"
                        onClick={() => eliminarKit(kit.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
