import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import EncabezadoAdmin from '../components/admin/EncabezadoAdmin';

//Evalúa la barra superior del panel y los identificadores de sesión activa.
 
describe('Pruebas Unitarias: Componente EncabezadoAdmin', () => {

    // Caso de Prueba 1: Verifica el título distintivo del panel de administración
    it('CP-ENCADM-01: Debe renderizar el título del panel de administración', () => {
        render(
        <BrowserRouter>
            <EncabezadoAdmin titulo="Gestión de productos" />
        </BrowserRouter>
        );

        expect(screen.getByText(/Gestión de productos/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la identificación del perfil con rol administrativo
    it('CP-ENCADM-02: Debe mostrar el rol o nombre del administrador autenticado', () => {
        render(
        <BrowserRouter>
            <EncabezadoAdmin usuario="Administrador" />
        </BrowserRouter>
        );

        expect(screen.getByText(/Administra los productos disponibles en AtelierStudio/i)).toBeInTheDocument();
    });

});