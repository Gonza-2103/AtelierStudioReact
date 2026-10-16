
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormularioProducto from '../components/admin/FormularioProducto';

describe('Pruebas Unitarias: Componente FormularioProducto', () => {

    // Caso 1: Verifica los campos y las validaciones obligatorias
    it('CP-FORMPROD-01: Debe mostrar errores al intentar guardar un producto incompleto', () => {
        const alGuardarMock = vi.fn();

        render(<FormularioProducto alGuardar={alGuardarMock} />);

        expect(screen.getByLabelText('Código')).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
        expect(screen.getByLabelText('Precio')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /guardar producto/i }));

        expect(screen.getByText('El código es obligatorio.')).toBeInTheDocument();
        expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
        expect(screen.getByText('Debe seleccionar una categoría.')).toBeInTheDocument();

        expect(alGuardarMock).not.toHaveBeenCalled();
    });

    // Caso 2: Verifica que se guarden correctamente los datos ingresados
    it('CP-FORMPROD-02: Debe guardar un producto válido con sus datos correctos', () => {
        const alGuardarMock = vi.fn();

        render(<FormularioProducto alGuardar={alGuardarMock} />);

        fireEvent.change(screen.getByLabelText('Código'), {
            target: { value: 'art001' }
        });

        fireEvent.change(screen.getByLabelText('Nombre'), {
            target: { value: 'Paisaje al óleo' }
        });

        fireEvent.change(screen.getByLabelText('Descripción'), {
            target: { value: 'Pintura original' }
        });

        fireEvent.change(screen.getByLabelText('Categoría'), {
            target: { value: 'Óleo sobre Lienzo' }
        });

        fireEvent.change(screen.getByLabelText('Precio'), {
            target: { value: '25000' }
        });

        fireEvent.change(screen.getByLabelText('Stock'), {
            target: { value: '5' }
        });

        fireEvent.change(screen.getByLabelText('Stock crítico (opcional)'), {
            target: { value: '2' }
        });

        fireEvent.click(screen.getByRole('button', { name: /guardar producto/i }));

        expect(alGuardarMock).toHaveBeenCalledWith(
            expect.objectContaining({
                codigo: 'ART001',
                nombre: 'Paisaje al óleo',
                descripcion: 'Pintura original',
                categoria: 'Óleo sobre Lienzo',
                precio: 25000,
                stock: 5,
                stockCritico: 2
            })
        );

        expect(screen.getByLabelText('Nombre')).toHaveValue('');
    });

    
    // Caso 3: Verifica la edición de un producto existente
    it('CP-FORMPROD-03: Debe cargar y actualizar los datos de un producto existente', () => {
        const alGuardarMock = vi.fn();

        const producto = {
            id: 1,
            codigo: 'ART001',
            nombre: 'Paisaje original',
            descripcion: 'Obra original',
            categoria: 'Óleo sobre Lienzo',
            precio: 20000,
            stock: 5,
            stockCritico: 2,
            imagen: ''
        };

        render(
            <FormularioProducto
                productoInicial={producto}
                alGuardar={alGuardarMock}
            />
        );

        expect(screen.getByRole('heading', { name: 'Editar producto' })).toBeInTheDocument();
        expect(screen.getByLabelText('Nombre')).toHaveValue('Paisaje original');

        fireEvent.change(screen.getByLabelText('Nombre'), {
            target: { value: 'Paisaje actualizado' }
        });

        fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }));

        expect(alGuardarMock).toHaveBeenCalledWith(
            expect.objectContaining({
                nombre: 'Paisaje actualizado',
                precio: 20000
            })
        );
    });

    // Caso 4: Verifica que se muestre un error cuando falla el guardado
    it('CP-FORMPROD-04: Debe mostrar un mensaje cuando no se puede guardar el producto', () => {
        const alGuardarMock = vi.fn(() => false);

        render(<FormularioProducto alGuardar={alGuardarMock} />);

        fireEvent.change(screen.getByLabelText('Código'), {
            target: { value: 'ART002' }
        });

        fireEvent.change(screen.getByLabelText('Nombre'), {
            target: { value: 'Obra de prueba' }
        });

        fireEvent.change(screen.getByLabelText('Categoría'), {
            target: { value: 'Fotografía de Autor' }
        });

        fireEvent.change(screen.getByLabelText('Precio'), {
            target: { value: '15000' }
        });

        fireEvent.change(screen.getByLabelText('Stock'), {
            target: { value: '3' }
        });

        fireEvent.click(screen.getByRole('button', { name: 'Guardar producto' }));

        expect(alGuardarMock).toHaveBeenCalled();

        expect(
            screen.getByText('No se pudo guardar: revisa si el código está repetido.')
        ).toBeInTheDocument();
    });


    // Caso 5: Verifica las validaciones al cargar imágenes
    it('CP-FORMPROD-05: Debe rechazar imágenes con formato o tamaño no permitido', () => {
        render(<FormularioProducto alGuardar={vi.fn()} />);

        const inputImagen = screen.getByLabelText('Imagen del producto');

        // Archivo con formato no permitido
        const archivoInvalido = new File(
            ['documento'],
            'archivo.pdf',
            { type: 'application/pdf' }
        );

        fireEvent.change(inputImagen, {
            target: { files: [archivoInvalido] }
        });

        expect(
            screen.getByText('Selecciona una imagen JPG, PNG o WebP.')
        ).toBeInTheDocument();

        // Imagen que supera los 500 KB permitidos
        const imagenGrande = new File(
            [new Uint8Array(501 * 1024)],
            'imagen.png',
            { type: 'image/png' }
        );

        fireEvent.change(inputImagen, {
            target: { files: [imagenGrande] }
        });

        expect(
            screen.getByText('La imagen no puede superar los 500 KB.')
        ).toBeInTheDocument();
    });

});
