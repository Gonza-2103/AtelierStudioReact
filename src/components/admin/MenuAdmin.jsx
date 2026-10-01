import logo from '../../assets/atelierstudiologo.png'

function MenuAdmin() {
    return (
        <aside className="menu_admin">
            <div className="logo_admin">
                <img src={logo} alt="Logo de AtelierStudio" />
                <h2>AtelierStudio</h2>
                <p>Administración</p>
            </div>

            <nav className="navegacion_admin">
                <a href="/admin" className="enlace_admin enlace_activo">
                    Inicio
                </a>

                <a href="/admin/productos" className="enlace_admin">
                    Productos
                </a>

                <a href="/admin/usuarios" className="enlace_admin">
                    Usuarios
                </a>

                <a href="/" className="enlace_admin volver_tienda">
                    Volver a la tienda
                </a>
            </nav>
        </aside>
    )
}

export default MenuAdmin