"use client"

import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Inicio() {
  const navigate = useNavigate()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (sesionActual) {
      const sesion = JSON.parse(sesionActual)
      if (sesion.rol === "productor") {
        navigate("/productor")
      } else if (sesion.rol === "comprador") {
        navigate("/catalogo")
      }
    }
  }, [navigate])

  return (
    <div className="hero">
      <h2>Bienvenido a AgroKit Ecológico</h2>
      <p>Conectamos productores locales con compradores que buscan alimentos frescos y ecológicos</p>
      <div className="hero-buttons">
        <Link to="/registro" className="btn">
          Registrarme
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  )
}

export default Inicio
