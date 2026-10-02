import { useState } from 'react'


function TablaProductos() {
    
    const [productos, setProductos] = useState([
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
])
    return (
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
                        <td>Editar | Eliminar</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TablaProductos