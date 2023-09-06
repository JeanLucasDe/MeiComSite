import styles from "./BoxCriar.module.css"
import {FaAngleDoubleRight, FaArrowRight} from "react-icons/fa"
import {firebase, auth} from "../../Service/firebase"
import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { Link } from "react-router-dom"

export default function BoxCriar (props) {
    const user = props.user && props.user
    const usuario = props.usuario && props.usuario


    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.row} row`}>
                    <div className="col-sm-6">
                        <h1>Dê o primeiro passo</h1>
                    </div>
                    <div className="col-sm-6">
                        {!user ?
                                <Link className={styles.btn_start}
                                to="/login"
                                >Criar agora <FaAngleDoubleRight/></Link>
                        :
                            <Link
                            className={styles.btn_start}
                             to={usuario && usuario.length == 0 ? "/cadastro" : "/perfil/user/config"}>
                                Começar <FaAngleDoubleRight/>
                            </Link>
                            
                        }
                    </div>
                </div>
                
            </div>
        </>
        )
    }