import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Login from '../components/user/Login';

describe('Pruebas Unitarias: Componente Login', () => {

    //1. Renderizado
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

    //2. Casillas vacías
    it('CP-LOG-02: Debe alertar cuando se intenta enviar el formulario con casillas vacías', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        
        fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));
        expect(alertSpy).toHaveBeenCalledWith('Ambas casillas deben completarse antes de entrar.');
    });

    //3. Botón de acceso administrador con ícono de escudo 
    it('CP-LOG-03: Solicita confirmación al presionar el botón de acceso administrador', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const btnAdmin = screen.getByTitle(/Acceso Administrador/i);
        fireEvent.click(btnAdmin);

        expect(confirmSpy).toHaveBeenCalledWith(expect.stringContaining('Área restringida'));
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Acceso administrador habilitado'));
    });

    //4. Login con credenciales válidas de Cliente predeterminado
    it('CP-LOG-04: Permite iniciar sesión con la cuenta predeterminada de cliente (Camila)', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'camila.fernandez@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'nanonano' } });
        fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));

        const sesion = JSON.parse(sessionStorage.getItem('usuarioActivo'));
        expect(sesion.nombre).toBe('Camila');
    });

    //5. Login con credenciales válidas de Administrador predeterminado 
    it('CP-LOG-05: Permite iniciar sesión con la cuenta de Administrador (Daniela)', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'daniela.munoz@admin.cl' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'holiholi' } });
        fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));

        const sesion = JSON.parse(sessionStorage.getItem('usuarioActivo'));
        expect(sesion.rol).toBe('Administrador');
    });

    //6. Error por contraseña o correo incorrectos y botón olvidar clave 
    it('CP-LOG-06: Muestra alerta ante credenciales incorrectas y gestiona botón de ayuda', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        //Credenciales erróneas
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'usuario@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'claveerronea' } });
        fireEvent.click(screen.getByRole('button', { name: /INICIAR SESIÓN/i }));
        expect(alertSpy).toHaveBeenCalledWith('Correo o contraseña incorrectos.');

        //Botón olvidar contraseña
        const btnForgot = screen.getByText(/¿Se te olvidó la contraseña?/i);
        fireEvent.click(btnForgot);
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('contacte al soporte'));

        //Botón registrar
        const btnReg = screen.getByRole('button', { name: /REGISTRAR/i });
        fireEvent.click(btnReg);
        expect(btnReg).toBeInTheDocument();
    });
});