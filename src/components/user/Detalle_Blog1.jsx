import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import pigmentos from '../../assets/pigmentos.jpeg';

function Detalle_Blog1() {
    const navigate = useNavigate();

    return (
        <div className="det_blog1">

            {/* Título de 'detalle de blog #1', logo y botones */}
            <header className="titulo_det_blog1">
                <figure className="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>Blogs</h2>
                </figure>

                <figure className="btns_nav_det_blog1">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            <main className="cont_det_blog1">
                <section className="caso_det_cont_blog1">
                    <article className="det_caso1">
                        <header className="info_det_blog1">
                            <h3 className="titulo_det_caso1">CASO CURIOSO #1:</h3>
                            <h3 className="titulo_det_caso1">El Secreto de los Pigmentos Naturales</h3>
                        </header>

                        <br />
                        <div className="img_det_caso1">
                            <img src={pigmentos} className="img1" style={{ width: '50%' }} alt="Pigmentos" />
                        </div>

                        <section className="cont_det_caso1">
                            <br />
                            <br />
                            <hr style={{ borderColor: 'white' }} />
                            <h3>¿Por qué las pinturas del renacimiento cambiaban de color?</h3>
                            <p>
                                Durante los siglos XV y XVI, los grandes maestros de la pintura no contaban con pigmentos sintéticos ni tubos de pintura industriales. Cada artista o su aprendiz debía moler minerales, piedras semipreciosas como el lapislázuli, y resinas vegetales en el propio taller para mezclar con aceite de linaza.
                            </p>
                            <p>
                                Con el paso de las décadas, la reacción química del aceite expuesto al aire y a la luz UV provocaba que colores como el azul ultramar o los verdes resinosos mutaran gradualmente, otorgándole a las obras una pátina única y viva que evolucionaba con el tiempo.
                            </p>

                            <br />
                            <hr style={{ borderColor: 'white' }} />
                            <h3>Rescate de la técnica en los talleres contemporáneos</h3>
                            <p>
                                En la actualidad, diversos artistas independientes que colaboran con <b>AtelierStudio</b> han vuelto a elaborar sus propios óleos a partir de tierras naturales y pigmentos orgánicos no tóxicos. Esta búsqueda busca recuperar la textura, la durabilidad y el alma artesanal que la producción masiva ha perdido.
                            </p>
                            <p>
                                Adquirir una obra elaborada con pigmentos orgánicos no es solo comprar una pieza decorativa; es llevar a tu hogar una pieza viva que continuará madurando con el paso de los años.
                            </p>
                        </section>

                        <br />
                        <hr style={{ borderColor: 'white' }} />
                        <footer className="foot_det_caso1">
                            <p><strong><a href="#" onClick={(e) => { e.preventDefault(); navigate('/blogs'); }} style={{ color: 'goldenrod', textDecoration: 'underline' }}>Volver &hookleftarrow;</a></strong></p>
                        </footer>
                    </article>
                </section>
            </main>

            {/* Pie de página informativo */}
            <footer className="pie_pag_det_blog1">
                <p className="fecha_pub_det_caso1"><em>Publicado el 16 de Agosto de 2026, por AtelierStudio.</em></p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Detalle_Blog1;

