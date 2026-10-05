import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Productos() {
    
    // Lista inicial de productos convertida a estructura de datos React
    const [listaProductos, setListaProductos] = useState([
        {
        id: 1,
        titulo: "Cuadro 'Mar y Playa'",
        categoria: "(Fotografía Artística)",
        descripcion: "Fotografía aérea en plano cenital que captura el contraste entre las aguas turquesas del océano y la orilla de arena blanca.",
        precio: 45000,
        imagen: foto1,
        cantidad: 1
        },
        {
        id: 2,
        titulo: "Retrato 'Caballero con Pipa'",
        categoria: "(Pintura al Óleo)",
        descripcion: "Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva.",
        precio: 60000,
        imagen: foto2,
        cantidad: 1
        },
        {
        id: 3,
        titulo: "Cuadro 'Paisaje de Montaña'",
        categoria: "(Pintura al Óleo)",
        descripcion: "Pintura paisajística tradicional al óleo que muestra una cordillera alpina nevada reflejada en un lago sereno.",
        precio: 48000,
        imagen: foto3,
        cantidad: 1
        },
        {
        id: 4,
        titulo: "Retrato 'Gato entre Sombras'",
        categoria: "(Acuarela y Técnica Mixta)",
        descripcion: "Acuarela luminosa que ilustra a un gato atigrado de pelaje naranja y blanco sentado en un escalón de piedra.",
        precio: 72000,
        imagen: foto4,
        cantidad: 1
        }
    ]);

    const modificarCantidad = (id, delta) => {
        setListaProductos(listaProductos.map((p) => {
        
        if (p.id === id) {
            const nuevaCantidad = p.cantidad + delta;
            return { ...p, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
        }
        return p;
        }));
    };

    const agregarAlCarrito = (producto) => {
        alert(`Se agregó al carrito: ${producto.titulo} (x${producto.cantidad})`);
    };

    return (
        <div id="prod">
            <header id="titulo_prod">
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>Productos</h2>
                </figure>

                <figure id="btns_navegacion_prod">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            <section id="contenedor_prod">

                {listaProductos.map((prod) => (
                <section key={prod.id} id={`contenedor_prod_${prod.id}`}>
                    <figure id="contador_prod">
                        <h3>{prod.titulo}</h3>
                        <h5 id={`categ_prod${prod.id}`}>{prod.categoria}</h5>
                        <br />
                        <h5>{prod.descripcion}</h5>
                        <h5 id={`precio_prod${prod.id}`}>${prod.precio.toLocaleString('es-CL')}</h5>
                        <img src={prod.imagen} alt={prod.titulo} />

                        <div id="btns_cont_prod">
                            <button id="btn_restar" type="button" onClick={() => modificarCantidad(prod.id, -1)}>
                                <strong>&minus;</strong>
                                    </button>
                                        <span id="numero_prod"><strong>{prod.cantidad}</strong></span>
                                    <button id="btn_sumar" type="button" onClick={() => modificarCantidad(prod.id, 1)}>
                                <strong>+</strong>
                            </button>
                        </div>

                        <figure id="btn_agr_car_det">
                            <button 
                                id="btn_car_comp" 
                                type="button" 
                                title="Añadir al carrito"
                                onClick={() => agregarAlCarrito(prod)}>
                                <p>AGREGAR AL CARRITO</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                                    <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
                                    <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
                                    <circle cx="18" cy="20" r="2" />
                                    <circle cx="8" cy="20" r="2" />
                                </svg>
                            </button>
                        </figure>
                    </figure>
                </section>
                ))}
            </section>

            <div className="text-center my-3">
                <Link to="/productos/detalle" id="btn_ver_det">VER DETALLES &#128270;</Link>
            </div>

            <footer id="pie_pag_prod">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Productos;

