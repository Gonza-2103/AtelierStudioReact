import { useParams, Link } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

function DetalleProducto() {
    const { id } = useParams()

    let productos = []

    try {
        productos = JSON.parse(
            localStorage.getItem('productos') || '[]'
        )
    } catch {
        productos = []
    }

    const producto = productos.find(
        p => String(p.id) === String(id)
    )

    const stockCritico = Number(producto?.stockCritico ?? 0)
    const stock = Number(producto?.stock ?? 0)

    const esCritico = producto &&
        stockCritico > 0 &&
        stock <= stockCritico

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">
                <h1>Detalle del producto</h1>

                {producto ? (
                    <div className="contenedor_formulario">

                        {producto.imagen && (
                            <img
                                src={producto.imagen}
                                alt={producto.nombre}
                                className="img-fluid rounded mb-3"
                                style={{ maxHeight: '250px' }}
                            />
                        )}

                        <p><strong>Código:</strong> {producto.codigo}</p>
                        <p><strong>Nombre:</strong> {producto.nombre}</p>
                        <p><strong>Descripción:</strong> {producto.descripcion || 'Sin descripción registrada'}</p>
                        <p><strong>Categoría:</strong> {producto.categoria}</p>

                        <p>
                            <strong>Precio:</strong> $
                            {Number(producto.precio).toLocaleString('es-CL')}
                        </p>

                        <p><strong>Stock:</strong> {producto.stock}</p>
                        <p><strong>Stock crítico:</strong> {stockCritico}</p>

                        {esCritico && (
                            <p className="text-danger fw-bold">
                                Atención: producto con stock crítico
                            </p>
                        )}

                        <Link
                            to={`/admin/productos/editar/${producto.id}`}
                            className="btn btn-outline-secondary me-2"
                        >
                            Editar producto
                        </Link>
                    </div>
                ) : (
                    <p>Producto no encontrado.</p>
                )}

                <Link
                    to="/admin/productos"
                    className="btn btn-dark mt-3"
                >
                    Volver a productos
                </Link>
            </section>
        </EstructuraAdmin>
    )
}

export default DetalleProducto
