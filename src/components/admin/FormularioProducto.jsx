import { useState } from 'react'

const categorias = ['Óleo sobre Lienzo', 'Acuarela y Papel', 'Fotografía de Autor']
const vacio = { codigo: '', nombre: '', descripcion: '', medidas: '', categoria: '', precio: '', stock: '', stockCritico: '', imagen: '' }

function validar(campo, valor, datos, productos, idActual) {
    const texto = String(valor ?? '').trim()
    switch (campo) {
        case 'codigo':
            if (!texto) return 'El código es obligatorio.'
            if (texto.length < 3) return 'El código debe contener al menos 3 caracteres.'
            if (productos.some(p => String(p.id) !== String(idActual ?? '') && String(p.codigo).trim().toUpperCase() === texto.toUpperCase())) return 'Ya existe un producto con este código.'
            return ''
        case 'nombre':
            if (!texto) return 'El nombre es obligatorio.'
            return texto.length > 100 ? 'El nombre no puede superar los 100 caracteres.' : ''
        case 'descripcion': return texto.length > 500 ? 'La descripción no puede superar los 500 caracteres.' : ''
        case 'medidas': return texto ? '' : 'Las medidas son obligatorias.'
        case 'categoria': return categorias.includes(texto) || (datos.categoria === texto && texto && !categorias.includes(texto)) ? '' : 'Debe seleccionar una categoría.'
        case 'precio': return texto !== '' && Number.isFinite(Number(texto)) && Number(texto) >= 0 ? '' : 'El precio debe ser un número igual o superior a 0.'
        case 'stock': return texto !== '' && Number.isInteger(Number(texto)) && Number(texto) >= 0 ? '' : 'El stock debe ser un número entero igual o superior a 0.'
        case 'stockCritico': return texto === '' || (Number.isInteger(Number(texto)) && Number(texto) >= 0) ? '' : 'El stock crítico debe ser un número entero igual o superior a 0.'
        default: return ''
    }
}

function FormularioProducto({ alGuardar, productoInicial = null }) {
    const [formulario, setFormulario] = useState(() => ({ ...vacio, ...productoInicial }))
    const [tocados, setTocados] = useState({})
    const [enviado, setEnviado] = useState(false)
    const [errorGeneral, setErrorGeneral] = useState('')
    const editar = Boolean(productoInicial)
    const productos = (() => { try { return JSON.parse(localStorage.getItem('productos') || '[]') } catch { return [] } })()
    const campos = ['codigo', 'nombre', 'descripcion', 'medidas', 'categoria', 'precio', 'stock', 'stockCritico', 'imagen']
    const errores = Object.fromEntries(campos.map(c => [c, validar(c, formulario[c], formulario, productos, productoInicial?.id)]))

    function manejarCambio(e) {
        const { name, value } = e.target
        setFormulario(actual => ({ ...actual, [name]: value }))
        setTocados(actual => ({ ...actual, [name]: true }))
        setErrorGeneral('')
    }

    function manejarEnvio(e) {
        e.preventDefault()
        setEnviado(true)
        if (Object.values(errores).some(Boolean)) return
        const datos = {
            ...formulario,
            codigo: formulario.codigo.trim().toUpperCase(),
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            medidas: formulario.medidas.trim(),
            imagen: formulario.imagen.trim(),
            precio: Number(formulario.precio),
            stock: Number(formulario.stock),
            stockCritico: formulario.stockCritico === '' ? '' : Number(formulario.stockCritico)
        }
        const resultado = alGuardar(datos)
        if (resultado === false) { setErrorGeneral('No se pudo guardar: revisa si el código está repetido.'); return }
        if (!editar) { setFormulario(vacio); setTocados({}); setEnviado(false) }
    }

    function campo(nombre, etiqueta, tipo = 'text', obligatorio = false, maxLength) {
        return <div className="mb-3" key={nombre}>
            <label htmlFor={'producto-' + nombre} className="form-label">{etiqueta}</label>
            <input id={'producto-' + nombre} name={nombre} type={tipo} className={'form-control' + ((tocados[nombre] || enviado) && errores[nombre] ? ' is-invalid' : '')}
                value={formulario[nombre] ?? ''} onChange={manejarCambio} maxLength={maxLength} aria-invalid={Boolean((tocados[nombre] || enviado) && errores[nombre])} />
            {(tocados[nombre] || enviado) && errores[nombre] && <div className="text-danger small" role="alert">{errores[nombre]}</div>}
        </div>
    }

    return <form onSubmit={manejarEnvio} noValidate className="formulario_producto_admin">
        <h2>{editar ? 'Editar producto' : 'Nuevo producto'}</h2>
        {errorGeneral && <p className="text-danger" role="alert">{errorGeneral}</p>}
        {campo('codigo', 'Código', 'text', true)}
        {campo('nombre', 'Nombre', 'text', true)}
        <div className="mb-3"><label htmlFor="producto-descripcion" className="form-label">Descripción</label>
            <textarea id="producto-descripcion" className="form-control" name="descripcion" value={formulario.descripcion ?? ''} onChange={manejarCambio} />
            {(tocados.descripcion || enviado) && errores.descripcion && <div className="text-danger small" role="alert">{errores.descripcion}</div>}
        </div>
        {campo('medidas', 'Medidas', 'text', true)}
        <div className="mb-3"><label htmlFor="producto-categoria" className="form-label">Categoría</label>
            <select id="producto-categoria" className="form-select" name="categoria" value={formulario.categoria ?? ''} onChange={manejarCambio}>
                <option value="">Seleccione categoría</option>
                {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                {formulario.categoria && !categorias.includes(formulario.categoria) && <option value={formulario.categoria}>{formulario.categoria}</option>}
            </select>
            {(tocados.categoria || enviado) && errores.categoria && <div className="text-danger small" role="alert">{errores.categoria}</div>}
        </div>
        {campo('precio', 'Precio', 'number', true)}
        {campo('stock', 'Stock', 'number', true)}
        {campo('stockCritico', 'Stock crítico (opcional)', 'number')}
        {campo('imagen', 'Ruta o URL de imagen')}
        <button type="submit" className="btn btn-dark">{editar ? 'Guardar cambios' : 'Guardar producto'}</button>
    </form>
}

export default FormularioProducto
