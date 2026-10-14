
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import EncabezadoUsuarios from '../../components/admin/EncabezadoUsuarios'
import TablaUsuarios from '../../components/admin/TablaUsuarios'

// Usuarios iniciales del sistema
const iniciales = [
    {
        id: 1,
        nombre: 'Daniela',
        apellidos: 'Muñoz',
        correo: 'daniela.munoz@admin.cl',
        contrasena: 'holiholi',
        rol: 'Administrador'
    },
    {
        id: 2,
        nombre: 'Camila',
        apellidos: 'Fernández',
        correo: 'camila.fernandez@gmail.com',
        contrasena: 'nanonano',
        rol: 'Cliente'
    },
    {
        id: 3,
        nombre: 'Juan',
        apellidos: 'Alarcón',
        correo: 'juan.alarcon@gmail.com',
        contrasena: 'juan01',
        rol: 'Vendedor'
    },
    {
        id: 4,
        nombre: 'Ana',
        apellidos: 'Correa',
        correo: 'ana.correa@gmail.com',
        contrasena: 'ana02',
        rol: 'Vendedor'
    },
    {
        id: 5,
        nombre: 'Matias',
        apellidos: 'Gutierrez',
        correo: 'matias.gutierrez@gmail.com',
        contrasena: 'matias03',
        rol: 'Cliente'
    },
    {
        id: 6,
        nombre: 'Diego',
        apellidos: 'Roa',
        correo: 'diego.roa@admin.cl',
        contrasena: 'diego04',
        rol: 'Administrador'
    }
]

// Cargar usuarios desde localStorage
function cargarUsuarios() {
    const datosGuardados = localStorage.getItem('usuarios')

    if (datosGuardados !== null) {
        try {
            const usuarios = JSON.parse(datosGuardados)

            return Array.isArray(usuarios) ? usuarios : []
        } catch {
            return []
        }
    }

    const usuarios = [...iniciales]

    // Agregar usuario registrado desde la tienda
    try {
        const registrado = JSON.parse(
            localStorage.getItem('usuarioRegistrado') || 'null'
        )

        if (
            registrado?.correo &&
            !usuarios.some(
                usuario =>
                    usuario.correo.toLowerCase() ===
                    registrado.correo.toLowerCase()
            )
        ) {
            usuarios.push(registrado)
        }
    } catch {
        // No hay usuario registrado válido
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios))

    return usuarios
}

function UsuariosAdmin() {
    const navigate = useNavigate()

    const [usuarios, setUsuarios] = useState(cargarUsuarios)
    const [busqueda, setBusqueda] = useState('')

    // Eliminar usuario con confirmación
    function eliminar(id) {
        if (window.confirm('¿Eliminar este usuario?')) {
            const lista = usuarios.filter(
                usuario => usuario.id !== id
            )

            setUsuarios(lista)
            localStorage.setItem('usuarios', JSON.stringify(lista))
        }
    }

    // Navegar al formulario de edición
    function editar(usuario) {
        navigate(`/admin/usuarios/editar/${usuario.id}`)
    }

    // Buscar usuarios por nombre, apellidos o correo
    const usuariosFiltrados = usuarios.filter(usuario => {
        const texto = `
            ${usuario.nombre || ''}
            ${usuario.apellidos || ''}
            ${usuario.correo || ''}
        `.toLowerCase()

        return texto.includes(busqueda.toLowerCase().trim())
    })

    return (
        <EstructuraAdmin>
            <section className="seccion_admin">

                <EncabezadoUsuarios />

                          

                <div className="buscador_usuarios_admin">
                        <label
                            htmlFor="buscarUsuario"
                            className="form-label"
                        >
                            Buscar usuarios
                        </label>

                        <input
                            id="buscarUsuario"
                            className="form-control"
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                            placeholder="Nombre o correo"
                        />
                    </div>

                <div className="barra_acciones_usuarios">
                    <Link
                        to="/admin/usuarios/nuevo"
                        className="btn btn-dark"
                    >
                        Nuevo usuario
                    </Link>
                </div>                
                

                <TablaUsuarios
                    usuarios={usuariosFiltrados}
                    alEditar={editar}
                    alEliminar={eliminar}
                />

            </section>
        </EstructuraAdmin>
    )
}

export default UsuariosAdmin
