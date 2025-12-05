import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Inicio from "./pages/Inicio"
import Registro from "./pages/Registro"
import Login from "./pages/Login"
import PanelProductor from "./pages/PanelProductor"
import Catalogo from "./pages/Catalogo"
import Pedido from "./pages/Pedido"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productor" element={<PanelProductor />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/pedido" element={<Pedido />} />
      </Routes>
    </Layout>
  )
}

export default App
