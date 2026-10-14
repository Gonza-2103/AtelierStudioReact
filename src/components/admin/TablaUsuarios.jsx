
import { Link } from 'react-router-dom'

function TablaUsuarios({ usuarios = [], alEditar, alEliminar }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover tabla_admin">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre} {usuario.apellidos}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <Link
                                    to={`/admin/usuarios/detalle/${usuario.id}`}
                                    className="btn btn-sm btn-outline-secondary me-2"
                                >
                                    Ver detalle
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary me-2"
                                    onClick={() => alEditar(usuario)}
                                >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => alEliminar(usuario.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}

                    {usuarios.length === 0 && (
                        <tr>
                            <td colSpan="4">No se encontraron usuarios.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TablaUsuarios
