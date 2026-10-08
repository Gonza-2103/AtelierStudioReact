import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';

function Carrito() {
    const navigate = useNavigate();
    const [cantidad, setCantidad] = useState(1);
    const [cupon, setCupon] = useState('');

    return (
        <div id="car">

            {/* Título de 'carrito', logo y botones */}
            <header id="titulo_car">
                
                {/* Título y logo */}
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>Carrito</h2>
                </figure>

                {/* Botones de navegación */}
                <figure id="btns_navegacion_car">
                    <button id="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenido principal del carrito */}
            <main id="contenido_car">

                {/* Tarjeta del producto seleccionado */}
                <section id="contenedor_prod_car1">
                    <figure id="contador_prod">
                        <h3>Cuadro 'Mar y Playa'</h3>
                        <h5 id="precio_prod1">${(45000 * cantidad).toLocaleString('es-CL')}</h5>
                        <img src={foto1} alt="Cuadro Mar y Playa" />

                        {/* Contador de unidades */}
                        <div id="btns_cont_prod">
                            <button id="btn_restar" onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}><strong>&minus;</strong></button>
                            <span id="numero_prod"><strong>{cantidad}</strong></span>
                            <button id="btn_sumar" onClick={() => setCantidad(cantidad + 1)}><strong>+</strong></button>
                        </div>

                        {/* Enlace estilo pie para quitar de la compra */}
                        <footer id="quitar_del_car">
                            <p><strong><a href="#" onClick={(e) => { e.preventDefault(); setCantidad(0); }}>&times; Quitar del carrito</a></strong></p>
                        </footer>
                    </figure>
                </section>

                {/* Resumen de liquidación con cupón de descuento */}
                <section id="bloque_pago_car">
                    <div id="fila_subtotal">
                        <span>Subtotal:</span>
                        <span>${(45000 * cantidad).toLocaleString('es-CL')}</span>
                    </div>
                    <div id="fila_envio">
                        <span>Envío:</span>
                        <span>$3.500</span>
                    </div>

                    {/* Campo de cupón de descuento exigido en el mockup */}
                    <div id="bloque_cupon">
                        <input type="text" id="input_cupon" placeholder="Ingresa cupón de descuento" value={cupon} onChange={(e) => setCupon(e.target.value)} />
                        <button id="btn_aplicar_cupon" onClick={() => alert(`Cupón aplicado: ${cupon}`)}>APLICAR</button>
                    </div>

                    <hr style={{ borderColor: 'white' }} />

                    <div id="fila_total">
                        <span><strong>Total:</strong></span>
                        <span><strong>${((45000 * cantidad) + 3500).toLocaleString('es-CL')}</strong></span>
                    </div>

                    <button id="btn_confirmar_compra" onClick={() => alert('Compra finalizada con éxito')}>
                        <strong>FINALIZAR COMPRA</strong>
                    </button>
                </section>

                {/* Enlace para volver al catálogo */}
                <footer id="volver_catalogo_car">
                    <p><a href="#" onClick={(e) => { e.preventDefault(); navigate('/productos'); }}>&larr; Seguir explorando la galería</a></p>
                </footer>
            </main>

            {/* Pie de página informativo */}
            <footer id="pie_pag_car">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Carrito;

