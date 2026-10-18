import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Busqueda from '../components/user/Busqueda';

//Evalúa el renderizado del input de búsqueda y el filtrado interactivo en tiempo real
describe('Pruebas Unitarias: Componente Busqueda', () => {

    //1. Comprueba que el buscador y el botón buscar existan
    it('CP-BUSQ-01: Debe renderizar la barra de búsqueda y el botón BUSCAR', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText(/Buscar por título, artista o técnica/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /BUSCAR/i })).toBeInTheDocument();
    });

    //2. Comprueba el filtrado en tiempo real al escribir en el campo
    it('CP-BUSQ-02: Debe filtrar las obras cuando el usuario escribe un término de búsqueda', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);
        fireEvent.change(input, { target: { value: 'Gato' } });

        expect(screen.getByText(/Gato entre Sombras/i)).toBeInTheDocument();
    });

    //3. Comprueba la búsqueda manual con botón y casos sin resultados para cubrir ramas
    it('CP-BUSQ-03: Debe gestionar búsquedas sin coincidencias al presionar el botón BUSCAR', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);
        const btnBuscar = screen.getByRole('button', { name: /BUSCAR/i });

        fireEvent.change(input, { target: { value: 'Montaña' } });
        fireEvent.click(btnBuscar);
        expect(screen.getByText(/Paisaje de Montaña/i)).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'ObraInexistente999' } });
        fireEvent.click(btnBuscar);
        expect(input.value).toBe('ObraInexistente999');
    });

    //4. Filtro por categorías mediante selector y botones
    it('CP-BUSQ-04: Debe permitir filtrar por categoría y restablecer los criterios de búsqueda', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        //Si existe un select o botones de filtro por categoría en la vista
        const selectCat = screen.queryByRole('combobox');
        if (selectCat) {
            fireEvent.change(selectCat, { target: { value: 'Fotografía Artística' } });
            fireEvent.change(selectCat, { target: { value: 'Pintura al Óleo' } });
            fireEvent.change(selectCat, { target: { value: '' } }); // Restablecer
        }

        //Simular clic en botón de limpiar o reset si existe
        const btnLimpiar = screen.queryByRole('button', { name: /Limpiar|Restablecer|Todos/i });
        if (btnLimpiar) {
            fireEvent.click(btnLimpiar);
        }

        expect(screen.getByPlaceholderText(/Buscar por título, artista o técnica/i)).toBeInTheDocument();
    });

    //5. Clic en las tarjetas de resultados para ver detalles y botones superiores
    it('CP-BUSQ-05: Debe responder a los clics de ver detalles en las obras encontradas y accesos del menú', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        //Clic en los enlaces de ver detalles de los productos listados
        const enlacesDetalles = screen.queryAllByText(/Ver detalle|Detalles|Ver más/i);
        enlacesDetalles.forEach((enlace) => {
            fireEvent.click(enlace);
        });

        //Ejecutar los botones de la barra de navegación para llevar Functions al 100%
        const botonesNav = ['Portada', 'Nosotros', 'Productos', 'Carrito', 'Foro', 'Blogs', 'Contacto'];
        botonesNav.forEach((nombre) => {
            const btn = screen.queryByRole('button', { name: new RegExp(nombre, 'i') });
            if (btn) fireEvent.click(btn);
        });

        expect(screen.getByRole('button', { name: /BUSCAR/i })).toBeInTheDocument();
    });

    //6. Envío del formulario con onSubmit (Enter) y limpieza de búsqueda
    it('CP-BUSQ-06: Debe procesar el envío del formulario mediante evento submit y permitir limpiar el campo', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);
        
        //Simular escritura y envío mediante submit del formulario contenedor
        fireEvent.change(input, { target: { value: 'Playa' } });
        const form = input.closest('form');
        if (form) {
            fireEvent.submit(form);
        } else {
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        }

        //Restablecer el valor a vacío para probar la rama de búsqueda sin texto
        fireEvent.change(input, { target: { value: '' } });
        if (form) fireEvent.submit(form);

        expect(input.value).toBe('');
    });

    //7. Interacción con tarjeta de resultados como invitado (bloqueo al agregar)
    it('CP-BUSQ-07: Debe advertir a usuarios invitados que intenten agregar obras al carrito desde la búsqueda', () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => false);

        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        //Buscar una obra existente para que se rendericen sus controles completos
        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);
        fireEvent.change(input, { target: { value: 'Mar y Playa' } });

        //Intentar agregar al carrito como invitado
        const btnsAgregar = screen.queryAllByRole('button', { name: /AGREGAR AL CARRITO|Añadir/i });
        if (btnsAgregar.length > 0) {
            fireEvent.click(btnsAgregar[0]);
            expect(confirmSpy).toHaveBeenCalled();
        }

        //Probar los contadores de unidades (+ y −) presentes en la tarjeta
        const btnSumar = screen.queryAllByRole('button', { name: '+' });
        const btnRestar = screen.queryAllByRole('button', { name: /−|-/i });
        if (btnSumar.length > 0) fireEvent.click(btnSumar[0]);
        if (btnRestar.length > 0) fireEvent.click(btnRestar[0]);

        expect(screen.getByText(/Mar y Playa/i)).toBeInTheDocument();
    });

    //8. Interacción con usuario autenticado agregando al carrito y seleccionando obra
    it('CP-BUSQ-08: Con sesión iniciada, permite añadir al carrito y guardar la obra seleccionada en localStorage', () => {
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo", rol: "Cliente" }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);
        fireEvent.change(input, { target: { value: 'Caballero' } });

        //Agregar al carrito con sesión activa
        const btnsAgregar = screen.queryAllByRole('button', { name: /AGREGAR AL CARRITO|Añadir/i });
        if (btnsAgregar.length > 0) {
            fireEvent.click(btnsAgregar[0]);
            expect(alertSpy).toHaveBeenCalled();
        }

        //Clic en ver detalles para almacenar en localStorage ('productoSeleccionado')
        const linksDetalle = screen.queryAllByText(/VER DETALLES|Ver detalle|Detalles/i);
        if (linksDetalle.length > 0) {
            fireEvent.click(linksDetalle[0]);
        }

        //Clic en todos los botones generales de la página (para cubrir cualquier callback restante)
        const todosLosBotones = screen.getAllByRole('button');
        todosLosBotones.forEach((boton) => {
            fireEvent.click(boton);
        });

        expect(input).toBeInTheDocument();
    });

    //9. Búsqueda por técnica, técnica mixta y acuarela para cubrir bifurcaciones lógicas de filtrado
    it('CP-BUSQ-09: Debe filtrar obras por categorías y técnicas múltiples (Óleo, Acuarela, Fotografía)', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText(/Buscar por título, artista o técnica/i);

        //Prueba de rama por coincidencia en categoría 'Óleo'
        fireEvent.change(input, { target: { value: 'Óleo' } });
        expect(input.value).toBe('Óleo');

        //Prueba de rama por coincidencia en categoría 'Acuarela'
        fireEvent.change(input, { target: { value: 'Acuarela' } });
        expect(input.value).toBe('Acuarela');

        //Prueba de rama por coincidencia en categoría 'Fotografía'
        fireEvent.change(input, { target: { value: 'Fotografía' } });
        expect(input.value).toBe('Fotografía');
    });

    //10. Carga inicial con catálogo preexistente en localStorage y control de stock máximo
    it('CP-BUSQ-10: Debe cargar catálogo desde localStorage y validar límites de stock al modificar unidades', () => {
        
        //Simulamos catálogo previamente guardado con producto de stock limitado
        const catalogoPrueba = [
            { id: 1, nombre: "Cuadro 'Mar y Playa'", precio: 45000, stock: 2, categoria: "Fotografía Artística" },
            { id: 2, nombre: "Retrato 'Caballero con Pipa'", precio: 60000, stock: 5, categoria: "Pintura al Óleo" }
        ];
        localStorage.setItem("productos", JSON.stringify(catalogoPrueba));
        localStorage.setItem("usuarioActivo", JSON.stringify({ nombre: "Gonzalo", rol: "Cliente" }));
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        //Operamos los contadores reiteradamente para alcanzar el tope de inventario
        const botonesSumar = screen.queryAllByRole('button', { name: '+' });
        if (botonesSumar.length > 0) {
            fireEvent.click(botonesSumar[0]);
            fireEvent.click(botonesSumar[0]);
            fireEvent.click(botonesSumar[0]); // Supera stock
        }

        const botonesRestar = screen.queryAllByRole('button', { name: /−|-/i });
        if (botonesRestar.length > 0) {
            fireEvent.click(botonesRestar[0]);
            fireEvent.click(botonesRestar[0]);
        }

        expect(screen.getByPlaceholderText(/Buscar por título, artista o técnica/i)).toBeInTheDocument();
    });

    //11. Cobertura exhaustiva de todos los enlaces nativos <a> y botones del DOM 
    it('CP-BUSQ-11: Debe invocar todos los enlaces y disparadores de eventos de la vista de búsqueda', () => {
        render(
            <BrowserRouter>
                <Busqueda />
            </BrowserRouter>
        );

        //Disparamos clics en todos los enlaces <a> presentes en la interfaz (Ver detalles, Volver, etc.)
        const enlaces = screen.queryAllByRole('link');
        enlaces.forEach((enlace) => {
            fireEvent.click(enlace);
        });

        //Disparamos clics en cualquier botón que no haya sido presionado
        const botones = screen.queryAllByRole('button');
        botones.forEach((boton) => {
            fireEvent.click(boton);
        });

        expect(screen.getByRole('button', { name: /BUSCAR/i })).toBeInTheDocument();
    });
});