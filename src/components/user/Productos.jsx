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

    //Contadores individuales para los 4 productos iniciales
    const [cant1, setCant1] = useState(1);
    const [cant2, setCant2] = useState(1);
    const [cant3, setCant3] = useState(1);
    const [cant4, setCant4] = useState(1);

    //Estado para catálogo y productos creados por administrador (id > 4)
    const [catalogo, setCatalogo] = useState([]);
    const [cantidadesExtras, setCantidadesExtras] = useState({});

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

    //Función para obtener stock de un producto
    const obtenerStock = (id) => {
        const prod = catalogo.find(p => Number(p.id) === id);
        return prod ? Number(prod.stock) : 10;
    };

    //Función para sumar con validación de stock y control de invitado
    const sumarConStock = (id, cantidadActual, setCantidad) => {
        if (!verificarSesion()) return;
        const stockDisponible = obtenerStock(id);
        if (cantidadActual < stockDisponible) {
            setCantidad(cantidadActual + 1);
        } else {
            alert("No hay más unidades disponibles en stock para este producto.");
        }
    };

    //Función para restar con control de invitado
    const restarConSesion = (cantidadActual, setCantidad) => {
        if (!verificarSesion()) return;
        if (cantidadActual > 1) {
            setCantidad(cantidadActual - 1);
        }
    };

    //Lógica para agregar al carrito con validación de sesión y stock
    const agregarAlCarrito = (id, cantidadSeleccionada, setCantidadReset) => {
        if (!verificarSesion()) return;

        const productoDatos = catalogo.find(p => Number(p.id) === id);
        if (!productoDatos) return;

        const stockDisponible = Number(productoDatos.stock) || 10;
        let carrito = [];
        try {
            carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        } catch (e) {
            carrito = [];
        }

        const itemExistente = carrito.find(p => Number(p.id) === id);
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
        const seleccionado = catalogo.length > 0 ? catalogo[0] : catalogoPorDefecto[0];
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

                {/* PRODUCTO #1 */}
                <section id="contenedor_prod_1">
                    <figure id="contador_prod">
                        <h3>Cuadro 'Mar y Playa'</h3>
                        <h5 id="categ_prod1">(Fotografía Artística)</h5>
                        <br />
                        <h5>Fotografía aérea en plano cenital que captura el contraste entre las aguas turquesas del océano y la orilla de arena blanca, destacando el movimiento de la espuma de las olas rompiendo suavemente en la costa.</h5>
                        <h5 id="precio_prod1">$45.000</h5>
                        <img src={foto1} alt="Cuadro Mar y Playa" />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" onClick={() => restarConSesion(cant1, setCant1)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant1}</strong></span>
                            <button id="btn_sumar" onClick={() => sumarConStock(1, cant1, setCant1)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => agregarAlCarrito(1, cant1, setCant1)}>
                                <p>AGREGAR AL CARRITO</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                            </button>
                        </figure>
                    </figure>
                </section>

                {/* PRODUCTO #2 */}
                <section id="contenedor_prod_2">
                    <figure id="contador_prod">
                        <h3>Retrato 'Caballero con Pipa'</h3>
                        <h5 id="categ_prod2">(Pintura al Óleo)</h5>
                        <br />
                        <h5>Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva, con una pipa humeante en la boca y herramientas de red, con un fondo de playa, cielo azul y mar abierto.</h5>
                        <h5 id="precio_prod2">$60.000</h5>
                        <img src={foto2} alt="Retrato Caballero con Pipa" />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" onClick={() => restarConSesion(cant2, setCant2)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant2}</strong></span>
                            <button id="btn_sumar" onClick={() => sumarConStock(2, cant2, setCant2)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => agregarAlCarrito(2, cant2, setCant2)}>
                                <p>AGREGAR AL CARRITO</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                            </button>
                        </figure>
                    </figure>
                </section>

                {/* PRODUCTO #3 */}
                <section id="contenedor_prod_3">
                    <figure id="contador_prod">
                        <h3>Cuadro 'Paisaje de Montaña'</h3>
                        <h5 id="categ_prod3">(Pintura al Óleo)</h5>
                        <br />
                        <h5>Pintura paisajística tradicional al óleo que muestra una cordillera alpina nevada reflejada en un lago sereno de aguas cristalinas, flanqueado por densos bosques de coníferas bajo un cielo parcialmente nublado.</h5>
                        <h5 id="precio_prod3">$48.000</h5>
                        <img src={foto3} alt="Cuadro Paisaje de Montaña" />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" onClick={() => restarConSesion(cant3, setCant3)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant3}</strong></span>
                            <button id="btn_sumar" onClick={() => sumarConStock(3, cant3, setCant3)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => agregarAlCarrito(3, cant3, setCant3)}>
                                <p>AGREGAR AL CARRITO</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                            </button>
                        </figure>
                    </figure>
                </section>

                {/* PRODUCTO #4 */}
                <section id="contenedor_prod_4">
                    <figure id="contador_prod">
                        <h3>Retrato 'Gato entre Sombras'</h3>
                        <h5 id="categ_prod4">(Acuarela y Técnica Mixta)</h5>
                        <br />
                        <h5>Acuarela luminosa que ilustra a un gato atigrado de pelaje naranja y blanco sentado en un escalón de piedra, envuelto en un marcado juego de luces solares directas y sombras violáceas proyectadas por la vegetación.</h5>
                        <h5 id="precio_prod4">$72.000</h5>
                        <img src={foto4} alt="Retrato Gato entre Sombras" />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" onClick={() => restarConSesion(cant4, setCant4)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant4}</strong></span>
                            <button id="btn_sumar" onClick={() => sumarConStock(4, cant4, setCant4)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => agregarAlCarrito(4, cant4, setCant4)}>
                                <p>AGREGAR AL CARRITO</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                            </button>
                        </figure>
                    </figure>
                </section>

                {/* PRODUCTOS NUEVOS AGREGADOS POR EL ADMINISTRADOR (id > 4) */}
                {catalogo.filter(p => Number(p.id) > 4).map((producto) => {
                    const cantExtra = cantidadesExtras[producto.id] || 1;
                    return (
                        <section key={producto.id} id={`contenedor_prod_${producto.id}`}>
                            <figure id="contador_prod">
                                <h3>{producto.nombre}</h3>
                                <h5 id={`categ_prod${producto.id}`}>({producto.categoria || 'Sin categoría'})</h5>
                                <br />
                                <h5>{producto.descripcion}</h5>
                                <h5 id={`precio_prod${producto.id}`}>${Number(producto.precio).toLocaleString('es-CL')}</h5>
                                {producto.imagen && <img src={producto.imagen} alt={producto.nombre} />}

                                <div id="btns_cont_prod">
                                    <button 
                                        id="btn_restar" 
                                        onClick={() => {
                                            if (!verificarSesion()) return;
                                            setCantidadesExtras({ ...cantidadesExtras, [producto.id]: Math.max(1, cantExtra - 1) });
                                        }}>
                                        <strong>&minus;</strong>
                                    </button>
                                    <span id="numero_prod"><strong>{cantExtra}</strong></span>
                                    <button 
                                        id="btn_sumar" 
                                        onClick={() => {
                                            if (!verificarSesion()) return;
                                            const stockDisp = Number(producto.stock) || 10;
                                            if (cantExtra < stockDisp) {
                                                setCantidadesExtras({ ...cantidadesExtras, [producto.id]: cantExtra + 1 });
                                            } else {
                                                alert("No hay más unidades disponibles en stock para este producto.");
                                            }
                                        }}>
                                        <strong>+</strong>
                                    </button>
                                </div>

                                <figure id="btn_agr_car_det">
                                    <button 
                                        id="btn_car_comp" 
                                        title="Añadir al carrito" 
                                        onClick={() => agregarAlCarrito(producto.id, cantExtra, () => setCantidadesExtras({ ...cantidadesExtras, [producto.id]: 1 }))}>
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

