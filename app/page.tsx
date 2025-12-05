"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (sesionActual) {
      const sesion = JSON.parse(sesionActual)
      if (sesion.rol === "productor") {
        router.push("/productor")
      } else if (sesion.rol === "comprador") {
        router.push("/catalogo")
      }
    }
  }, [router])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex items-center justify-center px-4 pt-20">
        <div className="max-w-3xl w-full text-center py-16">
          <div className="mb-8">
            <img
              src="/agricultural-farm-fresh-vegetables-organic.jpg"
              alt="AgroKit Ecológico"
              className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#2E7D32] mb-6">AgroKit Ecológico</h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            Conectamos productores locales con compradores que buscan alimentos frescos y ecológicos
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <a
              href="/registro"
              className="bg-primary hover:bg-[#45a049] text-white px-10 py-5 rounded-xl font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              Registrarme
            </a>
            <a
              href="/login"
              className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 rounded-xl font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
