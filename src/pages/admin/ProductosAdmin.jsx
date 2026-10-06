import TablaProductos from "../../components/admin/TablaProductos";
import EstructuraAdmin from "../../components/admin/EstructuraAdmin";
import EncabezadoProductos from '../../components/admin/EncabezadoProductos'

function ProductosAdmin() {
    return (
       <EstructuraAdmin>

            <section className="seccion_admin">
                <EncabezadoProductos />
                <TablaProductos />
            </section>

        </EstructuraAdmin>
    )
}

export default ProductosAdmin