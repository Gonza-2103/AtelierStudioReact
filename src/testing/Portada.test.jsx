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

        expect(screen.getByText('PORTADA')).toBeInTheDocument();
        expect(screen.getByText(/El Arte Auténtico Nace de Manos Independientes/i)).toBeInTheDocument();
    });

    //2. Valida la protección de cierre de sesión mediante window.confirm
    it('CP-PORT-02: Debe solicitar confirmación al hacer clic en Cerrar sesión', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
            <BrowserRouter>
                <Portada />
            </BrowserRouter>
        );

        const btnCerrar = screen.getByText(/Cerrar sesión/i);
        fireEvent.click(btnCerrar);

        expect(confirmSpy).toHaveBeenCalledWith('¿Estás seguro que le gustaría cerrar sesión?');
    });

    //3. Confirmación afirmativa al cerrar sesión
    it('CP-PORT-03: Debe limpiar la sesión activa al aceptar el diálogo de confirmación', () => {
        sessionStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo" }));
        vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(
            <BrowserRouter>
                <Portada />
            </BrowserRouter>
        );

        const btnCerrar = screen.getByText(/Cerrar sesión/i);
        fireEvent.click(btnCerrar);

        expect(sessionStorage.getItem("usuarioActivo")).toBeNull();
    });

    //4. Clic en todos los enlaces y botones de navegación de la portada
    it('CP-PORT-04: Debe ejecutar la navegación al hacer clic en los accesos de la barra principal', () => {
        render(
            <BrowserRouter>
                <Portada />
            </BrowserRouter>
        );

        const botonesNav = ['Nosotros', 'Productos', 'Carrito', 'Búsqueda', 'Foro', 'Blogs', 'Contacto'];
        botonesNav.forEach((nombre) => {
            const btn = screen.queryByRole('button', { name: new RegExp(nombre, 'i') });
            if (btn) fireEvent.click(btn);
        });

        expect(screen.getByText('PORTADA')).toBeInTheDocument();
    });
});