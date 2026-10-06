import { Link } from 'react-router-dom'

function BotonNuevoProducto() {

    return (
        <Link
            to="/admin/productos/nuevo"
            className="boton_admin"
        >
            Nuevo producto
        </Link>
    )
}

export default BotonNuevoProducto