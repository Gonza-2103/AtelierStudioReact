import BotonNuevoProducto from './BotonNuevoProducto'

function EncabezadoProductos() {

    return (
        <div className="encabezado_productos">

            <div>
                <h1>Gestión de productos</h1>
                <p>
                    Administra los productos disponibles en AtelierStudio.
                </p>
            </div>

            <BotonNuevoProducto />

        </div>
    )
}

export default EncabezadoProductos