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

                <Link to="/page/demo"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Demonstração</li></Link>

                <Link to="/perfil/user/categorias"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Loja</li></Link>

                <Link to="/perfil/user/online"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Pedidos</li></Link>

                <Link to="/perfil/user/vendas"><li
                type={props.type}
                data-bs-dismiss={props.data_bs_dismiss}
                aria-label={props.aria_label}
                className={styles.mod}
                >Relatório</li></Link>

                
                <div className={`${styles.mobile} accordion accordion-flush`} id="accordionFlushExample">
                    <div className={` accordion-item`}>
                        <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Modalidades
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul className={styles.list}>
                                        <li
                                        type={props.type}
                                        data-bs-dismiss={props.data_bs_dismiss}
                                        aria-label={props.aria_label}
                                        className={styles.item_mod}
                                        ><Link to="/catalogo/shopping">Loja Virtual</Link></li>
                                        <li
                                        type={props.type}
                                        data-bs-dismiss={props.data_bs_dismiss}
                                        aria-label={props.aria_label}
                                        className={styles.item_mod}
                                        ><Link to="/catalogo/alimentação">Restaurante</Link></li>
                                    </ul>
                                </div>
                        </div>
                    </div>
                </div>
                
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