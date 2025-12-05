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

export default function PedidoPage() {
  const [pedido, setPedido] = useState<Kit | null>(null)
  const router = useRouter()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (!sesionActual) {
      router.push("/login")
      return
    }

    const pedidoActual = localStorage.getItem("pedidoActual")
    if (!pedidoActual) {
      router.push("/catalogo")
      return
    }

    setPedido(JSON.parse(pedidoActual))
  }, [router])

  if (!pedido) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#2E7D32]">🌱 AgroKit</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E7D32] text-center mb-10">Confirmación de Pedido</h1>

          <div className="bg-green-50 border-2 border-green-200 px-8 py-8 rounded-2xl mb-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-700 mb-3">¡Pedido confirmado exitosamente!</h2>
            <p className="text-green-600 text-lg">Gracias por tu compra. El productor fue notificado.</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-border mb-8">
            <h3 className="text-2xl font-bold text-[#2E7D32] mb-6">Detalles del Pedido</h3>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-foreground text-base">Kit: </span>
                <span className="text-muted-foreground text-base">{pedido.nombre}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground text-base">Descripción: </span>
                <span className="text-muted-foreground text-base">{pedido.descripcion}</span>
              </div>
              <div className="pt-2">
                <span className="font-semibold text-foreground text-base block mb-1">Precio: </span>
                <span className="text-4xl font-bold text-primary">${pedido.precio.toFixed(2)}</span>
              </div>
              <div>
                <span className="font-semibold text-foreground text-base">Productor: </span>
                <span className="text-muted-foreground text-base">{pedido.nombreProductor}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/catalogo"
              className="inline-block bg-primary hover:bg-[#45a049] text-white px-10 py-4 rounded-xl font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
