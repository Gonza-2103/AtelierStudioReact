import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import TablaUsuarios from '../components/admin/TablaUsuarios'

describe('Pruebas Unitarias: TablaUsuarios', () => {
    const usuarios = [{
        id: 1,
        nombre: 'Daniela',
        apellidos: 'Muñoz',
        correo: 'daniela.munoz@admin.cl',
        rol: 'Administrador'
    }]

    it('Muestra los datos del usuario y el enlace a su detalle', () => {
        render(<MemoryRouter><TablaUsuarios usuarios={usuarios} /></MemoryRouter>)
        expect(screen.getByText('Daniela Muñoz')).toBeInTheDocument()
        expect(screen.getByText('daniela.munoz@admin.cl')).toBeInTheDocument()
        expect(screen.getByText('Administrador')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /ver detalle/i }))
            .toHaveAttribute('href', '/admin/usuarios/detalle/1')
    })

    it('Muestra un mensaje si la lista está vacía', () => {
        render(<MemoryRouter><TablaUsuarios usuarios={[]} /></MemoryRouter>)
        expect(screen.getByText('No se encontraron usuarios.')).toBeInTheDocument()
    })

    it('Llama a alEditar con el usuario seleccionado', () => {
        const alEditar = vi.fn()
        render(<MemoryRouter><TablaUsuarios usuarios={usuarios} alEditar={alEditar} /></MemoryRouter>)
        fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
        expect(alEditar).toHaveBeenCalledWith(usuarios[0])
    })

    it('Llama a alEliminar con el ID del usuario', () => {
        const alEliminar = vi.fn()
        render(<MemoryRouter><TablaUsuarios usuarios={usuarios} alEliminar={alEliminar} /></MemoryRouter>)
        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
        expect(alEliminar).toHaveBeenCalledWith(1)
    })
})
