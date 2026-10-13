import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TablaProductos from '../components/admin/TablaProductos';

//Evalúa la estructura tabular y el listado dinámico de obras.
 
describe('Pruebas Unitarias: Componente TablaProductos', () => {
    const productosSimulados = [
        { id: 1, codigo: 'ART001', nombre: 'Mar y Playa', precio: 45000, stock: 10, categoria: 'Fotografía' }
    ];

    // Caso de Prueba 1: Verifica las columnas del encabezado
    it('CP-TABPROD-01: Debe renderizar los encabezados de las columnas (Código, Nombre, Precio)', () => {
        render(<TablaProductos productos={productosSimulados} />);

        expect(screen.getByText(/Código/i)).toBeInTheDocument();
        expect(screen.getByText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByText(/Precio/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la renderización de las celdas con datos de prueba
    it('CP-TABPROD-02: Debe mostrar las filas con la información de los productos recibidos por props', () => {
        render(<TablaProductos productos={productosSimulados} />);

        expect(screen.getByText('ART001')).toBeInTheDocument();
        expect(screen.getByText('Mar y Playa')).toBeInTheDocument();
    });

});