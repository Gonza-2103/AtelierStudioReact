
import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import TablaProductos from '../components/admin/TablaProductos';

// Evalúa la visualización, búsqueda, filtros y eliminación de productos.

describe('Pruebas Unitarias: Componente TablaProductos', () => {

    const productosSimulados = [
        {
            id: 1,
            codigo: 'ART001',
            nombre: 'Mar y Playa',
            categoria: 'Fotografía de Autor',
            precio: 45000,
            stock: 10,
            stockCritico: 2
        },
        {
            id: 2,
            codigo: 'ART002',
            nombre: 'Paisaje de Montaña',
            categoria: 'Óleo sobre Lienzo',
            precio: 60000,
            stock: 1,
            stockCritico: 3
        }
    ];

    beforeEach(() => {
        localStorage.clear();
        vi.restoreAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    function mostrarTabla(productos) {
        return render(
            <MemoryRouter>
                <TablaProductos productos={productos} />
            </MemoryRouter>
        );
    }

    // Caso 1: Visualización, búsqueda y filtro de stock crítico
    it('CP-TABPROD-01: Debe mostrar productos y permitir filtrarlos', () => {

        mostrarTabla(productosSimulados);

        // Verifica los encabezados de la tabla
        expect(screen.getByRole('columnheader', { name: 'Código' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Nombre' })).toBeInTheDocument();
        expect(screen.getByRole('columnheader', { name: 'Precio' })).toBeInTheDocument();

        // Verifica los productos recibidos
        expect(screen.getByText('Mar y Playa')).toBeInTheDocument();
        expect(screen.getByText('Paisaje de Montaña')).toBeInTheDocument();

        // Verifica los estados según el stock
        expect(screen.getByText('Disponible')).toBeInTheDocument();
        expect(screen.getByText('Stock crítico')).toBeInTheDocument();

        // Busca un producto por su nombre
        const buscador = screen.getByRole('searchbox', {
            name: 'Buscar productos'
        });

        fireEvent.change(buscador, {
            target: { value: 'Mar y Playa' }
        });

        expect(screen.getByText('Mar y Playa')).toBeInTheDocument();
        expect(screen.queryByText('Paisaje de Montaña')).not.toBeInTheDocument();

        // Busca un producto inexistente
        fireEvent.change(buscador, {
            target: { value: 'Producto inexistente' }
        });

        expect(screen.getByText('No se encontraron productos.')).toBeInTheDocument();

        // Limpia la búsqueda
        fireEvent.change(buscador, {
            target: { value: '' }
        });

        // Activa el filtro de stock crítico
        fireEvent.click(screen.getByRole('checkbox', {
            name: 'Solo stock crítico'
        }));

        expect(screen.getByText('Paisaje de Montaña')).toBeInTheDocument();
        expect(screen.queryByText('Mar y Playa')).not.toBeInTheDocument();
    });

    // Caso 2: Persistencia y eliminación de productos
    it('CP-TABPROD-02: Debe eliminar productos solo cuando el usuario confirme', async () => {

        // Guarda productos para que el componente los cargue
        localStorage.setItem(
            'productos',
            JSON.stringify(productosSimulados)
        );

        const confirmar = vi.spyOn(window, 'confirm');

        render(
            <MemoryRouter>
                <TablaProductos />
            </MemoryRouter>
        );

        expect(screen.getByText('Mar y Playa')).toBeInTheDocument();
        expect(screen.getByText('Paisaje de Montaña')).toBeInTheDocument();

        // Busca el botón eliminar de la primera fila
        const fila = screen.getByText('Mar y Playa').closest('tr');

        const botonEliminar = within(fila).getByRole('button', {
            name: /eliminar/i
        });

        // Primero cancela la eliminación
        confirmar.mockReturnValueOnce(false);

        fireEvent.click(botonEliminar);

        expect(screen.getByText('Mar y Playa')).toBeInTheDocument();

        // Luego confirma la eliminación
        confirmar.mockReturnValueOnce(true);

        fireEvent.click(botonEliminar);

        expect(screen.queryByText('Mar y Playa')).not.toBeInTheDocument();
        expect(screen.getByText('Paisaje de Montaña')).toBeInTheDocument();

        // Comprueba que el cambio también se guardó
        await waitFor(() => {
            const guardados = JSON.parse(
                localStorage.getItem('productos')
            );

            expect(guardados).toHaveLength(1);
            expect(guardados[0].codigo).toBe('ART002');
        });

        expect(confirmar).toHaveBeenCalledWith(
            '¿Eliminar este producto?'
        );
    });

});
