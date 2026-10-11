import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Contacto() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [comentario, setComentario] = useState('');
    const [errores, setErrores] = useState({
        nombre: '',
        correo: '',
        comentario: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const nombreVal = nombre.trim();
        const correoVal = correo.trim().toLowerCase();
        const comentarioVal = comentario.trim();

        let formularioValido = true;
        const nuevosErrores = {
            nombre: '',
            correo: '',
            comentario: ''
        };

        console.log("Validando formulario de ayuda...");
        console.log("Cantidad de caracteres del nombre: " + nombreVal.length);

        // Validar Nombre (Requerido, máximo 100 caracteres)
        if (nombreVal === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
            console.log("Error en Nombre: El campo está vacío.");
            formularioValido = false;
        } else if (nombreVal.length > 100) {
            nuevosErrores.nombre = "El nombre no puede superar los 100 caracteres.";
            console.log("Error en Nombre: Supera los 100 caracteres.");
            formularioValido = false;
        } else {
            console.log("Nombre válido: " + nombreVal);
        }

        // Validar Correo (requerido, máximo 100 caracteres y dominios permitidos)
        const formatoCorreoValido = /^[^\s@]+@(duocuc\.cl|profesor\.duocuc\.cl|gmail\.com)$/.test(correoVal);

        if (correoVal === "") {
            nuevosErrores.correo = "El correo es obligatorio.";
            console.log("Error en Correo: El campo está vacío.");
            formularioValido = false;
        } else if (correoVal.length > 100) {
            nuevosErrores.correo = "El correo no puede superar los 100 caracteres.";
            console.log("Error en Correo: Supera los 100 caracteres.");
            formularioValido = false;
        } else if (!formatoCorreoValido) {
            nuevosErrores.correo = "El correo debe ser @duocuc.cl, @profesor.duocuc.cl o @gmail.com.";
            console.log("Error en Correo: El formato o dominio no está permitido.");
            formularioValido = false;
        } else {
            console.log("Correo válido: " + correoVal);
        }

        // Validar Comentario (requerido, máximo 500 caracteres)
        if (comentarioVal === "") {
            nuevosErrores.comentario = "El comentario es obligatorio.";
            console.log("Error en Comentario: El campo está vacío.");
            formularioValido = false;
        } else if (comentarioVal.length > 500) {
            nuevosErrores.comentario = "El comentario no puede superar los 500 caracteres.";
            console.log("Error en Comentario: Supera los 500 caracteres.");
            formularioValido = false;
        } else {
            console.log("Comentario válido.");
        }

        console.log("---------------------------------------");

        setErrores(nuevosErrores);

        // Resultado de validaciones
        if (formularioValido) {
            console.log("ESTADO: Mensaje enviado correctamente.");
            alert("Tu mensaje fue enviado correctamente.");
            
            // Limpieza del formulario
            setNombre('');
            setCorreo('');
            setComentario('');
            setErrores({
                nombre: '',
                correo: '',
                comentario: ''
            });
        } else {
            const camposConError = [];

            if (nuevosErrores.nombre !== "") {
                camposConError.push("- Nombre");
            }
            if (nuevosErrores.correo !== "") {
                camposConError.push("- Correo");
            }
            if (nuevosErrores.comentario !== "") {
                camposConError.push("- Comentario");
            }

            alert("No se pudo enviar el mensaje. Revisa los siguientes campos:\n\n" + camposConError.join("\n"));
            console.log("ESTADO: Mensaje rechazado por datos inválidos. Campos con errores: " + camposConError.join(", "));
        }
    };

    const estiloError = { color: 'red', display: 'block', marginTop: '4px' };

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
                            <input 
                                type="text" 
                                id="nombreAyuda" 
                                name="nombreAyuda" 
                                placeholder="Ingresa su nombre" 
                                value={nombre} 
                                onChange={(e) => {
                                    setNombre(e.target.value);
                                    if (errores.nombre) setErrores(prev => ({ ...prev, nombre: '' }));
                                }} 
                            />
                            <small id="errorNombreAyuda" style={estiloError}>{errores.nombre}</small>
                        </div>

                        {/* Correo */}
                        <div className="campo_ayuda">
                            <label htmlFor="correoAyuda"><strong>Correo electrónico:<span className="obligatorio">*</span></strong></label>
                            <input 
                                type="text" 
                                id="correoAyuda" 
                                className="correo_ayuda" 
                                name="correoAyuda" 
                                placeholder="ejemplo@gmail.com" 
                                value={correo} 
                                onChange={(e) => {
                                    setCorreo(e.target.value);
                                    if (errores.correo) setErrores(prev => ({ ...prev, correo: '' }));
                                }} 
                            />
                            <small className="texto_ayuda">Dominios permitidos: @duocuc.cl, @profesor.duocuc.cl y @gmail.com</small>
                            <small id="errorCorreoAyuda" style={estiloError}>{errores.correo}</small>
                        </div>

                        {/* Comentario */}
                        <div className="campo_ayuda">
                            <label htmlFor="comentarioAyuda"><strong>Comentario:<span className="obligatorio">*</span></strong></label>
                            <textarea 
                                id="comentarioAyuda" 
                                name="comentarioAyuda" 
                                rows="6" 
                                placeholder="Ingresa aquí su consulta" 
                                value={comentario} 
                                onChange={(e) => {
                                    setComentario(e.target.value);
                                    if (errores.comentario) setErrores(prev => ({ ...prev, comentario: '' }));
                                }} 
                            />
                            <small id="errorComentarioAyuda" style={estiloError}>{errores.comentario}</small>
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

