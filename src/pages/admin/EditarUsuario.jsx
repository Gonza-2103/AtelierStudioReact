import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { FormularioUsuario } from './NuevoUsuario'
import { obtenerUsuario } from '../../services/usuariosApi'

function EditarUsuario() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState(null)

   useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const datos = await obtenerUsuario(id)
                setUsuario(datos)
            } catch (error) {
                console.error('Error al obtener el usuario:', error)
            }
        }

        cargarUsuario()
    }, [id])

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
