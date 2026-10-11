import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';

function Carrito() {
    const navigate = useNavigate();

    //1. Producto por defecto si el carrito viene vacío
    const productoPorDefecto = {
        id: 1,
        nombre: "Cuadro 'Mar y Playa'",
        precio: 45000,
        imagen: foto1,
        cantidad: 1,
        stock: 10
    };

    //2. Tabla oficial de cupones de descuento
    const cuponesDisponibles = {
        "ARTE2026": 0.10,  //10%
        "ATEL15DS": 0.15,  //15%
        "STUDIO20": 0.20,  //20%
        "PINTUR05": 0.05,  //5%
        "CUADRO12": 0.12,  //12%
        "PLAYA08D": 0.08,  //8%
        "MARCO18X": 0.18,  //18%
        "GALERIA2": 0.25,  //25%
        "CREATIV7": 0.07,  //7%
        "DUOCARTE": 0.30   //30%
    };

    //3. Coordenadas de comunas de Chile y cálculo de distancia desde Viña del Mar
    const LAT_VINA = -33.0245;
    const LON_VINA = -71.5518;

    const coordenadasComunas = {
        "Arica": [-18.4783, -70.3126], "Camarones": [-19.0146, -69.8631], "General Lagos": [-17.9142, -69.5858], "Putre": [-18.1964, -69.5594],
        "Alto Hospicio": [-20.2687, -70.1065], "Camiña": [-19.3142, -69.4269], "Colchane": [-19.2764, -68.6386], "Huara": [-19.9961, -69.7711], "Iquique": [-20.2307, -70.1357], "Pica": [-20.4897, -69.3297], "Pozo Almonte": [-20.2597, -69.7858],
        "Antofagasta": [-23.6509, -70.3975], "Calama": [-22.4544, -68.9294], "María Elena": [-22.3444, -69.6631], "Mejillones": [-23.1028, -70.4503], "Ollagüe": [-21.2225, -68.2525], "San Pedro de Atacama": [-22.9087, -68.1997], "Sierra Gorda": [-22.8947, -69.3178], "Taltal": [-25.4056, -70.4839], "Tocopilla": [-22.0919, -70.1978],
        "Alto del Carmen": [-28.7583, -70.4864], "Caldera": [-27.0672, -70.8183], "Chañaral": [-26.3478, -70.6228], "Copiapó": [-27.3668, -70.3323], "Diego de Almagro": [-26.3917, -70.0464], "Freirina": [-28.5083, -71.0811], "Huasco": [-28.4678, -71.2197], "Tierra Amarilla": [-27.4819, -70.2656], "Vallenar": [-28.5756, -70.7581],
        "Andacollo": [-30.2311, -71.085], "Canela": [-31.3986, -71.4581], "Combarbalá": [-31.1803, -71.0028], "Coquimbo": [-29.9533, -71.3436], "Illapel": [-31.6308, -71.1653], "La Higuera": [-29.5117, -71.1986], "La Serena": [-29.9027, -71.2519], "Los Vilos": [-31.9136, -71.5122], "Monte Patria": [-30.6953, -70.9572], "Ovalle": [-30.5983, -71.2003], "Paihuano": [-30.0167, -70.5167], "Punitaqui": [-30.8294, -71.2575], "Río Hurtado": [-30.2778, -70.6722], "Salamanca": [-31.7797, -70.9639], "Vicuña": [-30.0319, -70.7081],
        "Algarrobo": [-33.3667, -71.6667], "Cabildo": [-32.4278, -71.0667], "Calle Larga": [-32.8558, -70.6256], "Cartagena": [-33.5539, -71.6078], "Casablanca": [-33.3167, -71.4], "Catemu": [-32.7789, -70.9658], "Concón": [-32.9167, -71.5167], "El Quisco": [-33.3981, -71.6967], "El Tabo": [-33.4542, -71.6681], "Hijuelas": [-32.7986, -71.1444], "Isla de Pascua": [-27.1127, -109.3497], "Juan Fernández": [-33.6361, -78.8319], "La Calera": [-32.7875, -71.1894], "La Cruz": [-32.8258, -71.2294], "La Ligua": [-32.4519, -71.2311], "Limache": [-33.0153, -71.2678], "Llaillay": [-32.8406, -70.9583], "Los Andes": [-32.8339, -70.5983], "Nogales": [-32.7369, -71.2058], "Olmué": [-33.0036, -71.1892], "Panquehue": [-32.7667, -70.8333], "Papudo": [-32.5089, -71.4514], "Petorca": [-32.2536, -70.9322], "Puchuncaví": [-32.7167, -71.4167], "Putaendo": [-32.6289, -70.7169], "Quillota": [-32.8833, -71.25], "Quilpué": [-33.0486, -71.4428], "Quintero": [-32.7833, -71.5333], "Rinconada": [-32.8569, -70.6975], "San Antonio": [-33.5833, -71.6167], "San Esteban": [-32.8028, -70.5792], "San Felipe": [-32.75, -70.7333], "Santa María": [-32.7486, -70.655], "Santo Domingo": [-33.6375, -71.6264], "Valparaíso": [-33.0472, -71.6127], "Villa Alemana": [-33.0425, -71.3736], "Viña del Mar": [-33.0245, -71.5518], "Zapallar": [-32.5539, -71.4586],
        "Alhué": [-34.0333, -71.1], "Buin": [-33.7328, -70.7428], "Calera de Tango": [-33.6406, -70.7858], "Cerrillos": [-33.5, -70.7167], "Cerro Navia": [-33.4242, -70.7356], "Colina": [-33.2, -70.6833], "Conchalí": [-33.3833, -70.6833], "Curacaví": [-33.4069, -71.1325], "El Bosque": [-33.5667, -70.6667], "El Monte": [-33.6806, -70.9819], "Estación Central": [-33.4619, -70.7028], "Huechuraba": [-33.375, -70.6389], "Independencia": [-33.4167, -70.6667], "Isla de Maipo": [-33.75, -70.9], "La Cisterna": [-33.5333, -70.6667], "La Florida": [-33.5222, -70.5889], "La Granja": [-33.5333, -70.6167], "La Pintana": [-33.5833, -70.6333], "La Reina": [-33.4444, -70.5389], "Lampa": [-33.2833, -70.8667], "Las Condes": [-33.4167, -70.5833], "Lo Barnechea": [-33.35, -70.5167], "Lo Espejo": [-33.5167, -70.6833], "Lo Prado": [-33.4444, -70.7222], "Macul": [-33.4889, -70.6], "Maipú": [-33.5167, -70.7667], "María Pinto": [-33.5167, -71.1167], "Melipilla": [-33.7, -71.2167], "Ñuñoa": [-33.4569, -70.6031], "Padre Hurtado": [-33.5667, -70.8167], "Paine": [-33.8167, -70.75], "Pedro Aguirre Cerda": [-33.4833, -70.6667], "Peñaflor": [-33.6069, -70.8778], "Peñalolén": [-33.4833, -70.5333], "Pirque": [-33.6333, -70.5667], "Providencia": [-33.4333, -70.6167], "Pudahuel": [-33.4406, -70.7611], "Puente Alto": [-33.6167, -70.5833], "Quilicura": [-33.3667, -70.7333], "Quinta Normal": [-33.4333, -70.6833], "Recoleta": [-33.4069, -70.6406], "Renca": [-33.4056, -70.7292], "San Bernardo": [-33.6, -70.7], "San Joaquín": [-33.4944, -70.6278], "San José de Maipo": [-33.6333, -70.35], "San Miguel": [-33.4917, -70.6528], "San Pedro": [-33.9, -71.45], "San Ramón": [-33.5333, -70.6417], "Santiago": [-33.4378, -70.6505], "Talagante": [-33.6667, -70.9333], "Tiltil": [-33.0833, -70.9333], "Vitacura": [-33.3944, -70.5847],
        "Chépica": [-34.7333, -71.2833], "Chimbarongo": [-34.7167, -71.05], "Codegua": [-34.0333, -70.6667], "Coinco": [-34.2667, -70.95], "Coltauco": [-34.2667, -71.0833], "Doñihue": [-34.2167, -70.9667], "Graneros": [-34.0667, -70.7333], "La Estrella": [-34.2, -71.65], "Las Cabras": [-34.2833, -71.3167], "Litueche": [-34.1167, -71.7333], "Lolol": [-34.7333, -71.65], "Machalí": [-34.1833, -70.65], "Malloa": [-34.45, -70.95], "Marchigüe": [-34.4, -71.6167], "Mostazal": [-33.9833, -70.7], "Nancagua": [-34.6667, -71.2], "Navidad": [-33.95, -71.8333], "Olivar": [-34.2167, -70.8333], "Palmilla": [-34.6, -71.3667], "Paredones": [-34.65, -71.9], "Peralillo": [-34.4833, -71.5167], "Peumo": [-34.4, -71.1667], "Pichidegua": [-34.35, -71.2833], "Pichilemu": [-34.3833, -72.0], "Placilla": [-34.6333, -71.1167], "Pumanque": [-34.6, -71.6667], "Quinta de Tilcoco": [-34.35, -71.05], "Rancagua": [-34.1708, -70.7444], "Rengo": [-34.4167, -70.8667], "Requínoa": [-34.2833, -70.8167], "San Fernando": [-34.5833, -70.9833], "San Vicente": [-34.4333, -71.0833],
        "Cauquenes": [-35.9667, -72.3167], "Chanco": [-35.7333, -72.5333], "Colbún": [-35.7, -71.4167], "Constitución": [-35.3333, -72.4167], "Curepto": [-35.0833, -72.0167], "Curicó": [-34.9833, -71.2333], "Empedrado": [-35.6, -72.2833], "Hualañé": [-34.9833, -71.8], "Licantén": [-34.9833, -72.0], "Linares": [-35.85, -71.6], "Longaví": [-35.9667, -71.6833], "Maule": [-35.5333, -71.7], "Molina": [-35.1167, -71.2833], "Parral": [-36.15, -71.8333], "Pelarco": [-35.3833, -71.45], "Pelluhue": [-35.8167, -72.5667], "Pencahue": [-35.4, -71.8], "Rauco": [-34.9333, -71.3167], "Retiro": [-36.05, -71.7667], "Río Claro": [-35.25, -71.2667], "Romeral": [-34.9667, -71.1333], "Sagrada Familia": [-35.0333, -71.3833], "San Clemente": [-35.5333, -71.4833], "San Javier": [-35.6, -71.7333], "San Rafael": [-35.3167, -71.5333], "Talca": [-35.4264, -71.6554], "Teno": [-34.8667, -71.1667], "Vichuquén": [-34.8833, -72.0], "Villa Alegre": [-35.6833, -71.75], "Yerbas Buenas": [-35.75, -71.5833],
        "Bulnes": [-36.7333, -72.3], "Chillán": [-36.6067, -72.1033], "Chillán Viejo": [-36.6333, -72.1333], "Cobquecura": [-36.1333, -72.7833], "Coelemu": [-36.4833, -72.7], "Coihueco": [-36.6333, -71.8333], "El Carmen": [-36.9, -72.0333], "Ninhue": [-36.4, -72.4], "Ñiquén": [-36.3, -71.9], "Pemuco": [-36.9833, -72.1], "Pinto": [-36.7, -71.9], "Portezuelo": [-36.5333, -72.4333], "Quillón": [-36.7333, -72.4833], "Quirihue": [-36.2833, -72.5333], "Ránquil": [-36.65, -72.5667], "San Carlos": [-36.4333, -71.9667], "San Fabián": [-36.5667, -71.55], "San Ignacio": [-36.7833, -72.0333], "San Nicolás": [-36.5, -72.2167], "Treguaco": [-36.4333, -72.6667], "Yungay": [-37.1167, -72.0167],
        "Alto Biobío": [-37.8833, -71.3667], "Antuco": [-37.3333, -71.6833], "Arauco": [-37.25, -73.3167], "Cabrero": [-37.0333, -72.4], "Cañete": [-37.8, -73.4], "Chiguayante": [-36.9167, -73.0167], "Concepción": [-36.827, -73.0503], "Contulmo": [-38.0167, -73.2333], "Coronel": [-37.0333, -73.1333], "Curanilahue": [-37.4833, -73.35], "Florida": [-36.8167, -72.7], "Hualpén": [-36.7833, -73.1], "Hualqui": [-36.9833, -72.9333], "Laja": [-37.2833, -72.7], "Lebu": [-37.6167, -73.65], "Los Álamos": [-37.6333, -73.4667], "Los Ángeles": [-37.4667, -72.35], "Lota": [-37.0833, -73.15], "Mulchén": [-37.7167, -72.2333], "Nacimiento": [-37.5, -72.6667], "Negrete": [-37.5833, -72.5333], "Penco": [-36.7333, -72.9833], "Quilaco": [-37.6667, -71.9833], "Quilleco": [-37.4667, -71.9667], "San Pedro de la Paz": [-36.85, -73.1], "San Rosendo": [-37.2667, -72.7167], "Santa Bárbara": [-37.6667, -72.0167], "Santa Juana": [-37.1667, -72.95], "Talcahuano": [-36.7167, -73.1167], "Tirúa": [-38.3333, -73.5], "Tomé": [-36.6167, -72.95], "Tucapel": [-37.2833, -71.95], "Yumbel": [-37.1, -72.5667],
        "Angol": [-37.8, -72.7167], "Carahue": [-38.7, -73.1667], "Cholchol": [-38.6, -72.85], "Collipulli": [-37.95, -72.4333], "Cunco": [-38.9333, -72.0333], "Curacautín": [-38.4333, -71.8833], "Curarrehue": [-39.35, -71.5833], "Ercilla": [-38.05, -72.4833], "Freire": [-38.95, -72.6167], "Galvarino": [-38.4, -72.7833], "Gorbea": [-39.1, -72.6833], "Lautaro": [-38.5333, -72.45], "Loncoche": [-39.3667, -72.6333], "Lonquimay": [-38.4333, -71.3667], "Los Sauces": [-37.9833, -72.8333], "Lumaco": [-38.15, -72.9167], "Melipeuco": [-38.8333, -71.6833], "Nueva Imperial": [-38.75, -72.95], "Padre Las Casas": [-38.7667, -72.6], "Perquenco": [-38.4167, -72.3833], "Pitrufquén": [-38.9833, -72.65], "Pucón": [-39.2833, -71.9667], "Purén": [-38.0333, -73.0833], "Renaico": [-37.6667, -72.5833], "Saavedra": [-38.7833, -73.4], "Temuco": [-38.7362, -72.5906], "Teodoro Schmidt": [-39.05, -73.05], "Toltén": [-39.2167, -73.1833], "Traiguén": [-38.25, -72.6833], "Victoria": [-38.2333, -72.3333], "Vilcún": [-38.65, -72.2333], "Villarrica": [-39.2833, -72.2167],
        "Corral": [-39.8833, -73.4333], "Futrono": [-40.1333, -72.4], "La Unión": [-40.2833, -73.0833], "Lago Ranco": [-40.3167, -72.5], "Lanco": [-39.45, -72.7833], "Los Lagos": [-39.85, -72.8333], "Máfil": [-39.65, -72.95], "Mariquina": [-39.5167, -72.9667], "Paillaco": [-40.0667, -72.8833], "Panguipulli": [-39.6333, -72.3333], "Río Bueno": [-40.3333, -72.9667], "Valdivia": [-39.8142, -73.2459],
        "Ancud": [-41.8667, -73.8333], "Calbuco": [-41.7667, -73.1333], "Castro": [-42.4833, -73.7667], "Chaitén": [-42.9167, -72.7], "Chonchi": [-42.6167, -73.7833], "Cochamó": [-41.5, -72.3], "Curaco de Vélez": [-42.4333, -73.6], "Dalcahue": [-42.3833, -73.65], "Fresia": [-41.15, -73.4333], "Frutillar": [-41.1333, -73.0333], "Futaleufú": [-43.1833, -71.8667], "Hualaihué": [-41.9833, -72.4333], "Llanquihue": [-41.25, -73.0], "Los Muermos": [-41.4, -73.4667], "Maullín": [-41.6167, -73.6], "Osorno": [-40.5739, -73.1336], "Palena": [-43.6167, -71.8], "Puerto Montt": [-41.4693, -72.9424], "Puerto Octay": [-40.9667, -72.8833], "Puerto Varas": [-41.3167, -72.9833], "Puqueldón": [-42.6667, -73.6333], "Purranque": [-40.9167, -73.1667], "Puyehue": [-40.6833, -72.6], "Queilén": [-42.8833, -73.4833], "Quellón": [-43.1167, -73.6167], "Quemchi": [-42.15, -73.4833], "Quinchao": [-42.5333, -73.4167], "Río Negro": [-40.7833, -73.2167], "San Juan de la Costa": [-40.5167, -73.55], "San Pablo": [-40.4, -73.0167],
        "Aysén": [-45.4, -72.7], "Chile Chico": [-46.5333, -71.7333], "Cisnes": [-44.75, -72.7], "Cochrane": [-47.25, -72.5667], "Coyhaique": [-45.5752, -72.0662], "Guaitecas": [-43.8833, -73.75], "Lago Verde": [-44.2333, -71.8333], "O'Higgins": [-48.4667, -72.5667], "Río Ibáñez": [-46.3, -71.8333], "Tortel": [-47.8, -73.5333],
        "Antártica": [-62.2, -58.9667], "Cabo de Hornos": [-55.05, -67.1], "Laguna Blanca": [-52.75, -71.4], "Natales": [-51.7333, -72.5], "Porvenir": [-53.3, -70.3667], "Primavera": [-52.75, -69.25], "Punta Arenas": [-53.1638, -70.9171], "Río Verde": [-52.7167, -71.7833], "San Gregorio": [-52.5667, -70.1], "Timaukel": [-53.8833, -69.6667], "Torres del Paine": [-51.25, -72.8833]
    };

    function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function obtenerPorcentajeEnvio() {
        let usuarioActivo = null;
        try {
            usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo")) || 
                            JSON.parse(localStorage.getItem("usuarioActivo")) || null;
        } catch (e) {
            usuarioActivo = null;
        }

        const comunaUsuario = (usuarioActivo && usuarioActivo.comuna) ? usuarioActivo.comuna : "Viña del Mar";

        if (comunaUsuario === "Viña del Mar") {
            return 0;  //Envío gratis en Viña del Mar
        }

        const coordsUsuario = coordenadasComunas[comunaUsuario];
        if (!coordsUsuario) {
            return 0.10;  //10% por defecto si no se detecta ubicación
        }

        const distancia = calcularDistanciaKm(LAT_VINA, LON_VINA, coordsUsuario[0], coordsUsuario[1]);
        const DISTANCIA_MAXIMA = 3700;

        let porcentaje = (distancia / DISTANCIA_MAXIMA) * 0.25;
        return Math.min(Math.max(porcentaje, 0.02), 0.25);
    }

    //Estados reactivos del carrito
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [cupon, setCupon] = useState('');
    const [descuentoAplicado, setDescuentoAplicado] = useState(0);
    const [intentoCuponRealizado, setIntentoCuponRealizado] = useState(false);

    //Cargar carrito desde localStorage al montar el componente
    useEffect(() => {
        let guardados = null;
        try {
            guardados = JSON.parse(localStorage.getItem("carrito"));
        } catch (e) {
            guardados = null;
        }

        if (!guardados || guardados.length === 0) {
            guardados = [productoPorDefecto];
            localStorage.setItem("carrito", JSON.stringify(guardados));
        }

        setItemsCarrito(guardados);
    }, []);

    //Verificación de autenticación para invitados
    const verificarSesion = () => {
        const usuario = JSON.parse(sessionStorage.getItem("usuarioActivo")) || 
                        JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!usuario) {
            const irLogin = window.confirm("Para realizar esta acción debes iniciar sesión con tu cuenta.\n\n¿Deseas ir al inicio de sesión ahora?");
            if (irLogin) {
                navigate('/login');
            }
            return false;
        }
        return true;
    };

    //Sincronizar cambios en itemsCarrito hacia localStorage
    const actualizarCarrito = (nuevosItems) => {
        setItemsCarrito(nuevosItems);
        localStorage.setItem("carrito", JSON.stringify(nuevosItems));
    };

    //Modificar cantidad (Sumar / Restar) con control de sesión
    const cambiarCantidad = (index, delta) => {
        if (!verificarSesion()) return;

        const nuevos = [...itemsCarrito];
        const item = nuevos[index];
        const stockMax = item.stock || 10;

        if (delta > 0) {
            if (item.cantidad < stockMax) {
                item.cantidad += 1;
                actualizarCarrito(nuevos);
            } else {
                alert("No es posible agregar más unidades: stock máximo alcanzado.");
            }
        } else {
            if (item.cantidad > 1) {
                item.cantidad -= 1;
                actualizarCarrito(nuevos);
            }
        }
    };

    //Quitar producto del carrito con control de sesión
    const quitarProducto = (index) => {
        if (!verificarSesion()) return;

        const nuevos = itemsCarrito.filter((_, i) => i !== index);
        actualizarCarrito(nuevos);
    };

    //Aplicar cupón de descuento con control de sesión
    const manejarAplicarCupon = () => {
        if (!verificarSesion()) return;

        if (intentoCuponRealizado) {
            alert("Ya has utilizado tu único intento disponible para ingresar un cupón.");
            return;
        }

        const codigoIngresado = cupon.trim().toUpperCase();

        if (codigoIngresado === "") {
            alert("Debes ingresar un código de cupón de 8 caracteres.");
            return;
        }

        setIntentoCuponRealizado(true);

        if (cuponesDisponibles[codigoIngresado]) {
            const desc = cuponesDisponibles[codigoIngresado];
            setDescuentoAplicado(desc);
            alert(`¡Cupón exitoso! Se aplicó un ${(desc * 100)}% de descuento a tu compra.`);
        } else {
            setDescuentoAplicado(0);
            alert("Cupón incorrecto. No se aplicará ningún descuento y no tienes más intentos permitidos.");
        }
    };

    //Finalizar compra con control de sesión
    const finalizarCompra = () => {
        if (!verificarSesion()) return;

        if (itemsCarrito.length === 0) {
            alert("El carrito está vacío. Agrega productos desde la galería para continuar.");
            return;
        }
        alert("¡Compra procesada exitosamente! Gracias por preferir AtelierStudio.");
        localStorage.removeItem("carrito");
        setItemsCarrito([]);
    };

    //Cálculos financieros dinámicos
    const subtotal = itemsCarrito.reduce((acum, item) => acum + (item.precio * item.cantidad), 0);
    const pctEnvio = (subtotal > 0) ? obtenerPorcentajeEnvio() : 0;
    const costoEnvio = Math.round(subtotal * pctEnvio);
    const montoDescuento = Math.round(subtotal * descuentoAplicado);
    const total = Math.max(0, subtotal - montoDescuento + costoEnvio);

    return (
        <div id="car">

            {/* Título de 'carrito', logo y botones */}
            <header id="titulo_car">
                <figure id="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>CARRITO</h2>
                </figure>

                <figure id="btns_navegacion_car">
                    <button id="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/busqueda')}><strong>Búsqueda</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button id="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenido principal del carrito */}
            <main id="contenido_car">

                {/* Renderizado dinámico de tarjetas de productos en el carrito */}
                {itemsCarrito.length === 0 ? (
                    <p style={{ color: 'white', textAlign: 'center', margin: '30px 0' }}>
                        Tu carrito está vacío.
                    </p>
                ) : (
                    itemsCarrito.map((prod, index) => (
                        <section key={prod.id || index} id={`contenedor_prod_car${index + 1}`}>
                            <figure id="contador_prod">
                                <h3>{prod.nombre}</h3>
                                <h5 id={`precio_prod${index + 1}`}>${(prod.precio * prod.cantidad).toLocaleString('es-CL')}</h5>
                                <img src={prod.imagen || foto1} alt={prod.nombre} />

                                {/* Contador de unidades */}
                                <div id="btns_cont_prod">
                                    <button id="btn_restar" onClick={() => cambiarCantidad(index, -1)}>
                                        <strong>&minus;</strong>
                                    </button>
                                    <span id="numero_prod"><strong>{prod.cantidad}</strong></span>
                                    <button id="btn_sumar" onClick={() => cambiarCantidad(index, 1)}>
                                        <strong>+</strong>
                                    </button>
                                </div>

                                {/* Enlace estilo pie para quitar de la compra */}
                                <footer id="quitar_del_car">
                                    <p>
                                        <strong>
                                            <a href="#" onClick={(e) => { e.preventDefault(); quitarProducto(index); }}>
                                                &times; Quitar del carrito
                                            </a>
                                        </strong>
                                    </p>
                                </footer>
                            </figure>
                        </section>
                    ))
                )}

                {/* Resumen de liquidación con cupón de descuento */}
                <section id="bloque_pago_car">
                    <div id="fila_subtotal">
                        <span>Subtotal:</span>
                        <span>${subtotal.toLocaleString('es-CL')}</span>
                    </div>

                    <div id="fila_envio">
                        <span>Envío:</span>
                        <span>
                            {subtotal > 0 && pctEnvio === 0
                                ? "Gratis (Viña del Mar)"
                                : `$${costoEnvio.toLocaleString('es-CL')} (${(pctEnvio * 100).toFixed(1)}%)`
                            }
                        </span>
                    </div>

                    {descuentoAplicado > 0 && (
                        <div id="fila_descuento" style={{ display: 'flex', justifyContent: 'space-between', color: '#e0a96d' }}>
                            <span>Descuento:</span>
                            <span>-${montoDescuento.toLocaleString('es-CL')} ({(descuentoAplicado * 100)}%)</span>
                        </div>
                    )}

                    {/* Campo de cupón de descuento */}
                    <div id="bloque_cupon">
                        <input 
                            type="text" 
                            id="input_cupon" 
                            placeholder="Ingresa cupón de descuento" 
                            value={cupon} 
                            disabled={intentoCuponRealizado}
                            onChange={(e) => setCupon(e.target.value)} />
                        <button 
                            id="btn_aplicar_cupon" 
                            disabled={intentoCuponRealizado}
                            onClick={manejarAplicarCupon}>
                            APLICAR
                        </button>
                    </div>

                    <hr style={{ borderColor: 'white' }} />

                    <div id="fila_total">
                        <span><strong>Total:</strong></span>
                        <span><strong>${total.toLocaleString('es-CL')}</strong></span>
                    </div>

                    <button id="btn_confirmar_compra" onClick={finalizarCompra}>
                        <strong>FINALIZAR COMPRA</strong>
                    </button>
                </section>

                {/* Enlace para volver al catálogo */}
                <footer id="volver_catalogo_car">
                    <p><a href="#" onClick={(e) => { e.preventDefault(); navigate('/productos'); }}>&larr; Seguir explorando la galería</a></p>
                </footer>
            </main>

            {/* Pie de página informativo */}
            <footer id="pie_pag_car">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Carrito;

