import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { FormularioUsuario } from './NuevoUsuario'

function EditarUsuario() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState(null)

   useEffect(() => {
        const obtenerUsuario = async () => {
            try {
                const respuesta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/usuarios/${id}`)

                if (respuesta.ok) {
                    const datos = await respuesta.json()
                    setUsuario(datos)
                }
            } catch (error) {
                console.error('Error al obtener el usuario:', error)
            }
        }

        obtenerUsuario()
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
