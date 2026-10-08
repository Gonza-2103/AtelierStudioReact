import { Link } from 'react-router-dom'


function AccionesProducto({ id, alEliminar }) {

    return (
        <div className="acciones_producto">

            <Link to={`/admin/productos/detalle/${id}`}>
                Ver detalle
            </Link>

            <Link to={`/admin/productos/editar/${id}`}>
                Editar
            </Link>

            <button onClick={() => alEliminar(id)}>
                Eliminar
            </button>

        </div>
    )
}

export default AccionesProducto