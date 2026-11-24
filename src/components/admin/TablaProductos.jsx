import { useEffect, useState } from 'react'
import AccionesProducto from './AccionesProducto'
import BotonNuevoProducto from './BotonNuevoProducto'
import { obtenerProductos, eliminarProducto as eliminarProductoApi } from '../../services/productosApi'

function TablaProductos({ productos: productosProp }) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(productosProp === undefined)
    const [error, setError] = useState('')
    const [busqueda, setBusqueda] = useState('')
    const [soloCriticos, setSoloCriticos] = useState(false)

    useEffect(() => {
        if (productosProp !== undefined) {
            return
        }

        async function cargarProductos() {
            try {
                setCargando(true)
                setError('')
                const datos = await obtenerProductos()
                setProductos(Array.isArray(datos) ? datos : [])
            } catch (err) {
                console.error('Error al cargar productos desde AWS:', err)
                setError('No se pudieron cargar los productos desde el servidor.')
            } finally {
                setCargando(false)
            }
        }

        cargarProductos()
    }, [productosProp])

    const listado = productosProp ?? productos

    async function eliminarProducto(id) {
        if (!window.confirm('¿Eliminar este producto?')) {
            return
        }

        try {
            await eliminarProductoApi(id)
            setProductos(actuales =>
                actuales.filter(p => String(p.id) !== String(id))
            )
        } catch (err) {
            console.error('Error al eliminar producto:', err)
            setError('No se pudo eliminar el producto en el servidor.')
        }
    }

    const visibles = listado.filter(producto => {
        const codigo = producto.codigo ?? `ID-${producto.id}`
        const nombre = producto.titulo ?? producto.nombre ?? ''
        const categoria = producto.tecnica ?? producto.categoria ?? ''

        const texto = `${codigo} ${nombre} ${categoria}`.toLowerCase()
        const coincide = texto.includes(busqueda.toLowerCase().trim())

        const stockCritico = Number(producto.stockCritico ?? 2)
        const critico = stockCritico > 0 && Number(producto.stock) <= stockCritico

        return coincide && (!soloCriticos || critico)
    })

    return (
        <>
            <div className="buscador_productos_admin">
                <input
                    type="search"
                    className="form-control"
                    aria-label="Buscar productos"
                    placeholder="Buscar por código, título o técnica"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>

            <div className="barra_acciones_productos">
                <label className="filtro_stock_admin">
                    <input
                        type="checkbox"
                        checked={soloCriticos}
                        onChange={e => setSoloCriticos(e.target.checked)}
                    />
                    <span>Solo stock crítico</span>
                </label>

                <BotonNuevoProducto />
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-hover tabla_admin">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cargando ? (
                            <tr>
                                <td colSpan="7">Cargando productos desde AWS...</td>
                            </tr>
                        ) : visibles.length === 0 ? (
                            <tr>
                                <td colSpan="7">No se encontraron productos.</td>
                            </tr>
                        ) : (
                            visibles.map(producto => {
                                const codigo = producto.codigo ?? `ID-${producto.id}`
                                const nombre = producto.titulo ?? producto.nombre ?? ''
                                const categoria = producto.tecnica ?? producto.categoria ?? ''
                                const stockCritico = Number(producto.stockCritico ?? 2)
                                const esCritico =
                                    stockCritico > 0 && Number(producto.stock) <= stockCritico

                                return (
                                    <tr key={producto.id}>
                                        <td>{codigo}</td>
                                        <td>{nombre}</td>
                                        <td>{categoria}</td>
                                        <td>
                                            ${Number(producto.precio ?? 0).toLocaleString('es-CL')}
                                        </td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            {esCritico ? (
                                                <span className="badge text-bg-warning">
                                                    Stock crítico
                                                </span>
                                            ) : (
                                                'Disponible'
                                            )}
                                        </td>
                                        <td>
                                            <AccionesProducto
                                                id={producto.id}
                                                alEliminar={eliminarProducto}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TablaProductos