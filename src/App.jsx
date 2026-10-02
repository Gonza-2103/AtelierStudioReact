import { Route, Routes } from 'react-router-dom'
import InicioAdmin from './pages/admin/InicioAdmin'
import InicioTienda from './pages/usuario/InicioTienda'
import ProductosAdmin from './pages/admin/ProductosAdmin'

function App() {
    return (
        <Routes>
            <Route path= "/" element={<InicioTienda />} />
            <Route path= "/admin" element={<InicioAdmin />} />
            <Route path= "/admin/productos" element={<ProductosAdmin />} />
        </Routes>
    )
}

export default App