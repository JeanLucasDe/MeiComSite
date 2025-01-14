import {FaAngleRight} from "react-icons/fa"
import { Link } from "react-router-dom"
import styles from "./MenuMobile.module.css"

export default function MenuMobile (props) {
    return (
        <>
        <div className={styles.container}>
            <FaAngleRight
            type={props.type}
            data-bs-dismiss={props.data_bs_dismiss}
            aria-label={props.aria_label}
            className={styles.icon}
            />
            <ul className={styles.list}>
                <Link to="/"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Home</li></Link>

                
                <Link to="/perfil/user/config"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Configurações</li></Link>


                <Link to="/suporte"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Ajuda</li></Link>
            </ul>
        </div>
        </>
        )
}