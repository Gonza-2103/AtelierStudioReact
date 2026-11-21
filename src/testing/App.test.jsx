import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

//Evalúa el enrutamiento principal de la aplicación entre vistas públicas y administrativas
describe('Pruebas Unitarias: Componente App (Enrutador Principal)', () => {

    //1. Verifica que la ruta raíz cargue la vista de Portada
    it('CP-APP-01: Debe renderizar la vista Portada en la ruta raíz "/"', () => {
        window.history.pushState({}, '', '/');
        render(<App />);

        expect(screen.getByText(/PORTADA|El Arte Auténtico/i)).toBeInTheDocument();
    });

    //2. Verifica que la ruta /login cargue el formulario de inicio de sesión
    it('CP-APP-02: Debe renderizar el componente Login al navegar a "/login"', () => {
        window.history.pushState({}, '', '/login');
        render(<App />);

        expect(screen.getByPlaceholderText(/Correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /INICIAR SESIÓN/i })).toBeInTheDocument();
    });

    //3. Verifica que la ruta /productos cargue el catálogo público
    it('CP-APP-03: Debe renderizar el catálogo de productos al navegar a "/productos"', () => {
        window.history.pushState({}, '', '/productos');
        render(<App />);

        expect(screen.getByText(/Mar y Playa|Productos/i)).toBeInTheDocument();
    });

    //4. Verifica que la ruta /admin cargue el panel de administración
    it('CP-APP-04: Debe renderizar el panel administrativo al navegar a "/admin"', () => {
        window.history.pushState({}, '', '/admin');
        render(<App />);

        expect(screen.getByText(/Panel|Administración|Productos|Usuarios/i)).toBeInTheDocument();
    });
});