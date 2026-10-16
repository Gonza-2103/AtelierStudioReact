import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import EncabezadoUsuarios from '../components/admin/EncabezadoUsuarios';

//Evalúa la cabecera informativa de la gestión de cuentas del sistema.
 
describe('Pruebas Unitarias: Componente EncabezadoUsuarios', () => {

    // Caso de Prueba 1: Verifica el título de administración de usuarios
    it('CP-ENCUSU-01: Debe renderizar el título de la sección de administración de usuarios', () => {
        render(
        <BrowserRouter>
            <EncabezadoUsuarios />
        </BrowserRouter>
        
        );

        expect(screen.getByText(/Gestión de Usuarios/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica el subtítulo descriptivo del control de perfiles
    it('CP-ENCUSU-02: Debe renderizar la descripción del control de cuentas registradas', () => {
        render(
        <BrowserRouter>
            <EncabezadoUsuarios />
        </BrowserRouter>
        );

        expect(screen.getByText(/Administra los usuarios registrados en AtelierStudio/i)).toBeInTheDocument();
    });

});