import { useState } from 'react'
import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import EncabezadoUsuarios from '../../components/admin/EncabezadoUsuarios'
import TablaUsuarios from '../../components/admin/TablaUsuarios'

const iniciales = [
  { id: 1, nombre: 'Daniela', apellidos: 'Muñoz', correo: 'daniela.munoz@admin.cl', contrasena: 'holiholi', rol: 'Administrador' },
  { id: 2, nombre: 'Camila', apellidos: 'Fernández', correo: 'camila.fernandez@gmail.com', contrasena: 'nanonano', rol: 'Cliente' },
  { id: 3, nombre: 'Juan', apellidos: 'Alarcón', correo: 'juan.alarcon@gmail.com', contrasena: 'juan01', rol: 'Vendedor' },
  { id: 4, nombre: 'Ana', apellidos: 'Correa', correo: 'ana.correa@gmail.com', contrasena: 'ana02', rol: 'Vendedor' },
  { id: 5, nombre: 'Matias', apellidos: 'Gutierrez', correo: 'matias.gutierrez@gmail.com', contrasena: 'matias03', rol: 'Cliente' },
  { id: 6, nombre: 'Diego', apellidos: 'Roa', correo: 'diego.roa@admin.cl', contrasena: 'diego04', rol: 'Administrador' }
]

const vacio = { nombre: '', apellidos: '', correo: '', contrasena: '', rol: 'Cliente' }

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

    let usuarios = [...iniciales]

    try {
        const registrado = JSON.parse(
            localStorage.getItem('usuarioRegistrado') || 'null'
        )

        if (
            registrado?.correo &&
            !usuarios.some(u =>
                u.correo.toLowerCase() === registrado.correo.toLowerCase()
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
  const [usuarios, setUsuarios] = useState(cargarUsuarios)
  const [formulario, setFormulario] = useState(vacio)
  const [editando, setEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState('')
  function guardarLista(lista) {
    setUsuarios(lista)
    localStorage.setItem('usuarios', JSON.stringify(lista))
  }
  function guardar(e) {
    e.preventDefault()
    const datos = { ...formulario, nombre: formulario.nombre.trim(), apellidos: formulario.apellidos.trim(), correo: formulario.correo.trim().toLowerCase() }
    if (!datos.nombre || !datos.apellidos || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) return setError('Completa nombre, apellidos y un correo válido.')
    if (usuarios.some(u => u.correo?.toLowerCase() === datos.correo && u.id !== editando)) return setError('Ya existe un usuario con ese correo.')
    if (!editando && (datos.contrasena.length < 8 || datos.contrasena.length > 10)) return setError('La contraseña debe tener entre 8 y 10 caracteres.')
    if (editando && datos.contrasena && (datos.contrasena.length < 8 || datos.contrasena.length > 10)) return setError('La contraseña debe tener entre 8 y 10 caracteres.')
    let lista
    if (editando) lista = usuarios.map(u => u.id === editando ? { ...u, ...datos, contrasena: datos.contrasena || u.contrasena } : u)
    else lista = [...usuarios, { ...datos, id: Date.now() }]
    guardarLista(lista)
    setFormulario(vacio)
    setEditando(null)
    setError('')
  }
  function editar(usuario) {
    setEditando(usuario.id)
    setFormulario({ nombre: usuario.nombre || '', apellidos: usuario.apellidos || '', correo: usuario.correo || '', contrasena: '', rol: usuario.rol || 'Cliente' })
    setError('')
  }
  function eliminar(id) {
    if (window.confirm('¿Eliminar este usuario?')) guardarLista(usuarios.filter(u => u.id !== id))
  }
  return <EstructuraAdmin><section className="seccion_admin">
    <EncabezadoUsuarios />
    <div className="contenedor_formulario">
      <h2>{editando ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <form onSubmit={guardar} className="row g-3">
        {['nombre', 'apellidos', 'correo', 'contrasena'].map(campo => <div className="col-12 col-md-6" key={campo}>
          <label className="form-label" htmlFor={campo}>{campo === 'contrasena' ? 'Contraseña' : campo[0].toUpperCase() + campo.slice(1)}</label>
          <input className="form-control" id={campo} type={campo === 'correo' ? 'email' : campo === 'contrasena' ? 'password' : 'text'} value={formulario[campo]} required={campo !== 'contrasena' || !editando} onChange={e => setFormulario({ ...formulario, [campo]: e.target.value })} />
        </div>)}
        <div className="col-12 col-md-6"><label htmlFor="rol" className="form-label">Rol</label><select className="form-select" id="rol" value={formulario.rol} onChange={e => setFormulario({ ...formulario, rol: e.target.value })}><option>Cliente</option><option>Vendedor</option><option>Administrador</option></select></div>
        {error && <p role="alert" className="text-danger">{error}</p>}
        <div className="col-12"><button className="btn btn-primary" type="submit">{editando ? 'Guardar cambios' : 'Crear usuario'}</button>{editando && <button className="btn btn-secondary ms-2" type="button" onClick={() => { setEditando(null); setFormulario(vacio); setError('') }}>Cancelar</button>}</div>
      </form>
    </div>
    <div className="mt-4 mb-3"><label htmlFor="buscarUsuario" className="form-label">Buscar usuarios</label><input id="buscarUsuario" className="form-control" value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Nombre o correo" /></div>
    <TablaUsuarios usuarios={usuarios.filter(u => `${u.nombre} ${u.apellidos} ${u.correo}`.toLowerCase().includes(busqueda.toLowerCase()))} alEditar={editar} alEliminar={eliminar} />
  </section></EstructuraAdmin>
}
export default UsuariosAdmin
