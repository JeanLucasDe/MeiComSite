import { useEffect, useState } from "react"
import {App} from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import styles from "./Exposed.module.css"
import { Link } from "react-router-dom";
import Loading from "../../components/Loading"
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { FaStore } from "react-icons/fa";

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

    const {abre, fecha} =  lojas && lojas
    const FormataHora = (hora) => {
        let date = hora.split(':')

        return parseFloat(date[0]) 
    }

    var horarioAtual = moment().format('HH')
    horarioAtual = parseFloat(horarioAtual)



    console.log(lojas)

    return (
            <>
                <div >
                    <ul className={`${styles.list}`}>
                        {lojas && lojas.map(dados => {
                            if (dados.admin) {
                                if (dados.mod == 'Alimentação'){
                                    if (FormataHora(dados.abre) <= horarioAtual && horarioAtual <= FormataHora(dados.fecha)) {
                                        return (
                                            <div className={styles.cont_link}>
                                                <div className="row">
                                                    <div className="col-1">
                                                        <div className={styles.cont_icon}>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-11">
                                                        <Link to={`/${dados.site}`}
                                                        >
                                                            <li key={dados.id}>
                                                                <div>
                                                                    <div>
                                                                        <h5>{dados.razao}</h5>
                                                                        <p>Aberto até {FormataHora(dados.fecha)}h</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className={`${styles.closed} ${styles.cont_link}`}>
                                                <div className="row">
                                                    <div className="col-1">
                                                        <div className={styles.cont_icon}>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-11">
                                                        <Link to={`/${dados.site}`}
                                                        >
                                                            <li key={dados.id}>
                                                                <div>
                                                                    <div>
                                                                        <h5>{dados.razao}</h5>
                                                                        <p>{FormataHora(dados.abre)}h às {FormataHora(dados.fecha)}h</p>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                } if (dados.mod=='Agenda') {
                                    return (
                                        <div className={styles.cont_link}>
                                            <div className="row">
                                                <div className="col-1">
                                                    <div className={styles.cont_icon}>
                                                        
                                                    </div>
                                                </div>
                                                <div className="col-11">
                                                    <Link to={`/${dados.site}`}
                                                    >
                                                        <li key={dados.id}>
                                                            <div>
                                                                <div>
                                                                    <h5>{dados.razao}</h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })}
                        {!load && <Loading/>}
                    </ul>
                </div>
                <ToastContainer/>
            </>
        )
}