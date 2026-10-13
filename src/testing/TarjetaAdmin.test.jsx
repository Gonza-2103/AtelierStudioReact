import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TarjetaAdmin from '../components/admin/TarjetaAdmin';

//Evalúa las tarjetas de métricas o estadísticas del Dashboard.

describe('Pruebas Unitarias: Componente TarjetaAdmin', () => {

    // Caso de Prueba 1: Verifica la visualización del título y el valor cuantitativo
    it('CP-TARJADM-01: Debe renderizar el título indicador y la cifra numérica enviada por props', () => {
        render(<TarjetaAdmin titulo="Total Productos" valor="15" />);

        expect(screen.getByText('Total Productos')).toBeInTheDocument();
        expect(screen.getByText('15')).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica la descripción adicional o subtítulo de la tarjeta
    it('CP-TARJADM-02: Debe mostrar la leyenda explicativa o subtítulo secundario', () => {
        render(<TarjetaAdmin titulo="Usuarios" valor="8" descripcion="Registrados activamente" />);

        expect(screen.getByText('Registrados activamente')).toBeInTheDocument();
    });

});