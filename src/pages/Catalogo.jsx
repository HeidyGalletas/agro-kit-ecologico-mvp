"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Catalogo() {
  const [sesion, setSesion] = useState(null)
  const [kits, setKits] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar sesión
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (!sesionActual) {
      navigate("/login")
      return
    }

    const usuario = JSON.parse(sesionActual)
    setSesion(usuario)

    // Cargar todos los kits
    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    setKits(todosKits)
  }, [navigate])

  const realizarPedido = (kit) => {
    // Guardar el pedido actual
    localStorage.setItem("pedidoActual", JSON.stringify(kit))
    navigate("/pedido")
  }

  if (!sesion) return null

  return (
    <div>
      <div className="alert alert-info">
        Sesión iniciada como comprador: <strong>{sesion.nombre}</strong>
      </div>

      <h2 className="page-title">Catálogo de Kits Alimentarios</h2>

      {kits.length === 0 ? (
        <div className="empty-state">
          <h3>No hay kits disponibles por ahora</h3>
          <p>Los productores aún no han creado kits alimentarios</p>
        </div>
      ) : (
        <div className="kit-list">
          {kits.map((kit) => (
            <div key={kit.id} className="card">
              <h3>{kit.nombre}</h3>
              <p>{kit.descripcion}</p>
              <p className="card-price">${kit.precio.toFixed(2)}</p>
              <p style={{ color: "#718096", fontSize: "0.875rem" }}>Productor: {kit.nombreProductor}</p>
              <button className="btn" style={{ marginTop: "1rem" }} onClick={() => realizarPedido(kit)}>
                Realizar Pedido
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogo
