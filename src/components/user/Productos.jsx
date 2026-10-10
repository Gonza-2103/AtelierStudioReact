import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Productos() {
    const navigate = useNavigate();
    const [cant1, setCant1] = useState(1);
    const [cant2, setCant2] = useState(1);
    const [cant3, setCant3] = useState(1);
    const [cant4, setCant4] = useState(1);

    return (
        <div id="prod">

            {/* Título de 'productos', logo y botones */}
            <header id="titulo_prod">

                {/* Título y logo */}
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>PRODUCTOS</h2>
                </figure>

                {/* Botones de navegación */}
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
                            <button id="btn_restar" onClick={() => setCant1(cant1 > 1 ? cant1 - 1 : 1)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant1}</strong></span>
                            <button id="btn_sumar" onClick={() => setCant1(cant1 + 1)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => navigate('/carrito')}>
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
                        <h5>Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva, sosteniendo una pipa humeante en la boca y herramientas de red, con un fondo de playa, cielo azul y mar abierto.</h5>
                        <h5 id="precio_prod2">$60.000</h5>
                        <img src={foto2} alt="Retrato Caballero con Pipa" />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" onClick={() => setCant2(cant2 > 1 ? cant2 - 1 : 1)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant2}</strong></span>
                            <button id="btn_sumar" onClick={() => setCant2(cant2 + 1)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => navigate('/carrito')}>
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
                            <button id="btn_restar" onClick={() => setCant3(cant3 > 1 ? cant3 - 1 : 1)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant3}</strong></span>
                            <button id="btn_sumar" onClick={() => setCant3(cant3 + 1)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => navigate('/carrito')}>
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
                            <button id="btn_restar" onClick={() => setCant4(cant4 > 1 ? cant4 - 1 : 1)}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cant4}</strong></span>
                            <button id="btn_sumar" onClick={() => setCant4(cant4 + 1)}><strong>+</strong></button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button id="btn_car_comp" title="Añadir al carrito" onClick={() => navigate('/carrito')}>
                                <p>AGREGAR AL CARRITO</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" /><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" /><circle cx="18" cy="20" r="2" /><circle cx="8" cy="20" r="2" /></svg>
                            </button>
                        </figure>
                    </figure>
                </section>
            </section>

            {/* Enlace para ver detalle de productos */}
            <a href="#" id="btn_ver_det" onClick={(e) => { e.preventDefault(); navigate('/detalle_producto'); }}>VER DETALLES &#128270;</a>

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

