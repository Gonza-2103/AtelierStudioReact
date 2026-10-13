import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Detalle_Blog1 from '../components/user/Detalle_Blog1';

//Evalúa la correcta visualización del contenido editorial completo y el enlace de retorno
describe('Pruebas Unitarias: Componente Detalle_Blog1', () => {
    it('CP-DBLOG1-01: Debe renderizar el artículo completo sobre Técnicas Ancestrales del Óleo', () => {
        render(
        <BrowserRouter>
            <Detalle_Blog1 />
        </BrowserRouter>
        );

        expect(screen.getByText(/Técnicas Ancestrales del Óleo/i)).toBeInTheDocument();
        expect(screen.getByText(/Volver a Blogs/i)).toBeInTheDocument();
    });
});
