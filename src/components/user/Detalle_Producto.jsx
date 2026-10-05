import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Detalle_Producto() {
    const [cantidades, setCantidades] = useState({
        prod1: 1,
        prod2: 1,
        prod3: 1,
        prod4: 1,
    });

    const handleCantidadChange = (prodKey, val) => {
        const valorEntero = parseInt(val, 10);
        setCantidades({
        ...cantidades,
        [prodKey]: isNaN(valorEntero) || valorEntero < 1 ? 1 : valorEntero,
        });
    };

    const handleAgregarAlCarrito = (e, nombre, prodKey, precio) => {
        e.preventDefault();
        const cant = cantidades[prodKey];
        alert(`Añadido al carrito: ${nombre} (${cant} unidad/es) - Subtotal: $${(precio * cant).toLocaleString('es-CL')}`);
    };

    return (
        <div id="det_prod">

            {/* Título de 'productos', logo y botones */}
            <header id="titulo_det_prod">
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>Producto</h2>
                </figure>

                <figure id="btns_nav_det_prod">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            {/* Contenido Principal */}
            <main id="contenedor_det_prod">
                <br />
                <h2>Detalle de Productos</h2>
                <hr style={{ borderColor: 'white' }} />
                <br />

                {/* DETALLE #1 */}
                <section id="detalle_prod1">
                    <div id="galeria_producto">
                        <div id="imagen_principal">
                            <img id="img_grande" src={foto1} alt="Cuadro Mar y Playa" />
                        </div>
                    </div>

                    <article id="info_compra">
                        <h3 id="prod_nombre">Cuadro 'Mar y Playa'</h3>
                        <p id="precio">&Leftarrow; $45.000</p>
                        
                        <div id="descripcion_extensa">
                            <p>Fotografía artística de alta resolución capturada en plano cenital sobre papel de algodón de grado galería. La composición plasma la fuerza visual del litoral costero, donde las aguas en tonos turquesa profundo se funden con la espuma blanca al romper contra una orilla de arena prístina.</p>
                            <p>La toma aprovecha la luz natural para resaltar las texturas del oleaje y la transparencia marina. Viene montada sobre un marco minimalista de aluminio negro con cristal antirreflejo, diseñado para proteger la nitidez fotográfica y aportar una atmósfera fresca y contemporánea a cualquier estancia.</p>
                        </div>

                        <form id="acciones_carrito" onSubmit={(e) => handleAgregarAlCarrito(e, "Cuadro 'Mar y Playa'", 'prod1', 45000)}>
                            <label htmlFor="cantidad1">Cantidad:</label>
                            <input 
                                type="number" 
                                id="cantidad1" 
                                name="cantidad" 
                                value={cantidades.prod1} 
                                min="1" 
                                max="10"
                                onChange={(e) => handleCantidadChange('prod1', e.target.value)} />

                            <figure id="btn_agr_car_det">
                                <button id="btn_car_comp" type="submit" title="Añadir al carrito">
                                    <p>AGREGAR AL CARRITO</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                        <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
                                        <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
                                        <circle cx="18" cy="20" r="2" />
                                        <circle cx="8" cy="20" r="2" />
                                    </svg>
                                </button>
                            </figure>
                        </form>
                    </article>
                </section>

                <hr style={{ borderColor: 'white' }} />
                <br />

                {/* DETALLE #2 */}
                <section id="detalle_prod2">
                    <div id="galeria_producto">
                        <div id="imagen_principal">
                        <img id="img_grande" src={foto2} alt="Retrato Caballero con Pipa" />
                        </div>
                    </div>

                    <article id="info_compra">
                        <h3 id="prod_nombre">Retrato 'Caballero con Pipa'</h3>
                        <p id="precio">&Leftarrow; $60.000</p>
                        
                        <div id="descripcion_extensa">
                            <p>Retrato figurativo elaborado al óleo mediante pinceladas densas y expresivas sobre tela de cáñamo rústico. La obra captura la estampa serena de un curtido hombre de mar que sostiene su pipa humeante, recortado frente a una suave línea costera y el horizonte marino.</p>
                            <p>El tratamiento cromático enfatiza los tonos tierra y el azul pálido del cielo, transmitiendo el carácter, la memoria y el sosiego propios de la vida marinera. Dispone de un marco artesanal de madera oscura envejecida y un barniz protector satinado que resalta el relieve de la pintura sin alterar sus matices.</p>
                        </div>

                        <form id="acciones_carrito" onSubmit={(e) => handleAgregarAlCarrito(e, "Retrato 'Caballero con Pipa'", 'prod2', 60000)}>
                            <label htmlFor="cantidad2">Cantidad:</label>
                            <input 
                                type="number" 
                                id="cantidad2" 
                                name="cantidad" 
                                value={cantidades.prod2} 
                                min="1" 
                                max="10"
                                onChange={(e) => handleCantidadChange('prod2', e.target.value)} />

                            <figure id="btn_agr_car_det">
                                <button id="btn_car_comp" type="submit" title="Añadir al carrito">
                                    <p>AGREGAR AL CARRITO</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                        <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
                                        <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
                                        <circle cx="18" cy="20" r="2" />
                                        <circle cx="8" cy="20" r="2" />
                                    </svg>
                                </button>
                            </figure>
                        </form>
                    </article>
                </section>

                <hr style={{ borderColor: 'white' }} />
                <br />

                {/* DETALLE #3 */}
                <section id="detalle_prod3">
                    <div id="galeria_producto">
                        <div id="imagen_principal">
                            <img id="img_grande" src={foto3} alt="Cuadro Paisaje de Montaña" />
                        </div>
                    </div>

                    <article id="info_compra">
                        <h3 id="prod_nombre">Cuadro 'Paisaje de Montaña'</h3>
                        <p id="precio">&Leftarrow; $48.000</p>
                        
                        <div id="descripcion_extensa">
                            <p>
                                Obra paisajística tradicional realizada al óleo sobre lienzo de lino de alta densidad. 
                                Representa una imponente cordillera alpina nevada reflejada sobre las aguas cristalinas 
                                de un lago virgen, flanqueado por densos bosques de coníferas.
                            </p>
                            <p>
                                Cada trazo y juego de luces recrea la atmósfera serena de las alturas. 
                                Incluye bastidor de madera reforzado y tratamiento de barniz mate con filtro UV 
                                para preservar la intensidad de los pigmentos a lo largo del tiempo.
                            </p>
                        </div>

                        <form id="acciones_carrito" onSubmit={(e) => handleAgregarAlCarrito(e, "Cuadro 'Paisaje de Montaña'", 'prod3', 48000)}>
                            <label htmlFor="cantidad3">Cantidad:</label>
                            <input 
                                type="number" 
                                id="cantidad3" 
                                name="cantidad" 
                                value={cantidades.prod3} 
                                min="1" 
                                max="10"
                                onChange={(e) => handleCantidadChange('prod3', e.target.value)} />

                            <figure id="btn_agr_car_det">
                                <button id="btn_car_comp" type="submit" title="Añadir al carrito">
                                    <p>AGREGAR AL CARRITO</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                        <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
                                        <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
                                        <circle cx="18" cy="20" r="2" />
                                        <circle cx="8" cy="20" r="2" />
                                    </svg>
                                </button>
                            </figure>
                        </form>
                    </article>
                </section>

                <hr style={{ borderColor: 'white' }} />
                <br />

                {/* DETALLE 4 */}
                <section id="detalle_prod4">
                    <div id="galeria_producto">
                        <div id="imagen_principal">
                            <img id="img_grande" src={foto4} alt="Retrato Gato entre Sombras" />
                        </div>
                    </div>

                    <article id="info_compra">
                        <h3 id="prod_nombre">Retrato 'Gato entre Sombras'</h3>
                        <p id="precio">&Leftarrow; $72.000</p>
                        
                        <div id="descripcion_extensa">
                            <p>Pintura a la acuarela y técnicas mixtas trabajada sobre papel Arches de grano fino y alto gramaje. Ilustra la figura atenta de un felino de pelaje cobrizo y blanco posado en el umbral de piedra de un portal antiguo, envuelto en un sutil juego de sombras violáceas y destellos de luz solar filtrada.</p>
                            <p>La delicadeza de las aguadas crea transparencias limpias que contrastan con los detalles definidos de la mirada del animal y la vegetación circundante. La pieza cuenta con paspartú libre de ácido y sellado protector antihumedad para asegurar la conservación óptima de los pigmentos acuosos.</p>
                        </div>

                        <form id="acciones_carrito" onSubmit={(e) => handleAgregarAlCarrito(e, "Retrato 'Gato entre Sombras'", 'prod4', 72000)}>
                            <label htmlFor="cantidad4">Cantidad:</label>
                            <input 
                                type="number" 
                                id="cantidad4" 
                                name="cantidad" 
                                value={cantidades.prod4} 
                                min="1" 
                                max="10"
                                onChange={(e) => handleCantidadChange('prod4', e.target.value)} />
                                
                            <figure id="btn_agr_car_det">
                                <button id="btn_car_comp" type="submit" title="Añadir al carrito">
                                    <p>AGREGAR AL CARRITO</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                        <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
                                        <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
                                        <circle cx="18" cy="20" r="2" />
                                        <circle cx="8" cy="20" r="2" />
                                    </svg>
                                </button>
                            </figure>
                        </form>
                    </article>
                </section>

                <hr style={{ borderColor: 'white' }} />
                <footer className="foot_det_prod" style={{ textAlign: 'right' }}>
                    <p>
                        <strong>
                            <Link to="/productos" style={{ color: 'goldenrod', textDecoration: 'underline' }}>
                                Volver &#x21A9;
                            </Link>
                        </strong>
                    </p>
                </footer>
            </main>

            {/* Pie de página informativo */}
            <footer id="pie_pag_det_prod">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Detalle_Producto;

