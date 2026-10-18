import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Detalle_Blog2 from '../components/user/Detalle_Blog2';

//Evalúa la correcta visualización del contenido editorial sobre fotografía marina y su enlace de regreso
describe('Pruebas Unitarias: Componente Detalle_Blog2', () => {

    //1. Renderizado inicial
    it('CP-DBLOG2-01: Debe renderizar el artículo completo sobre La Luz en la Fotografía Marina', () => {
        render(
            <BrowserRouter>
                <Detalle_Blog2 />
            </BrowserRouter>
        );

        expect(screen.getByText(/La Luz en la Fotografía Marina/i)).toBeInTheDocument();
        expect(screen.getByText(/Volver a Blogs/i)).toBeInTheDocument();
    });

    //2. Clic en el botón "Volver a Blogs" para cubrir la redirección de vuelta
    it('CP-DBLOG2-02: Debe responder al evento de clic en el botón de regreso a la lista de blogs', () => {
        render(
            <BrowserRouter>
                <Detalle_Blog2 />
            </BrowserRouter>
        );

        const btnVolver = screen.getByText(/Volver a Blogs/i);
        fireEvent.click(btnVolver);
        expect(btnVolver).toBeInTheDocument();
    });

    //3. Clic en todos los botones del encabezado
    it('CP-DBLOG2-03: Debe invocar cada botón de la barra de navegación superior', () => {
        render(
            <BrowserRouter>
                <Detalle_Blog2 />
            </BrowserRouter>
        );

        //Recorremos y ejecutamos todos los botones de la vista
        const botones = screen.getAllByRole('button');
        botones.forEach((boton) => {
            fireEvent.click(boton);
        });

        expect(screen.getByText(/La Luz en la Fotografía Marina/i)).toBeInTheDocument();
    });
});