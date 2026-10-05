import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import pigmentos from '../../assets/pigmentos.jpeg';
import luznatural from '../../assets/luznatural.jpg';

function Blogs() {
    return (
        <div className="blog">

            {/* Encabezado y barra de navegación */}
            <header className="titulo_blog">
                <figure className="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Blogs</h2>
                </figure>

                <figure className="btns_navegacion_blog">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            {/* Contenido principal */}
            <main className="contenido_blog">
                <section className="casos_contenido_blog">
                    <article className="caso">
                        <figure className="info_caso">
                            <h2 className="titulo_casos_contenido_blog"><strong>NOTICIAS IMPORTANTES</strong></h2>
                            <br />
                            <hr style={{ borderColor: 'white' }} />
                            <h3 className="titulo_caso">CASO CURIOSO #1</h3>
                            <br />
                            <img src={pigmentos} alt="Pigmentos naturales" className="img1" style={{ width: '50%' }} />

                            <p className="descripcion_caso">
                                ¿Sabías que el uso de pigmentos naturales en el óleo antiguo permitía que las pinturas cambiaran de tonalidad con el paso de las décadas? Descubre como hoy en día los artistas independientes contemporáneos rescatan estas técnicas ancestrales en sus talleres.
                            </p>

                            <Link to="/blogs/1" className="btn_caso1"><strong>VER CASO</strong></Link>
                        </figure>
                    </article>

                    <br />

                    <article className="caso">
                        <figure className="info_caso">
                            <hr style={{ borderColor: 'white' }} />
                            <h3 className="titulo_caso">CASO CURIOSO #2</h3>
                            <br />
                            <img src={luznatural} alt="Luz natural en acuarelas" className="img2" style={{ width: '50%' }} />

                            <p className="descripcion_caso">
                                El impacto de la luz natural en las acuarelas: un secreto guardado por siglos. Analizamos cómo proteger tus grabados y obras en papel para mantener su brillo y pigmentación original como el primer día.
                            </p>
                            <Link to="/blogs/2" className="btn_caso2"><strong>VER CASO</strong></Link>
                        </figure>
                    </article>
                </section>
                <br />
            </main>

            {/* Pie de página */}
            <footer className="pie_pag_blog">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Blogs;

