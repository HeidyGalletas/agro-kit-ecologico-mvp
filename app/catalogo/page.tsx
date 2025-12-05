"use client"

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

export default function CatalogoPage() {
  const [sesion, setSesion] = useState<any>(null)
  const [kits, setKits] = useState<Kit[]>([])
  const router = useRouter()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (!sesionActual) {
      router.push("/login")
      return
    }

    const usuario = JSON.parse(sesionActual)
    setSesion(usuario)

    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    setKits(todosKits)
  }, [router])

  const realizarPedido = (kit: Kit) => {
    localStorage.setItem("pedidoActual", JSON.stringify(kit))
    router.push("/pedido")
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E7D32] text-center mb-10">
            Catálogo de Kits Alimentarios
          </h1>

          {kits.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-white rounded-2xl border border-border">
              <h3 className="text-xl font-semibold mb-2">No hay kits disponibles por ahora</h3>
              <p>Los productores aún no han creado kits alimentarios</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {kits.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-border flex flex-col"
                >
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src="/organic-vegetables-kit-farm-fresh.jpg" alt={kit.nombre} className="w-full h-48 object-cover" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-[#2E7D32] mb-3">{kit.nombre}</h3>
                  <p className="text-muted-foreground mb-4 flex-1 leading-relaxed">{kit.descripcion}</p>
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-primary mb-2">${kit.precio.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Productor: {kit.nombreProductor}</p>
                  </div>
                  <button
                    className="w-full bg-primary hover:bg-[#45a049] text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                    onClick={() => realizarPedido(kit)}
                  >
                    Realizar Pedido
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
