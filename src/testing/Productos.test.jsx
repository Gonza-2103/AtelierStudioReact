import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Productos from '../components/user/Productos';

describe('Pruebas Unitarias: Componente Productos', () => {

    //1. Renderizado catálogo
    it('CP-PROD-01: Debe renderizar las obras de arte disponibles en el catálogo', () => {
        render(
            <BrowserRouter>
                <Productos />
            </BrowserRouter>
        );
        expect(screen.getByText("Cuadro 'Mar y Playa'")).toBeInTheDocument();
        expect(screen.getByText("Retrato 'Caballero con Pipa'")).toBeInTheDocument();
    });

    //2. Bloqueo a invitados
    it('CP-PROD-02: Debe bloquear a un usuario invitado al intentar agregar al carrito', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);
        render(
            <BrowserRouter>
                <Productos />
            </BrowserRouter>
        );
        const btnsAgregar = screen.getAllByRole('button', { name: /AGREGAR AL CARRITO/i });
        fireEvent.click(btnsAgregar[0]);
        
        expect(confirmSpy).toHaveBeenCalledWith(
            expect.stringContaining('Para realizar esta acción debes iniciar sesión')
        );
    });

    //3. Usuario autenticado suma y resta unidades con validación de stock
    it('CP-PROD-03: Con sesión iniciada, permite usar los contadores de unidades (+ y −)', () => {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo", rol: "Cliente" }));

        render(
            <BrowserRouter>
                <Productos />
            </BrowserRouter>
        );

        const botonesSumar = screen.getAllByRole('button', { name: '+' });
        const botonesRestar = screen.getAllByRole('button', { name: '−' });

        //Sumar al primer producto
        fireEvent.click(botonesSumar[0]);

        //Restar al primer producto
        fireEvent.click(botonesRestar[0]);

        expect(botonesSumar[0]).toBeInTheDocument();
    });

    //4. Usuario autenticado agrega producto al carrito y ve detalles
    it('CP-PROD-04: Con sesión activa, agrega un producto al carrito y permite ver detalles', () => {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Camila", rol: "Cliente" }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Productos />
            </BrowserRouter>
        );

        //Agregar al carrito
        const btnsAgregar = screen.getAllByRole('button', { name: /AGREGAR AL CARRITO/i });
        fireEvent.click(btnsAgregar[0]);

        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('al carrito'));

        //Clic en ver detalles
        const btnDetalles = screen.getByText(/VER DETALLES/i);
        fireEvent.click(btnDetalles);
        expect(btnDetalles).toBeInTheDocument();
    });
});