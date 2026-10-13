import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TablaUsuarios from '../components/admin/TablaUsuarios';

//Evalúa el despliegue de la lista de cuentas de usuario y perfiles registrados.
 
describe('Pruebas Unitarias: Componente TablaUsuarios', () => {
    const usuariosSimulados = [
        { id: 1, run: '19011022K', nombre: 'Daniela', correo: 'daniela.munoz@admin.cl', rol: 'Administrador' }
    ];

    // Caso de Prueba 1: Verifica los encabezados de la tabla de usuarios
    it('CP-TABUSU-01: Debe renderizar las columnas principales (RUT/RUN, Correo, Rol)', () => {
        render(<TablaUsuarios usuarios={usuariosSimulados} />);

        expect(screen.getByText(/RUT|RUN/i)).toBeInTheDocument();
        expect(screen.getByText(/Correo/i)).toBeInTheDocument();
        expect(screen.getByText(/Rol/i)).toBeInTheDocument();
    });

    // Caso de Prueba 2: Verifica las celdas con los datos de cuentas
    it('CP-TABUSU-02: Debe mostrar los datos del usuario en la fila correspondiente', () => {
        render(<TablaUsuarios usuarios={usuariosSimulados} />);

        expect(screen.getByText('19011022K')).toBeInTheDocument();
        expect(screen.getByText('daniela.munoz@admin.cl')).toBeInTheDocument();
    });

});