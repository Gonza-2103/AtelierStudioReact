
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import TarjetaAdmin from '../components/admin/TarjetaAdmin';

// Evalúa las tarjetas de acceso del panel de administración.

describe('Pruebas Unitarias: Componente TarjetaAdmin', () => {

    // Caso 1: Verifica el título y la descripción.
    it('CP-TARJADM-01: Debe mostrar el título y la descripción de la tarjeta', () => {
        render(
            <MemoryRouter>
                <TarjetaAdmin
                    titulo="Total Productos"
                    descripcion="Administrar productos registrados"
                    enlace="/admin/productos"
                    textoEnlace="Ver productos"
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Total Productos')).toBeInTheDocument();
        expect(screen.getByText('Administrar productos registrados')).toBeInTheDocument();
    });

    // Caso 2: Verifica que el enlace tenga la ruta correcta.
    it('CP-TARJADM-02: Debe mostrar el enlace de navegación correcto', () => {
        render(
            <MemoryRouter>
                <TarjetaAdmin
                    titulo="Usuarios"
                    descripcion="Administrar usuarios registrados"
                    enlace="/admin/usuarios"
                    textoEnlace="Ver usuarios"
                />
            </MemoryRouter>
        );

        const enlace = screen.getByRole('link', { name: 'Ver usuarios' });

        expect(enlace).toBeInTheDocument();
        expect(enlace).toHaveAttribute('href', '/admin/usuarios');
    });

});
