import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import EstructuraAdmin from '../components/admin/EstructuraAdmin';

//Evalúa la plantilla contenedora (layout) y el renderizado de componentes hijos (children).
 
describe('Pruebas Unitarias: Componente EstructuraAdmin', () => {

    // Caso de Prueba 1: Verifica la inyección del contenido hijo
    it('CP-ESTADM-01: Debe renderizar correctamente los componentes hijos dentro del layout', () => {
        render(
        <BrowserRouter>
            <EstructuraAdmin>
            <div data-testid="contenido-modulo-test">Contenido Vista Admin</div>
            </EstructuraAdmin>
        </BrowserRouter>
        );

        expect(screen.getByTestId('contenido-modulo-test')).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la presencia del área de navegación dentro del layout
    it('CP-ESTADM-02: Debe integrar el menú o barra de navegación dentro de la estructura', () => {
        render(
        <BrowserRouter>
            <EstructuraAdmin>
            <div>Vista</div>
            </EstructuraAdmin>
        </BrowserRouter>
        );

        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

});