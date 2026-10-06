import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Busqueda() {
    const navigate = useNavigate();
    const [texto, setTexto] = useState('');

    return (
        <div className="busq">

            {/* Título de 'búsqueda', logo y botones */}
            <header className="titulo_busq">

                {/* Título y logo */}
                <figure className="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>Búsqueda</h2>
                </figure>

                {/* Botones de navegación enlazados */}
                <figure className="btns_navegacion_busq">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenedor general en dos columnas */}
            <div className="contenedor_busq_layout">

                {/* Barra lateral a la izquierda con filtros del proyecto */}
                <aside className="sidebar_busq">
                    <nav className="sidebar_menu_sup">
                        <a href="#" className="item_menu activo">⊞ Todas las Obras</a>
                        <a href="#" className="item_menu">🎨 Óleo sobre Lienzo</a>
                        <a href="#" className="item_menu">🖌️️ Acuarela y Papel</a>
                        <a href="#" className="item_menu">📷 Fotografía de Autor</a>
                        <a href="#" className="item_menu">🏷️ Menos de $50.000</a>
                    </nav>

                    <nav className="sidebar_menu_inf">
                        <button className="btn_det_busq">
                            <a href="#" className="link_det_busq" onClick={(e) => { e.preventDefault(); navigate('/detalle_producto'); }}>VER DETALLES</a>
                        </button>

                        <hr style={{ borderColor: 'white' }} />
                        <a href="#" className="item_menu">⚙ Obras Disponibles</a>
                        <a href="#" className="item_menu">🔍 Búsqueda Rápida</a>
                        <a href="#" className="item_menu">❓ Ayuda de Filtros</a>
                    </nav>
                </aside>

                {/* Área de resultados / contenido principal a la derecha */}
                <main className="contenido_principal_busq">

                    {/* Barra de búsqueda superior */}
                    <section className="barra_input_busqueda">
                        <input type="text" className="input_busq_texto" placeholder="Buscar por título, artista o técnica..." value={texto} onChange={(e) => setTexto(e.target.value)} />
                        <button className="btn_ejecutar_busq" onClick={() => console.log('Búsqueda ejecutada:', texto)}>BUSCAR</button>
                    </section>

                    <br />
                    <h3 className="titulo_res_busq">Resultados encontrados</h3>
                    <hr style={{ borderColor: 'white' }} />

                    {/* Tarjetas de resultados adaptadas con la misma estructura visual de productos */}
                    <section className="grilla_resultados_busq">
                        <article className="tarjeta_res_busq" onClick={() => navigate('/detalle_producto')} style={{ cursor: 'pointer' }}>
                            <img src={foto1} alt="Cuadro Mar y Playa" />
                            <h4>Cuadro 'Mar y Playa'</h4>
                        </article>

                        <article className="tarjeta_res_busq" onClick={() => navigate('/detalle_producto')} style={{ cursor: 'pointer' }}>
                            <img src={foto2} alt="Retrato Caballero con Pipa" />
                            <h4>Retrato 'Caballero con Pipa'</h4>
                        </article>

                        <article className="tarjeta_res_busq" onClick={() => navigate('/detalle_producto')} style={{ cursor: 'pointer' }}>
                            <img src={foto3} alt="Cuadro Paisaje de Montaña" />
                            <h4>Cuadro 'Paisaje de Montaña'</h4>
                        </article>

                        <article className="tarjeta_res_busq" onClick={() => navigate('/detalle_producto')} style={{ cursor: 'pointer' }}>
                            <img src={foto4} alt="Retrato Gato entre Sombras" />
                            <h4>Retrato 'Gato entre Sombras'</h4>
                        </article>
                    </section>
                </main>
            </div>

            {/* Pie de página informativo */}
            <footer className="pie_pag_busq">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Busqueda;

