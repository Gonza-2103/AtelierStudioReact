import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AccionesProducto from '../components/admin/AccionesProducto';

// Evalúa la disponibilidad de los botones de acción rápida y el envío de sus eventos callback.
 
describe('Pruebas Unitarias: Componente AccionesProducto', () => {

    // Caso de Prueba 1: Verifica el renderizado visual de los botones Editar y Eliminar
    it('CP-ACCPROD-01: Debe renderizar los botones de Editar y Eliminar en la fila del producto', () => {
        render(<AccionesProducto onEditar={() => {}} onEliminar={() => {}} />);

        expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la ejecución de los handlers al hacer clic
    it('CP-ACCPROD-02: Debe ejecutar las funciones callback enviadas por props al hacer clic', () => {
        const onEditarMock = vi.fn();
        const onEliminarMock = vi.fn();

        render(<AccionesProducto onEditar={onEditarMock} onEliminar={onEliminarMock} />);

        fireEvent.click(screen.getByRole('button', { name: /editar/i }));
        expect(onEditarMock).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('button', { name: /eliminar/i }));
        expect(onEliminarMock).toHaveBeenCalledTimes(1);
    });

});