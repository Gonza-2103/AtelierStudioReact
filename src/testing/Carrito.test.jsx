import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Carrito from '../components/user/Carrito';

describe('Pruebas Unitarias: Componente Carrito', () => {

    //1. Renderizado del resumen financiero
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

    //2. Bloqueo a invitados en cupón
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

    //3. Usuario autenticado modifica cantidades (+) y (-) y quita producto
    it('CP-CAR-03: Con sesión activa, debe permitir sumar, restar y quitar productos del carrito', () => {

        //Simulamos usuario registrado en Viña del Mar
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo", comuna: "Viña del Mar" }));

        render(
            <BrowserRouter>
                <Carrito />
            </BrowserRouter>
        );

        const btnSumar = screen.getByRole('button', { name: '+' });
        const btnRestar = screen.getByRole('button', { name: '−' });

        //Sumar unidad
        fireEvent.click(btnSumar);

        //Restar unidad
        fireEvent.click(btnRestar);

        //Quitar del carrito
        const btnQuitar = screen.getByText(/Quitar del carrito/i);
        fireEvent.click(btnQuitar);

        expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
    });

    //4. Aplicación de cupón válido y finalización de compra
    it('CP-CAR-04: Con sesión activa, aplica cupón ARTE2026 y procesa la compra final', () => {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Camila", comuna: "Santiago" }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Carrito />
            </BrowserRouter>
        );

        //Aplicar cupón válido
        const inputCupon = screen.getByPlaceholderText(/Ingresa cupón/i);
        const btnCupon = screen.getByRole('button', { name: /APLICAR/i });

        fireEvent.change(inputCupon, { target: { value: 'ARTE2026' } });
        fireEvent.click(btnCupon);
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('¡Cupón exitoso!'));

        //Finalizar compra
        const btnFinalizar = screen.getByRole('button', { name: /FINALIZAR COMPRA/i });
        fireEvent.click(btnFinalizar);
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('¡Compra procesada exitosamente!'));
    });
});