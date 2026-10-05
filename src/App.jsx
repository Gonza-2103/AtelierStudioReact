
import { Route, Routes } from 'react-router-dom'

// Componentes de usuario (compañero)
import Portada from './components/user/Portada'
import InicioTienda from './pages/usuario/InicioTienda'

// Componentes de administración
import InicioAdmin from './pages/admin/InicioAdmin'
import ProductosAdmin from './pages/admin/ProductosAdmin'
import UsuariosAdmin from './pages/admin/UsuariosAdmin'
import NuevoProducto from './pages/admin/NuevoProducto'
import EditarProducto from './pages/admin/EditarProducto'

function App() {
    return (
        <Routes>

            {/* Rutas de usuario */}
            <Route path="/" element={<Portada />} />
            <Route path="/tienda" element={<InicioTienda />} />

            {/* Rutas de administración */}
            <Route path="/admin" element={<InicioAdmin />} />
            <Route path="/admin/productos" element={<ProductosAdmin />} />
            <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
            <Route path="/admin/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />

        </Routes>
    )
}

export default App
