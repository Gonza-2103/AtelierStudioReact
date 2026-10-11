import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';

function Registro_Usuario() {
    const navigate = useNavigate();

    //Base de datos oficial con las 16 regiones de Chile y todas sus comunas
    const regionesYComunas = [
        {
            region: "Región de Arica y Parinacota",
            comunas: ["Arica", "Camarones", "General Lagos", "Putre"]
        },
        {
            region: "Región de Tarapacá",
            comunas: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]
        },
        {
            region: "Región de Antofagasta",
            comunas: ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"]
        },
        {
            region: "Región de Atacama",
            comunas: ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"]
        },
        {
            region: "Región de Coquimbo",
            comunas: ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"]
        },
        {
            region: "Región de Valparaíso",
            comunas: [
                "Algarrobo", "Cabildo", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón",
                "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Calera",
                "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué",
                "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué",
                "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María",
                "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"
            ]
        },
        {
            region: "Región Metropolitana de Santiago",
            comunas: [
                "Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí",
                "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia",
                "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina",
                "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú",
                "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda",
                "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura",
                "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo",
                "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"
            ]
        },
        {
            region: "Región del Libertador General Bernardo O'Higgins",
            comunas: [
                "Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros",
                "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchigüe",
                "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo",
                "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco",
                "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente"
            ]
        },
        {
            region: "Región del Maule",
            comunas: [
                "Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado",
                "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco",
                "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia",
                "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"
            ]
        },
        {
            region: "Región de Ñuble",
            comunas: [
                "Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen",
                "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil",
                "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"
            ]
        },
        {
            region: "Región del Biobío",
            comunas: [
                "Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción",
                "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu",
                "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco",
                "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara",
                "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"
            ]
        },
        {
            region: "Región de La Araucanía",
            comunas: [
                "Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue",
                "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay",
                "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco",
                "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt",
                "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"
            ]
        },
        {
            region: "Región de Los Ríos",
            comunas: [
                "Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil",
                "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"
            ]
        },
        {
            region: "Región de Los Lagos",
            comunas: [
                "Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez",
                "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos",
                "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas",
                "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao",
                "Río Negro", "San Juan de la Costa", "San Pablo"
            ]
        },
        {
            region: "Región de Aysén del General Carlos Ibáñez del Campo",
            comunas: [
                "Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas",
                "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"
            ]
        },
        {
            region: "Región de Magallanes y de la Antártica Chilena",
            comunas: [
                "Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir",
                "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"
            ]
        }
    ];

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

    //Manejador de cambios generales y reseteo de comuna al cambiar región
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'region') {
            setFormData({ ...formData, region: value, comuna: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        //Limpia el error del campo que se está editando
        if (errores[name]) {
            setErrores({ ...errores, [name]: '' });
        }
    };

    //Validación y registro adaptado de registro_usuario.js
    const handleSubmit = (e) => {
        e.preventDefault();

        const runVal = formData.run.trim();
        const nombreVal = formData.nombre.trim();
        const apellidosVal = formData.apellidos.trim();
        const correoVal = formData.correo.trim();
        const claveVal = formData.contrasena;
        const confirmarVal = formData.confirmarContrasena;
        const regionVal = formData.region;
        const comunaVal = formData.comuna;
        const direccionVal = formData.direccion.trim();
        const telefonoVal = formData.telefono.trim();

        //CONDICIÓN 1: Todos los campos están vacíos
        if (
            runVal === "" &&
            nombreVal === "" &&
            apellidosVal === "" &&
            correoVal === "" &&
            claveVal === "" &&
            confirmarVal === "" &&
            regionVal === "" &&
            comunaVal === "" &&
            direccionVal === "" &&
            telefonoVal === ""
        ) {
            alert("No es posible registrar: todos los campos están vacíos.");
            return;
        }

        //CONDICIÓN 2: Algún campo obligatorio está vacío
        if (
            runVal === "" ||
            nombreVal === "" ||
            apellidosVal === "" ||
            correoVal === "" ||
            claveVal === "" ||
            confirmarVal === "" ||
            regionVal === "" ||
            comunaVal === "" ||
            direccionVal === ""
        ) {
            alert("Debe completar todos los campos obligatorios (*) antes de registrar.");
            return;
        }

        //CONDICIÓN 3: Las contraseñas no son iguales
        if (claveVal !== confirmarVal) {
            setErrores((prev) => ({ ...prev, confirmarContrasena: "Las contraseñas ingresadas no coinciden." }));
            alert("No es posible registrar: las contraseñas no coinciden.");
            return;
        }

        const nuevosErrores = {};
        let formularioValido = true;

        //Validación del RUT: 7 a 9 caracteres sin puntos ni guión
        const regexRut = /^[0-9]{6,8}[0-9kK]$/;
        if (runVal === "") {
            nuevosErrores.run = "El RUT es obligatorio.";
            formularioValido = false;
        } else if (!regexRut.test(runVal) || runVal.length < 7 || runVal.length > 9) {
            nuevosErrores.run = "RUT inválido. Debe tener entre 7 y 9 caracteres sin puntos ni guión (ej: 19011022K).";
            formularioValido = false;
        }

        //Validación del nombre
        if (nombreVal === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
            formularioValido = false;
        }

        //Validación de los apellidos
        if (apellidosVal === "") {
            nuevosErrores.apellidos = "Los apellidos son obligatorios.";
            formularioValido = false;
        }

        //Validación del Correo (@duoc.cl, @profesor.duoc.cl, @gmail.com)
        const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
        const dominioValido = dominiosPermitidos.some(d => correoVal.toLowerCase().endsWith(d));

        if (correoVal === "") {
            nuevosErrores.correo = "El correo electrónico es obligatorio.";
            formularioValido = false;
        } else if (!dominioValido) {
            nuevosErrores.correo = "Solo se permiten dominios: @duoc.cl, @profesor.duoc.cl y @gmail.com.";
            formularioValido = false;
        }

        //Validación de la contraseña (8 a 10 caracteres)
        if (claveVal === "") {
            nuevosErrores.contrasena = "La contraseña es obligatoria.";
            formularioValido = false;
        } else if (claveVal.length < 8 || claveVal.length > 10) {
            nuevosErrores.contrasena = "La contraseña debe contener entre 8 y 10 caracteres.";
            formularioValido = false;
        }

        //Validación de confirmación de contraseña
        if (confirmarVal === "") {
            nuevosErrores.confirmarContrasena = "Debe confirmar su contraseña.";
            formularioValido = false;
        } else if (confirmarVal !== claveVal) {
            nuevosErrores.confirmarContrasena = "Las contraseñas ingresadas no coinciden.";
            formularioValido = false;
        }

        //Validación det Teléfono 
        if (telefonoVal !== "" && !/^[0-9]{9}$/.test(telefonoVal)) {
            nuevosErrores.telefono = "El teléfono debe contener 9 dígitos numéricos (ej: 912345678).";
            formularioValido = false;
        }

        //Validación de Región y Comuna
        if (regionVal === "") {
            nuevosErrores.region = "Debe seleccionar una región.";
            formularioValido = false;
        }

        if (comunaVal === "") {
            nuevosErrores.comuna = "Debe seleccionar una comuna.";
            formularioValido = false;
        }

        //Validación de dirección
        if (direccionVal === "") {
            nuevosErrores.direccion = "La dirección es obligatoria.";
            formularioValido = false;
        }

        setErrores(nuevosErrores);

        //Registro exitoso
        if (formularioValido) {
            const usuarioGuardado = {
                run: runVal,
                nombre: nombreVal,
                apellidos: apellidosVal,
                correo: correoVal,
                clave: claveVal,
                telefono: telefonoVal,
                fechaNacimiento: formData.fechaNacimiento,
                region: regionVal,
                comuna: comunaVal,
                direccion: direccionVal
            };

            //Guarda el perfil activo para sesión, foro y despacho en carrito
            localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioGuardado));
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioGuardado));

            alert("¡Usuario registrado con exito!");
            navigate('/login');
        }
    };

    //Obtener comunas según la región seleccionada
    const comunasDisponibles = regionesYComunas.find(r => r.region === formData.region)?.comunas || [];
    const estiloError = { color: '#d00000', display: 'block', marginTop: '4px', fontSize: '12px' };

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
                        {errores.run && <small className="errorRun" style={estiloError}>{errores.run}</small>}
                    </div>

                    {/* Nombre */}
                    <div>
                        <label htmlFor="nombre"><strong>Nombre: <span className="nomb_oblig">*</span></strong></label>
                        <input type="text" className="nombre" name="nombre" id="nombre" maxLength="50" placeholder="Ingresa tu nombre" value={formData.nombre} onChange={handleChange} />
                        {errores.nombre && <small className="errorNombre" style={estiloError}>{errores.nombre}</small>}
                    </div>

                    {/* Apellidos */}
                    <div>
                        <label htmlFor="apellidos"><strong>Apellidos: <span className="apel_oblig">*</span></strong></label>
                        <input type="text" className="apellidos" name="apellidos" id="apellidos" maxLength="100" placeholder="Ingresa tus apellidos" value={formData.apellidos} onChange={handleChange} />
                        {errores.apellidos && <small className="errorApellidos" style={estiloError}>{errores.apellidos}</small>}
                    </div>

                    {/* Correo electrónico */}
                    <div>
                        <label htmlFor="correo"><strong>Correo electrónico: <span className="correo_oblig">*</span></strong></label>
                        <input type="email" className="correo" name="correo" id="correo" maxLength="100" placeholder="ejemplo@gmail.com" value={formData.correo} onChange={handleChange} />
                        <small className="texto-ayuda">Solo dominios @duoc.cl, @profesor.duoc.cl y @gmail.com</small>
                        {errores.correo && <small className="errorCorreo" style={estiloError}>{errores.correo}</small>}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label htmlFor="contrasena"><strong>Contraseña: <span className="contrasena_oblig">*</span></strong></label>
                        <input type="password" className="contrasena" name="contrasena" id="contrasena" maxLength="10" placeholder="Entre 8 y 10 caracteres" value={formData.contrasena} onChange={handleChange} />
                        <small className="texto-ayuda">La contraseña debe tener entre 8 y 10 caracteres.</small>
                        {errores.contrasena && <small className="errorContrasena" style={estiloError}>{errores.contrasena}</small>}
                    </div>

                    {/* Confirmar contraseña */}
                    <div>
                        <label htmlFor="confirmarContrasena"><strong>Confirmar contraseña: <span className="conf_contrasena_oblig">*</span></strong></label>
                        <input type="password" className="confirmarContrasena" name="confirmarContrasena" id="confirmarContrasena" maxLength="10" placeholder="Repite tu contraseña" value={formData.confirmarContrasena} onChange={handleChange} />
                        {errores.confirmarContrasena && <small className="errorConfirmarContrasena" style={estiloError}>{errores.confirmarContrasena}</small>}
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label htmlFor="telefono"><strong>Teléfono de contacto:</strong></label>
                        <input type="text" className="telefono" name="telefono" id="telefono" placeholder="Ejemplo: 912345678" value={formData.telefono} onChange={handleChange} />
                        {errores.telefono && <small className="errorTelefono" style={estiloError}>{errores.telefono}</small>}
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
                            {regionesYComunas.map((item) => (
                                <option key={item.region} value={item.region}>{item.region}</option>
                            ))}
                        </select>
                        {errores.region && <small className="errorRegion" style={estiloError}>{errores.region}</small>}
                    </div>

                    {/* Comuna */}
                    <div>
                        <label htmlFor="comuna"><strong>Comuna: <span className="comuna_oblig">*</span></strong></label>
                        <select className="comuna" name="comuna" id="comuna" value={formData.comuna} onChange={handleChange}>
                            <option value="">Seleccione una comuna</option>
                            {comunasDisponibles.map((comuna) => (
                                <option key={comuna} value={comuna}>{comuna}</option>
                            ))}
                        </select>
                        {errores.comuna && <small className="errorComuna" style={estiloError}>{errores.comuna}</small>}
                    </div>

                    {/* Dirección */}
                    <div>
                        <label htmlFor="direccion"><strong>Dirección: <span className="dire_oblig">*</span></strong></label>
                        <input type="text" className="direccion" name="direccion" id="direccion" maxLength="300" placeholder="Calle #número, depto. #número" value={formData.direccion} onChange={handleChange} />
                        {errores.direccion && <small className="errorDireccion" style={estiloError}>{errores.direccion}</small>}
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

