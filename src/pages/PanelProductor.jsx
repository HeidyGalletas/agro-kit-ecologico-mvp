"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function PanelProductor() {
  const [sesion, setSesion] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  })
  const [kits, setKits] = useState([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar sesión
    const sesionActual = localStorage.getItem("sesionAgrokit")
    if (!sesionActual) {
      navigate("/login")
      return
    }

    const usuario = JSON.parse(sesionActual)
    if (usuario.rol !== "productor") {
      navigate("/catalogo")
      return
    }

    setSesion(usuario)

    // Cargar kits del productor
    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    const kitsProductor = todosKits.filter((k) => k.productor === usuario.correo)
    setKits(kitsProductor)
  }, [navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validar campos
    if (!formData.nombre || !formData.descripcion || !formData.precio) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (isNaN(formData.precio) || Number.parseFloat(formData.precio) <= 0) {
      setError("El precio debe ser un número positivo")
      return
    }

    // Crear nuevo kit
    const nuevoKit = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number.parseFloat(formData.precio),
      productor: sesion.correo,
      nombreProductor: sesion.nombre,
    }

    // Guardar en localStorage
    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    todosKits.push(nuevoKit)
    localStorage.setItem("kitsAgrokit", JSON.stringify(todosKits))

    // Actualizar lista local
    setKits([...kits, nuevoKit])

    // Limpiar formulario
    setFormData({ nombre: "", descripcion: "", precio: "" })
    setSuccess("¡Kit creado exitosamente!")
  }

  const eliminarKit = (kitId) => {
    // Eliminar de localStorage
    const kitsGuardados = localStorage.getItem("kitsAgrokit")
    const todosKits = kitsGuardados ? JSON.parse(kitsGuardados) : []
    const kitsActualizados = todosKits.filter((k) => k.id !== kitId)
    localStorage.setItem("kitsAgrokit", JSON.stringify(kitsActualizados))

    // Actualizar lista local
    setKits(kits.filter((k) => k.id !== kitId))
    setSuccess("Kit eliminado correctamente")
  }

  if (!sesion) return null

  return (
    <div>
      <div className="alert alert-info">
        Sesión iniciada como productor: <strong>{sesion.nombre}</strong>
      </div>

      <h2 className="page-title">Panel del Productor</h2>

      {/* Formulario para crear kit */}
      <div className="form">
        <h3>Crear Nuevo Kit Alimentario</h3>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del kit</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Kit de Verduras Frescas"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el contenido del kit"
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio (en pesos)</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <button type="submit" className="btn">
            Agregar Kit
          </button>
        </form>
      </div>

      {/* Lista de kits */}
      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ marginBottom: "1rem" }}>Mis Kits Creados</h3>
        {kits.length === 0 ? (
          <div className="empty-state">
            <h3>No has creado kits todavía</h3>
            <p>Usa el formulario arriba para crear tu primer kit</p>
          </div>
        ) : (
          <div className="kit-list">
            {kits.map((kit) => (
              <div key={kit.id} className="card">
                <div className="kit-item">
                  <div className="kit-info">
                    <h3>{kit.nombre}</h3>
                    <p>{kit.descripcion}</p>
                    <p className="card-price">${kit.precio.toFixed(2)}</p>
                  </div>
                  <button className="btn btn-danger" onClick={() => eliminarKit(kit.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PanelProductor
