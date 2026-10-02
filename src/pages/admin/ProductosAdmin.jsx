import TablaProductos from "../../components/admin/TablaProductos";

function ProductosAdmin() {
    return (
       <EstructuraAdmin>

            <h1>Gestión de productos</h1>

            <p>Aquí podrás administrar los productos de AtelierStudio.</p>

            <TablaProductos />

        </EstructuraAdmin>
    )
}

export default ProductosAdmin