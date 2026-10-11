import React, { useState, useEffect } from 'react';
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
    const [debates, setDebates] = useState([]);
    const [usuarioActivo, setUsuarioActivo] = useState(null);

    //Diccionario de categorías visibles
    const nombresCategorias = {
        tecnicas: "Técnicas y Materiales",
        recomendaciones: "Recomendación de Obras",
        criticas: "Crítica y Apreciación Visual",
        eventos: "Talleres y Galerías"
    };

    //Función para contar palabras normalizadas (sin tildes, signos ni mayúsculas)
    const contarPalabrasNormalizadas = (texto) => {
        if (!texto) return 0;
        const textoLimpio = texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remueve tildes
            .replace(/[.,;:¿?¡!'"\-_()[\]{}]/g, " ") // Remueve signos de puntuación
            .replace(/\s+/g, " ") // Colapsa espacios múltiples
            .trim();

        if (textoLimpio === "") return 0;
        return textoLimpio.split(" ").length;
    };

    //Carga inicial de usuario y debates almacenados
    useEffect(() => {

        //1. Obtener usuario activo
        let user = null;
        try {
            user = JSON.parse(sessionStorage.getItem("usuarioActivo")) ||
                   JSON.parse(localStorage.getItem("usuarioActivo")) || null;
        } catch (e) {
            user = null;
        }
        setUsuarioActivo(user);

        //2. Debates iniciales por defecto
        const debatesIniciales = [
            {
                id: 1,
                autor: "Geraldinne G.",
                foto: geraldinne,
                titulo: "Conservación de acuarelas en climas húmedos",
                categoriaTexto: "Técnicas y Materiales",
                mensaje: "¿Qué tipo de fijador o paspartú recomiendan para obras expuestas cerca de la costa? He notado que el exceso de humedad marina altera el grano del papel si no se sella de inmediato.",
                fecha: "Publicado hace 2 horas • 8 respuestas",
                conteoPalabras: contarPalabrasNormalizadas("¿Qué tipo de fijador o paspartú recomiendan para obras expuestas cerca de la costa? He notado que el exceso de humedad marina altera el grano del papel si no se sella de inmediato."),
                esMio: false
            },
            {
                id: 2,
                autor: "Gonzalo H.",
                foto: gonza,
                titulo: "Apreciación del claroscuro en retratos al óleo",
                categoriaTexto: "Crítica y Apreciación Visual",
                mensaje: "Totalmente recomendada la obra 'Caballero con Pipa'. La transición de sombras en la mirada del marinero transmite una calma reflexiva que difícilmente se logra en formatos digitales.",
                fecha: "Publicado hace 1 día • 14 respuestas",
                conteoPalabras: contarPalabrasNormalizadas("Totalmente recomendada la obra 'Caballero con Pipa'. La transición de sombras en la mirada del marinero transmite una calma reflexiva que difícilmente se logra en formatos digitales."),
                esMio: false
            }
        ];

        let debatesGuardados = null;
        try {
            debatesGuardados = JSON.parse(localStorage.getItem("debatesForo"));
        } catch (e) {
            debatesGuardados = null;
        }

        if (!debatesGuardados || debatesGuardados.length === 0) {
            debatesGuardados = debatesIniciales;
            localStorage.setItem("debatesForo", JSON.stringify(debatesIniciales));
        }

        setDebates(debatesGuardados);
    }, []);

    //Verificación de autenticación para invitados
    const verificarSesion = () => {
        if (!usuarioActivo) {
            const irLogin = window.confirm("Para realizar esta acción debes iniciar sesión con tu cuenta.\n\n¿Deseas ir al inicio de sesión ahora?");
            if (irLogin) {
                navigate('/login');
            }
            return false;
        }
        return true;
    };

    //Publicación de nuevo tema con restricción para visitantes
    const manejarPublicar = () => {
        if (!verificarSesion()) return;

        const tituloVal = titulo.trim();
        const catClave = cat;
        const mensajeVal = msg.trim();

        if (tituloVal === "" || catClave === "" || mensajeVal === "") {
            alert("Debes completar el título, la categoría y el comentario antes de publicar.");
            return;
        }

        const cantidadPalabras = contarPalabrasNormalizadas(mensajeVal);

        //Validación de no duplicar cantidad de palabras exacta
        const cantidadDuplicada = debates.some(d => d.conteoPalabras === cantidadPalabras);
        if (cantidadDuplicada) {
            alert("No es posible publicar: Ya existe un comentario registrado con la misma cantidad de palabras. Modifica o amplía la extensión de tu opinión.");
            return;
        }

        //Obtener datos visibles del perfil registrado
        const nombre = usuarioActivo.nombre ? usuarioActivo.nombre.trim() : "";
        const apellidos = usuarioActivo.apellidos ? usuarioActivo.apellidos.trim() : "";
        const inicialApellido = apellidos.length > 0 ? `${apellidos.charAt(0)}.` : "";
        const nombreAutor = nombre ? `${nombre} ${inicialApellido}`.trim() : "Usuario";
        const fotoAutor = usuarioActivo.foto || gonza;

        const nuevoTema = {
            id: Date.now(),
            autor: nombreAutor,
            foto: fotoAutor,
            titulo: tituloVal,
            categoriaTexto: nombresCategorias[catClave] || "General",
            mensaje: mensajeVal,
            fecha: "Publicado hace un momento • 0 respuestas",
            conteoPalabras: cantidadPalabras,
            esMio: true // Solo el autor ve el botón eliminar
        };

        const nuevaLista = [nuevoTema, ...debates];
        setDebates(nuevaLista);
        localStorage.setItem("debatesForo", JSON.stringify(nuevaLista));

        //Limpieza de campos
        setTitulo('');
        setCat('');
        setMsg('');
        alert("¡Tu tema ha sido publicado en el foro!");
    };

    //Eliminar comentario (solo permitido para publicaciones propias)
    const eliminarDebate = (id) => {
        if (!verificarSesion()) return;

        if (window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
            const filtrados = debates.filter(d => d.id !== id);
            setDebates(filtrados);
            localStorage.setItem("debatesForo", JSON.stringify(filtrados));
            alert("Comentario eliminado del foro.");
        }
    };

    const mensajeResponder = (e) => {
        e.preventDefault();
        alert("El botón 'Responder' no está en funcionamiento hasta una nueva actualización de la página web.");
    };

    return (
        <div className="foro">

            {/* Título de 'foro', logo y botones */}
            <header className="titulo_foro">
                <figure className="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>FORO</h2>
                </figure>

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
                            <input 
                                type="text" 
                                id="titulo_tema" 
                                name="titulo_tema" 
                                placeholder="Ingrese un título a la conversación." 
                                value={titulo} 
                                onChange={(e) => setTitulo(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="categoria_tema"><strong>Categoría:</strong></label>
                            <select 
                                id="categoria_tema" 
                                name="categoria_tema" 
                                value={cat} 
                                onChange={(e) => setCat(e.target.value)}>
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
                                value={msg} 
                                onChange={(e) => setMsg(e.target.value)} />
                        </div>

                        <button 
                            type="button" 
                            className="btn_publicar_foro" 
                            onClick={manejarPublicar}>
                            <strong>PUBLICAR TEMA</strong>
                        </button>
                    </form>
                </section>

                <hr />
                <br />

                {/* Lista de debates y opiniones comunitarias */}
                <section className="lista_temas_foro">
                    <h3 className="subtitulo_debates">Opiniones Recientes</h3>

                    {debates.map((item) => (
                        <article key={item.id} className="tarjeta_debate">
                            <figure className="autor_debate">
                                <img 
                                    src={item.foto} 
                                    alt={`Foto de ${item.autor}`} 
                                    onError={(e) => { e.target.src = logo; }} />
                                <figcaption><strong>{item.autor}</strong></figcaption>
                            </figure>

                            <div className="cuerpo_debate">
                                <h4>{item.titulo}</h4>
                                <span className="badge_categoria">{item.categoriaTexto}</span>
                                <p>{item.mensaje}</p>
                                <footer className="pie_debate">
                                    <small>{item.fecha}</small>
                                    <div className="acciones_pie_debate">
                                        <a href="#" className="enlace_responder" onClick={mensajeResponder}>
                                            Responder &rarr;
                                        </a>

                                        {/* Botón eliminar visible solo si el debate fue publicado por el usuario */}
                                        {item.esMio && (
                                            <button 
                                                type="button" 
                                                className="btn_eliminar_debate" 
                                                onClick={() => eliminarDebate(item.id)}>
                                                &times; Eliminar
                                            </button>
                                        )}
                                    </div>
                                </footer>
                            </div>
                        </article>
                    ))}
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

