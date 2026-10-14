import { Link, useParams } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

function DetalleUsuario() {
    const { id } = useParams()

    const usuarios = JSON.parse(
        localStorage.getItem('usuarios') || '[]'
    )

    const usuario = usuarios.find(
        u => String(u.id) === id
    )

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">
                <h1>Detalle del usuario</h1>

                {usuario ? (
                    <div className="contenedor_formulario">
                        <p><strong>Nombre:</strong> {usuario.nombre}</p>
                        <p><strong>Apellido:</strong> {usuario.apellido}</p>
                        <p><strong>Correo:</strong> {usuario.correo}</p>
                        <p><strong>Rol:</strong> {usuario.rol}</p>
                    </div>
                ) : (
                    <p>Usuario no encontrado.</p>
                )}

                <Link to="/admin/usuarios">
                    Volver a usuarios
                </Link>
            </section>
        </EstructuraAdmin>
    )
}

export default DetalleUsuario