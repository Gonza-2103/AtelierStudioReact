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
});
