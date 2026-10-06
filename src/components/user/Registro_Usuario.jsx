import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Registro_Usuario() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellidos: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        telefono: '',
        fechaNacimiento: '',
        region: '',
        comuna: '',
        direccion: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Usuario registrado:', formData);
        navigate('/login');
    };

    return (
        <div className="pagina_registro">

            {/* Logo de la empresa */}
            <div className="logo">
                <img src={logo} alt="Logo AtelierStudio" />
            </div>

            <br />

            {/* Contenido principal del registro */}
            <main className="inforegistro">
                <div className="palabra_registro">
                    <h1>Crear Cuenta</h1>
                </div>

                {/* Formulario de registro */}
                <form className="campos_registro" onSubmit={handleSubmit} noValidate>
                    <p className="aviso_obligatorio" style={{ color: 'white' }}><span className="camp_oblig">*</span> Campos obligatorios</p>

                    {/* RUN */}
                    <div>
                        <label htmlFor="run"><strong>RUT: <span className="run_oblig">*</span> </strong></label>
                        <input type="text" className="run" name="run" id="run" maxLength="9" placeholder="Ejemplo: 19011022K" value={formData.run} onChange={handleChange} />
                        <small className="texto-ayuda">Se requiere un mínimo 7 y un máximo de 9 caracteres, sin puntos ni guión.</small>
                    </div>

                    {/* Nombre */}
                    <div>
                        <label htmlFor="nombre"><strong>Nombre: <span className="nomb_oblig">*</span></strong></label>
                        <input type="text" className="nombre" name="nombre" id="nombre" maxLength="50" placeholder="Ingresa tu nombre" value={formData.nombre} onChange={handleChange} />
                    </div>

                    {/* Apellidos */}
                    <div>
                        <label htmlFor="apellidos"><strong>Apellidos: <span className="apel_oblig">*</span></strong></label>
                        <input type="text" className="apellidos" name="apellidos" id="apellidos" maxLength="100" placeholder="Ingresa tus apellidos" value={formData.apellidos} onChange={handleChange} />
                    </div>

                    {/* Correo electrónico */}
                    <div>
                        <label htmlFor="correo"><strong>Correo electrónico: <span className="correo_oblig">*</span></strong></label>
                        <input type="email" className="correo" name="correo" id="correo" maxLength="100" placeholder="ejemplo@gmail.com" value={formData.correo} onChange={handleChange} />
                        <small className="texto-ayuda">Solo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label htmlFor="contrasena"><strong>Contraseña: <span className="contrasena_oblig">*</span></strong></label>
                        <input type="password" className="contrasena" name="contrasena" id="contrasena" maxLength="10" placeholder="Entre 8 y 10 caracteres" value={formData.contrasena} onChange={handleChange} />
                        <small className="texto-ayuda">La contraseña debe tener entre 8 y 10 caracteres.</small>
                    </div>

                    {/* Confirmar contraseña */}
                    <div>
                        <label htmlFor="confirmarContrasena"><strong>Confirmar contraseña: <span className="conf_contrasena_oblig">*</span></strong></label>
                        <input type="password" className="confirmarContrasena" name="confirmarContrasena" id="confirmarContrasena" maxLength="10" placeholder="Repite tu contraseña" value={formData.confirmarContrasena} onChange={handleChange} />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="telefono"><strong>Teléfono de contacto:</strong></label>
                        <input type="text" className="telefono" name="telefono" id="telefono" placeholder="Ejemplo: 912345678" value={formData.telefono} onChange={handleChange} />
                    </div>

                    {/* Fecha de nacimiento */}
                    <div>
                        <label htmlFor="fechaNacimiento"><strong>Fecha de nacimiento:</strong></label>
                        <input type="text" className="fechaNacimiento" name="fechaNacimiento" id="fechaNacimiento" maxLength="10" placeholder="DD/MM/YYYY" autoComplete="off" value={formData.fechaNacimiento} onChange={handleChange} />
                    </div>

                    {/* Región */}
                    <div>
                        <label htmlFor="region"><strong>Región: <span className="region_oblig">*</span></strong></label>
                        <select className="region" name="region" id="region" value={formData.region} onChange={handleChange}>
                            <option value="">Seleccione una región</option>
                            <option value="Valparaíso">Región de Valparaíso</option>
                            <option value="Metropolitana">Región Metropolitana</option>
                        </select>
                    </div>

                    {/* Comuna */}
                    <div>
                        <label htmlFor="comuna"><strong>Comuna: <span className="comuna_oblig">*</span></strong></label>
                        <select className="comuna" name="comuna" id="comuna" value={formData.comuna} onChange={handleChange}>
                            <option value="">Seleccione una comuna</option>
                            <option value="Viña del Mar">Viña del Mar</option>
                            <option value="Valparaíso">Valparaíso</option>
                        </select>
                    </div>

                    {/* Dirección */}
                    <div>
                        <label htmlFor="direccion"><strong>Dirección: <span className="dire_oblig">*</span></strong></label>
                        <input type="text" className="direccion" name="direccion" id="direccion" maxLength="300" placeholder="Calle #número, depto. #número" value={formData.direccion} onChange={handleChange} />
                    </div>

                    {/* Botones */}
                    <div className="botones_registro">
                        <br />
                        <button type="submit" className="btn_registrar"><strong>REGISTRAR</strong></button>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}><strong>Volver al Inicio de Sesión</strong></a>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Registro_Usuario;

