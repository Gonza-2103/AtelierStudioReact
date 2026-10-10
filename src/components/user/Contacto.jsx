import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Contacto() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado exitosamente');
    };

    return (
        <div className="ayuda">

            {/* Encabezado de la página */}
            <header className="titulo_ayuda">
                <figure className="titlogo">
                    <img src={logo} alt="Logo de AtelierStudio" />
                    <h2>CONTACTO</h2>
                </figure>
                <figure className="btns_navegacion_ayuda">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                </figure>
            </header>

            {/* Contenido principal */}
            <main className="contenido_ayuda">
                
                {/* Formulario de contacto */}
                <section className="contenedor_formulario_ayuda">
                    <p className="tit_form_ayuda">Formulario</p>

                    <form id="formAyuda" className="formulario_ayuda" onSubmit={handleSubmit} noValidate>
                        <p className="aviso_obligatorio" style={{ color: 'white' }}><span className="obligatorio">*</span>Campos obligatorios</p>
                        <br />

                        {/* Nombre */}
                        <div className="campo_ayuda">
                            <label htmlFor="nombreAyuda"><strong>Nombre completo:<span className="obligatorio">*</span></strong></label>
                            <input type="text" id="nombreAyuda" name="nombreAyuda" placeholder="Ingresa su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <small id="errorNombreAyuda"></small>
                        </div>

                        {/* Correo */}
                        <div className="campo_ayuda">
                            <label htmlFor="correo_ayuda"><strong>Correo electrónico:<span className="obligatorio">*</span></strong></label>
                            <input type="text" id="correoAyuda" className="correo_ayuda" name="correoAyuda" placeholder="ejemplo@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            <small className="texto_ayuda">Dominios permitidos: @duocuc.cl, @profesor.duocuc.cl y @gmail.com</small>
                            <small id="errorCorreoAyuda"></small>
                        </div>

                        {/* Comentario */}
                        <div className="campo_ayuda">
                            <label htmlFor="comentarioAyuda"><strong>Comentario:<span className="obligatorio">*</span></strong></label>
                            <textarea id="comentarioAyuda" name="comentarioAyuda" rows="6" placeholder="Ingresa aquí su consulta" value={comentario} onChange={(e) => setComentario(e.target.value)} />
                            <small id="errorComentarioAyuda"></small>
                        </div>

                        {/* Botón */}
                        <div className="boton_ayuda">
                            <button type="submit"><strong>ENVIAR MENSAJE</strong></button>
                        </div>
                    </form>
                </section>
            </main>

            {/* Pie de página informativo */}
            <footer className="pie_pag_ayuda">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Contacto;

