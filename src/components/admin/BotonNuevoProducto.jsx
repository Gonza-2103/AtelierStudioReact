import { Link } from 'react-router-dom'

function BotonNuevoProducto() {

    return (
        <Link
            to="/admin/productos/nuevo"
            className="btn btn-dark"
        >
            Nuevo producto
        </Link>
    )
}

export default BotonNuevoProducto