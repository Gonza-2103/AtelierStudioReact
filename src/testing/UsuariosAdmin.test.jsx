import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UsuariosAdmin from '../pages/admin/UsuariosAdmin';
import { listarUsuarios, eliminarUsuario } from '../services/usuariosApi';

//Mock del servicio usuariosApi para controlar respuestas exitosas y errores
vi.mock('../services/usuariosApi', () => ({
    listarUsuarios: vi.fn(),
    eliminarUsuario: vi.fn()
}));

//Mock liviano de TablaUsuarios para disparar directamente alEditar y alEliminar con cada usuario
vi.mock('../components/admin/TablaUsuarios', () => ({
    default: ({ usuarios, alEditar, alEliminar }) => (
        <div data-testid="tabla-usuarios-mock">
            {usuarios.map((u) => (
                <div key={u.id}>
                    <span>{u.nombre || 'Sin nombre'}</span>
                    <span>{u.correo || ''}</span>
                    <button onClick={() => alEditar(u)}>Editar-{u.id}</button>
                    <button onClick={() => alEliminar(u.id)}>Eliminar-{u.id}</button>
                </div>
            ))}
        </div>
    )
}));

// Evalúa listado, buscador, edición y todas las ramas de eliminación en UsuariosAdmin.jsx
describe('Pruebas Unitarias: Página UsuariosAdmin', () => {

    const usuariosMock = [
        { id: 1, nombre: 'Camila', apellidos: 'Fernández', correo: 'camila.fernandez@gmail.com', rol: 'Cliente' },
        { id: 2, nombre: 'Daniela', apellidos: 'Muñoz', correo: 'daniela.munoz@admin.cl', rol: 'Administrador' },
        { id: 3 }  
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        listarUsuarios.mockResolvedValue(usuariosMock);
        eliminarUsuario.mockResolvedValue(null);
    });

    //1. Carga inicial de usuarios desde listarUsuarios()
    it('CP-USUADM-01: Debe cargar y mostrar los usuarios obtenidos desde la API', async () => {
        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Camila')).toBeInTheDocument();
            expect(screen.getByText('Daniela')).toBeInTheDocument();
        });
    });

    //2. Filtro de búsqueda 
    it('CP-USUADM-02: Debe filtrar el listado al escribir en el buscador de usuarios', async () => {
        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Camila')).toBeInTheDocument();
        });

        const inputBuscar = screen.getByPlaceholderText(/Nombre o correo/i);
        fireEvent.change(inputBuscar, { target: { value: 'camila' } });

        expect(screen.getByText('Camila')).toBeInTheDocument();
        expect(screen.queryByText('Daniela')).not.toBeInTheDocument();
    });

    //3. Eliminación confirmada exitosa
    it('CP-USUADM-03: Debe eliminar al usuario del estado cuando se confirma el diálogo', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(true);

        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Camila')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Eliminar-1'));

        await waitFor(() => {
            expect(eliminarUsuario).toHaveBeenCalledWith(1);
            expect(screen.queryByText('Camila')).not.toBeInTheDocument();
        });
    });

    //4. Eliminación cancelada
    it('CP-USUADM-04: No debe eliminar al usuario si se cancela la confirmación', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(false);

        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Camila')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Eliminar-1'));

        expect(eliminarUsuario).not.toHaveBeenCalled();
        expect(screen.getByText('Camila')).toBeInTheDocument();
    });

    //5. Error al eliminar con mensaje y sin mensaje 
    it('CP-USUADM-05: Debe mostrar alerta si eliminarUsuario falla con o sin mensaje de error', async () => {
        vi.spyOn(window, 'confirm').mockReturnValue(true);
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        eliminarUsuario
            .mockRejectedValueOnce(new Error('Fallo de servidor'))
            .mockRejectedValueOnce({});

        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Camila')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Eliminar-1'));
        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Fallo de servidor');
        });

        fireEvent.click(screen.getByText('Eliminar-2'));
        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('No se pudo eliminar el usuario');
        });

        consoleSpy.mockRestore();
    });

    //6. Navegación a editar usuario
    it('CP-USUADM-06: Debe ejecutar la función editar al presionar el botón de edición', async () => {
        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Camila')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Editar-1'));
        expect(window.location.pathname).toBe('/admin/usuarios/editar/1');
    });

    //7. Error de conexión al cargar el listado inicial (cubre catch del useEffect)
    it('CP-USUADM-07: Debe registrar error en consola si falla listarUsuarios', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        listarUsuarios.mockRejectedValueOnce(new Error('Error de red'));

        render(
            <BrowserRouter>
                <UsuariosAdmin />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });
});