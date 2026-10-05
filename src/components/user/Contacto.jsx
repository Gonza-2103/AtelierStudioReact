import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Contacto() {
    const [formData, setFormData] = useState({
        nombreAyuda: '',
        correoAyuda: '',
        comentarioAyuda: '',
    });

    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevosErrores = {};
        if (!formData.nombreAyuda.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
        if (!formData.correoAyuda.includes('@')) nuevosErrores.correo = 'Ingrese un correo válido';
        if (!formData.comentarioAyuda.trim()) nuevosErrores.comentario = 'El comentario no puede estar vacío';

        if (Object.keys(nuevosErrores).length > 0) {
        setErrores(nuevosErrores);
        } else {
        setErrores({});
        alert('Mensaje enviado con éxito');
        }
    };

    return (
        <div className="ayuda">
            <header className="titulo_ayuda">
                <figure className="titlogo">
                    <img src={logo} alt="Logo de AtelierStudio" />
                    <h2>Contacto</h2>
                </figure>
                <figure className="btns_navegacion_ayuda">
                    <Link to="/" className="nav_btn"><strong>Portada</strong></Link>
                    <Link to="/nosotros" className="nav_btn"><strong>Nosotros</strong></Link>
                    <Link to="/productos" className="nav_btn"><strong>Productos</strong></Link>
                    <Link to="/carrito" className="nav_btn"><strong>Carrito</strong></Link>
                    <Link to="/busqueda" className="nav_btn"><strong>Búsqueda</strong></Link>
                    <Link to="/foro" className="nav_btn"><strong>Foro</strong></Link>
                    <Link to="/blogs" className="nav_btn"><strong>Blogs</strong></Link>
                </figure>
            </header>

            <main className="contenido_ayuda">
                <section className="presentacion_ayuda">
                    <img src={logo} alt="Logo de AtelierStudio" className="logo_ayuda" />
                </section>

                <div className="descr_ayuda">
                    <p>Envíanos tu consulta y te responderemos a la brevedad.</p>
                </div>

                <section className="contenedor_formulario_ayuda">
                    <p className="tit_form_ayuda">Formulario</p>
                    <br />
                    <hr style={{ borderColor: 'black' }} />

                    <form id="formAyuda" className="formulario_ayuda" onSubmit={handleSubmit} noValidate>
                        <p className="aviso_obligatorio" style={{ color: 'black' }}>
                            <span className="obligatorio">*</span>Campos obligatorios
                        </p>

                        <div className="campo_ayuda">
                            <label htmlFor="nombreAyuda"><strong>Nombre completo:<span className="obligatorio">*</span></strong></label>
                            <input 
                                type="text" 
                                id="nombreAyuda" 
                                name="nombreAyuda" 
                                placeholder="Ingresa su nombre"
                                value={formData.nombreAyuda}
                                onChange={handleChange} />

                            {errores.nombre && <small style={{ color: 'red' }}>{errores.nombre}</small>}
                        </div>

                        <div className="campo_ayuda">
                            <label htmlFor="correoAyuda"><strong>Correo electrónico:<span className="obligatorio">*</span></strong></label>
                            <input 
                                type="text" 
                                id="correoAyuda" 
                                className="correo_ayuda" 
                                name="correoAyuda" 
                                placeholder="ejemplo@gmail.com"
                                value={formData.correoAyuda}
                                onChange={handleChange} />

                            <small className="texto_ayuda">Dominios permitidos: @duocuc.cl, @profesor.duocuc.cl y @gmail.com</small>
                            {errores.correo && <small style={{ color: 'red' }}>{errores.correo}</small>}
                        </div>

                        <div className="campo_ayuda">
                            <label htmlFor="comentarioAyuda"><strong>Comentario:<span className="obligatorio">*</span></strong></label>
                            <textarea 
                                id="comentarioAyuda" 
                                name="comentarioAyuda" 
                                rows="6" 
                                placeholder="Ingresa aquí su consulta"
                                value={formData.comentarioAyuda}
                                onChange={handleChange} />
                            {errores.comentario && <small style={{ color: 'red' }}>{errores.comentario}</small>}
                        </div>

                        <div className="boton_ayuda">
                            <button type="submit"><strong>ENVIAR MENSAJE</strong></button>
                        </div>
                    </form>
                </section>
            </main>

            <footer className="pie_pag_ayuda">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Contacto;

