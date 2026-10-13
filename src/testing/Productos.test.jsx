import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Productos from '../components/user/Productos';

//Evalúa el listado de obras del catálogo y la restricción de interacción para visitantes
describe('Pruebas Unitarias: Componente Productos', () => {

    //1. Verifica que las obras base de la galería se muestren correctamente
    it('CP-PROD-01: Debe renderizar las obras de arte disponibles en el catálogo', () => {
        render(
        <BrowserRouter>
            <Productos />
        </BrowserRouter>
        );
        expect(screen.getByText("Cuadro 'Mar y Playa'")).toBeInTheDocument();
        expect(screen.getByText("Retrato 'Caballero con Pipa'")).toBeInTheDocument();
    });

    //2. Verifica que un invitado no autenticado no pueda añadir productos al carrito
    it('CP-PROD-02: Debe bloquear a un usuario invitado al intentar agregar al carrito', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
        <BrowserRouter>
            <Productos />
        </BrowserRouter>
        );

        //Seleccionar el primer botón de agregar al carrito disponible
        const btnsAgregar = screen.getAllByRole('button', { name: /AGREGAR AL CARRITO/i });
        fireEvent.click(btnsAgregar[0]);

        //Comprobar que el aviso de inicio de sesión se haya disparado
        expect(confirmSpy).toHaveBeenCalledWith(
        expect.stringContaining('Para realizar esta acción debes iniciar sesión')
        );
    });
});
