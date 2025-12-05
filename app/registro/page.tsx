"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "comprador",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.nombre || !formData.correo || !formData.contrasena) {
      setError("Todos los campos son obligatorios")
      return
    }

    const usuariosGuardados = localStorage.getItem("usuariosAgrokit")
    const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : []

    if (usuarios.find((u: any) => u.correo === formData.correo)) {
      setError("Este correo ya está registrado")
      return
    }

    usuarios.push(formData)
    localStorage.setItem("usuariosAgrokit", JSON.stringify(usuarios))

    setSuccess("¡Registro exitoso! Redirigiendo al inicio de sesión...")
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-24 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2E7D32] text-center mb-8">Registro de Usuario</h1>

          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-border">
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
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base bg-input/30"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="correo" className="block mb-3 font-semibold text-foreground text-base">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base bg-input/30"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="contrasena" className="block mb-3 font-semibold text-foreground text-base">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  placeholder="Crea una contraseña"
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base bg-input/30"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="rol" className="block mb-3 font-semibold text-foreground text-base">
                  Tipo de cuenta
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-input rounded-xl focus:outline-none focus:border-primary text-base bg-input/30"
                >
                  <option value="comprador">Comprador</option>
                  <option value="productor">Productor</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-[#45a049] text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
              >
                Crear cuenta
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
