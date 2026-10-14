
import { useState } from 'react'

const categorias = [
    'Óleo sobre Lienzo',
    'Acuarela y Papel',
    'Fotografía de Autor'
]

const vacio = {
    codigo: '',
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    stock: '',
    stockCritico: '',
    imagen: ''
}

function validar(campo, valor, datos, productos, idActual) {
    const texto = String(valor ?? '').trim()

    switch (campo) {
        case 'codigo':
            if (!texto) {
                return 'El código es obligatorio.'
            }

            if (texto.length < 3) {
                return 'El código debe contener al menos 3 caracteres.'
            }

            if (productos.some(p =>
                String(p.id) !== String(idActual ?? '') &&
                String(p.codigo).trim().toUpperCase() === texto.toUpperCase()
            )) {
                return 'Ya existe un producto con este código.'
            }

            return ''

        case 'nombre':
            if (!texto) {
                return 'El nombre es obligatorio.'
            }

            return texto.length > 100
                ? 'El nombre no puede superar los 100 caracteres.'
                : ''

        case 'descripcion':
            return texto.length > 500
                ? 'La descripción no puede superar los 500 caracteres.'
                : ''


        case 'categoria':
            return categorias.includes(texto) ||
                (datos.categoria === texto && texto)
                ? ''
                : 'Debe seleccionar una categoría.'

        case 'precio':
            return texto !== '' &&
                Number.isFinite(Number(texto)) &&
                Number(texto) >= 0
                ? ''
                : 'El precio debe ser un número igual o superior a 0.'

        case 'stock':
            return texto !== '' &&
                Number.isInteger(Number(texto)) &&
                Number(texto) >= 0
                ? ''
                : 'El stock debe ser un número entero igual o superior a 0.'

        case 'stockCritico':
            return texto === '' ||
                (Number.isInteger(Number(texto)) && Number(texto) >= 0)
                ? ''
                : 'El stock crítico debe ser un número entero igual o superior a 0.'

        default:
            return ''
    }
}

