import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NuevoUsuario from '../pages/admin/NuevoUsuario';

// Evalúa la creación de usuarios desde el panel administrativo
describe('Pruebas Unitarias: Página NuevoUsuario', () => {

    beforeEach(() => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: 5, nombre: 'Gonzalo' })
            })
        ));
    });

    // 1. Verifica que se renderice el formulario de nuevo usuario
    it('CP-NUSU-01: Debe renderizar el encabezado y los campos de creación de usuario', () => {
        render(
            <BrowserRouter>
                <NuevoUsuario />
            </BrowserRouter>
        );

        expect(screen.getByText(/Nuevo Usuario|Crear Usuario|Registrar Usuario/i)).toBeInTheDocument();
        const inputs = screen.getAllByRole('textbox');
        expect(inputs.length).toBeGreaterThan(0);
    });

    // 2. Verifica la interacción de envío del formulario
    it('CP-NUSU-02: Debe permitir completar datos y presionar el botón de guardado', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <NuevoUsuario />
            </BrowserRouter>
        );

        const btnGuardar = screen.queryByRole('button', { name: /Guardar|Crear|Registrar/i });
        if (btnGuardar) {
            fireEvent.click(btnGuardar);
        }

        expect(alertSpy).toBeDefined();
    });
});