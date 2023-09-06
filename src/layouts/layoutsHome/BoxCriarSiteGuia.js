import styles from "./BoxCriarSiteGuia.module.css"
import {FaAngleDoubleRight} from "react-icons/fa"
import {firebase, auth} from "../../Service/firebase"
import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { Link } from "react-router-dom"

export default function BoxCriarSiteGuia (props) {

    const user = props.user && props.user
    const usuario = props.usuario && props.usuario

return (
    <div className={styles.container} id="guia">
        <div className="row">
            <div className="col-md-5 order-2 order-md-1 col-lg-6">
                <div className={styles.container_text}>
                    <h1>Como criar seu site</h1>
                    <h4>Em poucos passos impulsione seu negócio</h4>
                    <br/>
                    <ol className={styles.list}>
                        <li><strong>Preencha suas informações.</strong></li>
                        <li><strong>Informe os locais que vai atender.</strong></li>
                        <li><strong>Selecione sua modalidade.</strong></li>
                        <li><strong>Adicione seus produtos.</strong></li>
                    </ol>

                    {user ?
                            <Link className={styles.btn_start}
                            to={usuario && usuario.length > 0 ? "/perfil/user/config" : '/cadastro'}
                            >Criar agora <FaAngleDoubleRight/></Link>
                    :
                        <Link to="/login">
                            <button className={styles.btn_start}>
                                Criar agora <FaAngleDoubleRight/>
                            </button>
                        </Link>
                        
                    }
                </div>
            </div>
            <div className="col-md-7 order-1 col-lg-6">
                <div>
                    <img src="https://img.freepik.com/fotos-gratis/ilustracao-3d-smartphone-com-tela-branca-em-branco-e-caixas-de-papelao-conceito-de-servico-de-comercio-eletronico-e-frete_58466-14530.jpg?w=740&t=st=1679048604~exp=1679049204~hmac=e298b81ac413a86e313e65064171cec12bba83689664e1fff660d696048eecf1"
                    className={styles.img}
                    />
                </div>
            </div>
        </div>

    </div>
    )
}