import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import luznatural from '../../assets/luznatural.jpg';

function Detalle_Blog2() {
    return (
        <div className="det_blog2">

            {/* Título de 'detalle de blog #2', logo y botones */}
            <header className="titulo_det_blog2">
                <figure className="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Blogs</h2>
                </figure>

                <figure className="btns_nav_det_blog2">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            <main className="cont_det_blog2">
                <section className="caso_det_cont_blog2">
                    <article className="det_caso2">
                        <header className="info_det_blog2">
                            <h3 className="titulo_det_caso2">CASO CURIOSO #2:</h3>
                            <h3 className="titulo_det_caso2">El Impacto de la Luz Solar Natural en las Acuarelas</h3>
                        </header>

                        <br />
                        <div className="img_det_caso2">
                            <img src={luznatural} alt="Luz natural en acuarelas" className="img2" style={{ width: '50%' }} />
                        </div>

                        <section className="cont_det_caso2">
                            <br />
                            <br />
                            <hr style={{ borderColor: 'white' }} />
                            <h3>Un secreto guardado por siglos en el arte en papel</h3>
                            <p>
                                A diferencia de la pintura al óleo, la acuarela y los grabados
                                sobre papel absorben el pigmento directamente en sus fibras de
                                algodón. Esto los hace obras de una delicadeza y luminosidad
                                extraordinarias, pero también muy sensibles a la luz solar
                                directa.
                            </p>
                            <p>
                                Durante siglos, los coleccionistas guardaban sus manuscritos e
                                ilustraciones en carpetas de cuero que solo se abrían en
                                penumbra para evitar que los rayos ultravioleta (UV) rompieran
                                las moléculas de color, un fenómeno conocido como
                                fotodegradación.
                            </p>

                            <br />
                            <hr style={{ borderColor: 'white' }} />
                            <h3>¿Cómo proteger tus obras en el hogar?</h3>
                            <p>
                                Como personal de <strong>AtelierStudio</strong> nos 
                                aseguramos de que cada obra en papel y grabado original 
                                mantenga su identidad y brillo, exactamente tal como 
                                nuevo desde el primer día.
                            </p>
                            <p>
                                Por lo tanto, como expertos en la industria artística 
                                recomendamos siempre a nuestros coleccionistas de arte 
                                seguir los siguientes tres útiles consejos:
                            </p>
                            
                            <ul>
                                <li>
                                    <strong>Uso de cristal con filtro UV:</strong>
                                    <p>Al enmarcar tu obra, utiliza vidrios con protección contra radiación ultravioleta.</p>
                                </li>
                                <li>
                                    <strong>Ubicación estratégica:</strong>
                                    <p>Evita colgar piezas en papel directamente frente a ventanas orientadas al sol directo de la tarde.</p>
                                </li>
                                <li>
                                    <strong>Paspartú libre de ácido:</strong>
                                    <p>Utiliza marialuisas de calidad de museo que eviten el contacto directo entre el papel y el vidrio.</p>
                                </li>
                            </ul>
                        </section>

                        <br />
                        <hr style={{ borderColor: 'white' }} />
                        <footer className="foot_det_caso2">
                            <p>
                                <strong>
                                    <Link to="/blogs" style={{ color: 'goldenrod', textDecoration: 'underline' }}>
                                        Volver &#x21A9;
                                    </Link>
                                </strong>
                            </p>
                        </footer>
                    </article>
                </section>
            </main>

            {/* Pie de página informativo */}
            <footer className="pie_pag_det_blog2">
                <p className="fecha_pub_det_caso2"><em>Publicado el 20 de Agosto de 2026, por AtelierStudio.</em></p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Detalle_Blog2;

