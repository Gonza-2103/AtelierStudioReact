import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Productos() {
    const navigate = useNavigate();

   // Un contador por producto
    const [catalogo, setCatalogo] = useState([]);
    const [cantidades, setCantidades] = useState({});


    //Catálogo inicial por defecto
    const catalogoPorDefecto = [
        {
            id: 1,
            codigo: "ART001",
            nombre: "Cuadro 'Mar y Playa'",
            precio: 45000,
            stock: 10,
            categoria: "Fotografía Artística",
            imagen: foto1,
            descripcion: "Fotografía aérea en plano cenital que captura el contraste entre las aguas turquesas del océano y la orilla de arena blanca..."
        },
        {
            id: 2,
            codigo: "ART002",
            nombre: "Retrato 'Caballero con Pipa'",
            precio: 60000,
            stock: 8,
            categoria: "Pintura al Óleo",
            imagen: foto2,
            descripcion: "Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva..."
        },
        {
            id: 3,
            codigo: "ART003",
            nombre: "Cuadro 'Paisaje de Montaña'",
            precio: 48000,
            stock: 6,
            categoria: "Pintura al Óleo",
            imagen: foto3,
            descripcion: "Pintura paisajística tradicional al óleo que muestra una cordillera alpina nevada reflejada en un lago..."
        },
        {
            id: 4,
            codigo: "ART004",
            nombre: "Retrato 'Gato entre Sombras'",
            precio: 72000,
            stock: 6,
            categoria: "Acuarela y Técnica Mixta",
            imagen: foto4,
            descripcion: "Acuarela luminosa que ilustra a un gato atigrado de pelaje naranja y blanco..."
        }
    ];

    //Cargar y sincronizar con localStorage
    useEffect(() => {
        let guardados = null;
        try {
            guardados = JSON.parse(localStorage.getItem("productos"));
        } catch (e) {
            guardados = null;
        }

        if (!guardados || guardados.length === 0) {
            guardados = catalogoPorDefecto;
            localStorage.setItem("productos", JSON.stringify(catalogoPorDefecto));
        }

        setCatalogo(guardados);
    }, []);

    //Verificación de autenticación para invitados
    const verificarSesion = () => {
        const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo")) || 
                        JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!usuario) {
            const irLogin = window.confirm("Para realizar esta acción debes iniciar sesión con tu cuenta.\n\n¿Deseas ir al inicio de sesión ahora?");
            if (irLogin) {
                navigate('/login');
            }
            return false;
        }
        return true;
    };

   // Stock del catálogo actualizado por Administración.
    const obtenerStock = (id) => {
        const prod = catalogo.find(p => String(p.id) === String(id));
        return prod ? Number(prod.stock) : 0;
    };

    //Lógica para agregar al carrito con validación de sesión y stock
    const agregarAlCarrito = (id, cantidadSeleccionada, setCantidadReset) => {
        if (!verificarSesion()) return;

        const productoDatos = catalogo.find(p => String(p.id) === String(id));
        if (!productoDatos) return;

        const stockDisponible = Number(productoDatos.stock) || 0;
        let carrito = [];
        try {
            carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        } catch (e) {
            carrito = [];
        }

        const itemExistente = carrito.find(p => String(p.id) === String(id));
        const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0;

        if (cantidadEnCarrito + cantidadSeleccionada > stockDisponible) {
            alert("No hay más unidades disponibles en stock para añadir.");
            return;
        }

        if (itemExistente) {
            itemExistente.cantidad += cantidadSeleccionada;
        } else {
            carrito.push({
                id: productoDatos.id,
                nombre: productoDatos.nombre,
                precio: productoDatos.precio,
                imagen: productoDatos.imagen || foto4,
                cantidad: cantidadSeleccionada,
                stock: stockDisponible
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert(`Se agregaron ${cantidadSeleccionada} unidad(es) de "${productoDatos.nombre}" al carrito.`);
        
        if (setCantidadReset) setCantidadReset(1);
    };

    //Acción para 'ver detalles'
    const handleVerDetalles = (e) => {
        e.preventDefault();
        const seleccionado = catalogo[0];
        if (!seleccionado) return;
        localStorage.setItem("productoSeleccionado", JSON.stringify(seleccionado));
        navigate('/detalle_producto');
    };


    return (
        <div id="prod">

            {/* Título de 'productos', logo y botones */}
            <header id="titulo_prod">
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>PRODUCTOS</h2>
                </figure>

                <figure id="btns_navegacion_prod">
                    <button id="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenido principal de productos */}
            <section id="contenedor_prod">

               
                {/* Todos los productos usan los datos compartidos con Administración */}
                {catalogo.map((producto) => {
                    const cantidad = cantidades[producto.id] || 1;
                    const imagenesIniciales = { 1: foto1, 2: foto2, 3: foto3, 4: foto4 };
                    const imagen = producto.imagen || imagenesIniciales[producto.id];
                    return (
                        <section key={producto.id} id={`contenedor_prod_${producto.id}`}>
                            <figure id="contador_prod">
                                <h3>{producto.nombre}</h3>
                                <h5 id={`categ_prod${producto.id}`}>({producto.categoria || 'Sin categoría'})</h5>
                                <br />
                                <h5>{producto.descripcion}</h5>
                                <h5 id={`precio_prod${producto.id}`}>
                                    ${Number(producto.precio).toLocaleString('es-CL')}
                                </h5>
                                {imagen && <img src={imagen} alt={producto.nombre} />}

                                <div id="btns_cont_prod">
                                    <button id="btn_restar" onClick={() => {
                                        if (!verificarSesion()) return;
                                        setCantidades(actual => ({
                                            ...actual,
                                            [producto.id]: Math.max(1, cantidad - 1)
                                        }));
                                    }}><strong>&minus;</strong></button>
                                    <span id="numero_prod"><strong>{cantidad}</strong></span>
                                    <button id="btn_sumar" onClick={() => {
                                        if (!verificarSesion()) return;
                                        if (cantidad < obtenerStock(producto.id)) {
                                            setCantidades(actual => ({ ...actual, [producto.id]: cantidad + 1 }));
                                        } else {
                                            alert('No hay más unidades disponibles en stock para este producto.');
                                        }
                                    }}><strong>+</strong></button>
                                </div>

                                <figure id="btn_agr_car_det">
                                    <button id="btn_car_comp" title="Añadir al carrito"
                                        onClick={() => agregarAlCarrito(producto.id, cantidad,
                                            () => setCantidades(actual => ({ ...actual, [producto.id]: 1 })))}>
                                        <p>AGREGAR AL CARRITO</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                                    </button>
                                </figure>
                            </figure>
                        </section>
                    );
                })}

            </section>
              
            {/* Enlace para ver detalle de productos */}
            <a href="#" id="btn_ver_det" onClick={handleVerDetalles}>VER DETALLES &#128270;</a>

            {/* Pie de página informativo */}
            <footer id="pie_pag_prod">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Productos;

