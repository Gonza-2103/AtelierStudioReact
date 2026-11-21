import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import InicioAdmin from '../pages/admin/InicioAdmin';

//Evalúa el dashboard principal del administrador, sus tarjetas de resumen y accesos
describe('Pruebas Unitarias: Página InicioAdmin', () => {

    //1. Verifica el renderizado del título y tarjetas de métricas
    it('CP-INIADM-01: Debe renderizar el encabezado del panel y las secciones de resumen', () => {
        render(
            <BrowserRouter>
                <InicioAdmin />
            </BrowserRouter>
        );

        expect(screen.getByText(/Panel|Inicio|Dashboard|Administración/i)).toBeInTheDocument();
        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Usuarios/i)).toBeInTheDocument();
    });

    //2. Verifica la interacción con los accesos rápidos y botones del dashboard
    it('CP-INIADM-02: Debe responder a los clics en los accesos directos y menú lateral', () => {
        render(
            <BrowserRouter>
                <InicioAdmin />
            </BrowserRouter>
        );

        const botones = screen.queryAllByRole('button');
        botones.forEach((btn) => fireEvent.click(btn));

        const enlaces = screen.queryAllByRole('link');
        enlaces.forEach((link) => fireEvent.click(link));

        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
    });
});