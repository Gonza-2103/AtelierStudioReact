import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Registro_Usuario from '../components/user/Registro_Usuario';

describe('Pruebas Unitarias: Componente Registro_Usuario', () => {

    //1. Renderizado inicial
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

    //2. Claves no coinciden
    it('CP-REG-02: Debe alertar y mostrar error si la contraseña y su confirmación no coinciden', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(
            <BrowserRouter>
                <Registro_Usuario />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Ejemplo: 19011022K'), { target: { value: '19011022K' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), { target: { value: 'Gonzalo' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa tus apellidos'), { target: { value: 'Hormazábal' } });
        fireEvent.change(screen.getByPlaceholderText('ejemplo@gmail.com'), { target: { value: 'gonzalo@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Entre 8 y 10 caracteres'), { target: { value: 'clave1234' } });
        fireEvent.change(screen.getByPlaceholderText('Repite tu contraseña'), { target: { value: 'otraclave' } });

        fireEvent.click(screen.getByRole('button', { name: /REGISTRAR/i }));
        expect(alertSpy).toHaveBeenCalledWith('No es posible registrar: las contraseñas no coinciden.');
    });

    //3. Validación de campos totalmente vacíos (Cubre líneas 155-162)
    it('CP-REG-03: Debe alertar cuando se intenta enviar el formulario totalmente vacío', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(
            <BrowserRouter>
                <Registro_Usuario />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByRole('button', { name: /REGISTRAR/i }));
        expect(alertSpy).toHaveBeenCalledWith('No es posible registrar: todos los campos están vacíos.');
    });

    //4. Selección dinámica de región y comunas (Cubre líneas 194-214)
    it('CP-REG-04: Debe actualizar las comunas disponibles al seleccionar una región', () => {
        render(
            <BrowserRouter>
                <Registro_Usuario />
            </BrowserRouter>
        );

        const selects = screen.getAllByRole('combobox');
        const selectRegion = selects[0];

        //Seleccionamos Región de Valparaíso
        fireEvent.change(selectRegion, { target: { value: 'Región de Valparaíso' } });
        expect(selectRegion.value).toBe('Región de Valparaíso');

        //Verificamos que se cargue una comuna correspondiente
        expect(screen.getByRole('option', { name: 'Viña del Mar' })).toBeInTheDocument();
    });

    //5. Flujo de registro exitoso completo y guardado en localStorage (Cubre líneas 215-321)
    it('CP-REG-05: Debe registrar al usuario satisfactoriamente cuando todos los datos son válidos', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(
            <BrowserRouter>
                <Registro_Usuario />
            </BrowserRouter>
        );

        //Llenado de todos los campos con datos conformes
        fireEvent.change(screen.getByPlaceholderText('Ejemplo: 19011022K'), { target: { value: '19011022K' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), { target: { value: 'Gonzalo' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa tus apellidos'), { target: { value: 'Hormazábal' } });
        fireEvent.change(screen.getByPlaceholderText('ejemplo@gmail.com'), { target: { value: 'gonzalo@duoc.cl' } });
        fireEvent.change(screen.getByPlaceholderText('Entre 8 y 10 caracteres'), { target: { value: 'pass1234' } });
        fireEvent.change(screen.getByPlaceholderText('Repite tu contraseña'), { target: { value: 'pass1234' } });
        fireEvent.change(screen.getByPlaceholderText('Ejemplo: 912345678'), { target: { value: '912345678' } });
        fireEvent.change(screen.getByPlaceholderText('Calle #número, depto. #número'), { target: { value: 'Av. Libertad 1234' } });

        const selects = screen.getAllByRole('combobox');
        fireEvent.change(selects[0], { target: { value: 'Región de Valparaíso' } });
        fireEvent.change(selects[1], { target: { value: 'Viña del Mar' } });

        fireEvent.click(screen.getByRole('button', { name: /REGISTRAR/i }));

        expect(alertSpy).toHaveBeenCalledWith('¡Usuario registrado con exito!');
        const guardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
        expect(guardado.run).toBe('19011022K');
    });
});