import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/user.css';
import logo from '../../assets/atelierstudiologo.png';
import foto1 from '../../assets/fotoarte1.jpg';
import foto2 from '../../assets/fotoarte2.jpg';
import foto3 from '../../assets/fotoarte3.png';
import foto4 from '../../assets/fotoarte4.png';

function Busqueda() {
    const navigate = useNavigate();

    //Catálogo por defecto usando los imports de imágenes de React
    const catalogoPorDefecto = [
        {
            id: 1,
            codigo: "ART001",
            nombre: "Cuadro 'Mar y Playa'",
            categoria: "Fotografía Artística",
            precio: 45000,
            stock: 10,
            imagen: foto1,
            descripcion: "Fotografía aérea en plano cenital que captura el contraste entre las aguas turquesas del océano y la orilla de arena blanca.",
            artista: "AtelierStudio",
            tecnica: "Fotografía de autor"
        },
        {
            id: 2,
            codigo: "ART002",
            nombre: "Retrato 'Caballero con Pipa'",
            categoria: "Pintura al Óleo",
            precio: 60000,
            stock: 8,
            imagen: foto2,
            descripcion: "Pintura al óleo de estilo expresivo que retrata de perfil a un marinero o pescador de mirada reflexiva con pipa.",
            artista: "AtelierStudio",
            tecnica: "Óleo sobre lienzo"
        },
        {
            id: 3,
            codigo: "ART003",
            nombre: "Cuadro 'Paisaje de Montaña'",
            categoria: "Pintura al Óleo",
            precio: 48000,
            stock: 6,
            imagen: foto3,
            descripcion: "Pintura paisajística tradicional al óleo que muestra una cordillera alpina nevada reflejada en un lago.",
            artista: "AtelierStudio",
            tecnica: "Óleo sobre lienzo"
        },
        {
            id: 4,
            codigo: "ART004",
            nombre: "Retrato 'Gato entre Sombras'",
            categoria: "Acuarela y Técnica Mixta",
            precio: 72000,
            stock: 6,
            imagen: foto4,
            descripcion: "Acuarela luminosa que ilustra a un gato atigrado de pelaje naranja y blanco.",
            artista: "AtelierStudio",
            tecnica: "Acuarela y papel"
        }
    ];

    //Estados para búsqueda, catálogo completo, lista filtrada y filtro activo
    const [catalogo, setCatalogo] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [texto, setTexto] = useState('');
    const [filtroActivo, setFiltroActivo] = useState('todas');

    //Función auxiliar para quitar acentos, tildes y mayúsculas
    const normalizarTexto = (valor) => {
        return (valor || "")
            .toString()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };

    //Inicialización y lectura de localStorage
    useEffect(() => {
        let guardados = null;
        try {
            guardados = JSON.parse(localStorage.getItem("productos"));
        } catch (e) {
            guardados = null;
        }

        if (!guardados || guardados.length === 0 || !guardados[0].categoria) {
            guardados = catalogoPorDefecto;
            localStorage.setItem("productos", JSON.stringify(catalogoPorDefecto));
        }

        //Mapea para asegurar que las imágenes importadas se vean correctamente en React
        const imagenesMap = {
            1: foto1,
            2: foto2,
            3: foto3,
            4: foto4
        };

        const catalogoPreparado = guardados.map(p => ({
            ...p,
            imagen: imagenesMap[p.id] || p.imagen
        }));

        setCatalogo(catalogoPreparado);
        setProductosFiltrados(catalogoPreparado);
    }, []);

    //Acción para ver detalle de producto (guardando en localStorage como el JS original)
    const verDetalle = (prod) => {
        localStorage.setItem("productoSeleccionado", JSON.stringify(prod));
        navigate('/detalle_producto');
    };

    //Ejecución de búsqueda por texto (botón "BUSCAR")
    const manejarBusquedaTexto = () => {
        const termino = normalizarTexto(texto);
        setFiltroActivo('');  //Desactiva la selección del menú lateral

        if (termino === "") {
            setProductosFiltrados(catalogo);
            return;
        }

        const resultados = catalogo.filter(prod => {
            const nombre = normalizarTexto(prod.nombre);
            const categoria = normalizarTexto(prod.categoria);
            const descripcion = normalizarTexto(prod.descripcion);
            const artista = normalizarTexto(prod.artista);
            const tecnica = normalizarTexto(prod.tecnica);

            return nombre.includes(termino) ||
                   categoria.includes(termino) ||
                   descripcion.includes(termino) ||
                   artista.includes(termino) ||
                   tecnica.includes(termino);
        });

        setProductosFiltrados(resultados);
    };

    //Manejador de filtros laterales
    const aplicarFiltroLateral = (tipo) => {
        setFiltroActivo(tipo);

        switch (tipo) {
            case 'todas':
                setProductosFiltrados(catalogo);
                break;
            case 'oleo': {
                const filtrados = catalogo.filter(p =>
                    normalizarTexto(p.categoria).includes("oleo") ||
                    normalizarTexto(p.tecnica).includes("oleo") ||
                    normalizarTexto(p.nombre).includes("oleo") ||
                    normalizarTexto(p.descripcion).includes("oleo")
                );
                setProductosFiltrados(filtrados);
                break;
            }
            case 'acuarela': {
                const filtrados = catalogo.filter(p =>
                    normalizarTexto(p.categoria).includes("acuarela") ||
                    normalizarTexto(p.tecnica).includes("acuarela") ||
                    normalizarTexto(p.nombre).includes("acuarela") ||
                    normalizarTexto(p.descripcion).includes("acuarela")
                );
                setProductosFiltrados(filtrados);
                break;
            }
            case 'fotografia': {
                const filtrados = catalogo.filter(p =>
                    normalizarTexto(p.categoria).includes("fotografia") ||
                    normalizarTexto(p.tecnica).includes("fotografia") ||
                    normalizarTexto(p.nombre).includes("fotografia") ||
                    normalizarTexto(p.descripcion).includes("fotografia")
                );
                setProductosFiltrados(filtrados);
                break;
            }
            case 'precio': {
                const filtrados = catalogo.filter(p => {
                    const precioNumerico = typeof p.precio === "string" 
                        ? parseInt(p.precio.replace(/\D/g, ""), 10) 
                        : p.precio;
                    return precioNumerico < 50000;
                });
                setProductosFiltrados(filtrados);
                break;
            }
            case 'disponibles': {
                const filtrados = catalogo.filter(p => (parseInt(p.stock, 10) || 0) > 0);
                setProductosFiltrados(filtrados);
                break;
            }
            case 'no_disponible':
                alert("Esta función no está disponible por el momento.");
                break;
            default:
                setProductosFiltrados(catalogo);
        }
    };

    return (
        <div className="busq">

            {/* Título de 'búsqueda', logo y botones */}
            <header className="titulo_busq">
                <figure className="titlogo">
                    <img src={logo} alt="AtelierStudio Logo" />
                    <h2>BÚSQUEDA</h2>
                </figure>

                <figure className="btns_navegacion_busq">
                    <button className="nav_btn" onClick={() => navigate('/')}><strong>Portada</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/nosotros')}><strong>Nosotros</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/productos')}><strong>Productos</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/carrito')}><strong>Carrito</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/foro')}><strong>Foro</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/blogs')}><strong>Blogs</strong></button>
                    <button className="nav_btn" onClick={() => navigate('/contacto')}><strong>Contacto</strong></button>
                </figure>
            </header>

            {/* Contenedor general en dos columnas */}
            <div className="contenedor_busq_layout">

                {/* Barra lateral a la izquierda con filtros del proyecto */}
                <aside className="sidebar_busq">
                    <nav className="sidebar_menu_sup">
                        <a 
                            href="#" 
                            className={`item_menu ${filtroActivo === 'todas' ? 'activo' : ''}`}
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('todas'); }}>
                            ⊞ Todas las Obras
                        </a>
                        <a 
                            href="#" 
                            className={`item_menu ${filtroActivo === 'oleo' ? 'activo' : ''}`}
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('oleo'); }}>
                            🎨 Óleo sobre Lienzo
                        </a>
                        <a 
                            href="#" 
                            className={`item_menu ${filtroActivo === 'acuarela' ? 'activo' : ''}`}
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('acuarela'); }}>
                            🖌 Acuarela y Papel
                        </a>
                        <a 
                            href="#" 
                            className={`item_menu ${filtroActivo === 'fotografia' ? 'activo' : ''}`}
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('fotografia'); }}>
                            📷 Fotografía de Autor
                        </a>
                        <a 
                            href="#" 
                            className={`item_menu ${filtroActivo === 'precio' ? 'activo' : ''}`}
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('precio'); }}>
                            🏷️ Menos de $50.000
                        </a>
                    </nav>

                    <nav className="sidebar_menu_inf">
                        <button className="btn_det_busq">
                            <a 
                                href="#" 
                                className="link_det_busq" 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    if (catalogo.length > 0) verDetalle(catalogo[0]);
                                    else navigate('/detalle_producto');
                                }}>
                                VER DETALLES
                            </a>
                        </button>

                        <hr style={{ borderColor: 'white' }} />
                        <a 
                            href="#" 
                            className={`item_menu ${filtroActivo === 'disponibles' ? 'activo' : ''}`}
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('disponibles'); }}>
                            ⚙ Obras Disponibles
                        </a>
                        <a 
                            href="#" 
                            className="item_menu"
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('no_disponible'); }}>
                            🔍 Búsqueda Rápida
                        </a>
                        <a 
                            href="#" 
                            className="item_menu"
                            onClick={(e) => { e.preventDefault(); aplicarFiltroLateral('no_disponible'); }}>
                            ❓ Ayuda de Filtros
                        </a>
                    </nav>
                </aside>

                {/* Área de resultados / contenido principal a la derecha */}
                <main className="contenido_principal_busq">

                    {/* Barra de búsqueda superior */}
                    <section className="barra_input_busqueda">
                        <input 
                            type="text" 
                            className="input_busq_texto" 
                            placeholder="Buscar por título, artista o técnica..." 
                            value={texto} 
                            onChange={(e) => setTexto(e.target.value)} 
                            onKeyDown={(e) => { if (e.key === 'Enter') manejarBusquedaTexto(); }} />

                        <button 
                            className="btn_ejecutar_busq" 
                            onClick={manejarBusquedaTexto}>
                            BUSCAR
                        </button>
                    </section>

                    <br />
                    <h3 className="titulo_res_busq text-start">
                        Resultados encontrados
                    </h3>
                    <hr style={{ borderColor: 'white' }} />

                    {/* Renderizado dinámico de las tarjetas manteniendo la estructura idéntica */}
                    <section className="grilla_resultados_busq">
                        {productosFiltrados.length === 0 ? (
                            <p style={{ color: 'white', width: '100%', textAlign: 'center', marginTop: '20px' }}>
                                No se encontraron obras con los criterios seleccionados.
                            </p>
                        ) : (
                            productosFiltrados.map((prod) => (
                                <article 
                                    key={prod.id} 
                                    className="tarjeta_res_busq" 
                                    onClick={() => verDetalle(prod)} 
                                    style={{ cursor: 'pointer' }}>
                                    <img src={prod.imagen} alt={prod.nombre} />
                                    <h4>{prod.nombre}</h4>
                                </article>
                            ))
                        )}
                    </section>
                </main>
            </div>

            {/* Pie de página informativo */}
            <footer className="pie_pag_busq">
                <p>Viña del Mar, Chile.</p>
                <p><strong>&copy; 2026 AtelierStudio - Galería y Plataforma de Arte Independiente.</strong></p>
                <br />
            </footer>
        </div>
    );
}

export default Busqueda;

