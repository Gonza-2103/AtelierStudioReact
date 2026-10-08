import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

function DetalleProducto() {

    const { id } = useParams()

    const productos = JSON.parse(
        localStorage.getItem('productos') || '[]'
    )

    const producto = productos.find(
        p => String(p.id) === id
    )

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">

                <h1>Detalle del producto</h1>

                {producto ? (
                    <div className="contenedor_formulario">
                        <p><strong>Código:</strong> {producto.codigo}</p>
                        <p><strong>Nombre:</strong> {producto.nombre}</p>
                        <p><strong>Categoría:</strong> {producto.categoria}</p>
                        <p><strong>Precio:</strong> ${producto.precio}</p>
                        <p><strong>Stock:</strong> {producto.stock}</p>
                    </div>
                ) : (
                    <p>Producto no encontrado.</p>
                )}

                <Link to="/admin/productos">
                    Volver a productos
                </Link>

            </section>
        </EstructuraAdmin>
    )
}

export default DetalleProducto