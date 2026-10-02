function TarjetaAdmin (props) {
    return (
        <article className="tarjeta_admin">
            <h2>{props.titulo}</h2>
            <p>{props.descripcion}</p>
            <a href={props.enlace} > {props.textoEnlace}</a>
        </article>
    )

}

export default TarjetaAdmin