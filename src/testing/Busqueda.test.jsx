import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Busqueda from '../components/user/Busqueda';

//Evalúa el renderizado del input de búsqueda y el filtrado interactivo en tiempo real
describe('Pruebas Unitarias: Componente Busqueda', () => {

    //1. Comprueba que el buscador y el botón buscar existan
    it('CP-BUSQ-01: Debe renderizar la barra de búsqueda y el botón BUSCAR', () => {
        render(
        <BrowserRouter>
            <Busqueda />
        </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/Buscar por título, artista o técnica/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /BUSCAR/i })).toBeInTheDocument();
    });

    //2. Comprueba el filtrado en tiempo real al escribir en el campo
    it('CP-BUSQ-02: Debe filtrar las obras cuando el usuario escribe un término de búsqueda', () => {
        render(
        <BrowserRouter>
            <Busqueda />
        </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);
        
        //Escribirs "Gato" en el buscador
        fireEvent.change(input, { target: { value: 'Gato' } });

        //La obra esperada debe permanecer en pantalla
        expect(screen.getByText(/Gato entre Sombras/i)).toBeInTheDocument();
    });
});