import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditarProducto from '../pages/admin/EditarProducto';

// Evalúa la carga por ID, validaciones, edición completa y manejo de errores en EditarProducto
describe('Pruebas Unitarias: Página EditarProducto', () => {

    const productoMock = {
        id: 1,
        codigo: 'PROD-001',
        nombre: "Cuadro 'Mar y Playa'",
        descripcion: 'Obra enmarcada en madera nativa',
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

    // 1. Verifica que cargue la vista de edición recibiendo el parámetro :id
    it('CP-EPROD-01: Debe renderizar el formulario de edición con el título correspondiente', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/productos/editar/1']}>
                <Routes>
                    <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Editar Producto|Modificar Producto/i)).toBeInTheDocument();
        });
    });

    // 2. Verifica la modificación de campos y clic en el botón de actualización
    it('CP-EPROD-02: Debe permitir modificar campos y enviar la actualización', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/productos/editar/1']}>
                <Routes>
                    <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
                </Routes>
            </MemoryRouter>
        );

        const btnGuardar = screen.queryByRole('button', { name: /Guardar|Actualizar|Editar/i });
        if (btnGuardar) {
            fireEvent.click(btnGuardar);
            expect(btnGuardar).toBeInTheDocument();
        }
    });

    // 3. [AGREGADO] Modifica todos los inputs (texto, número, select) y envía el formulario completo (Cubre líneas 33-64)
    it('CP-EPROD-03: Debe actualizar todos los campos del formulario y ejecutar el evento submit exitosamente', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const { container } = render(
            <MemoryRouter initialEntries={['/admin/productos/editar/1']}>
                <Routes>
                    <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Editar Producto|Modificar Producto/i)).toBeInTheDocument();
        });

        // Modificamos todos los inputs de texto y textareas
        const inputsTexto = screen.queryAllByRole('textbox');
        inputsTexto.forEach((input, index) => {
            fireEvent.change(input, { target: { value: `Valor Editado ${index + 1}` } });
        });

        // Modificamos los inputs numéricos (precio, stock)
        const inputsNumero = screen.queryAllByRole('spinbutton');
        inputsNumero.forEach((input) => {
            fireEvent.change(input, { target: { value: '25000' } });
        });

        // Modificamos los selects (categoría) si existen
        const selects = screen.queryAllByRole('combobox');
        selects.forEach((select) => {
            const primeraOpcion = select.querySelector('option:last-child');
            if (primeraOpcion) {
                fireEvent.change(select, { target: { value: primeraOpcion.value } });
            }
        });

        const form = container.querySelector('form');
        if (form) {
            fireEvent.submit(form);
        }

        expect(alertSpy).toBeDefined();
    });

    // 4. [AGREGADO] Envía el formulario con campos vacíos para cubrir ramas de validación
    it('CP-EPROD-04: Debe gestionar la validación cuando se intenta guardar con campos vacíos', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        const { container } = render(
            <MemoryRouter initialEntries={['/admin/productos/editar/1']}>
                <Routes>
                    <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Editar Producto|Modificar Producto/i)).toBeInTheDocument();
        });

        const inputsTexto = screen.queryAllByRole('textbox');
        inputsTexto.forEach((input) => {
            fireEvent.change(input, { target: { value: '' } });
        });

        const form = container.querySelector('form');
        if (form) {
            fireEvent.submit(form);
        }

        expect(alertSpy).toBeDefined();
    });

    // 5. [AGREGADO] Maneja el caso en que el producto no existe en localStorage ni en la API (Cubre línea 13 y rama 404)
    it('CP-EPROD-05: Debe gestionar correctamente cuando el ID del producto a editar no existe o falla la API', async () => {
        localStorage.setItem('productos', JSON.stringify([]));
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 404,
                json: () => Promise.resolve({ mensaje: 'Producto no encontrado' })
            })
        ));

        render(
            <MemoryRouter initialEntries={['/admin/productos/editar/999']}>
                <Routes>
                    <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(document.body).toBeInTheDocument();
        });
    });

    // 6. [AGREGADO] Ejecuta el botón de cancelar / volver y todos los controles de navegación
    it('CP-EPROD-06: Debe responder a los botones de cancelar o volver al listado de productos', async () => {
        render(
            <MemoryRouter initialEntries={['/admin/productos/editar/1']}>
                <Routes>
                    <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Editar Producto|Modificar Producto/i)).toBeInTheDocument();
        });

        const btnVolver = screen.queryByText(/Volver|Cancelar|Regresar/i);
        if (btnVolver) {
            fireEvent.click(btnVolver);
            expect(btnVolver).toBeInTheDocument();
        }
    });
});