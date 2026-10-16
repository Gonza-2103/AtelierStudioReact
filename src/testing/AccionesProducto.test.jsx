
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import AccionesProducto from '../components/admin/AccionesProducto';

// Evalúa los enlaces de navegación y la eliminación de productos.

describe('Pruebas Unitarias: Componente AccionesProducto', () => {

    // Caso 1: Verifica los enlaces y sus rutas
    it('CP-ACCPROD-01: Debe mostrar las acciones con las rutas correctas del producto', () => {

        render(
            <MemoryRouter>
                <AccionesProducto id={1} alEliminar={vi.fn()} />
            </MemoryRouter>
        );

        const enlaceDetalle = screen.getByRole('link', {
            name: 'Ver detalle'
        });

        const enlaceEditar = screen.getByRole('link', {
            name: 'Editar'
        });

        expect(enlaceDetalle).toBeInTheDocument();
        expect(enlaceDetalle).toHaveAttribute(
            'href',
            '/admin/productos/detalle/1'
        );

        expect(enlaceEditar).toBeInTheDocument();
        expect(enlaceEditar).toHaveAttribute(
            'href',
            '/admin/productos/editar/1'
        );

        expect(screen.getByRole('button', {
            name: 'Eliminar'
        })).toBeInTheDocument();
    });

    // Caso 2: Verifica la ejecución de la función de eliminación
    it('CP-ACCPROD-02: Debe llamar a alEliminar con el ID del producto', () => {

        const alEliminarMock = vi.fn();

        render(
            <MemoryRouter>
                <AccionesProducto
                    id={5}
                    alEliminar={alEliminarMock}
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', {
            name: 'Eliminar'
        }));

        expect(alEliminarMock).toHaveBeenCalledTimes(1);
        expect(alEliminarMock).toHaveBeenCalledWith(5);
    });

});
