import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import MenuAdmin from '../components/admin/MenuAdmin';

// Evalúa las opciones de navegación lateral del panel.
 
describe('Pruebas Unitarias: Componente MenuAdmin', () => {

    // Caso de Prueba 1: Verifica las opciones principales de navegación
    it('CP-MENUADM-01: Debe renderizar los enlaces hacia las secciones de Productos y Usuarios', () => {
        render(
        <BrowserRouter>
            <MenuAdmin />
        </BrowserRouter>
        );

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la presencia del enlace de salida hacia la tienda pública
    it('CP-MENUADM-02: Debe renderizar el botón para regresar a la vista pública de la galería', () => {
        render(
        <BrowserRouter>
            <MenuAdmin />
        </BrowserRouter>
        );

        expect(screen.getByText(/Volver a la tienda|Portada|Salir/i)).toBeInTheDocument();
    });

});