
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BotonNuevoProducto from '../components/admin/BotonNuevoProducto';

// Evalúa el enlace para crear un nuevo producto.

describe('Pruebas Unitarias: Componente BotonNuevoProducto', () => {

    // Caso 1: Verifica que se muestre el enlace.
    it('CP-BTNPROD-01: Debe mostrar la opción para crear un producto', () => {
        render(
            <MemoryRouter>
                <BotonNuevoProducto />
            </MemoryRouter>
        );

        const enlace = screen.getByRole('link', { name: /nuevo producto/i });

        expect(enlace).toBeInTheDocument();
        expect(enlace).toHaveAttribute('href', '/admin/productos/nuevo');
    });

    // Caso 2: Verifica la navegación al hacer clic.
    it('CP-BTNPROD-02: Debe navegar al formulario de nuevo producto', () => {
        render(
            <MemoryRouter initialEntries={['/admin/productos']}>
                <BotonNuevoProducto />

                <Routes>
                    <Route
                        path="/admin/productos/nuevo"
                        element={<h1>Formulario nuevo producto</h1>}
                    />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('link', { name: /nuevo producto/i }));

        expect(screen.getByText('Formulario nuevo producto')).toBeInTheDocument();
    });

});
