import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from '../components/user/Login';

//Evalúa la disponibilidad de los campos de entrada y la validación de casillas vacías
describe('Pruebas Unitarias: Componente Login', () => {

    //1. Comprueba que los campos y botones del formulario existan en el DOM
    it('CP-LOG-01: Debe renderizar los campos de correo, clave y el botón de inicio', () => {
        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );
        expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /INICIAR SESIÓN/i })).toBeInTheDocument();
    });

    //2. Verifica que no se permita iniciar sesión con campos vacíos
    it('CP-LOG-02: Debe alertar cuando se intenta enviar el formulario con casillas vacías', () => {
        
        //Espiar window.alert para comprobar el mensaje preventivo
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
        );

        const btnSubmit = screen.getByRole('button', { name: /INICIAR SESIÓN/i });
        fireEvent.click(btnSubmit);

        //Validación de la alerta reglamentaria de login.js
        expect(alertSpy).toHaveBeenCalledWith('Ambas casillas deben completarse antes de entrar.');
    });
});
