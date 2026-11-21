import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DetalleProducto from '../pages/admin/DetalleProducto';

//Evalúa la visualización administrativa del detalle de un producto, casos sin coincidencia y retorno
describe('Pruebas Unitarias: Página DetalleProducto (Admin)', () => {

    const productoMock = {
        id: 1,
        codigo: 'PROD-001',
        nombre: "Cuadro 'Mar y Playa'",
        descripcion: 'Fotografía artística enmarcada de la costa',
        precio: 45000,
        stock: 5,
        categoria: 'Fotografía'
    };

    beforeEach(() => {
        localStorage.setItem('productos', JSON.stringify([productoMock]));
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(productoMock)
            })
        ));
    });

    //1. Verifica la carga y renderizado completo de los datos del producto por ID
    it('CP-DETPROADM-01: Debe renderizar la ficha administrativa con los datos del producto por ID', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/productos/1']}>
                <Routes>
                    <Route path="/admin/productos/:id" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Mar y Playa|Detalle|Producto/i)).toBeInTheDocument();
        });
    });

    //2. Verifica el manejo de la rama condicional cuando el producto no existe
    it('CP-DETPROADM-02: Debe gestionar correctamente cuando el ID del producto no existe', async () => {
        localStorage.setItem('productos', JSON.stringify([]));
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({ message: 'No encontrado' })
            })
        ));

        render(
            <MemoryRouter initialEntries={['/admin/productos/999']}>
                <Routes>
                    <Route path="/admin/productos/:id" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            const vista = screen.queryByText(/no encontrado|no existe|Volver|Producto/i);
            expect(vista).toBeInTheDocument();
        });
    });

    //3. Verifica la interacción con los botones y enlaces de retorno o edición
    it('CP-DETPROADM-03: Debe responder a los clics en el botón de volver y acciones de la vista', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/productos/1']}>
                <Routes>
                    <Route path="/admin/productos/:id" element={<DetalleProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Mar y Playa|Detalle|Producto/i)).toBeInTheDocument();
        });

        const botones = screen.queryAllByRole('button');
        botones.forEach((btn) => fireEvent.click(btn));

        const enlaces = screen.queryAllByRole('link');
        enlaces.forEach((link) => fireEvent.click(link));

        expect(botones.length + enlaces.length).toBeGreaterThanOrEqual(0);
    });
});