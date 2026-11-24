import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE_URL

const apiUsuarios = axios.create({
    baseURL: BASE
})

export function obtenerToken() {
    return sessionStorage.getItem('token') || localStorage.getItem('token') || ''
}

export function guardarSesion(token, usuario) {
    const sesion = {
        id: usuario?.id,
        nombre: usuario?.nombre,
        apellidos: usuario?.apellidos,
        correo: usuario?.correo,
        rol: usuario?.rol
    }

    if (token) {
        sessionStorage.setItem('token', token)
        localStorage.setItem('token', token)
    }

    sessionStorage.setItem('usuarioActivo', JSON.stringify(sesion))
    localStorage.setItem('usuarioActivo', JSON.stringify(sesion))
    return sesion
}

function cabeceras(json = false) {
    const headers = {}

    if (json) {
        headers['Content-Type'] = 'application/json'
    }

    const token = obtenerToken()
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return headers
}

function extraerMensajeError(error, fallback) {
    const cuerpo = error?.response?.data

    if (cuerpo?.MENSAJE) {
        return cuerpo.MENSAJE
    }

    if (cuerpo?.detalles && typeof cuerpo.detalles === 'object') {
        return Object.values(cuerpo.detalles).join(' ')
    }

    return fallback
}

async function solicitar(ruta, opciones, fallback) {
    try {
        const respuesta = await apiUsuarios({
            url: ruta,
            method: opciones.method || 'GET',
            headers: opciones.headers,
            data: opciones.body ? JSON.parse(opciones.body) : undefined
        })

        if (respuesta.status === 204) {
            return null
        }

        return respuesta.data
    } catch (error) {
        throw new Error(extraerMensajeError(error, fallback))
    }
}

function credencialBasic(correo, contrasena) {
    const bytes = new TextEncoder().encode(`${correo}:${contrasena}`)
    let binario = ''
    bytes.forEach(byte => {
        binario += String.fromCharCode(byte)
    })
    return btoa(binario)
}

export async function iniciarSesion(correo, contrasena) {
    try {
        const login = await apiUsuarios.post('/api/v1/auth/login', {
            correo,
            contrasena
        })
        return login.data
    } catch (error) {
        const cuerpo = error?.response?.data
        if (cuerpo?.MENSAJE) {
            throw new Error(cuerpo.MENSAJE)
        }
        // Si hubo respuesta HTTP sin MENSAJE o error de red, intenta el respaldo Basic
        if (error?.response && error.response.status !== 404) {
            throw new Error(extraerMensajeError(error, 'Correo o contraseña incorrectos.'))
        }
    }

    try {
        const perfil = await apiUsuarios.get(
            `/api/usuarios/correo/${encodeURIComponent(correo)}`,
            {
                headers: {
                    Authorization: `Basic ${credencialBasic(correo, contrasena)}`
                }
            }
        )
        return { usuario: perfil.data }
    } catch {
        throw new Error('Correo o contraseña incorrectos.')
    }
}

export function listarUsuarios() {
    return solicitar(
        '/api/usuarios',
        { headers: cabeceras() },
        'Error en la respuesta del backend'
    )
}

export function obtenerUsuario(id) {
    return solicitar(
        `/api/usuarios/${id}`,
        { headers: cabeceras() },
        'No se pudo obtener el usuario.'
    )
}

export function crearUsuario(datos) {
    return solicitar(
        '/api/usuarios',
        {
            method: 'POST',
            headers: cabeceras(true),
            body: JSON.stringify(datos)
        },
        'No se pudo crear el usuario.'
    )
}

export function actualizarUsuario(id, datos) {
    return solicitar(
        `/api/usuarios/${id}`,
        {
            method: 'PUT',
            headers: cabeceras(true),
            body: JSON.stringify(datos)
        },
        'No se pudo guardar el usuario.'
    )
}

export function eliminarUsuario(id) {
    return solicitar(
        `/api/usuarios/${id}`,
        {
            method: 'DELETE',
            headers: cabeceras()
        },
        'No se pudo eliminar el usuario'
    )
}