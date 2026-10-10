import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import imgMision from '../../assets/mision.jpg';
import imgGeraldinne from '../../assets/geraldinne.jpg';
import imgGonza from '../../assets/gonza.jpg';

function Nosotros() {
    const navigate = useNavigate();

    return (
        <div className="nos">

            {/* Título de 'nosotros', logo y botones */}
            <header className="titulo_nos">

                {/* Título y logo */}
                <figure className="titlogo">
                    <img src={logo} alt="Logo de AtelierStudio" />
                    <h2>NOSOTROS</h2>
                </figure>

                {/* Botones de navegación enlazados */}
                <figure className="btns_nav_nos">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenido principal */}
            <main className="contenido_nos container">

                {/* Sección sobre la galería */}
                <section className="sobre_nos">
                    <div className="logo_sobre_nos">
                        <img src={logo} alt="Logo de AtelierStudio" className="img_sobre img-fluid" />
                        <div className="info_sobre_nos">
                            <p>
                                Nacemos de la convicción de que el arte transforma espacios y conecta historias. <strong>AtelierStudio</strong> funciona como un puente digital entre artistas independientes contemporáneos y coleccionistas o entusiastas del arte visual.
                            </p>
                            <p>
                                Inspirados en la esencia del <em>Atelier</em>, el taller artesanal donde habita la técnica, y el <em>Studio</em>, el espacio de creación contemporánea, creamos una galería en línea para acceder a obras originales, esculturas y grabados con sello de autenticidad.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sección de misión */}
                <section className="mision_nos">
                    <br />
                    <br />
                    <hr style={{ borderColor: 'white' }} />
                    <h3 className="titulo_mision_nos">Nuestra Misión</h3>
                    <div className="img_mision_nos">
                        {/* Imagen real de misión */}
                        <img src={imgMision} alt="Representación de la misión de AtelierStudio" className="img_mision img-fluid" />
                        <div className="info_mision_nos">
                            <br />
                            <p>
                                Buscamos democratizar el acceso al arte independiente de alta calidad, derribando las barreras tradicionales del mercado cultural. Nuestro propósito es brindar una plataforma justa, visible y transparente tanto a talentos emergentes como a creadores consolidados, reconociendo el valor de su trabajo y conectándolos de manera directa con una comunidad abierta y entusiasta. Creemos firmemente en el poder transformador de la creatividad y trabajamos para que cada obra trascienda, encontrando un espacio significativo donde inspire, comunique y sea verdaderamente apreciada.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sección del equipo desarrollador */}
                <section className="equipo_nos">
                    <br />
                    <br />
                    <hr style={{ borderColor: 'white' }} />
                    <h3 className="titulo_equipo_nos">Equipo Desarrollador</h3>
                    <p className="intro_equipo_nos">Detrás de este trabajo hay un equipo comprometido y multidisciplinario que unió su talento para darle forma a este proyecto desde cero:</p>
                    
                    <div className="equipo_desa_nos row justify-content-center gap-4">

                        {/* Integrante #1: Geraldinne */}
                        <article className="equipo_nos_int1 col-12 col-md-5">
                            <h4 className="nom_int1">Geraldinne González</h4>
                            <img src={imgGeraldinne} alt="Geraldinne González" />
                            <p className="resp_int1">Responsable de la maquetación y arquitectura semántica en HTML5.</p>
                        </article>

                        {/* Integrante #2: Gonzalo */}
                        <article className="equipo_nos_int2 col-12 col-md-5">
                            <h4 className="nom_int2">Gonzalo Hormazábal</h4>
                            <img src={imgGonza} alt="Gonzalo Hormazábal" />
                            <p className="resp_int2">Encargado de la lógica interactiva, validaciones de formularios y persistencia de datos.</p>
                        </article>

                    </div>
                </section>
            </main>

            {/* Pie de página informativo */}
            <footer className="pie_pag_nos">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Nosotros;

