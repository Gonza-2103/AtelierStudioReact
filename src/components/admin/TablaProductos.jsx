
import { useEffect, useState } from 'react'
import AccionesProducto from './AccionesProducto'

import foto1 from '../../assets/fotoarte1.jpg'
import foto2 from '../../assets/fotoarte2.jpg'
import foto3 from '../../assets/fotoarte3.png'
import foto4 from '../../assets/fotoarte4.png'

// Productos originales de la tienda
const iniciales = [
    {
        id: 1,
        codigo: 'ART001',
        nombre: "Cuadro 'Mar y Playa'",
        descripcion: 'Fotografía aérea en plano cenital que captura el contraste entre las aguas turquesas del océano y la orilla de arena blanca, destacando el movimiento de la espuma de las olas rompiendo suavemente en la costa.',
        categoria: 'Fotografía Artística',
        precio: 45000,
        stock: 10,
        stockCritico: 2,
        imagen: foto1
    },
    {
        id: 2,
        codigo: 'ART002',
        nombre: "Retrato 'Caballero con Pipa'",
        descripcion: 'Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva, con una pipa humeante en la boca y herramientas de red, con un fondo de playa, cielo azul y mar abierto.',
        categoria: 'Pintura al Óleo',
        precio: 60000,
        stock: 8,
        stockCritico: 2,
        imagen: foto2
    },
    {
        id: 3,
        codigo: 'ART003',
        nombre: "Cuadro 'Paisaje de Montaña'",
        descripcion: 'Pintura paisajística tradicional al óleo que muestra una cordillera alpina nevada reflejada en un lago sereno de aguas cristalinas, flanqueado por densos bosques de coníferas bajo un cielo parcialmente nublado.',
        categoria: 'Pintura al Óleo',
        precio: 48000,
        stock: 6,
        stockCritico: 2,
        imagen: foto3
    },
    {
        id: 4,
        codigo: 'ART004',
        nombre: "Retrato 'Gato entre Sombras'",
        descripcion: 'Acuarela luminosa que ilustra a un gato atigrado de pelaje naranja y blanco sentado en un escalón de piedra, envuelto en un marcado juego de luces solares directas y sombras violáceas proyectadas por la vegetación.',
        categoria: 'Acuarela y Técnica Mixta',
        precio: 72000,
        stock: 6,
        stockCritico: 2,
        imagen: foto4
    }
]

function obtenerProductos() {
    try {
        const guardados = JSON.parse(
            localStorage.getItem('productos') || 'null'
        )

        // Primera carga: usar los cuatro productos originales
        if (guardados === null) {
            return iniciales
        }

        if (!Array.isArray(guardados)) {
            return iniciales
        }

        // Conservar los productos ya guardados
        // y completar los datos que les falten
        return guardados.map(producto => {
            const original = iniciales.find(
                p => p.codigo === producto.codigo
            )

            if (!original) {
                return producto
            }

            return {
                ...original,
                ...producto,
                descripcion: producto.descripcion || original.descripcion,
                imagen: producto.imagen || original.imagen,
                
            }
        })
    } catch {
        return iniciales
    }
}

function TablaProductos({ productos: productosProp }) {
    const [productos, setProductos] = useState(obtenerProductos)
    const [busqueda, setBusqueda] = useState('')
    const [soloCriticos, setSoloCriticos] = useState(false)

    useEffect(() => {
        if (productosProp === undefined) {
            localStorage.setItem(
                'productos',
                JSON.stringify(productos)
            )
        }
    }, [productos, productosProp])

    const listado = productosProp ?? productos

    function eliminarProducto(id) {
        if (!window.confirm('¿Eliminar este producto?')) {
            return
        }

        setProductos(actuales =>
            actuales.filter(p => String(p.id) !== String(id))
        )
    }

    const visibles = listado.filter(producto => {
        const texto = `
            ${producto.codigo}
            ${producto.nombre}
            ${producto.categoria}
        `.toLowerCase()

        const coincide = texto.includes(
            busqueda.toLowerCase().trim()
        )

        const stockCritico = Number(producto.stockCritico ?? 0)

        const critico = stockCritico > 0 &&
            Number(producto.stock) <= stockCritico

        return coincide && (!soloCriticos || critico)
    })

    return (
        <>
            <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
                <input
                    className="form-control"
                    style={{ maxWidth: 340 }}
                    aria-label="Buscar productos"
                    placeholder="Buscar por código, nombre o categoría"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />

                <label className="filtro_stock_admin">
                    <input
                        type="checkbox"
                        checked={soloCriticos}
                        onChange={e => setSoloCriticos(e.target.checked)}
                    />
                    <span>Solo stock crítico</span>
                </label>
            </div>

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
                        {visibles.map(producto => {
                            const stockCritico = Number(
                                producto.stockCritico ?? 0
                            )

                            const esCritico = stockCritico > 0 &&
                                Number(producto.stock) <= stockCritico

                            return (
                                <tr key={producto.id}>
                                    <td>{producto.codigo}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.categoria}</td>

                                    <td>
                                        ${Number(producto.precio).toLocaleString('es-CL')}
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
                        })}

                        {visibles.length === 0 && (
                            <tr>
                                <td colSpan="7">
                                    No se encontraron productos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TablaProductos
