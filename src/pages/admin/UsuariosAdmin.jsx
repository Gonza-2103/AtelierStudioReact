import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import TablaUsuarios from '../../components/admin/TablaUsuarios'
import EncabezadoUsuarios from '../../components/admin/EncabezadoUsuarios'

function UsuariosAdmin() {

    return (
        <EstructuraAdmin>

            <section className="seccion_admin">

                <EncabezadoUsuarios />

                <div className="contenedor_usuarios">
                    <TablaUsuarios />
                </div>

            </section>

        </EstructuraAdmin>
    )
}

export default UsuariosAdmin