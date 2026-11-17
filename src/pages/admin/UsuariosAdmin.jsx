import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import EncabezadoUsuarios from '../../components/admin/EncabezadoUsuarios'
import TablaUsuarios from '../../components/admin/TablaUsuarios'

function UsuariosAdmin() {
    const navigate = useNavigate()

    // 1. Iniciamos el estado vacío
    const [usuarios, setUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState('')

    // 2. useEffect hace la petición al backend en EC2 al cargar la página
    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                // Lee la variable del archivo .env
                // Asegúrate de que '/usuarios' sea la ruta correcta de tu Java
                const respuesta = await fetch(`${import.meta.env.VITE_API_BASE_URL}/usuarios`)
                
                if (respuesta.ok) {
                    const datos = await respuesta.json()
                    setUsuarios(datos) // Guardamos los datos reales de la base de datos
                } else {
                    console.error('Error en la respuesta del backend')
                }
            } catch (error) {
                console.error('Error de conexión con el backend:', error)
            }
        }

        obtenerUsuarios()
    }, [])

    // Eliminar usuario (Nota: Esto solo lo borra de la pantalla, 
    // idealmente aquí también deberías hacer un fetch con método DELETE)
    function eliminar(id) {
        if (window.confirm('¿Eliminar este usuario?')) {
            const lista = usuarios.filter(usuario => usuario.id !== id)
            setUsuarios(lista)
        }
    }

    function editar(usuario) {
        navigate(`/admin/usuarios/editar/${usuario.id}`)
    }

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
                    <label htmlFor="buscarUsuario" className="form-label">Buscar usuarios</label>
                    <input
                        id="buscarUsuario"
                        className="form-control"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        placeholder="Nombre o correo"
                    />
                </div>

                <div className="barra_acciones_usuarios">
                    <Link to="/admin/usuarios/nuevo" className="btn btn-dark">Nuevo usuario</Link>
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