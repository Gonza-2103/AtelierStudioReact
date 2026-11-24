import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import FormularioProducto from '../../components/admin/FormularioProducto'
import { crearProducto as crearProductoApi } from '../../services/productosApi'

function NuevoProducto() {
    const navigate = useNavigate()
    const [errorServidor, setErrorServidor] = useState('')

    async function crearProducto(datosFormulario) {
        setErrorServidor('')

        const payload = {
            codigo: datosFormulario.codigo?.trim(),
            titulo: datosFormulario.nombre?.trim(),
            nombre: datosFormulario.nombre?.trim(),
            descripcion: datosFormulario.descripcion?.trim() || '',
            tecnica: datosFormulario.categoria?.trim(),
            categoria: datosFormulario.categoria?.trim(),
            precio: Number(datosFormulario.precio),
            stock: Number(datosFormulario.stock),
            stockCritico: Number(datosFormulario.stockCritico || 0),
            imagen: datosFormulario.imagen || ''
        }

        try {
            await crearProductoApi(payload)
            navigate('/admin/productos')
            return true
        } catch (err) {
            console.error('Error al crear producto en AWS:', err)
            setErrorServidor('No se pudo guardar el producto en el servidor.')
            return false
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

                <div className="contenedor_formulario">
                    <FormularioProducto alGuardar={crearProducto} />
                </div>
            </section>
        </EstructuraAdmin>
    )
}

export default NuevoProducto