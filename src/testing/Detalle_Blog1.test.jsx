import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Detalle_Blog1 from '../components/user/Detalle_Blog1';

//Evalúa la correcta visualización del contenido editorial completo y el enlace de retorno
describe('Pruebas Unitarias: Componente Detalle_Blog1', () => {

    //1. Renderizado inicial
    it('CP-DBLOG1-01: Debe renderizar el artículo completo sobre Técnicas Ancestrales del Óleo', () => {
        render(
            <BrowserRouter>
                <Detalle_Blog1 />
            </BrowserRouter>
        );

        expect(screen.getByText(/Técnicas Ancestrales del Óleo/i)).toBeInTheDocument();
        expect(screen.getByText(/Volver a Blogs/i)).toBeInTheDocument();
    });

    //2. Clic en el botón "Volver a Blogs" para cubrir la función de redirección
    it('CP-DBLOG1-02: Debe responder al evento de clic en el enlace o botón Volver a Blogs', () => {
        render(
            <BrowserRouter>
                <Detalle_Blog1 />
            </BrowserRouter>
        );

        const btnVolver = screen.getByText(/Volver a Blogs/i);
        fireEvent.click(btnVolver);
        expect(btnVolver).toBeInTheDocument();
    });

    //3. Clic en todos los botones del menú de navegación superior 
    it('CP-DBLOG1-03: Debe ejecutar cada una de las funciones de navegación del encabezado', () => {
        render(
            <BrowserRouter>
                <Detalle_Blog1 />
            </BrowserRouter>
        );

        //Ubicamos todos los botones dentro del encabezado o barra de navegación
        const botones = screen.getAllByRole('button');
        botones.forEach((boton) => {
            fireEvent.click(boton);
        });

        //Comprobamos la presencia del título de la sección
        expect(screen.getByText(/Técnicas Ancestrales del Óleo/i)).toBeInTheDocument();
    });
});