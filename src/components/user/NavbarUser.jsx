import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/atelierstudiologo.png';

function NavbarUser() {
    return (
        <header className="d-flex flex-wrap align-items-center justify-content-between p-3 border-bottom">
        
            {/* Logo y Enlace a Portada */}
            <Link to="/" className="d-flex align-items-center text-decoration-none text-dark">
                <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
                <h2 className="m-0 fs-4">AtelierStudio</h2>
            </Link>

            {/* Menú Principal de Navegación */}
            <nav className="d-flex gap-2 flex-wrap">
                <Link to="/" className="btn btn-outline-secondary btn-sm">Portada</Link>
                <Link to="/nosotros" className="btn btn-outline-secondary btn-sm">Nosotros</Link>
                <Link to="/productos" className="btn btn-outline-secondary btn-sm">Productos</Link>
                <Link to="/carrito" className="btn btn-outline-secondary btn-sm">Carrito</Link>
                <Link to="/busqueda" className="btn btn-outline-secondary btn-sm">Búsqueda</Link>
                <Link to="/foro" className="btn btn-outline-secondary btn-sm">Foro</Link>
                <Link to="/blogs" className="btn btn-outline-secondary btn-sm">Blogs</Link>
                <Link to="/contacto" className="btn btn-outline-secondary btn-sm">Contacto</Link>
            </nav>

            {/* Accesos de Usuario / Sesión */}
            <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-primary btn-sm">Iniciar Sesión</Link>
                <Link to="/registro" className="btn btn-success btn-sm">Registrarse</Link>
            </div>
        </header>
    );
}

export default NavbarUser;

