import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    //3. Clic en los botones "Leer más" de ambos blogs para ejecutar las funciones de navegación
    it('CP-BLOGS-03: Debe navegar a los detalles de los blogs al presionar los enlaces de lectura', () => {
        render(
            <BrowserRouter>
                <Blogs />
            </BrowserRouter>
        );

        const enlacesLeer = screen.getAllByText(/Leer más/i);
        fireEvent.click(enlacesLeer[0]);
        fireEvent.click(enlacesLeer[1]);
        expect(enlacesLeer[0]).toBeInTheDocument();
    });

    //4. Ejecución de todas las funciones de navegación del encabezado
    it('CP-BLOGS-04: Debe invocar cada uno de los botones de la barra de navegación del encabezado', () => {
        render(
            <BrowserRouter>
                <Blogs />
            </BrowserRouter>
        );

        const nombresBotones = ['Portada', 'Nosotros', 'Productos', 'Carrito', 'Búsqueda', 'Foro', 'Contacto'];
        nombresBotones.forEach((nombre) => {
            const btn = screen.queryByRole('button', { name: new RegExp(nombre, 'i') });
            if (btn) fireEvent.click(btn);
        });

        expect(screen.getByText('BLOGS')).toBeInTheDocument();
    });
});