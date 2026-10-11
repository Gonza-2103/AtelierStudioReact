import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Login() {
    const navigate = useNavigate();
    const inputCorreoRef = useRef(null);

    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    //Dominios autorizados del sistema
    const dominiosPermitidos = [
        "@duoc.cl",
        "@profesor.duoc.cl",
        "@gmail.com",
        "@admin.cl"
    ];

    //Usuarios predeterminados del sistema
    const usuariosPredeterminados = [
        {
            nombre: "Daniela",
            apellidos: "Muñoz",
            correo: "daniela.munoz@admin.cl",
            contrasena: "holiholi",
            rol: "Administrador"
        },
        {
            nombre: "Camila",
            apellidos: "Fernández",
            correo: "camila.fernandez@gmail.com",
            contrasena: "nanonano",
            rol: "Cliente"
        }
    ];

    //Manejador del botón con ícono de escudo (Acceso Administrador)
    const handleAccesoAdmin = () => {
        const esAdmin = window.confirm("Área restringida. ¿Confirmas que eres administrador del sistema?");

        if (esAdmin) {
            sessionStorage.setItem("modoAdminActivado", "true");
            alert("Acceso administrador habilitado. Ahora ingrese su cuenta @admin.cl y contraseña en el formulario.");
            if (inputCorreoRef.current) {
                inputCorreoRef.current.focus();
            }
        }
    };

    //Envío y validación del formulario de login
    const handleSubmit = (e) => {
        e.preventDefault();

        const correoLimpio = correo.trim().toLowerCase();
        const claveLimpia = clave.trim();

        //1. Validación de casillas vacías
        if (correoLimpio === "" || claveLimpia === "") {
            alert("Ambas casillas deben completarse antes de entrar.");
            return;
        }

        //2. Comprobar dominio permitido
        const dominioValido = dominiosPermitidos.some(dom => correoLimpio.endsWith(dom));
        if (!dominioValido) {
            alert("Correo no válido. Solo se permiten dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com o @admin.cl.");
            return;
        }

        //3. Validar longitud de contraseña (entre 8 y 10 caracteres)
        if (claveLimpia.length < 8 || claveLimpia.length > 10) {
            alert("La contraseña debe contener entre 8 y 10 caracteres.");
            return;
        }

        //4. Cargar usuarios guardados en localStorage
        let usuariosGuardados = [];
        try {
            usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        } catch (err) {
            usuariosGuardados = [];
        }

        let usuarioRegistradoIndividual = null;
        try {
            usuarioRegistradoIndividual = JSON.parse(localStorage.getItem("usuarioRegistrado"));
        } catch (err) {
            usuarioRegistradoIndividual = null;
        }

        if (usuarioRegistradoIndividual) {
            usuariosGuardados.push(usuarioRegistradoIndividual);
        }

        //5. Unificar usuarios del sistema y registrados
        const todosLosUsuarios = [...usuariosPredeterminados, ...usuariosGuardados];

        //6. Búsqueda flexible de coincidencias
        let usuarioEncontrado = null;
        for (let i = 0; i < todosLosUsuarios.length; i++) {
            const u = todosLosUsuarios[i];
            if (!u || !u.correo) continue;

            const correoBD = u.correo.trim().toLowerCase();
            const claveBD = (u.contrasena || u.clave || u.password || u.contraseña || "").trim();

            if (correoBD === correoLimpio && claveBD === claveLimpia) {
                usuarioEncontrado = u;
                break;
            }
        }

        if (!usuarioEncontrado) {
            alert("Correo o contraseña incorrectos.");
            return;
        }

        //7. Guardar sesión activa (tanto en sessionStorage como en localStorage para sincronía)
        sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

        //8. Redirección según rol
        if (usuarioEncontrado.rol === "Administrador" || correoLimpio.endsWith("@admin.cl")) {
            sessionStorage.removeItem("modoAdminActivado");
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    return (
        <div className="pagina_login">
            <div className="adm">
                <button type="button" className="btn_admin" onClick={handleAccesoAdmin} title="Acceso Administrador">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-user-icon lucide-shield-user">
                        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        <path d="M6.376 18.91a6 6 0 0 1 11.249.003" />
                        <circle cx="12" cy="11" r="4" />
                    </svg>
                </button>
            </div>

            <div className="logo">
                <img src={logo} alt="Logo AtelierStudio" className="logo" />
            </div>

            <div className="infologin">
                <div className="palabra_login">
                    <h1>Iniciar sesión</h1>
                </div>

                <br />

                <form className="campos_login" onSubmit={handleSubmit} noValidate>

                    {/* Campo del correo electrónico */}
                    <input
                        type="text"
                        id="correo"
                        ref={inputCorreoRef}
                        className="correo"
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)} />
                    <br />
                    <br />

                    {/* Campo de la contraseña */}
                    <input
                        type="password"
                        id="clave"
                        className="clave"
                        placeholder="Contraseña"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)} />
                    <br />
                    <br />

                    {/* Botones */}
                    <div className="botones_login">
                        <button type="submit" id="btnInicioSesion" className="btn_inicio_sesion">
                            <strong>INICIAR SESIÓN</strong>
                        </button>

                        <button
                            type="button"
                            id="btnRegistro"
                            className="btn_registro"
                            onClick={() => navigate('/registro_usuario')}>
                            <strong>REGISTRAR</strong>
                        </button>
                    </div>

                    <br />
                    <button 
                        type="button" 
                        className="forgot" 
                        onClick={() => alert("Por favor contacte al soporte para restablecer su contraseña.")}>
                        <strong>¿Se te olvidó la contraseña?</strong>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

