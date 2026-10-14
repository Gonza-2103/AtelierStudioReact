
import { useParams, Link } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { FormularioUsuario } from './NuevoUsuario'

function EditarUsuario() {
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
                {usuario ? (
                    <FormularioUsuario
                        usuarioInicial={usuario}
                    />
                ) : (
                    <>
                        <p>Usuario no encontrado.</p>
                        <Link to="/admin/usuarios">
                            Volver a usuarios
                        </Link>
                    </>
                )}
            </section>
        </EstructuraAdmin>
    )
}

export default EditarUsuario
