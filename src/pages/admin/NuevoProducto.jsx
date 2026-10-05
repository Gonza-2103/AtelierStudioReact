import EstructuraAdmin from '../../components/admin/EstructuraAdmin'
import FormularioProducto from '../../components/admin/FormularioProducto'

function NuevoProducto() {

    return (
        <EstructuraAdmin>

            <section className="seccion_admin">

                <h1>Nuevo producto</h1>

                <p>
                    Completa la información para registrar
                    una nueva obra en AtelierStudio.
                </p>

                <div className="contenedor_formulario">
                    <FormularioProducto alGuardar={() => {}} />
                </div>

            </section>

        </EstructuraAdmin>
    )
}

export default NuevoProducto