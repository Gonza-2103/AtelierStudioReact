import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import geraldinne from '../../assets/geraldinne.jpg';
import gonza from '../../assets/gonza.jpg';

function Foro() {
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [cat, setCat] = useState('');
    const [msg, setMsg] = useState('');

    return (
        <div className="foro">

            {/* Título de 'foro', logo y botones */}
            <header className="titulo_foro">

                {/* Título y logo */}
                <figure className="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>FORO</h2>
                </figure>

                {/* Botones de navegación */}
                <figure className="btns_navegacion_foro">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenido principal */}
            <main className="contenido_foro">
                
                {/* Formulario para publicar opinión o recomendación */}
                <section className="caja_nuevo_tema">
                    <h3>Comparte tu Opinión o Recomendación</h3>
                    <hr style={{ borderColor: 'white' }} />
                    <p>Espacio abierto para debatir técnicas, recomendar artistas independientes y comentar exposiciones, todo relacionado con el arte.</p>

                    <form className="form_nuevo_post" noValidate>
                        <div>
                            <br />
                            <label htmlFor="titulo_tema"><strong>Título del tema:</strong></label>
                            <input type="text" id="titulo_tema" name="titulo_tema" placeholder="Ingrese un título a la conversación." value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="categoria_tema"><strong>Categoría:</strong></label>
                            <select id="categoria_tema" name="categoria_tema" value={cat} onChange={(e) => setCat(e.target.value)}>
                                <option value="">Selecciona una temática</option>
                                <option value="tecnicas">Técnicas y Materiales</option>
                                <option value="recomendaciones">Recomendación de Obras</option>
                                <option value="criticas">Crítica y Apreciación Visual</option>
                                <option value="eventos">Talleres y Galerías</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="mensaje_tema"><strong>Comentario:</strong></label>
                            <textarea id="mensaje_tema" name="mensaje_tema" rows="4" placeholder="Escribe aquí tu recomendación o consulta para la comunidad." value={msg} onChange={(e) => setMsg(e.target.value)} />
                        </div>

                        <button type="button" className="btn_publicar_foro" onClick={() => alert('Tema publicado con éxito')}><strong>PUBLICAR TEMA</strong></button>
                    </form>
                </section>

                <hr />
                <br />
                {/* Lista de debates y opiniones comunitarias */}
                <section className="lista_temas_foro">
                    <h3 className="subtitulo_debates">Opiniones Recientes</h3>

                    {/* Tema 1 */}
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
                                <a href="#" className="enlace_responder">Responder &rarr;</a>
                            </footer>
                        </div>
                    </article>

                    {/* Tema 2 */}
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
                                <a href="#" className="enlace_responder">Responder &rarr;</a>
                            </footer>
                        </div>
                    </article>
                </section>
            </main>

            {/* Pie de página informativo */}
            <footer className="pie_pag_foro">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Foro;

