import EncabezadoAdmin from "../../components/admin/EncabezadoAdmin"
import '../../styles/admin.css'
import MenuAdmin from "../../components/admin/MenuAdmin"

function InicioAdmin() {
    return (
        <div className="pagina_admin">
            <div class_Name="cuerpo_admin">
                <MenuAdmin />

                <main claassName="contenido_admin">
                    <EncabezadoAdmin />
                </main>
            </div>
        </div>
    )
}

export default InicioAdmin

