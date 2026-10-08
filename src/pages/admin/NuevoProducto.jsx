import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import FormularioProducto from '../../components/admin/FormularioProducto'
import { useNavigate } from 'react-router-dom'

function NuevoProducto() {
    const navigate = useNavigate()

<<<<<<< HEAD
    function guardarProducto(datosFormulario) {

        const productosGuardados = localStorage.getItem('productos')

        const productos = productosGuardados
            ? JSON.parse(productosGuardados)
            : []
    

        const nuevoProducto = {
            ...datosFormulario,
            id: Date.now(),
            precio: Number(datosFormulario.precio),
            stock: Number(datosFormulario.stock)
        }

        const productosActualizados = [...productos, nuevoProducto]

        const codigoRepetido = productos.some(
            producto => producto.codigo === datosFormulario.codigo
        )

        if (codigoRepetido) {
            alert('Ya existe un producto con ese código')
            return
}

        localStorage.setItem(
            'productos',
            JSON.stringify(productosActualizados)
        )

        navigate('/admin/productos')
    }
=======
    const navigate = useNavigate()

    function guardarProducto(datosFormulario) {

    const productosGuardados = localStorage.getItem('productos')
    const productos = productosGuardados
        ? JSON.parse(productosGuardados)
        : []

    const nuevoProducto = {
        ...datosFormulario,
        id: Date.now(),
        precio: Number(datosFormulario.precio),
        stock: Number(datosFormulario.stock)
    }

    productos.push(nuevoProducto)

    localStorage.setItem(
        'productos',
        JSON.stringify(productos)
    )

    navigate('/admin/productos')
}

>>>>>>> 51355f5f9874c4190f96cdd1337e72bdffab737a
    return (
        <EstructuraAdmin>

            <section className="seccion_admin">

                <h1>Nuevo producto</h1>

                <p>
                    Completa la información para registrar
                    una nueva obra en AtelierStudio.
                </p>

                <div className="contenedor_formulario">
                    <FormularioProducto alGuardar={guardarProducto} />
                </div>

            </section>

        </EstructuraAdmin>
    )
}

export default NuevoProducto