import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { useParams, useNavigate } from 'react-router-dom'
import FormularioProducto from '../../components/admin/FormularioProducto'

function EditarProducto() {

    const { id } = useParams()
    const navigate = useNavigate()

    const productos = JSON.parse(
        localStorage.getItem('productos') || '[]'
    )

    const producto = productos.find(
        p => String(p.id) === id
    )

    function guardarCambios(datosFormulario) {
    
    const codigoRepetido = productos.some(
        p =>
            String(p.id) !== id &&
            p.codigo.toUpperCase() ===
            datosFormulario.codigo.trim().toUpperCase()
    )

    if (codigoRepetido) {
        alert('Ya existe otro producto con ese código')
        return
    }

    const productosActualizados = productos.map(p =>
        String(p.id) === id
            ? {
                ...p,
                ...datosFormulario,
                precio: Number(datosFormulario.precio),
                stock: Number(datosFormulario.stock)
            }
            : p
    )

    localStorage.setItem(
        'productos',
        JSON.stringify(productosActualizados)
    )

    navigate('/admin/productos')
}

    return (
        <EstructuraAdmin>

            <section className="seccion_admin">

                <h1>Editar producto</h1>

                <p>
                    Modificación de la información de una obra.
                </p>

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