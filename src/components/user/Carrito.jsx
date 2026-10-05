import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';

function Carrito() {
    const navigate = useNavigate();

    // Estados interactivos para cantidad y cupón
    const [cantidad, setCantidad] = useState(1);
    const [cupon, setCupon] = useState('');
    const precioUnitario = 45000;
    const envio = 3500;

    const incrementar = () => setCantidad((prev) => prev + 1);
    const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

    const total = (precioUnitario * cantidad) + envio;

    return (
        <div id="car">
            <header id="titulo_car">
                <figure id="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Carrito</h2>
                </figure>

                <figure id="btns_navegacion_car">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            <main id="contenido_car">
                <section id="contenedor_prod_car1">
                    <figure id="contador_prod">
                        <h3>Cuadro 'Mar y Playa'</h3>
                        <h5 id="precio_prod1">${(precioUnitario * cantidad).toLocaleString('es-CL')}</h5>
                        <img src={foto1} alt="Cuadro Mar y Playa" />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" type="button" onClick={decrementar}><strong>&minus;</strong></button>
                                <span id="numero_prod"><strong>{cantidad}</strong></span>
                            <button id="btn_sumar" type="button" onClick={incrementar}><strong>+</strong></button>
                        </div>

                        <footer id="quitar_del_car">
                            <p><strong><button type="button" className="btn btn-link p-0 text-danger" onClick={() => setCantidad(0)}>&times; Quitar del carrito</button></strong></p>
                        </footer>
                    </figure>
                </section>

                <section id="bloque_pago_car">
                    <div id="fila_subtotal">
                        <span>Subtotal:</span>
                        <span>${(precioUnitario * cantidad).toLocaleString('es-CL')}</span>
                    </div>
                    <div id="fila_envio">
                        <span>Envío:</span>
                        <span>${envio.toLocaleString('es-CL')}</span>
                    </div>

                    <div id="bloque_cupon">
                        <input 
                        type="text" 
                        id="input_cupon" 
                        placeholder="Ingresa cupón de descuento"
                        value={cupon}
                        onChange={(e) => setCupon(e.target.value)} />

                        <button 
                            id="btn_aplicar_cupon" 
                            type="button" onClick={() => alert(`Cupón ${cupon} aplicado`)}>
                            APLICAR
                        </button>
                    </div>

                    <hr style={{ borderColor: 'white' }} />

                    <div id="fila_total">
                        <span><strong>Total:</strong></span>
                        <span><strong>${total.toLocaleString('es-CL')}</strong></span>
                    </div>
                    <button id="btn_confirmar_compra" type="button" onClick={() => navigate('/checkout')}>
                        <strong>FINALIZAR COMPRA</strong>
                    </button>
                </section>

                <footer id="volver_catalogo_car">
                    <p><Link to="/productos">&larr; Seguir explorando la galería</Link></p>
                </footer>
            </main>

            <footer id="pie_pag_car">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Carrito;

