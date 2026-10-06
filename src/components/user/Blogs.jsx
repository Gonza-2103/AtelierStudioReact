import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import pigmentos from '../../assets/pigmentos.jpeg';
import luznatural from '../../assets/luznatural.jpg';

function Blogs() {
    const navigate = useNavigate();

    return (
        <div className="blog">

            {/* Título de 'blog', logo y botones */}
            <header className="titulo_blog">
                <figure className="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>Blogs</h2>
                </figure>

                {/* Botones de navegación */}
                <figure className="btns_navegacion_blog">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            <main className="contenido_blog">
                <section className="casos_contenido_blog">
                    <article className="caso">
                        <figure className="info_caso">
                            <h2 className="titulo_casos_contenido_blog"><strong>NOTICIAS IMPORTANTES</strong></h2>
                            <br />
                            <hr style={{ borderColor: 'white' }} />
                            <h3 className="titulo_caso">CASO CURIOSO #1</h3>
                            <br />
                            <img src={pigmentos} className="img1" style={{ width: '50%' }} alt="Pigmentos" />

                            <p className="descripcion_caso">
                                ¿Sabías que el uso de pigmentos naturales en el óleo antiguo permitía que las pinturas cambiaran de tonalidad con el paso de las décadas? Descubre como hoy en día los artistas independientes contemporáneos rescatan estas técnicas ancestrales en sus talleres.
                            </p>
                            <a href="#" className="btn_caso1" onClick={(e) => { e.preventDefault(); navigate('/detalle_blog1'); }}><strong>VER CASO</strong></a>
                        </figure>
                    </article>

                    <br />

                    <article className="caso">
                        <figure className="info_caso">
                            <hr style={{ borderColor: 'white' }} />
                            <h3 className="titulo_caso">CASO CURIOSO #2</h3>
                            <br />
                            <img src={luznatural} className="img2" style={{ width: '50%' }} alt="Luz natural" />

                            <p className="descripcion_caso">
                                El impacto de la luz natural en las acuarelas: un secreto guardado por siglos. Analizamos cómo proteger tus grabados y obras en papel para mantener su brillo y pigmentación original como el primer día.
                            </p>
                            <a href="#" className="btn_caso2" onClick={(e) => { e.preventDefault(); navigate('/detalle_blog2'); }}><strong>VER CASO</strong></a>
                        </figure>
                    </article>
                </section>
                <br />
            </main>

            {/* Pie de página informativo */}
            <footer className="pie_pag_blog">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Blogs;

