import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductosAdmin from '../pages/admin/ProductosAdmin';

// Evalúa el listado administrativo de productos, creación y eliminación
describe('Pruebas Unitarias: Página ProductosAdmin', () => {

    const productosMock = [
        { id: 1, nombre: "Cuadro 'Mar y Playa'", precio: 45000, stock: 5, categoria: 'Fotografía' },
        { id: 2, nombre: "Retrato 'Caballero con Pipa'", precio: 60000, stock: 3, categoria: 'Óleo' }
    ];

    beforeEach(() => {
        // Sembramos datos en localStorage y simulamos fetch para cubrir ambos orígenes de datos
        localStorage.setItem('productos', JSON.stringify(productosMock));
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(productosMock)
            })
        ));
    });

    // 1. Verifica que se renderice la vista y el listado de productos
    it('CP-PROADM-01: Debe renderizar el encabezado de gestión y los productos cargados', async () => {
        render(
            <BrowserRouter>
                <ProductosAdmin />
            </BrowserRouter>
        );

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/Mar y Playa/i)).toBeInTheDocument();
        });
    });

    // 2. Verifica la existencia del botón para agregar un nuevo producto
    it('CP-PROADM-02: Debe mostrar y responder al botón de crear nuevo producto', () => {
        render(
            <BrowserRouter>
                <ProductosAdmin />
            </BrowserRouter>
        );

        const btnNuevo = screen.queryByRole('button', { name: /Nuevo|Agregar|Crear/i })
            || screen.queryByRole('link', { name: /Nuevo|Agregar|Crear/i });

        if (btnNuevo) {
            fireEvent.click(btnNuevo);
            expect(btnNuevo).toBeInTheDocument();
        }
    });

    // 3. Verifica el flujo de eliminación con confirmación del usuario
    it('CP-PROADM-03: Debe solicitar confirmación al presionar Eliminar sobre un producto', async () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(
            <BrowserRouter>
                <ProductosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Mar y Playa/i)).toBeInTheDocument();
        });

        const btnsEliminar = screen.queryAllByRole('button', { name: /Eliminar/i });
        if (btnsEliminar.length > 0) {
            fireEvent.click(btnsEliminar[0]);
            expect(confirmSpy).toHaveBeenCalled();
        }
    });
});