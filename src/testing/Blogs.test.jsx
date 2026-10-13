import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Blogs from '../components/user/Blogs';

//Evalúa el renderizado de los artículos editoriales y sus enlaces de lectura
describe('Pruebas Unitarias: Componente Blogs', () => {

    //1. Comprueba que los títulos de los artículos publicados se visualicen
    it('CP-BLOGS-01: Debe renderizar los títulos de las publicaciones del blog', () => {
        render(
        <BrowserRouter>
            <Blogs />
        </BrowserRouter>
        );

        expect(screen.getByText(/Técnicas Ancestrales del Óleo/i)).toBeInTheDocument();
        expect(screen.getByText(/La Luz en la Fotografía Marina/i)).toBeInTheDocument();
    });

    //2. Verifica que existan los enlaces o botones para leer cada artículo completo
    it('CP-BLOGS-02: Debe mostrar los botones o enlaces para ingresar a cada detalle de blog', () => {
        render(
        <BrowserRouter>
            <Blogs />
        </BrowserRouter>
        );

        const enlacesLeer = screen.getAllByText(/Leer más/i);
        expect(enlacesLeer.length).toBeGreaterThanOrEqual(2);
    });
});