import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BotonNuevoProducto from '../components/admin/BotonNuevoProducto';

//Evalúa el botón activador del modal o formulario de creación de productos.
 
describe('Pruebas Unitarias: Componente BotonNuevoProducto', () => {

    // Caso de Prueba 1: Verifica la renderización del botón de creación
    it('CP-BTNPROD-01: Debe renderizar el botón para agregar un nuevo producto', () => {
        render(<BotonNuevoProducto onClick={() => {}} />);

        expect(screen.getByRole('button', { name: /nuevo producto/i })).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la activación del evento onClick
    it('CP-BTNPROD-02: Debe gatillar la función de apertura al ser presionado por el administrador', () => {
        const onClickMock = vi.fn();
        render(<BotonNuevoProducto onClick={onClickMock} />);

        const boton = screen.getByRole('button', { name: /nuevo producto/i });
        fireEvent.click(boton);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

});