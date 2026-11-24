import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonCerrarSesion from './BotonCerrarSesion';
import { obtenerProductos } from '../../services/productosApi';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';

function Detalle_Producto() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [cantidades, setCantidades] = useState({});

    useEffect(() => {
        async function cargarProductos() {
            try {
                const datos = await obtenerProductos();
                setProductos(Array.isArray(datos) ? datos : []);
            } catch (err) {
                console.error('Error al cargar detalle de productos:', err);
            }
        }
        cargarProductos();
    }, []);

    return (
        <div id="det_prod">
            <header id="titulo_det_prod">
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>PRODUCTOS</h2>
                </figure>

                <figure id="btns_nav_det_prod">
                    <button id="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
                <BotonCerrarSesion />
            </header>

            <main id="contenedor_det_prod">
                <br />
                <h2>Detalle de Productos</h2>
                <hr style={{ borderColor: 'white' }} />
                <br />

                {productos.map((prod, index) => {
                    const cantidad = cantidades[prod.id] || 1;
                    return (
                        <React.Fragment key={prod.id}>
                            <section id={`detalle_prod${index + 1}`}>
                                <div id="galeria_producto">
                                    <div id="imagen_principal">
                                        <img
                                            id="img_grande"
                                            src={prod.imagen || foto1}
                                            alt={prod.titulo ?? prod.nombre}
                                        />
                                    </div>
                                </div>

                                <article id="info_compra">
                                    <h3 id="prod_nombre">{prod.titulo ?? prod.nombre}</h3>
                                    <p id="precio">&#x21D0; ${Number(prod.precio).toLocaleString('es-CL')}</p>

                                    <div id="descripcion_extensa">
                                        <p>{prod.descripcion || 'Obra original disponible en AtelierStudio.'}</p>
                                    </div>

                                    <form id="acciones_carrito" onSubmit={(e) => { e.preventDefault(); navigate('/carrito'); }}>
                                        <label htmlFor={`cantidad${prod.id}`}>Cantidad:</label>
                                        <input
                                            type="number"
                                            id={`cantidad${prod.id}`}
                                            value={cantidad}
                                            min="1"
                                            max={prod.stock || 10}
                                            onChange={(e) => setCantidades({ ...cantidades, [prod.id]: Number(e.target.value) })}
                                        />
                                        <figure id="btn_agr_car_det">
                                            <button id="btn_car_comp" title="Añadir al carrito" type="submit">
                                                <p>AGREGAR AL CARRITO</p>
                                            </button>
                                        </figure>
                                    </form>
                                </article>
                            </section>
                            <hr style={{ borderColor: 'white' }} />
                            <br />
                        </React.Fragment>
                    );
                })}

                <footer className="foot_det_prod" style={{ textAlign: 'right' }}>
                    <p><strong><a href="#" onClick={(e) => { e.preventDefault(); navigate('/productos'); }} style={{ color: 'goldenrod', textDecoration: 'underline' }}>Volver &#x21A9;</a></strong></p>
                </footer>
            </main>

            <footer id="pie_pag_det_prod">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Detalle_Producto;