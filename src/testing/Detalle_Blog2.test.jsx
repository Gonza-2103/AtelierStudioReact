import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Detalle_Blog2 from '../components/user/Detalle_Blog2';

//Evalúa la correcta visualización del contenido editorial sobre fotografía marina y su enlace de regreso
describe('Pruebas Unitarias: Componente Detalle_Blog2', () => {
    it('CP-DBLOG2-01: Debe renderizar el artículo completo sobre La Luz en la Fotografía Marina', () => {
        render(
        <BrowserRouter>
            <Detalle_Blog2 />
        </BrowserRouter>
        );

        expect(screen.getByText(/La Luz en la Fotografía Marina/i)).toBeInTheDocument();
        expect(screen.getByText(/Volver a Blogs/i)).toBeInTheDocument();
    });
});
