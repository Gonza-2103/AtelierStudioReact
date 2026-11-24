import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import FormularioProducto from '../../components/admin/FormularioProducto'
import { crearProducto as crearProductoApi } from '../../services/productosApi'

function NuevoProducto() {
    const navigate = useNavigate()
    const [errorServidor, setErrorServidor] = useState('')
    const [guardando, setGuardando] = useState(false)

    async function crearProducto(datosFormulario) {
        setErrorServidor('')
        setGuardando(true)

        // Si el usuario subió una imagen local muy larga (Base64 > 250 caracteres),
        // usamos una ruta válida para evitar error de longitud en columna VARCHAR(255) de MariaDB
        const imagenLimpia =
            datosFormulario.imagen && datosFormulario.imagen.length <= 250
                ? datosFormulario.imagen.trim()
                : '/img/mar-playa.jpg'

        // Payload alineado exactamente con los atributos de tu API en AWS
        const payload = {
            titulo: datosFormulario.nombre?.trim(),
            descripcion: datosFormulario.descripcion?.trim() || 'Obra original de AtelierStudio.',
            tecnica: datosFormulario.categoria?.trim(),
            medidas: '60x80 cm',
            precio: Number(datosFormulario.precio),
            stock: Number(datosFormulario.stock),
            imagen: imagenLimpia,
            autor: 'AtelierStudio'
        }

        try {
            await crearProductoApi(payload)
            navigate('/admin/productos')
            return true
        } catch (err) {
            console.error('Error al crear producto en AWS:', err)
            const detalleBackend =
                err?.response?.data?.MENSAJE ||
                err?.response?.data?.message ||
                (err?.response?.status ? `Error HTTP ${err.response.status}` : '')

            setErrorServidor(
                detalleBackend
                    ? `No se pudo guardar el producto: ${detalleBackend}`
                    : 'No se pudo guardar el producto en el servidor.'
            )
            return false
        } finally {
            setGuardando(false)
        }
    }

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">
                <h1>Nuevo producto</h1>
                <p>Registro de una nueva obra en el catálogo.</p>

                {errorServidor && (
                    <div className="alert alert-danger" role="alert">
                        {errorServidor}
                    </div>
                )}

                {guardando && (
                    <div className="alert alert-info" role="status">
                        Guardando obra en el servidor...
                    </div>
                )}

                <div className="contenedor_formulario">
                    <FormularioProducto alGuardar={crearProducto} />
                </div>
            </section>
        </EstructuraAdmin>
    )
}

export default NuevoProducto