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
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
        <BrowserRouter>
            <Contacto />
        </BrowserRouter>
        );

        const inputNombre = screen.getByPlaceholderText('Ingresa su nombre');
        const inputCorreo = screen.getByPlaceholderText('ejemplo@gmail.com');
        const inputComentario = screen.getByPlaceholderText('Ingresa aquí su consulta');
        const btnEnviar = screen.getByRole('button', { name: /ENVIAR MENSAJE/i });

        //Ingresar datos de prueba con dominio inválido
        fireEvent.change(inputNombre, { target: { value: 'Gonzalo Hormazábal' } });
        fireEvent.change(inputCorreo, { target: { value: 'test@hotmail.com' } }); // Dominio no permitido
        fireEvent.change(inputComentario, { target: { value: 'Consulta de prueba sobre obras' } });

        fireEvent.click(btnEnviar);

        //Verificar el mensaje de validación estricto en el nodo <small>
        expect(screen.getByText(/El correo debe ser @duocuc.cl, @profesor.duocuc.cl o @gmail.com./i)).toBeInTheDocument();
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('No se pudo enviar el mensaje'));
    });
});