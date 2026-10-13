import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Registro_Usuario from '../components/user/Registro_Usuario';

//Evalúa la disponibilidad de los campos obligatorios y la coincidencia de contraseñas
describe('Pruebas Unitarias: Componente Registro_Usuario', () => {

    //1. Verifica la existencia de los campos esenciales del formulario
    it('CP-REG-01: Debe renderizar los campos principales de registro (RUT, Nombre, Correo y Contraseña)', () => {
        render(
        <BrowserRouter>
            <Registro_Usuario />
        </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('Ejemplo: 19011022K')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('ejemplo@gmail.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Entre 8 y 10 caracteres')).toBeInTheDocument();
    });

    //2. Comprueba que se alerte y rechace cuando las contraseñas no coinciden
    it('CP-REG-02: Debe alertar y mostrar error si la contraseña y su confirmación no coinciden', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
        <BrowserRouter>
            <Registro_Usuario />
        </BrowserRouter>
        );

        //Completar los campos simulando claves distintas
        fireEvent.change(screen.getByPlaceholderText('Ejemplo: 19011022K'), { target: { value: '19011022K' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), { target: { value: 'Gonzalo' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa tus apellidos'), { target: { value: 'Hormazábal' } });
        fireEvent.change(screen.getByPlaceholderText('ejemplo@gmail.com'), { target: { value: 'gonzalo@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Entre 8 y 10 caracteres'), { target: { value: 'clave1234' } });
        fireEvent.change(screen.getByPlaceholderText('Repite tu contraseña'), { target: { value: 'otraclave' } });

        const btnRegistrar = screen.getByRole('button', { name: /REGISTRAR/i });
        fireEvent.click(btnRegistrar);

        //Comprobar la alerta de contraseñas no coincidentes
        expect(alertSpy).toHaveBeenCalledWith('No es posible registrar: las contraseñas no coinciden.');
    });
});