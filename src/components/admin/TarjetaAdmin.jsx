import {Link} from 'react-router-dom'


function TarjetaAdmin (props) {
     return (
        <article className="tarjeta_admin">
            <h2>{props.titulo}</h2>
            <p>{props.descripcion}</p>
            <Link to={props.enlace}>
                {props.textoEnlace}
            </Link>
        </article>
    )

}

export default TarjetaAdmin