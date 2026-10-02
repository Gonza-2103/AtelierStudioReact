import logo from '../../assets/atelierstudiologo.png'
import { Link } from 'react-router-dom'

function MenuAdmin() {
    return (
        <aside className="menu_admin">
            <div className="logo_admin">
                <img src={logo} alt="Logo de AtelierStudio" />
                <h2>AtelierStudio</h2>
                <p>Administración</p>
            </div>

            <nav className="navegacion_admin">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        isActive ? "enlace_admin enlace_activo" : "enlace_admin"
                    }
                >
                    Inicio
                </NavLink>

                <NavLink
                    to="/admin/productos"
                    className={({ isActive }) =>
                        isActive ? "enlace_admin enlace_activo" : "enlace_admin"
                    }
                >
                    Productos
                </NavLink>

                <NavLink
                    to="/admin/usuarios"
                    className={({ isActive }) =>
                        isActive ? "enlace_admin enlace_activo" : "enlace_admin"
                    }
                >
                    Usuarios
                </NavLink>

                <Link to="/" className="enlace_admin volver_tienda">
                    Volver a la tienda
                </Link>

            </nav>
        </aside>
    )
}

export default MenuAdmin