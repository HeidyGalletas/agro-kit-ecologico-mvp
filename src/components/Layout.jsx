"use client"

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Layout({ children }) {
  const [sesion, setSesion] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (sesionActual) {
      setSesion(JSON.parse(sesionActual))
    }
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem("sesionAgrokit")
    setSesion(null)
    navigate("/")
  }

  return (
    <>
      <header className="header">
        <div className="header-content">
          <h1>🌱 AgroKit Ecológico</h1>
          <nav>
            <Link to="/">Inicio</Link>
            {!sesion && (
              <>
                <Link to="/registro">Registro</Link>
                <Link to="/login">Iniciar Sesión</Link>
              </>
            )}
            {sesion && (
              <>
                {sesion.rol === "productor" && <Link to="/productor">Mi Panel</Link>}
                {sesion.rol === "comprador" && <Link to="/catalogo">Catálogo</Link>}
                <a href="#" onClick={cerrarSesion}>
                  Cerrar Sesión
                </a>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
