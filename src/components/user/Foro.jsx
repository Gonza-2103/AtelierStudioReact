import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import geraldinne from '../../assets/geraldinne.jpg';
import gonza from '../../assets/gonza.jpg';

function Foro() {
    const [nuevoTitulo, setNuevoTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [comentario, setComentario] = useState('');

    const handlePublicar = (e) => {
        e.preventDefault();
        console.log('Publicar tema en foro:', { nuevoTitulo, categoria, comentario });
    };

    return (
        <div className="foro">
            <header className="titulo_foro">
                <figure className="titlogo">
                    <img src={logo} alt="Logo AtelierStudio" />
                    <h2>Foro</h2>
                </figure>

                <figure className="btns_navegacion_foro">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                    <Link to="/contacto" className="nav_btn"><strong>Contacto</strong></Link>
                </figure>
            </header>

            <main className="contenido_foro">
                <section className="caja_nuevo_tema">
                    <h3>Comparte tu Opinión o Recomendación</h3>
                    <hr style={{ borderColor: 'white' }} />
                    <p>Espacio abierto para debatir técnicas, recomendar artistas independientes y comentar exposiciones, todo relacionado con el arte.</p>

                    <form className="form_nuevo_post" onSubmit={handlePublicar} noValidate>
                        <div>
                            <br />
                            <label htmlFor="titulo_tema"><strong>Título del tema:</strong></label>
                            <input 
                                type="text" 
                                id="titulo_tema" 
                                name="titulo_tema" 
                                placeholder="Comparte tu idea: Propone un título a la conversación."
                                value={nuevoTitulo}
                                onChange={(e) => setNuevoTitulo(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="categoria_tema"><strong>Categoría:</strong></label>
                            <select 
                                id="categoria_tema" 
                                name="categoria_tema"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}>

                                <option value="">Selecciona una temática</option>
                                <option value="tecnicas">Técnicas y Materiales</option>
                                <option value="recomendaciones">Recomendación de Obras</option>
                                <option value="criticas">Crítica y Apreciación Visual</option>
                                <option value="eventos">Talleres y Galerías</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="mensaje_tema"><strong>Comentario:</strong></label>
                            <textarea 
                                id="mensaje_tema" 
                                name="mensaje_tema" 
                                rows="4" 
                                placeholder="Escribe aquí tu recomendación o consulta para la comunidad."
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)} />
                        </div>

                        <button 
                            type="submit" 
                            className="btn_publicar_foro">
                            <strong>PUBLICAR TEMA</strong>
                        </button>
                    </form>
                </section>

                <section className="lista_temas_foro">
                    <h3 className="subtitulo_debates">Opiniones Recientes</h3>

                    <article className="tarjeta_debate">
                        <figure className="autor_debate">
                            <img src={geraldinne} alt="Foto de Geraldinne" />
                            <figcaption><strong>Geraldinne G.</strong></figcaption>
                        </figure>

                        <div className="cuerpo_debate">
                            <h4>Conservación de acuarelas en climas húmedos</h4>
                            <span className="badge_categoria">Técnicas y Materiales</span>
                            <p>¿Qué tipo de fijador o paspartú recomiendan para obras expuestas cerca de la costa? He notado que el exceso de humedad marina altera el grano del papel si no se sella de inmediato.</p>
                            
                            <footer className="pie_debate">
                                <small>Publicado hace 2 horas &bull; 8 respuestas</small>
                                <a href="#responder" className="enlace_responder">Responder &rarr;</a>
                            </footer>
                        </div>
                    </article>

                    <article className="tarjeta_debate">
                        <figure className="autor_debate">
                            <img src={gonza} alt="Foto de Gonzalo" />
                            <figcaption><strong>Gonzalo H.</strong></figcaption>
                        </figure>

                        <div className="cuerpo_debate">
                            <h4>Apreciación del claroscuro en retratos al óleo</h4>
                            <span className="badge_categoria">Crítica y Apreciación Visual</span>
                            <p>Totalmente recomendada la obra 'Caballero con Pipa'. La transición de sombras en la mirada del marinero transmite una calma reflexiva que difícilmente se logra en formatos digitales.</p>
                            
                            <footer className="pie_debate">
                                <small>Publicado hace 1 día &bull; 14 respuestas</small>
                                <a href="#responder" className="enlace_responder">Responder &rarr;</a>
                            </footer>
                        </div>
                    </article>
                </section>
            </main>

            <footer className="pie_pag_foro">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Foro;

