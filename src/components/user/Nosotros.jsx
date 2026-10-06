import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Nosotros() {
    const navigate = useNavigate();

    return (
        <div id="nosotros_page">

            {/* Título de 'nosotros', logo y botones */}
            <header id="titulo_port">
                
                {/* Título y logo */}
                <figure id="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Nosotros</h2>
                </figure>

                {/* Botones de navegación */}
                <figure id="btns_navegacion_port">
                    <button id="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenido principal */}
            <main id="contenido_port">
                <h3 id="titulo_cont_port">Sobre Nosotros</h3>
                <br />
                <hr style={{ borderColor: 'white' }} />
                <p>
                En AtelierStudio creemos que el arte auténtico nace de manos independientes. Nuestra plataforma busca visibilizar a artistas visuales emergentes conectándolos directamente con coleccionistas y entusiastas.
                </p>
                <p>
                Cada pieza cuenta una historia viva y rescata el oficio artesanal libre de producciones masivas.
                </p>
                <br />
                <hr style={{ borderColor: 'white' }} />
                <footer className="btn_cerrar_sesion">
                    <p>
                        <strong>
                            <a href="#" id="btnCerrarSesion" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{ color: 'goldenrod', textDecoration: 'underline' }}>
                                Iniciar sesión &#x23FB;
                            </a>
                        </strong>
                    </p>
                </footer>
            </main>

            {/* Pie de página informativo */}
            <footer id="pie_pag_port">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Nosotros;

