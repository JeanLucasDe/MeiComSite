import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import styles from "./Exposed.module.css"
import { Link } from "react-router-dom";
import Loading from "../../components/Loading"
import moment from "moment";
import {FaRegHeart} from "react-icons/fa"

export default function Exposed (props) {
   
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [lojas, setLojas] = useState([])
    const [load, setLoad] = useState(false)

    useEffect (() => {
        const getLojas = async () => {
            const data = await getDocs(UserCollection)
            setLojas((data.docs.map((doc) => ({...doc.data(), id: doc.id})))) 
            setLoad(true)
        }
        getLojas()
    },[])

    return (
            <>
                <div className="row">
                    <ul className={`col-md-6 ${styles.list}`}>
                        {lojas && lojas.map(dados => {
                            if (dados.status == "pronto") {
                                if (props.modalidade == "alimentação") {
                                    if (dados.mod == "Restaurante") {
                                        return (
                                                <Link to={`/${dados.site}`}
                                                className={styles.cont_link}
                                                >
                                                    <li key={dados.id}>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <img src={dados.logo} className={styles.img}/>
                                                            </div>
                                                            <div className="col-9">
                                                                <div>
                                                                    <h5>{dados.razao}</h5>
                                                                    {moment(dados.abre).format('DD/MM/YYY') <
                                                                     moment().format('DD/MM/YYY') < moment(dados.fecha).format('DD/MM/YYYT') &&
                                                                    <p>Aberto</p>
                                                                     }
                                                                </div>
                                                            </div>
                                                            <div className="col-1">
                                                                <FaRegHeart className={styles.icon}/>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </Link>
                                            )
                                    }
                                }
                                if (props.modalidade == "shopping") {
                                    if (dados.mod == "Loja Virtual") {
                                        return (
                                            <Link to={`/${dados.site}`}
                                            className={styles.cont_link}
                                            >
                                                <li key={dados.id}>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <img src={dados.logo} className={styles.img}/>
                                                        </div>
                                                        <div className="col-9">
                                                            <div className={styles.flex_center}>
                                                                <h5>{dados.razao}</h5>
                                                                {moment(dados.abre).format('DD/MM/YYY') <
                                                                    moment().format('DD/MM/YYY') < moment(dados.fecha).format('DD/MM/YYYT') &&
                                                                <p>Aberto</p>
                                                                    }
                                                            </div>
                                                        </div>
                                                        <div className="col-1">
                                                            <div className={styles.flex_center}>
                                                                <FaRegHeart className={styles.icon}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    }
                                }
                            }
                        })}
                        {!load && <Loading/>}
                    </ul>
                </div>
            </>
        )
}