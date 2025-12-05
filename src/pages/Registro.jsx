"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "comprador",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

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
    if (!formData.nombre || !formData.correo || !formData.contrasena) {
      setError("Todos los campos son obligatorios")
      return
    }

    // Obtener usuarios existentes
    const usuariosGuardados = localStorage.getItem("usuariosAgrokit")
    const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : []

    // Verificar si el correo ya existe
    if (usuarios.find((u) => u.correo === formData.correo)) {
      setError("Este correo ya está registrado")
      return
    }

    // Guardar nuevo usuario
    usuarios.push(formData)
    localStorage.setItem("usuariosAgrokit", JSON.stringify(usuarios))

    setSuccess("¡Registro exitoso! Redirigiendo al inicio de sesión...")
    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  return (
    <div>
      <h2 className="page-title">Registro de Usuario</h2>
      <div className="form">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Crea una contraseña"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rol">Tipo de cuenta</label>
            <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
              <option value="comprador">Comprador</option>
              <option value="productor">Productor</option>
            </select>
          </div>

          <button type="submit" className="btn">
            Registrarme
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registro
