import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Carrito from '../components/user/Carrito';

//Evalúa la visualización del resumen financiero y el control de acceso en la aplicación de cupones
describe('Pruebas Unitarias: Componente Carrito', () => {

    //1. Comprueba la correcta visualización de las filas de liquidación
    it('CP-CAR-01: Debe renderizar el desglose de pago con Subtotal, Envío y Total', () => {
        render(
        <BrowserRouter>
            <Carrito />
        </BrowserRouter>
        );
        expect(screen.getByText(/Subtotal:/i)).toBeInTheDocument();
        expect(screen.getByText(/Envío:/i)).toBeInTheDocument();
        expect(screen.getByText(/Total:/i)).toBeInTheDocument();
    });

    //2. Verifica que un usuario invitado no pueda aplicar cupones de descuento
    it('CP-CAR-02: Debe impedir aplicar cupón a un invitado no autenticado', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
        <BrowserRouter>
            <Carrito />
        </BrowserRouter>
        );

        const btnCupon = screen.getByRole('button', { name: /APLICAR/i });
        fireEvent.click(btnCupon);

        expect(confirmSpy).toHaveBeenCalledWith(
        expect.stringContaining('Para realizar esta acción debes iniciar sesión')
        );
    });
});
