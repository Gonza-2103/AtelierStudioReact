import EstructuraAdmin from '../../components/admin/EstructuraAdmin'

function EditarProducto() {

    return (
        <EstructuraAdmin>

            <section className="seccion_admin">

                <h1>Editar producto</h1>

                <p>
                    Modificación de la información de una obra.
                </p>

                <div className="contenedor_formulario">
                    {/* Aquí reutilizaremos FormularioProducto */}
                </div>

            </section>

        </EstructuraAdmin>
    )
}

export default EditarProducto