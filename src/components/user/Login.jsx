import React, { useState } from 'react';
// MODIFICACIÓN: Importar useNavigate
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login con:', correo, clave);
        navigate('/');
    };

    return (
        <div className="pagina_login">
            <div className="adm">
                <button type="button" className="btn_admin" onClick={() => navigate('/admin')}>
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

                <form className="campos_login" onSubmit={handleSubmit}>

                    {/* Campo del correo electrónico */}
                    <input
                        type="text"
                        id="correo"
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
                    <button type="button" className="forgot">
                        <strong>¿Se te olvidó la contraseña?</strong>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

