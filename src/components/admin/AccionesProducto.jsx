import { Link } from 'react-router-dom'
function AccionesProducto({ id, alEliminar }) {
  return <div className="acciones_producto d-flex flex-column gap-2">
    <Link className="btn btn-sm btn-outline-secondary" to={`/admin/productos/detalle/${id}`}>Ver detalle</Link>
    <Link className="btn btn-sm btn-outline-secondary" to={`/admin/productos/editar/${id}`}>Editar</Link>
    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => alEliminar(id)}>Eliminar</button>
  </div>
}
export default AccionesProducto
