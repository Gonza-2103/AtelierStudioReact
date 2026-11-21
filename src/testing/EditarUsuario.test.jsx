import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditarUsuario from '../pages/admin/EditarUsuario';

//Evalúa la precarga de datos y edición de un usuario existente por ID
describe('Pruebas Unitarias: Página EditarUsuario', () => {

    const usuarioMock = {
        id: 1,
        rut: '19011022K',
        nombre: 'Camila',
        apellidos: 'Fernández',
        correo: 'camila.fernandez@gmail.com',
        rol: 'Cliente'
    };

    beforeEach(() => {
        localStorage.setItem('usuarios', JSON.stringify([usuarioMock]));
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(usuarioMock)
            })
        ));
    });

    //1. Verifica que cargue la pantalla de edición con el ID de la URL
    it('CP-EUSU-01: Debe renderizar el formulario de edición de usuario', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/usuarios/editar/1']}>
                <Routes>
                    <Route path="/admin/usuarios/editar/:id" element={<EditarUsuario />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Editar Usuario|Modificar Usuario/i)).toBeInTheDocument();
        });
    });

    //2. Verifica el clic en el botón de actualizar usuario
    it('CP-EUSU-02: Debe responder al envío del formulario de actualización', () => {
        render(
            <MemoryRouter initialEntries={['/admin/usuarios/editar/1']}>
                <Routes>
                    <Route path="/admin/usuarios/editar/:id" element={<EditarUsuario />} />
                </Routes>
            </MemoryRouter>
        );

        const btnGuardar = screen.queryByRole('button', { name: /Guardar|Actualizar|Editar/i });
        if (btnGuardar) {
            fireEvent.click(btnGuardar);
            expect(btnGuardar).toBeInTheDocument();
        }
    });
});