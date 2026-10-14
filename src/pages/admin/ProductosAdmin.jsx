import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import EncabezadoProductos from '../../components/admin/EncabezadoProductos'
import TablaProductos from '../../components/admin/TablaProductos'

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
