import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoreferenciaportada.jpg';
import foto2 from '../../assets/foto2referenciaportada.jpg';

function Portada() {
    const navigate = useNavigate();

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        console.log('Cerrar sesión presionado');
        navigate('/login');
    };

    return (
        <div id="port">

            {/* Título de 'portada', logo y botones */}
            <header id="titulo_port">

              {/* Título y logo */}
                <figure id="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Portada</h2>
                </figure>

                {/* Botones de navegación */}
                <figure id="btns_navegacion_port">
                    <button id="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            <main id="contenido_port">
                <h3 id="titulo_cont_port">El Arte Auténtico Nace de Manos Independientes</h3>
                <img src={foto1} alt="Referencia Portada 1" />

                <br />
                <hr style={{ borderColor: 'white' }} />

                <p>
                    Aquí, en AtelierStudio creemos y pensamos que el arte trasciende la mera decoración: es un diálogo directo entre la sensibilidad del creador y la mirada de quien lo contempla. Nuestra plataforma nace con el propósito de tender un puente auténtico entre creadores emergentes y coleccionistas, apasionados o exploradores visuales que buscan piezas irrepetibles, cargadas de carácter y verdadero valor expresivo.
                </p>
                <p>
                    Cada obra que forma parte de nuestra galería —desde óleos elaborados con técnicas ancestrales y pigmentos orgánicos, hasta grabados modernos, acuarelas y piezas mixtas— encierra una historia viva. Detrás de cada textura y pincelada se encuentra el tiempo, la experimentación y el oficio honesto de artistas independientes que plasman y ponen en práctica su visión sin ataduras comerciales ni producciones masivas.
                </p>
                <p>
                    Al recorrer nuestra colección, no solo descubres propuestas visuales para transformar tus espacios con originalidad, sino que participas activamente en un ecosistema sostenible de autor. Adquirir una obra aquí significa respaldar de forma directa el talento emergente, valorar el proceso artesanal y consolidar una comunidad diversa que celebra, reflexiona y mantiene vivo el arte independiente.
                </p>
                <p>
                    Explora nuestras selecciones, conecta con los relatos de nuestros artistas y encuentra esa pieza única destinada a formar parte de tu historia, para siempre en tu casa.
                </p>

                <img src={foto2} alt="Referencia Portada 2" />

                <br />
                <hr style={{ borderColor: 'white' }} />

                <footer className="btn_cerrar_sesion">
                    <p>
                        <strong>
                            <a
                              href="#"
                              id="btnCerrarSesion"
                              onClick={handleCerrarSesion}
                              style={{ color: 'goldenrod', textDecoration: 'underline' }}>
                              Cerrar sesión &#x23FB;
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

export default Portada;

