import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Contacto from '../components/user/Contacto';

//Evalúa el renderizado del formulario de soporte y la validación de dominios autorizados de correo
describe('Pruebas Unitarias: Componente Contacto', () => {

    //1. Comprueba los campos de entrada requeridos
    it('CP-CONT-01: Debe renderizar los campos de Nombre, Correo y Comentario', () => {
        render(
            <BrowserRouter>
                <Contacto />
            </BrowserRouter>
        );
        expect(screen.getByPlaceholderText('Ingresa su nombre')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('ejemplo@gmail.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingresa aquí su consulta')).toBeInTheDocument();
    });

    //2. Comprueba el rechazo de correos fuera de los dominios institucionales o permitidos
    it('CP-CONT-02: Debe mostrar error si el correo no pertenece a los dominios autorizados', () => {
        vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Contacto />
            </BrowserRouter>
        );

        const inputNombre = screen.getByPlaceholderText('Ingresa su nombre');
        const inputCorreo = screen.getByPlaceholderText('ejemplo@gmail.com');
        const inputComentario = screen.getByPlaceholderText('Ingresa aquí su consulta');
        const btnEnviar = screen.getByRole('button', { name: /ENVIAR MENSAJE/i });

        fireEvent.change(inputNombre, { target: { value: 'Gonzalo Hormazábal' } });
        fireEvent.change(inputCorreo, { target: { value: 'test@hotmail.com' } });
        fireEvent.change(inputComentario, { target: { value: 'Consulta de prueba sobre obras' } });

        fireEvent.click(btnEnviar);

        expect(screen.getByText(/El correo debe ser @duocuc.cl, @profesor.duocuc.cl o @gmail.com./i)).toBeInTheDocument();
    });

    //3. Validación de campos vacíos y longitud que supere 100 y 500 caracteres
    it('CP-CONT-03: Debe validar campos vacíos y alertar si el texto supera la longitud permitida', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Contacto />
            </BrowserRouter>
        );

        const btnEnviar = screen.getByRole('button', { name: /ENVIAR MENSAJE/i });
        
        //Intento 1: Formulario vacío
        fireEvent.click(btnEnviar);
        expect(alertSpy).toHaveBeenCalled();

        //Intento 2: Nombre > 100 caracteres y Comentario > 500 caracteres
        const inputNombre = screen.getByPlaceholderText('Ingresa su nombre');
        const inputComentario = screen.getByPlaceholderText('Ingresa aquí su consulta');

        fireEvent.change(inputNombre, { target: { value: 'A'.repeat(105) } });
        fireEvent.change(inputComentario, { target: { value: 'C'.repeat(505) } });
        fireEvent.click(btnEnviar);

        expect(screen.getByText(/El nombre no puede superar los 100 caracteres./i)).toBeInTheDocument();
        expect(screen.getByText(/El comentario no puede superar los 500 caracteres./i)).toBeInTheDocument();
    });

    //4. Envío exitoso y navegación de la barra superior
    it('CP-CONT-04: Debe enviar el mensaje exitosamente y permitir hacer clic en la barra de navegación', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Contacto />
            </BrowserRouter>
        );

        //Envío válido
        fireEvent.change(screen.getByPlaceholderText('Ingresa su nombre'), { target: { value: 'Daniela Muñoz' } });
        fireEvent.change(screen.getByPlaceholderText('ejemplo@gmail.com'), { target: { value: 'daniela.munoz@duocuc.cl' } });
        fireEvent.change(screen.getByPlaceholderText('Ingresa aquí su consulta'), { target: { value: 'Comentario válido y conforme.' } });
        fireEvent.click(screen.getByRole('button', { name: /ENVIAR MENSAJE/i }));

        expect(alertSpy).toHaveBeenCalledWith('Tu mensaje fue enviado correctamente.');

        //Clic en los botones de navegación del encabezado
        const navBtns = ['Portada', 'Nosotros', 'Productos', 'Carrito', 'Búsqueda', 'Foro', 'Blogs'];
        navBtns.forEach((nom) => {
            const btn = screen.queryByRole('button', { name: new RegExp(nom, 'i') });
            if (btn) fireEvent.click(btn);
        });
    });
});