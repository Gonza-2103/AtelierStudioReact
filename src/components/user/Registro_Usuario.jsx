import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

        if (formData.run.length < 7 || formData.run.length > 9) {
            nuevosErrores.run = 'El RUT debe tener entre 7 y 9 caracteres sin puntos ni guion';
        }

        if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
        if (!formData.apellidos.trim()) nuevosErrores.apellidos = 'Los apellidos son obligatorios';
        if (!formData.correo.includes('@')) nuevosErrores.correo = 'Ingrese un correo electrónico válido';
        
        if (formData.contrasena.length < 8 || formData.contrasena.length > 10) {
            nuevosErrores.contrasena = 'La contraseña debe tener entre 8 y 10 caracteres';
        }
        
        if (formData.contrasena !== formData.confirmarContrasena) {
            nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
        }
        
        if (!formData.region) nuevosErrores.region = 'Seleccione una región';
        if (!formData.comuna) nuevosErrores.comuna = 'Seleccione una comuna';
        if (!formData.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria';

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
        } else {
            setErrores({});
            console.log('Registro exitoso:', formData);
            alert('¡Cuenta creada con éxito!');
            navigate('/login');
        }
    };

    return (
        <div className="pagina_registro">
            <div className="logo">
                <img src={logo} alt="Logo AtelierStudio" />
            </div>

            <br />

            <main className="inforegistro">
                <div className="palabra_registro">
                    <h1>Crear Cuenta</h1>
                </div>

                <form className="campos_registro" onSubmit={handleSubmit} noValidate>
                    <p className="aviso_obligatorio" style={{ color: 'white' }}>
                        <span className="camp_oblig">*</span> Campos obligatorios
                    </p>

                    <div>
                        <label htmlFor="run"><strong>RUT: <span className="run_oblig">*</span></strong></label>
                        <input 
                            type="text" 
                            className="run" 
                            name="run" 
                            id="run" 
                            maxLength="9" 
                            placeholder="Ejemplo: 19011022K"
                            value={formData.run}
                            onChange={handleChange} />
                            
                        <small className="texto-ayuda">Mínimo 7 y máximo 9 caracteres, sin puntos ni guión.</small>
                        {errores.run && <small className="errorRun" style={{ color: 'orange', display: 'block' }}>{errores.run}</small>}
                    </div>

                    <div>
                        <label htmlFor="nombre"><strong>Nombre: <span className="nomb_oblig">*</span></strong></label>
                        <input 
                            type="text" 
                            className="nombre" 
                            name="nombre" 
                            id="nombre" 
                            maxLength="50" 
                            placeholder="Ingresa tu nombre"
                            value={formData.nombre}
                            onChange={handleChange} />

                        {errores.nombre && <small className="errorNombre" style={{ color: 'orange', display: 'block' }}>{errores.nombre}</small>}
                    </div>

                    <div>
                        <label htmlFor="apellidos"><strong>Apellidos: <span className="apel_oblig">*</span></strong></label>
                        <input 
                            type="text" 
                            className="apellidos" 
                            name="apellidos" 
                            id="apellidos" 
                            maxLength="100" 
                            placeholder="Ingresa tus apellidos"
                            value={formData.apellidos}
                            onChange={handleChange} />

                        {errores.apellidos && <small className="errorApellidos" style={{ color: 'orange', display: 'block' }}>{errores.apellidos}</small>}
                    </div>

                    <div>
                        <label htmlFor="correo"><strong>Correo electrónico: <span className="correo_oblig">*</span></strong></label>
                        <input 
                            type="email" 
                            className="correo" 
                            name="correo" 
                            id="correo" 
                            maxLength="100" 
                            placeholder="ejemplo@gmail.com"
                            value={formData.correo}
                            onChange={handleChange} />

                        <small className="texto-ayuda">Solo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                        {errores.correo && <small className="errorCorreo" style={{ color: 'orange', display: 'block' }}>{errores.correo}</small>}
                    </div>

                    <div>
                        <label htmlFor="contrasena"><strong>Contraseña: <span className="contrasena_oblig">*</span></strong></label>
                        <input 
                            type="password" 
                            className="contrasena" 
                            name="contrasena" 
                            id="contrasena" 
                            maxLength="10" 
                            placeholder="Entre 8 y 10 caracteres"
                            value={formData.contrasena}
                            onChange={handleChange} />

                        <small className="texto-ayuda">La contraseña debe tener entre 8 y 10 caracteres.</small>
                        {errores.contrasena && <small className="errorContrasena" style={{ color: 'orange', display: 'block' }}>{errores.contrasena}</small>}
                    </div>

                    <div>
                        <label htmlFor="confirmarContrasena"><strong>Confirmar contraseña: <span className="conf_contrasena_oblig">*</span></strong></label>
                        <input 
                            type="password" 
                            className="confirmarContrasena" 
                            name="confirmarContrasena" 
                            id="confirmarContrasena" 
                            maxLength="10" 
                            placeholder="Repite tu contraseña"
                            value={formData.confirmarContrasena}
                            onChange={handleChange} />
                        {errores.confirmarContrasena && <small className="errorConfirmarContrasena" style={{ color: 'orange', display: 'block' }}>{errores.confirmarContrasena}</small>}
                    </div>

                    <div>
                        <label htmlFor="telefono"><strong>Teléfono de contacto:</strong></label>
                        <input 
                            type="text" 
                            className="telefono" 
                            name="telefono" 
                            id="telefono" 
                            placeholder="Ejemplo: 912345678"
                            value={formData.telefono}
                            onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="fechaNacimiento"><strong>Fecha de nacimiento:</strong></label>
                        <input 
                            type="text" 
                            className="fechaNacimiento" 
                            name="fechaNacimiento" 
                            id="fechaNacimiento" 
                            maxLength="10" 
                            placeholder="DD/MM/YYYY" 
                            autoComplete="off"
                            value={formData.fechaNacimiento}
                            onChange={handleChange} />
                    </div>

                    <div>
                        <label htmlFor="region"><strong>Región: <span className="region_oblig">*</span></strong></label>
                        <select 
                            className="region" 
                            name="region" 
                            id="region"
                            value={formData.region}
                            onChange={handleChange}>
                                
                            <option value="">Seleccione una región</option>
                            <option value="Valparaíso">Región de Valparaíso</option>
                            <option value="Metropolitana">Región Metropolitana</option>
                        </select>
                        {errores.region && <small className="errorRegion" style={{ color: 'orange', display: 'block' }}>{errores.region}</small>}
                    </div>

                    <div>
                        <label htmlFor="comuna"><strong>Comuna: <span className="comuna_oblig">*</span></strong></label>
                        <select 
                            className="comuna" 
                            name="comuna" 
                            id="comuna"
                            value={formData.comuna}
                            onChange={handleChange}>

                            <option value="">Seleccione una comuna</option>
                            <option value="Viña del Mar">Viña del Mar</option>
                            <option value="Valparaíso">Valparaíso</option>
                            <option value="Santiago">Santiago</option>
                        </select>
                        {errores.comuna && <small className="errorComuna" style={{ color: 'orange', display: 'block' }}>{errores.comuna}</small>}
                    </div>

                    <div>
                        <label htmlFor="direccion"><strong>Dirección: <span className="dire_oblig">*</span></strong></label>
                        <input 
                            type="text" 
                            className="direccion" 
                            name="direccion" 
                            id="direccion" 
                            maxLength="300" 
                            placeholder="Calle #número, depto. #número"
                            value={formData.direccion}
                            onChange={handleChange} />
                        {errores.direccion && <small className="errorDireccion" style={{ color: 'orange', display: 'block' }}>{errores.direccion}</small>}
                    </div>

                    <div className="botones_registro">
                        <br />
                        <button 
                            type="submit" 
                            className="btn_registrar">
                            <strong>REGISTRAR</strong>
                        </button>
                        <Link to="/login"><strong>Volver al Inicio de Sesión</strong></Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Registro_Usuario;

