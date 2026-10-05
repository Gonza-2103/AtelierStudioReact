import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Busqueda() {
    const [terminoBusqueda, setTerminoBusqueda] = useState('');

    const handleBuscar = (e) => {
        e.preventDefault();
        console.log('Buscando obra:', terminoBusqueda);
    };

    return (
        <div className="busq">

            {/* Encabezado y barra de navegación */}
            <header className="titulo_busq">
                <figure className="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Búsqueda</h2>
                </figure>

                <figure className="btns_navegacion_busq">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            {/* Disposición en dos columnas */}
            <div className="contenedor_busq_layout">
                <aside className="sidebar_busq">
                    <nav className="sidebar_menu_sup">
                        <a href="#todas" className="item_menu activo">⊞ Todas las Obras</a>
                        <a href="#oleo" className="item_menu">🎨 Óleo sobre Lienzo</a>
                        <a href="#acuarela" className="item_menu">🖌️ Acuarela y Papel</a>
                        <a href="#fotografia" className="item_menu">📷 Fotografía de Autor</a>
                        <a href="#ofertas" className="item_menu">🏷️ Menos de $50.000</a>
                    </nav>

                    <nav className="sidebar_menu_inf">
                        <button type="button" className="btn_det_busq">
                            <Link to="/productos" className="link_det_busq">VER DETALLES</Link>
                        </button>

                        <hr style={{ borderColor: 'white' }} />

                        <a href="#disponibles" className="item_menu">⚙ Obras Disponibles</a>
                        <a href="#rapida" className="item_menu">🔍 Búsqueda Rápida</a>
                        <a href="#ayuda" className="item_menu">❓ Ayuda de Filtros</a>
                    </nav>
                </aside>

                <main className="contenido_principal_busq">
                <form className="barra_input_busqueda" onSubmit={handleBuscar}>
                    <input 
                        type="text" 
                        className="input_busq_texto" 
                        placeholder="Buscar por título, artista o técnica..."
                        value={terminoBusqueda}
                        onChange={(e) => setTerminoBusqueda(e.target.value)} />

                    <button 
                        type="submit" 
                        className="btn_ejecutar_busq">
                        BUSCAR
                    </button>
                </form>

                <br />
                <h3 className="titulo_res_busq">Resultados encontrados</h3>
                <hr style={{ borderColor: 'white' }} />

                <section className="grilla_resultados_busq">
                    <article className="tarjeta_res_busq">
                        <img src={foto1} alt="Cuadro Mar y Playa" />
                        <h4>Cuadro 'Mar y Playa'</h4>
                    </article>

                    <article className="tarjeta_res_busq">
                        <img src={foto2} alt="Retrato Caballero con Pipa" />
                        <h4>Retrato 'Caballero con Pipa'</h4>
                    </article>

                    <article className="tarjeta_res_busq">
                        <img src={foto3} alt="Cuadro Paisaje de Montaña" />
                        <h4>Cuadro 'Paisaje de Montaña'</h4>
                    </article>

                    <article className="tarjeta_res_busq">
                        <img src={foto4} alt="Retrato Gato entre Sombras" />
                        <h4>Retrato 'Gato entre Sombras'</h4>
                    </article>
                </section>
                </main>
            </div>

            <footer className="pie_pag_busq">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Busqueda;

