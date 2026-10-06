import { useState, useEffect } from 'react'
import AccionesProducto from './AccionesProducto'

// Productos que aparecerán si todavía no tenemos datos guardados
const productosIniciales = [
    {
        id: 1,
        codigo: "ART001",
        nombre: "Retrato Mar y Playa",
        categoria: "Pintura",
        precio: 45000,
        stock: 10
    },
    {
        id: 2,
        codigo: "ART002",
        nombre: "Caballero con Pipa",
        categoria: "Pintura",
        precio: 55000,
        stock: 5
    }
]

function TablaProductos() {

    // Recuperamos los productos guardados o usamos los iniciales
    const [productos, setProductos] = useState(() => {

        const productosGuardados = localStorage.getItem('productos')

        if (productosGuardados !== null) {
            return JSON.parse(productosGuardados)
        }

        return productosIniciales

    })

    // Guardamos los productos cuando cambian
    useEffect(() => {

        localStorage.setItem(
            'productos',
            JSON.stringify(productos)
        )

    }, [productos])


    // Agregar un producto de prueba
    function agregarProducto(datosFormulario) {

    const nuevoProducto = {
        ...datosFormulario,
        id: Date.now(),
        precio: Number(datosFormulario.precio),
        stock: Number(datosFormulario.stock)
    }

    setProductos([...productos, nuevoProducto])
}


    // Eliminar un producto según su ID
    function eliminarProducto(id) {

        const productosActualizados = productos.filter(
            producto => producto.id !== id
        )

        setProductos(productosActualizados)

    }

    return (
        <>           
            <table className="tabla_admin">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.stock}</td>

                            <td>
                                <AccionesProducto
                                    id={producto.id}
                                    alEliminar={eliminarProducto}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TablaProductos