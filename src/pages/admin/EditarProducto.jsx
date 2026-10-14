import { useParams, useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import FormularioProducto from '../../components/admin/FormularioProducto'

function EditarProducto() {
    const { id } = useParams()
    const navigate = useNavigate()

    function obtenerProductos() {
        try {
            return JSON.parse(localStorage.getItem('productos') || '[]')
        } catch {
            return []
        }
    }

    const productos = obtenerProductos()

    const productoGuardado = productos.find(
        p => String(p.id) === String(id)
    )

    const producto = productoGuardado
        ? {
            ...productoGuardado,
            descripcion: productoGuardado.descripcion || '',
            imagen: productoGuardado.imagen || '',
            stockCritico: productoGuardado.stockCritico ?? 0
        }
        : null

    function guardarCambios(datosFormulario) {
        const productosActuales = obtenerProductos()

        const codigoRepetido = productosActuales.some(
            p =>
                String(p.id) !== String(id) &&
                String(p.codigo).trim().toUpperCase() ===
                datosFormulario.codigo.trim().toUpperCase()
        )

        if (codigoRepetido) {
            return false
        }

        const productosActualizados = productosActuales.map(p =>
            String(p.id) === String(id)
                ? {
                    ...p,
                    ...datosFormulario,
                    precio: Number(datosFormulario.precio),
                    stock: Number(datosFormulario.stock),
                    stockCritico: Number(datosFormulario.stockCritico || 0)
                }
                : p
        )

        localStorage.setItem(
            'productos',
            JSON.stringify(productosActualizados)
        )

        navigate('/admin/productos')
        return true
    }

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">
                <h1>Editar producto</h1>
                <p>Modificación de la información de una obra.</p>

                <div className="contenedor_formulario">
                    {producto ? (
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
