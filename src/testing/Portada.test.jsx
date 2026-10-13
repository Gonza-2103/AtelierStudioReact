import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Portada from '../components/user/Portada';


//Evalúa el renderizado inicial y el flujo de confirmación al cerrar sesión
describe('Pruebas Unitarias: Componente Portada', () => {

    //1. Verifica la carga inicial de los textos y títulos representativos
    it('CP-PORT-01: Debe renderizar el encabezado y el título de la página', () => {
        render(
        <BrowserRouter>
            <Portada />
        </BrowserRouter>
        );

        //Comprobamos la existencia del título de la sección y el lema principal
        expect(screen.getByText('PORTADA')).toBeInTheDocument();
        expect(screen.getByText(/El Arte Auténtico Nace de Manos Independientes/i)).toBeInTheDocument();
    });

    //2. Valida la protección de cierre de sesión mediante window.confirm
    it('CP-PORT-02: Debe solicitar confirmación al hacer clic en Cerrar sesión', () => {
        
        //Simular la respuesta del usuario (cancelar) para evitar navegación no controlada
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
        <BrowserRouter>
            <Portada />
        </BrowserRouter>
        );

        //Ubicar el enlace de cerrar sesión y ejecutar el clic
        const btnCerrar = screen.getByText(/Cerrar sesión/i);
        fireEvent.click(btnCerrar);

        //Verificar que se haya invocado window.confirm con el texto exacto esperado
        expect(confirmSpy).toHaveBeenCalledWith('¿Estás seguro que le gustaría cerrar sesión?');
    });
});
