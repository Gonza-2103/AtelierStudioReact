
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

// Formulario reutilizado para crear y editar usuarios
export function FormularioUsuario({ usuarioInicial = null }) {
    const navigate = useNavigate()
    const editando = Boolean(usuarioInicial)

    const [formulario, setFormulario] = useState({
        nombre: usuarioInicial?.nombre || '',
        apellidos: usuarioInicial?.apellidos || '',
        correo: usuarioInicial?.correo || '',
        contrasena: '',
        rol: usuarioInicial?.rol || 'Cliente'
    })

    const [error, setError] = useState('')
    const [tocados, setTocados] = useState({})
    const [enviado, setEnviado] = useState(false)

    // Validaciones de cada campo
    function validarCampo(nombre, valor) {
        const texto = String(valor ?? '').trim()

        switch (nombre) {
            case 'nombre':
            case 'apellidos':
                if (!texto) {
                    return 'Este campo es obligatorio.'
                }

                if (texto.length > 100) {
                    return 'No puede superar los 100 caracteres.'
                }

                return ''

            case 'correo':
                if (!texto) {
                    return 'El correo es obligatorio.'
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
                    return 'Ingresa un correo válido.'
                }

                return ''

            case 'contrasena':
                // La contraseña solo se valida al crear
                if (editando) {
                    return ''
                }

                if (texto.length < 8 || texto.length > 10) {
                    return 'La contraseña debe tener entre 8 y 10 caracteres.'
                }

                return ''

            case 'rol':
                if (
                    !['Cliente', 'Vendedor', 'Administrador'].includes(texto)
                ) {
                    return 'Selecciona un rol válido.'
                }

                return ''

            default:
                return ''
        }
    }

    // Calcular los errores del formulario
    const errores = Object.fromEntries(
        Object.keys(formulario).map(nombre => [
            nombre,
            validarCampo(nombre, formulario[nombre])
        ])
    )

    // Actualizar los campos cuando se escribe
    function cambiarCampo(e) {
        const { name, value } = e.target

        setFormulario(actual => ({
            ...actual,
            [name]: value
        }))

        setTocados(actual => ({
            ...actual,
            [name]: true
        }))

        setError('')
    }

    // Crear o actualizar un usuario
    function guardar(e) {
        e.preventDefault()
        setEnviado(true)

        // Evitar guardar si existen errores
        if (Object.values(errores).some(Boolean)) {
            return
        }

        const datos = {
            ...formulario,
            nombre: formulario.nombre.trim(),
            apellidos: formulario.apellidos.trim(),
            correo: formulario.correo.trim().toLowerCase()
        }

        // Obtener usuarios guardados
        let usuarios = []

        try {
            const guardados = JSON.parse(
                localStorage.getItem('usuarios') || '[]'
            )

            usuarios = Array.isArray(guardados) ? guardados : []
        } catch {
            usuarios = []
        }

        // Validar que el correo no esté repetido
       const correoRepetido = usuarios.some(usuario =>
            usuario.correo?.trim().toLowerCase() === datos.correo &&
            (!editando || String(usuario.id) !== String(usuarioInicial.id))
        )

        if (correoRepetido) {
            setError('Ya existe un usuario con ese correo.')
            return
        }

        if (editando) {
            // Editar usuario sin modificar su contraseña
            usuarios = usuarios.map(usuario =>
                String(usuario.id) === String(usuarioInicial.id)
                    ? {
                        ...usuario,
                        nombre: datos.nombre,
                        apellidos: datos.apellidos,
                        correo: datos.correo,
                        rol: datos.rol
                    }
                    : usuario
            )
        } else {
            // Crear un usuario nuevo
            usuarios.push({
                ...datos,
                id: Date.now()
            })
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios))

        // Volver al listado
        navigate('/admin/usuarios')
    }

    return (
        <div className="contenedor_formulario">
            <h2>
                {editando ? 'Editar usuario' : 'Nuevo usuario'}
            </h2>

            <form
                onSubmit={guardar}
                noValidate
                className="formulario_usuario_horizontal"
            >
                {[
                    ['nombre', 'Nombre', 'text'],
                    ['apellidos', 'Apellidos', 'text'],
                    ['correo', 'Correo', 'email'],
                    ...(!editando
                        ? [['contrasena', 'Contraseña', 'password']]
                        : [])
                ].map(([nombre, etiqueta, tipo]) => (
                    <div
                    className="fila_campo_horizontal"

                        key={nombre}
                    >
                        <label
                            htmlFor={nombre}
                            className="form-label"
                        >
                            {etiqueta}
                        </label>

                        <input
                            id={nombre}
                            name={nombre}
                            type={tipo}
                            className={
                                'form-control' +
                                ((tocados[nombre] || enviado) && errores[nombre]
                                    ? ' is-invalid'
                                    : '')
                            }
                            value={formulario[nombre]}
                            onChange={cambiarCampo}
                            aria-invalid={Boolean(
                                (tocados[nombre] || enviado) && errores[nombre]
                            )}
                        />

                        {(tocados[nombre] || enviado) && errores[nombre] && (
                            <div
                                className="invalid-feedback d-block"
                                role="alert"
                            >
                                {errores[nombre]}
                            </div>
                        )}
                    </div>
                ))}

                <div className="col-12 col-md-6">
                    <label
                        htmlFor="rol"
                        className="form-label"
                    >
                        Rol
                    </label>

                    <select
                        id="rol"
                        name="rol"
                        className="form-select"
                        value={formulario.rol}
                        onChange={cambiarCampo}
                    >
                        <option value="Cliente">Cliente</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Administrador">Administrador</option>
                    </select>

                    {(tocados.rol || enviado) && errores.rol && (
                        <div
                            className="invalid-feedback d-block"
                            role="alert"
                        >
                            {errores.rol}
                        </div>
                    )}
                </div>

                {error && (
                    <p
                        className="text-danger"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                <div className="col-12 d-flex gap-2">
                    <button
                        type="submit"
                        className="btn btn-dark"
                    >
                        {editando
                            ? 'Guardar cambios'
                            : 'Crear usuario'}
                    </button>

                    <Link
                        to="/admin/usuarios"
                        className="btn btn-secondary"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    )
}

// Página para crear un usuario
function NuevoUsuario() {
    return (
        <EstructuraAdmin>
            <section className="seccion_admin">
                <FormularioUsuario />
            </section>
        </EstructuraAdmin>
    )
}

export default NuevoUsuario
