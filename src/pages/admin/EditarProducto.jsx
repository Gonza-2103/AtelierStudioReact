import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { useNavigate } from 'react-router-dom'
import FormularioProducto from '../../components/admin/FormularioProducto'

function EditarProducto() {
    const navigate = useNavigate()

    function guardarProducto(datosFormulario) {

        const productosGuardados = localStorage.getItem('productos')
        const productos = productosGuardados
            ? JSON.parse(productosGuardados)
            : []

        const productoEditado = {
            ...datosFormulario,
            id: Number(datosFormulario.id),
            precio: Number(datosFormulario.precio),
            stock: Number(datosFormulario.stock)
        }

        productos.push(productoEditado)

        localStorage.setItem(
            'productos',
            JSON.stringify(productos)
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
                    <FormularioProducto alGuardar={guardarProducto} />
                </div>

            </section>

        </EstructuraAdmin>
    )
}

export default EditarProducto