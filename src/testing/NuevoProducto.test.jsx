import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NuevoProducto from '../pages/admin/NuevoProducto';

// Evalúa la creación de productos y ambas ramas de localStorage en NuevoProducto.jsx
describe('Pruebas Unitarias: Página NuevoProducto', () => {

    // Función auxiliar para llenar todos los campos del FormularioProducto y enviarlo
    function completarYEnviarFormulario(container, prefijo = 'Obra') {
        const inputsTexto = screen.queryAllByRole('textbox');
        inputsTexto.forEach((input, idx) => {
            fireEvent.change(input, { target: { value: `${prefijo} ${idx + 1}` } });
        });

        const inputsNumero = screen.queryAllByRole('spinbutton');
        inputsNumero.forEach((input) => {
            fireEvent.change(input, { target: { value: '35000' } });
        });

        const selects = screen.queryAllByRole('combobox');
        selects.forEach((select) => {
            const opcion = select.querySelector('option:last-child');
            if (opcion) {
                fireEvent.change(select, { target: { value: opcion.value } });
            }
        });

        const form = container.querySelector('form');
        if (form) {
            fireEvent.submit(form);
        }
    }

    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    // 1. Verifica que se renderice el título y el formulario de creación
    it('CP-NPROD-01: Debe renderizar el encabezado y los campos del formulario de producto', () => {
        render(
            <BrowserRouter>
                <NuevoProducto />
            </BrowserRouter>
        );

        expect(screen.getByText(/Nuevo producto/i)).toBeInTheDocument();
        expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
    });

    // 2. Rama falsy de línea 11: localStorage NO tiene 'productos' (null -> [])
    it('CP-NPROD-02: Debe guardar el primer producto cuando localStorage está vacío (null)', async () => {
        localStorage.removeItem('productos');

        const { container } = render(
            <BrowserRouter>
                <NuevoProducto />
            </BrowserRouter>
        );

        completarYEnviarFormulario(container, 'Obra Inicial');

        await waitFor(() => {
            const guardados = JSON.parse(localStorage.getItem('productos'));
            expect(Array.isArray(guardados)).toBe(true);
            expect(guardados.length).toBe(1);
        });
    });

    // 3. Rama truthy de línea 11: localStorage YA tiene productos guardados
    it('CP-NPROD-03: Debe agregar el producto conservando los ya existentes en localStorage', async () => {
        localStorage.setItem('productos', JSON.stringify([
            { id: 1, codigo: 'ART001', nombre: 'Obra Previa', precio: 25000, stock: 5, categoria: 'Óleo' }
        ]));

        const { container } = render(
            <BrowserRouter>
                <NuevoProducto />
            </BrowserRouter>
        );

        completarYEnviarFormulario(container, 'Obra Nueva');

        await waitFor(() => {
            const guardados = JSON.parse(localStorage.getItem('productos'));
            expect(guardados.length).toBe(2);
        });
    });

    // 4. Envío con campos vacíos (validación del formulario)
    it('CP-NPROD-04: Debe mantener la vista si se intenta enviar el formulario vacío', () => {
        const { container } = render(
            <BrowserRouter>
                <NuevoProducto />
            </BrowserRouter>
        );

        const form = container.querySelector('form');
        if (form) {
            fireEvent.submit(form);
        }

        expect(screen.getByText(/Nuevo producto/i)).toBeInTheDocument();
    });
});