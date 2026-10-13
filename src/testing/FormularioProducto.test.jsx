import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormularioProducto from '../components/admin/FormularioProducto';

//Evalúa los campos de entrada de datos de obras y el evento de guardado.
 
describe('Pruebas Unitarias: Componente FormularioProducto', () => {

    // Caso de Prueba 1: Verifica la disponibilidad de los inputs obligatorios
    it('CP-FORMPROD-01: Debe renderizar los campos de Código, Nombre y Precio', () => {
        render(<FormularioProducto onSubmit={() => {}} />);

        expect(screen.getByLabelText(/Código/i) || screen.getByPlaceholderText(/código/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre/i) || screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Precio/i) || screen.getByPlaceholderText(/precio/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica el evento submit al presionar el botón de guardado
    it('CP-FORMPROD-02: Debe llamar a la función onSubmit al enviar los datos del formulario', () => {
        const onSubmitMock = vi.fn((e) => e.preventDefault());
        render(<FormularioProducto onSubmit={onSubmitMock} />);

        const btnGuardar = screen.getByRole('button', { name: /guardar|crear|agregar/i });
        fireEvent.click(btnGuardar);

        expect(onSubmitMock).toHaveBeenCalled();
    });

});