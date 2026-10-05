import { useState } from 'react'

function FormularioProducto({ alGuardar }) {

    const [formulario, setFormulario] = useState({
        codigo: '',
        nombre: '',
        categoria: '',
        precio: '',
        stock: ''
    })

    function manejarCambio(e) {

        const { name, value } = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    function manejarEnvio(e) {
        e.preventDefault()

        alGuardar(formulario)

        setFormulario({
            codigo: '',
            nombre: '',
            categoria: '',
            precio: '',
            stock: ''
        })
    }

    return (
        <form onSubmit={manejarEnvio}>

            <h2>Nuevo producto</h2>

            <input
                name="codigo"
                placeholder="Código"
                value={formulario.codigo}
                onChange={manejarCambio}
                required
            />

            <input
                name="nombre"
                placeholder="Nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
            />

            <select
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
                required
            >
                <option value="">Seleccione categoría</option>
                <option value="Óleo sobre Lienzo">Óleo sobre Lienzo</option>
                <option value="Acuarela y Papel">Acuarela y Papel</option>
                <option value="Fotografía de Autor">Fotografía de Autor</option>
            </select>

            <input
                type="number"
                name="precio"
                placeholder="Precio"
                min="1"
                value={formulario.precio}
                onChange={manejarCambio}
                required
            />

            <input
                type="number"
                name="stock"
                placeholder="Stock"
                min="0"
                value={formulario.stock}
                onChange={manejarCambio}
                required
            />

            <button type="submit">
                Guardar producto
            </button>

        </form>
    )
}

export default FormularioProducto