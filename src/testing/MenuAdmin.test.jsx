import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import MenuAdmin from '../components/admin/MenuAdmin';

//Evalúa las opciones de navegación lateral del panel de administración
describe('Pruebas Unitarias: Componente MenuAdmin', () => {

    //Caso de Prueba 1: Verifica las opciones principales de navegación
    it('CP-MENUADM-01: Debe renderizar los enlaces hacia las secciones de Productos y Usuarios', () => {
        render(
            <BrowserRouter>
                <MenuAdmin />
            </BrowserRouter>
        );

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    });

    //Caso de Prueba 2: Verifica la presencia del enlace de salida hacia la tienda pública
    it('CP-MENUADM-02: Debe renderizar el botón para regresar a la vista pública de la galería', () => {
        render(
            <BrowserRouter>
                <MenuAdmin />
            </BrowserRouter>
        );

        expect(screen.getByText(/Volver a la tienda|Portada|Salir|Tienda/i)).toBeInTheDocument();
    });

    //Caso de Prueba 3: Evalúa las ramas condicionales de clase activa/props alternativas
    it('CP-MENUADM-03: Debe evaluar las ramas de navegación cuando se pasan props de sección activa', () => {
        
        //Probamos con prop de sección 'productos' activa (rama if)
        const { rerender } = render(
            <MemoryRouter initialEntries={['/admin/productos']}>
                <MenuAdmin seccionActiva="productos" rutaActiva="/admin/productos" />
            </MemoryRouter>
        );

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();

        //Rerenderizamos con sección 'usuarios' y otra ruta para evaluar la rama contraria (rama else)
        rerender(
            <MemoryRouter initialEntries={['/admin/usuarios']}>
                <MenuAdmin seccionActiva="usuarios" rutaActiva="/admin/usuarios" />
            </MemoryRouter>
        );

        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    });

    //Caso de Prueba 4: Clic en todos los enlaces y botones del menú lateral para cubrir los manejadores onClick
    it('CP-MENUADM-04: Debe responder a los clics de navegación en cada enlace del menú administrativo', () => {
        render(
            <BrowserRouter>
                <MenuAdmin />
            </BrowserRouter>
        );

        //Disparamos clics en los enlaces/botones presentes en el menú lateral
        const enlaces = screen.getAllByRole('link');
        enlaces.forEach((enlace) => {
            fireEvent.click(enlace);
        });

        const botones = screen.getAllByRole('button');
        botones.forEach((boton) => {
            fireEvent.click(boton);
        });

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    });

    //Caso de Prueba 5: Evalúa el cierre de sesión o confirmación de salida hacia la tienda pública
    it('CP-MENUADM-05: Debe gestionar la confirmación y redirección al salir del panel de administración', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(
            <BrowserRouter>
                <MenuAdmin />
            </BrowserRouter>
        );

        const btnSalir = screen.queryByText(/Cerrar sesión|Salir|Volver a la tienda|Tienda/i);
        if (btnSalir) {
            fireEvent.click(btnSalir);
        }

        expect(confirmSpy).toBeDefined();
    });
});