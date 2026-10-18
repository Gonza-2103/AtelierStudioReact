import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Foro from '../components/user/Foro';

//Evalúa la lista de debates iniciales y la restricción de publicación para invitados
describe('Pruebas Unitarias: Componente Foro', () => {

    //1. Comprueba que los temas de debate por defecto estén presentes en pantalla
    it('CP-FORO-01: Debe renderizar las opiniones recientes cargadas por defecto', () => {
        render(
            <BrowserRouter>
                <Foro />
            </BrowserRouter>
        );
        expect(screen.getByText('Conservación de acuarelas en climas húmedos')).toBeInTheDocument();
        expect(screen.getByText('Apreciación del claroscuro en retratos al óleo')).toBeInTheDocument();
    });

    //2. Comprueba que no se permita publicar opiniones si no se ha iniciado sesión
    it('CP-FORO-02: Debe impedir la publicación de un nuevo tema a visitantes no registrados', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
            <BrowserRouter>
                <Foro />
            </BrowserRouter>
        );

        const btnPublicar = screen.getByRole('button', { name: /PUBLICAR TEMA/i });
        fireEvent.click(btnPublicar);

        expect(confirmSpy).toHaveBeenCalledWith(
            expect.stringContaining('Para realizar esta acción debes iniciar sesión')
        );
    });

    //3. Usuario autenticado valida campos vacíos al publicar
    it('CP-FORO-03: Con sesión activa, exige completar título, categoría y comentario antes de publicar', () => {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Geraldinne", apellidos: "G." }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Foro />
            </BrowserRouter>
        );

        const btnPublicar = screen.getByRole('button', { name: /PUBLICAR TEMA/i });
        fireEvent.click(btnPublicar);

        expect(alertSpy).toHaveBeenCalledWith('Debes completar el título, la categoría y el comentario antes de publicar.');
    });

    //4. Usuario autenticado publica un nuevo tema exitosamente
    it('CP-FORO-04: Con sesión activa, permite publicar un tema nuevo y visualizarlo en la lista', () => {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo", apellidos: "Hormazábal" }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Foro />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Ingrese un título/i), { target: { value: 'Nueva técnica de veladuras al óleo' } });
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'tecnicas' } });
        fireEvent.change(screen.getByPlaceholderText(/Escribe aquí tu recomendación/i), { target: { value: 'Recomiendo aplicar capas muy finas con aceite de lino puro' } });

        const btnPublicar = screen.getByRole('button', { name: /PUBLICAR TEMA/i });
        fireEvent.click(btnPublicar);

        expect(alertSpy).toHaveBeenCalledWith('¡Tu tema ha sido publicado en el foro!');
        expect(screen.getByText('Nueva técnica de veladuras al óleo')).toBeInTheDocument();
    });

    //5. Clic en enlace "Responder" y botones de la barra de navegación
    it('CP-FORO-05: Informa inactividad del botón responder y ejecuta los accesos de la barra superior', () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Foro />
            </BrowserRouter>
        );

        const enlaceResp = screen.getAllByText(/Responder/i)[0];
        fireEvent.click(enlaceResp);
        expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining("El botón 'Responder' no está en funcionamiento"));

        const navBtns = ['Portada', 'Nosotros', 'Productos', 'Carrito', 'Búsqueda', 'Blogs', 'Contacto'];
        navBtns.forEach((nom) => {
            const btn = screen.queryByRole('button', { name: new RegExp(nom, 'i') });
            if (btn) fireEvent.click(btn);
        });
    });
});