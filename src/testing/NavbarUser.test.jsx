import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NavbarUser from '../components/user/NavbarUser';

//Evalúa la presencia del logo corporativo y los accesos a las rutas principales
describe('Pruebas Unitarias: Componente NavbarUser', () => {

    //1. Verifica el logo y nombre de la galería
    it('CP-NAV-01: Debe renderizar el logotipo oficial de AtelierStudio', () => {
        render(
        <BrowserRouter>
            <NavbarUser />
        </BrowserRouter>
        );

        const logoImg = screen.getByAltText(/Logo AtelierStudio/i);
        expect(logoImg).toBeInTheDocument();
    });

    //2. Verifica los botones de navegación básicos
    it('CP-NAV-02: Debe renderizar los enlaces hacia Productos, Carrito y Foro', () => {
        render(
        <BrowserRouter>
            <NavbarUser />
        </BrowserRouter>
        );

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Carrito/i)).toBeInTheDocument();
        expect(screen.getByText(/Foro/i)).toBeInTheDocument();
    });
});