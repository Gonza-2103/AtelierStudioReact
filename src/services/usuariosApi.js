const BASE = import.meta.env.VITE_API_BASE_URL

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

async function mensajeError(respuesta, fallback) {
    try {
        const cuerpo = await respuesta.json()

        if (cuerpo?.MENSAJE) {
            return cuerpo.MENSAJE
        }

        if (cuerpo?.detalles && typeof cuerpo.detalles === 'object') {
            return Object.values(cuerpo.detalles).join(' ')
        }
    } catch {
        // respuesta sin JSON
    }

    return fallback
}

async function solicitar(ruta, opciones, fallback) {
    const respuesta = await fetch(`${BASE}${ruta}`, opciones)

    if (!respuesta.ok) {
        throw new Error(await mensajeError(respuesta, fallback))
    }

    if (respuesta.status === 204) {
        return null
    }

    return respuesta.json()
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
        const login = await fetch(`${BASE}/api/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        })

        if (login.ok) {
            return login.json()
        }

        const cuerpo = await login.json()
        if (cuerpo?.MENSAJE) {
            throw new Error(cuerpo.MENSAJE)
        }
    } catch (error) {
        if (error?.message && error.message !== 'Failed to fetch') {
            throw error
        }
    }

    try {
        const perfil = await fetch(
            `${BASE}/api/usuarios/correo/${encodeURIComponent(correo)}`,
            { headers: { Authorization: `Basic ${credencialBasic(correo, contrasena)}` } }
        )

        if (!perfil.ok) {
            throw new Error('Correo o contraseña incorrectos.')
        }

        return { usuario: await perfil.json() }
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
