import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import EncabezadoProductos from '../components/admin/EncabezadoProductos';

//Evalúa el encabezado específico de la sección de inventario de arte.
 
describe('Pruebas Unitarias: Componente EncabezadoProductos', () => {

    // Caso de Prueba 1: Verifica el título del módulo de productos
    it('CP-ENCPROD-01: Debe renderizar el título principal de gestión de inventario', () => {
        render(
        <BrowserRouter>
            <EncabezadoProductos />
        </BrowserRouter>
        );

        expect(screen.getByText(/Gestión de Productos/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica el texto descriptivo del módulo
    it('CP-ENCPROD-02: Debe mostrar el texto explicativo de la administración de obras', () => {
        render(
        <BrowserRouter>
            <EncabezadoProductos />
        </BrowserRouter>
        );

        expect(screen.getByText(/Administra los productos disponibles/i)).toBeInTheDocument();
    });

});