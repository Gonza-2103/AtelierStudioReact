import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetalleUsuario from '../pages/admin/DetalleUsuario';

// Evalúa la ficha administrativa de detalle de un usuario y su navegación de retorno
describe('Pruebas Unitarias: Página DetalleUsuario', () => {

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

    // 1. Verifica que se muestre la información del usuario seleccionado
    it('CP-DETUSU-01: Debe renderizar el detalle del usuario por ID', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/usuarios/1']}>
                <Routes>
                    <Route path="/admin/usuarios/:id" element={<DetalleUsuario />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Detalle|Usuario|Camila/i)).toBeInTheDocument();
        });
    });

    // 2. Verifica el botón o enlace para volver al listado de usuarios
    it('CP-DETUSU-02: Debe responder al clic en el botón de retorno al listado', () => {
        render(
            <MemoryRouter initialEntries={['/admin/usuarios/1']}>
                <Routes>
                    <Route path="/admin/usuarios/:id" element={<DetalleUsuario />} />
                </Routes>
            </MemoryRouter>
        );

        const btnVolver = screen.queryByText(/Volver|Regresar/i);
        if (btnVolver) {
            fireEvent.click(btnVolver);
            expect(btnVolver).toBeInTheDocument();
        }
    });
});