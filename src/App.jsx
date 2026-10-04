import { Route, Routes } from 'react-router-dom'
import Portada from './components/user/Portada'
import InicioTienda from './pages/usuario/InicioTienda'
import InicioAdmin from './pages/admin/InicioAdmin'
import ProductosAdmin from './pages/admin/ProductosAdmin'

function App() {
  return (
    <Routes>
      {/* La portada ahora es la página principal */}
      <Route path="/" element={<Portada />} />

      {/* InicioTienda se conserva accesible en /tienda (o /inicio) */}
      <Route path="/tienda" element={<InicioTienda />} />

      {/* Rutas de administración intactas */}
      <Route path="/admin" element={<InicioAdmin />} />
      <Route path="/admin/productos" element={<ProductosAdmin />} />
    </Routes>
  )
}

export default App
