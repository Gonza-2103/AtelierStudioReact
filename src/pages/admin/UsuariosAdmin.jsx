import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import TablaUsuarios from '../../components/admin/TablaUsuarios'

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