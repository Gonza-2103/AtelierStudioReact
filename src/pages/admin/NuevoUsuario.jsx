import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import { actualizarUsuario, crearUsuario } from '../../services/usuariosApi'

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
    async function guardar(e) {
    e.preventDefault()
    setEnviado(true)
    setError('')

    if (Object.values(errores).some(Boolean)) {
        return
    }

    const datos = {
        nombre: formulario.nombre.trim(),
        apellidos: formulario.apellidos.trim(),
        correo: formulario.correo.trim().toLowerCase(),
        rol: formulario.rol
    }

    if (!editando) {
        datos.contrasena = formulario.contrasena
    }

    try {
        if (editando) {
            await actualizarUsuario(usuarioInicial.id, datos)
        } else {
            await crearUsuario(datos)
        }

        navigate('/admin/usuarios')
    } catch (error) {
        console.error('Error al guardar el usuario:', error)
        setError(error.message || 'No se pudo conectar con la API de usuarios.')
    }
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
