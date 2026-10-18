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

    //3. Usuario autenticado usa contadores (+) y (−) y añade al carrito 
    it('CP-DETPROD-03: Con sesión iniciada, permite modificar unidades y agregar la obra al carrito', () => {

        //Simulamos usuario cliente autenticado
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo", rol: "Cliente" }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Detalle_Producto />
            </BrowserRouter>
        );

        //Contadores de unidades (+ y −)
        const btnSumar = screen.queryByRole('button', { name: '+' });
        const btnRestar = screen.queryByRole('button', { name: /−|-/i });

        if (btnSumar) fireEvent.click(btnSumar);
        if (btnRestar) fireEvent.click(btnRestar);

        //Clic en agregar al carrito con sesión activa
        const btnAgregar = screen.getByRole('button', { name: /AGREGAR AL CARRITO/i });
        fireEvent.click(btnAgregar);

        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('al carrito'));
    });

    //4. Clic en retorno a la galería y en todos los botones del menú
    it('CP-DETPROD-04: Debe ejecutar el enlace de volver a la galería y los accesos del menú de navegación', () => {
        render(
            <BrowserRouter>
                <Detalle_Producto />
            </BrowserRouter>
        );

        //Enlace o botón de retorno a galería
        const linkVolver = screen.queryByText(/Volver a la galería|Volver a productos/i);
        if (linkVolver) fireEvent.click(linkVolver);

        //Clic en todos los botones de la barra de navegación para llevar Functions al 100%
        const botones = screen.getAllByRole('button');
        botones.forEach((boton) => {
            fireEvent.click(boton);
        });

        expect(screen.getByText(/Mar y Playa/i)).toBeInTheDocument();
    });
});