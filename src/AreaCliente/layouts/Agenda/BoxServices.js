import styles from "./BoxService.module.css"
import { Link, useParams } from "react-router-dom"



export default function BoxService (props) {


    const {site} = useParams()
    const usuario = props.usuario && props.usuario

    const {agenda, serviços} = usuario && usuario


    return (

        <>
            <div className={styles.container}>
                <h1>Selecione o serviço</h1>
                <ul
                className={styles.list}
                >
                {serviços && serviços.map((dados, index)=> {
                    return (
                        <Link
                        className={styles.link}
                        to={`/${site}/agenda`}
                        >
                            <li
                            className={styles.service}
                            key={index}
                            >
                                <p>{dados.servico}</p>
                            </li>
                        </Link>
                        )
                })}
                </ul>
            </div>
        </>
        )
}