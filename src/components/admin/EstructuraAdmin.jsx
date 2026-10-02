import MenuAdmin from './MenuAdmin'
import '../../styles/admin.css'

function EstructuraAdmin({ children }) {
    return (
        <div className="pagina_admin">
            <div className="cuerpo_admin">

                <MenuAdmin />

                <main className="contenido_admin">
                    {children}
                </main>

            </div>
        </div>
    )
}

export default EstructuraAdmin