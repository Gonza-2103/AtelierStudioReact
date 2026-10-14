
import { Link, useParams } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

function DetalleUsuario() {
    const { id } = useParams()

    let usuarios = []

    try {
        const guardados = JSON.parse(
            localStorage.getItem('usuarios') || '[]'
        )
        usuarios = Array.isArray(guardados) ? guardados : []
    } catch {
        usuarios = []
    }

    const usuario = usuarios.find(
        u => String(u.id) === String(id)
    )

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">

                <div className="encabezado_admin">
                    <h1>Detalle del usuario</h1>
                    <p>Información del usuario registrado.</p>
                </div>

                {usuario ? (
                    <div className="contenedor_formulario">
                        <p><strong>Nombre:</strong> {usuario.nombre}</p>
                        <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
                        <p><strong>Correo:</strong> {usuario.correo}</p>
                        <p><strong>Rol:</strong> {usuario.rol}</p>
                    </div>
                ) : (
                    <p>Usuario no encontrado.</p>
                )}

                <Link
                    to="/admin/usuarios"
                    className="btn btn-secondary"
                >
                    Volver a usuarios
                </Link>

            </section>
        </EstructuraAdmin>
    )
}

export default DetalleUsuario
