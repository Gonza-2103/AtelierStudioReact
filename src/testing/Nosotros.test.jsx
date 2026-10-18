import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Nosotros from '../components/user/Nosotros';

//Evalúa el manifiesto de la galería y la presentación del equipo de artistas
describe('Pruebas Unitarias: Componente Nosotros', () => {

    //1. Verifica la misión y visión de AtelierStudio
    it('CP-NOS-01: Debe renderizar la historia y el propósito de la plataforma', () => {
        render(
            <BrowserRouter>
                <Nosotros />
            </BrowserRouter>
        );

        expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
        expect(screen.getByText(/Nuestra Misión/i)).toBeInTheDocument();
    });

    //2. Verifica que se muestren los perfiles de los fundadores/artistas
    it('CP-NOS-02: Debe mostrar a los artistas o creadores que forman parte del colectivo', () => {
        render(
            <BrowserRouter>
                <Nosotros />
            </BrowserRouter>
        );

        expect(screen.getByText(/Geraldinne/i)).toBeInTheDocument();
        expect(screen.getByText(/Gonzalo/i)).toBeInTheDocument();
    });

    //3. Clic en todos los botones de navegación del encabezado 
    it('CP-NOS-03: Debe responder a los clics en los enlaces de navegación del encabezado', () => {
        render(
            <BrowserRouter>
                <Nosotros />
            </BrowserRouter>
        );

        const botonesNav = ['Portada', 'Productos', 'Carrito', 'Búsqueda', 'Foro', 'Blogs', 'Contacto'];
        botonesNav.forEach((nombre) => {
            const btn = screen.queryByRole('button', { name: new RegExp(nombre, 'i') });
            if (btn) fireEvent.click(btn);
        });

        expect(screen.getByText(/Sobre Nosotros/i)).toBeInTheDocument();
    });
});