function FormularioProducto({
    alGuardar,
    onSubmit,
    productoInicial = null
}) {
    const [formulario, setFormulario] = useState(() => ({
        ...vacio,
        ...productoInicial
    }))

    const [tocados, setTocados] = useState({})
    const [enviado, setEnviado] = useState(false)
    const [errorGeneral, setErrorGeneral] = useState('')

    const editar = Boolean(productoInicial)

    function obtenerProductos() {
        try {
            const datos = JSON.parse(
                localStorage.getItem('productos') || '[]'
            )

            return Array.isArray(datos) ? datos : []
        } catch {
            return []
        }
    }

    const productos = obtenerProductos()

    const campos = [
        'codigo',
        'nombre',
        'descripcion',
        'categoria',
        'precio',
        'stock',
        'stockCritico',
        'imagen'
    ]

    const errores = Object.fromEntries(
        campos.map(campo => [
            campo,
            validar(
                campo,
                formulario[campo],
                formulario,
                productos,
                productoInicial?.id
            )
        ])
    )

    function manejarCambio(e) {
        const { name, value } = e.target

        setFormulario(actual => ({
            ...actual,
            [name]: value
        }))

        setTocados(actual => ({
            ...actual,
            [name]: true
        }))

        setErrorGeneral('')
    }

    function manejarImagen(e) {
        const archivo = e.target.files[0]

        if (!archivo) return

        const tiposPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if (!tiposPermitidos.includes(archivo.type)) {
            setErrorGeneral('Selecciona una imagen JPG, PNG o WebP.')
            e.target.value = ''
            return
        }

        if (archivo.size > 500 * 1024) {
            setErrorGeneral('La imagen no puede superar los 500 KB.')
            e.target.value = ''
            return
        }

        const lector = new FileReader()

        lector.onload = () => {
            setFormulario(actual => ({
                ...actual,
                imagen: lector.result
            }))

            setTocados(actual => ({
                ...actual,
                imagen: true
            }))

            setErrorGeneral('')
        }

        lector.onerror = () => {
            setErrorGeneral('No se pudo leer la imagen.')
        }

        lector.readAsDataURL(archivo)
    }
    function manejarEnvio(e) {
        e.preventDefault()
        setEnviado(true)

        // Compatibilidad con el testing existente
        if (!alGuardar && onSubmit) {
            onSubmit(e)
            return
        }

        if (Object.values(errores).some(Boolean)) {
            return
        }

        const datos = {
            ...formulario,
            codigo: formulario.codigo.trim().toUpperCase(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            imagen: formulario.imagen.trim(),
            precio: Number(formulario.precio),
            stock: Number(formulario.stock),
            stockCritico: formulario.stockCritico === ''
                ? 0
                : Number(formulario.stockCritico)
        }

        const resultado = alGuardar?.(datos)

        if (resultado === false) {
            setErrorGeneral(
                'No se pudo guardar: revisa si el código está repetido.'
            )
            return
        }

        if (!editar && alGuardar) {
            setFormulario(vacio)
            setTocados({})
            setEnviado(false)
        }
    }

    function campo(nombre, etiqueta, tipo = 'text') {
        const mostrarError = (tocados[nombre] || enviado) &&
            errores[nombre]

        return (
            <div className="fila_campo_horizontal" key={nombre}>
                <label
                    htmlFor={'producto-' + nombre}
                    className="form-label"
                >
                    {etiqueta}
                </label>

                <input
                    id={'producto-' + nombre}
                    name={nombre}
                    type={tipo}
                    className={
                        'form-control' +
                        (mostrarError ? ' is-invalid' : '')
                    }
                    value={formulario[nombre] ?? ''}
                    onChange={manejarCambio}
                    aria-invalid={Boolean(mostrarError)}
                />

                {mostrarError && (
                    <div
                        className="invalid-feedback d-block"
                        role="alert"
                    >
                        {errores[nombre]}
                    </div>
                )}
            </div>
        )
    }

    return (
        <form
            onSubmit={manejarEnvio}
            noValidate
            className="formulario_producto_admin"
        >
            <h2>
                {editar ? 'Editar producto' : 'Nuevo producto'}
            </h2>

            {errorGeneral && (
                <p className="text-danger" role="alert">
                    {errorGeneral}
                </p>
            )}

            {campo('codigo', 'Código')}
            {campo('nombre', 'Nombre')}

            <div className="fila_campo_horizontal">
                <label
                    htmlFor="producto-descripcion"
                    className="form-label"
                >
                    Descripción
                </label>

                <textarea
                    id="producto-descripcion"
                    name="descripcion"
                    className="form-control"
                    value={formulario.descripcion ?? ''}
                    onChange={manejarCambio}
                />

                {(tocados.descripcion || enviado) &&
                    errores.descripcion && (
                        <div
                            className="text-danger small"
                            role="alert"
                        >
                            {errores.descripcion}
                        </div>
                    )}
            </div>

            

            <div className="fila_campo_horizontal">
                <label
                    htmlFor="producto-categoria"
                    className="form-label"
                >
                    Categoría
                </label>

                <select
                    id="producto-categoria"
                    name="categoria"
                    className="form-select"
                    value={formulario.categoria ?? ''}
                    onChange={manejarCambio}
                >
                    <option value="">
                        Seleccione categoría
                    </option>

                    {categorias.map(categoria => (
                        <option
                            key={categoria}
                            value={categoria}
                        >
                            {categoria}
                        </option>
                    ))}

                    {formulario.categoria &&
                        !categorias.includes(formulario.categoria) && (
                            <option value={formulario.categoria}>
                                {formulario.categoria}
                            </option>
                        )}
                </select>

                {(tocados.categoria || enviado) &&
                    errores.categoria && (
                        <div
                            className="text-danger small"
                            role="alert"
                        >
                            {errores.categoria}
                        </div>
                    )}
            </div>

            {campo('precio', 'Precio', 'number')}
            {campo('stock', 'Stock', 'number')}
            {campo('stockCritico', 'Stock crítico (opcional)', 'number')}
            <div className="fila_campo_horizontal">
                <label
                    htmlFor="producto-imagen"
                    className="form-label"
                >
                    Imagen del producto
                </label>

                <input
                    id="producto-imagen"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="form-control"
                    onChange={manejarImagen}
                />

                {formulario.imagen && (
                    <div className="mt-3">
                        <p className="small">Vista previa:</p>

                        <img
                            src={formulario.imagen}
                            alt="Vista previa del producto"
                            style={{
                                width: '180px',
                                height: '180px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="btn btn-dark"
            >
                {editar ? 'Guardar cambios' : 'Guardar producto'}
            </button>
        </form>
    )
}

export default FormularioProducto
