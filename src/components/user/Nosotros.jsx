import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Nosotros() {
    return (
        <div id="nosotros_page">

            {/* Encabezado y barra de navegación */}
            <header id="titulo_port">
                <figure id="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Nosotros</h2>
                </figure>

                <figure id="btns_navegacion_port">
                    <Link to="/" className="nav_btn"><strong>Inicio</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            {/* Contenido principal sobre la identidad de AtelierStudio */}
            <main id="contenido_port" className="container my-4">
                <h3 id="titulo_cont_port">Sobre AtelierStudio</h3>
                <hr style={{ borderColor: 'white' }} />

                <section className="nosotros_descripcion">
                    <p>
                        En <strong>AtelierStudio</strong> creemos firmemente que el arte auténtico nace de manos independientes. 
                        Nuestra misión es conectar a artistas visuales emergentes con coleccionistas y apasionados del arte que 
                        buscan piezas originales, con identidad y carácter único.
                    </p>
                    <p>
                        Promovemos un comercio justo y transparente donde cada obra cuenta una historia viva y respalda 
                        directamente el trabajo manual, desde técnicas tradicionales de óleo y acuarela hasta ilustraciones 
                        y técnicas contemporáneas.
                    </p>
                </section>

                <br />
                <hr style={{ borderColor: 'white' }} />

                <div className="text-center my-3">
                    <Link to="/login" style={{ color: 'goldenrod', textDecoration: 'underline' }}>
                        <strong>Iniciar sesión &#x23FB;</strong>
                    </Link>
                </div>
            </main>

            {/* Pie de página */}
            <footer id="pie_pag_port">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Nosotros;

