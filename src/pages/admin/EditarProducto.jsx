import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import FormularioProducto from '../../components/admin/FormularioProducto'
import { obtenerProductoPorId, actualizarProducto } from '../../services/productosApi'

function EditarProducto() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [producto, setProducto] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [errorServidor, setErrorServidor] = useState('')

    useEffect(() => {
        async function cargarProducto() {
            try {
                setCargando(true)
                const data = await obtenerProductoPorId(id)
                setProducto({
                    ...data,
                    nombre: data.titulo ?? data.nombre ?? '',
                    categoria: data.tecnica ?? data.categoria ?? '',
                    descripcion: data.descripcion || '',
                    imagen: data.imagen || '',
                    stockCritico: data.stockCritico ?? 0
                })
            } catch (err) {
                console.error('Error al cargar producto:', err)
                setErrorServidor('No se pudo cargar el producto desde AWS.')
            } finally {
                setCargando(false)
            }
        }
        cargarProducto()
    }, [id])

    async function guardarCambios(datosFormulario) {
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
            await actualizarProducto(id, payload)
            navigate('/admin/productos')
            return true
        } catch (err) {
            console.error('Error al actualizar producto:', err)
            setErrorServidor('No se pudieron guardar los cambios en el servidor.')
            return false
        }
    }

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">
                <h1>Editar producto</h1>
                <p>Modificación de la información de una obra.</p>

                {errorServidor && (
                    <div className="alert alert-danger" role="alert">
                        {errorServidor}
                    </div>
                )}

                <div className="contenedor_formulario">
                    {cargando ? (
                        <p>Cargando datos del producto...</p>
                    ) : producto ? (
                        <FormularioProducto
                            key={id}
                            productoInicial={producto}
                            alGuardar={guardarCambios}
                        />
                    ) : (
                        <p>Producto no encontrado.</p>
                    )}
                </div>
            </section>
        </EstructuraAdmin>
    )
}

export default EditarProducto