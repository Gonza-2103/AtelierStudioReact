import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

function UsuariosAdmin() {

    return (
        <EstructuraAdmin>

            <section className="seccion_admin">

                <h1>Gestión de usuarios</h1>

                <p>
                    Administración de usuarios registrados
                    en AtelierStudio.
                </p>

                <div className="contenedor_usuarios">
                    {/* Aquí incorporaremos los componentes de usuarios */}
                </div>

            </section>

        </EstructuraAdmin>
    )
}

export default UsuariosAdmin