"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  })
  const [error, setError] = useState("")
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

    // Validar campos
    if (!formData.correo || !formData.contrasena) {
      setError("Todos los campos son obligatorios")
      return
    }

    // Obtener usuarios registrados
    const usuariosGuardados = localStorage.getItem("usuariosAgrokit")
    const usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : []

    // Buscar usuario
    const usuario = usuarios.find((u) => u.correo === formData.correo && u.contrasena === formData.contrasena)

    if (!usuario) {
      setError("Correo o contraseña incorrectos")
      return
    }

    // Guardar sesión
    localStorage.setItem("sesionAgrokit", JSON.stringify(usuario))

    // Redirigir según el rol
    if (usuario.rol === "productor") {
      navigate("/productor")
    } else {
      navigate("/catalogo")
    }
  }

  return (
    <div>
      <h2 className="page-title">Iniciar Sesión</h2>
      <div className="form">
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              placeholder="Tu contraseña"
            />
          </div>

          <button type="submit" className="btn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
