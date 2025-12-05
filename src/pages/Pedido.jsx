"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

function Pedido() {
  const [pedido, setPedido] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar sesión
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (!sesionActual) {
      navigate("/login")
      return
    }

    // Obtener pedido actual
    const pedidoActual = localStorage.getItem("pedidoActual")
    if (!pedidoActual) {
      navigate("/catalogo")
      return
    }

    setPedido(JSON.parse(pedidoActual))
  }, [navigate])

  if (!pedido) return null

  return (
    <div>
      <h2 className="page-title">Confirmación de Pedido</h2>

      <div className="alert alert-success">
        <h3>¡Pedido confirmado exitosamente!</h3>
        <p>Gracias por tu compra. El productor será notificado.</p>
      </div>

      <div className="card">
        <h3>Detalles del Pedido</h3>
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>Kit:</strong> {pedido.nombre}
          </p>
          <p>
            <strong>Descripción:</strong> {pedido.descripcion}
          </p>
          <p className="card-price">
            <strong>Precio:</strong> ${pedido.precio.toFixed(2)}
          </p>
          <p>
            <strong>Productor:</strong> {pedido.nombreProductor}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Link to="/catalogo" className="btn">
          Volver al Catálogo
        </Link>
      </div>
    </div>
  )
}

export default Pedido
