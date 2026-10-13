import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Detalle_Producto from '../components/user/Detalle_Producto';

//Evalúa la carga del producto seleccionado y la protección de compra para visitantes
describe('Pruebas Unitarias: Componente Detalle_Producto', () => {
    
    //1. Verifica que se muestre la información del producto
    it('CP-DETPROD-01: Debe renderizar el título de la obra y sus especificaciones técnicas', () => {
        render(
        <BrowserRouter>
            <Detalle_Producto />
        </BrowserRouter>
        );

        //Debe mostrar el producto seleccionado por defecto o almacenado
        expect(screen.getByText(/Mar y Playa/i)).toBeInTheDocument();
        expect(screen.getByText(/Fotografía de Autor/i)).toBeInTheDocument();
    });

    //2. Verifica que impida agregar al carrito a un invitado
    it('CP-DETPROD-02: Debe bloquear a un invitado no autenticado al presionar "AGREGAR AL CARRITO"', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
        <BrowserRouter>
            <Detalle_Producto />
        </BrowserRouter>
        );

        const btnAgregar = screen.getByRole('button', { name: /AGREGAR AL CARRITO/i });
        fireEvent.click(btnAgregar);

        expect(confirmSpy).toHaveBeenCalledWith(
        expect.stringContaining('Para realizar esta acción debes iniciar sesión')
        );
    });
});
