import React from 'react';
import { Route, Routes } from 'react-router-dom';


//Importación de todas las vistas de usuario
import Portada from './components/user/Portada';
import Nosotros from './components/user/Nosotros';
import Productos from './components/user/Productos';
import Carrito from './components/user/Carrito';
import Busqueda from './components/user/Busqueda';
import Foro from './components/user/Foro';
import Blogs from './components/user/Blogs';
import Contacto from './components/user/Contacto';
import Detalle_Blog1 from './components/user/Detalle_Blog1';
import Detalle_Blog2 from './components/user/Detalle_Blog2';
import Detalle_Producto from './components/user/Detalle_Producto';
import Login from './components/user/Login';
import Registro_Usuario from './components/user/Registro_Usuario';

//Rutas de administración existentes 
import InicioAdmin from './pages/admin/InicioAdmin';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import UsuariosAdmin from './pages/admin/UsuariosAdmin';
import EditarProducto from './pages/admin/EditarProducto';
import NuevoProducto from './pages/admin/NuevoProducto';

function App() {
    return (
        <Routes>
            
            {/* Rutas activas para todo el flujo de usuario */}
            <Route path="/" element={<Portada />} />
            <Route path="/portada" element={<Portada />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/foro" element={<Foro />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/detalle_blog1" element={<Detalle_Blog1 />} />
            <Route path="/detalle_blog2" element={<Detalle_Blog2 />} />
            <Route path="/detalle_producto" element={<Detalle_Producto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro_usuario" element={<Registro_Usuario />} />

            {/* Rutas de administración */}
            <Route path="/admin" element={<InicioAdmin />} />
            <Route path="/admin/productos" element={<ProductosAdmin />} />
            <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
            <Route path="/admin/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
        </Routes>
    );
}

export default App;

