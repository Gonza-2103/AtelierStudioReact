import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { obtenerUsuario } from '../../services/usuariosApi'

function DetalleUsuario() {
    const { id } = useParams()
    const [usuario, setUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        let activo = true

        async function cargar() {
            try {
                const datos = await obtenerUsuario(id)

                if (activo) {
                    setUsuario(datos)
                }
            } catch (error) {
                console.error('Error al cargar el usuario:', error)
            } finally {
                if (activo) setCargando(false)
            }
        }

        cargar()

        return () => {
            activo = false
        }
    }, [id])

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
