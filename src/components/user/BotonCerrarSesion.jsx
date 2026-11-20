import { useNavigate } from 'react-router-dom';

function BotonCerrarSesion() {
    const navigate = useNavigate();

    const handleCerrarSesion = (e) => {
        e.preventDefault();
        const respuesta = window.confirm("¿Estás seguro que le gustaría cerrar sesión?");

        if (respuesta) {
            sessionStorage.removeItem("usuarioActivo");
            sessionStorage.removeItem("token");
            localStorage.removeItem("usuarioActivo");
            localStorage.removeItem("token");
            navigate('/login');
        }
    };

    return (
        <div id="zona_sesion">
            <button id="btnCerrarSesion" onClick={handleCerrarSesion}>
                <span aria-hidden="true">↪</span> Cerrar sesión
            </button>
        </div>
    );
}

export default BotonCerrarSesion;
