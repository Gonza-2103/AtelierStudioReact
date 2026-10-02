import EncabezadoAdmin from "../../components/admin/EncabezadoAdmin"
import '../../styles/admin.css'
import EstructuraAdmin from "../../components/admin/EstructuraAdmin"
import TarjetaAdmin from "../../components/admin/TarjetaAdmin"

function InicioAdmin() {
    return (
        <EstructuraAdmin>

            <EncabezadoAdmin />

            <section className="resumen_admin">

                <TarjetaAdmin
                    titulo="Productos"
                    descripcion="Crea, visualiza y modifica los productos disponibles en la tienda."
                    enlace="/admin/productos"
                    textoEnlace="Gestionar productos"
                />

                <TarjetaAdmin
                    titulo="Usuarios"
                    descripcion="Crea, visualiza y modifica los usuarios registrados en el sistema."
                    enlace="/admin/usuarios"
                    textoEnlace="Gestionar usuarios"
                />

            </section>

        </EstructuraAdmin>        
    )
}

export default InicioAdmin

