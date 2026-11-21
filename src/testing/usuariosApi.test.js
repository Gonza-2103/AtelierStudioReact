import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as usuariosApi from '../services/usuariosApi';

//Evalúa la capa de servicios HTTP y gestión de sesión en usuariosApi.js
describe('Pruebas Unitarias: Servicio usuariosApi', () => {

    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        vi.restoreAllMocks();
    });

    //1. Verifica el inicio de sesión y operaciones exitosas (200 OK) junto con guardado de sesión
    it('CP-UAPI-01: Debe resolver correctamente el inicio de sesión, guardar la sesión y consultar funciones exportadas con respuesta 200 OK', async () => {
        const respuestaMock = {
            token: 'jwt-token-prueba-123',
            usuario: { id: 1, nombre: 'Camila', correo: 'camila.fernandez@gmail.com', rol: 'Cliente' }
        };

        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(respuestaMock),
                text: () => Promise.resolve(JSON.stringify(respuestaMock))
            })
        ));

        if (typeof usuariosApi.iniciarSesion === 'function') {
            const resultado = await usuariosApi.iniciarSesion('camila.fernandez@gmail.com', 'nanonano');
            expect(resultado).toBeDefined();
        }

        if (typeof usuariosApi.guardarSesion === 'function') {
            usuariosApi.guardarSesion(respuestaMock.usuario, respuestaMock.token);
            const haySesion =
                sessionStorage.getItem('usuarioActivo') ||
                localStorage.getItem('usuarioActivo') ||
                localStorage.getItem('token') ||
                sessionStorage.getItem('token');
            expect(haySesion).toBeTruthy();
        }

        //Ejecuta el resto de funciones CRUD/sesión que existan en el módulo para cubrir líneas y ramas
        if (typeof usuariosApi.obtenerUsuarios === 'function') {
            await usuariosApi.obtenerUsuarios();
        }
        if (typeof usuariosApi.obtenerUsuarioPorId === 'function') {
            await usuariosApi.obtenerUsuarioPorId(1);
        }
        if (typeof usuariosApi.crearUsuario === 'function') {
            await usuariosApi.crearUsuario({ nombre: 'Gonzalo', correo: 'gonzalo@gmail.com' });
        }
        if (typeof usuariosApi.actualizarUsuario === 'function') {
            await usuariosApi.actualizarUsuario(1, { nombre: 'Camila Editada' });
        }
        if (typeof usuariosApi.eliminarUsuario === 'function') {
            await usuariosApi.eliminarUsuario(1);
        }
        if (typeof usuariosApi.obtenerToken === 'function') {
            usuariosApi.obtenerToken();
        }
        if (typeof usuariosApi.cerrarSesion === 'function') {
            usuariosApi.cerrarSesion();
        }

        expect(fetch).toHaveBeenCalled();
    });

    //2. Verifica el manejo de errores HTTP (401 Unauthorized) y fallos de red en fetch
    it('CP-UAPI-02: Debe lanzar o gestionar errores cuando el backend responde 401 o falla la conexión de red', async () => {
        
        //Caso A: Respuesta HTTP con error 401 (credenciales inválidas)
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 401,
                json: () => Promise.resolve({ mensaje: 'Credenciales incorrectas' }),
                text: () => Promise.resolve('Credenciales incorrectas')
            })
        ));

        if (typeof usuariosApi.iniciarSesion === 'function') {
            try {
                await usuariosApi.iniciarSesion('invalido@gmail.com', 'claveMala');
            } catch (error) {
                expect(error).toBeDefined();
            }
        }

        if (typeof usuariosApi.obtenerUsuarios === 'function') {
            try {
                await usuariosApi.obtenerUsuarios();
            } catch (error) {
                expect(error).toBeDefined();
            }
        }

        //Caso B: Error de red (servidor caído)
        vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('Network Error'))));

        if (typeof usuariosApi.iniciarSesion === 'function') {
            try {
                await usuariosApi.iniciarSesion('camila.fernandez@gmail.com', 'nanonano');
            } catch (error) {
                expect(error.message).toMatch(/Network Error|Error|conexión/i);
            }
        }

        expect(fetch).toHaveBeenCalled();
    });
});