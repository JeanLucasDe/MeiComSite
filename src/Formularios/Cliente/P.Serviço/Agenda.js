
import { useOutletContext } from "react-router-dom"
import styles from "./Agenda.module.css"
import { useState } from "react"
import moment from "moment"
import AddAgenda from "./AddAgenda"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import App from "../../../Hooks/App"



export default function Agenda () {
    
    const [mod, produtos, usuario, vendas, user, servicos, agenda] = useOutletContext()

    const db = getFirestore(App)
    const [date, setDate] = useState()
    const DateDefault = moment().format('DD/MM/YYYY')
    const abre = usuario && usuario[0].abre
    const fecha = usuario && usuario[0].fecha

    const AddData = async() => {
        await setDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/agenda`, `${date}`), {
            date,
            agenda: []
        })
        window.location.reload()
    }
    

    return (
        <>
        {usuario.length > 0 && usuario[0].mod =="Agenda" &&
            <div className={styles.container}>
                <h5>Bem Vindo(a) a Sua Agenda</h5>
                <div>
                    <p>Funcionamento</p>
                    <div
                    className={styles.cont_hours}
                    >
                        <p>{abre}</p>
                        <p>as</p>
                        <p>{fecha}</p>
                    </div>
                </div>

                <div>
                    <input type="date" onChange={(el)=> setDate(el.target.value)}/>
                    {date && <button
                    onClick={() => AddData(moment(date).format('DD/MM/YYYY'))}
                    >Abrir agenda</button>}
                    {!date || moment(date).format('DD/MM/YYYY') == DateDefault ? 
                    <p>Hoje</p> :
                    <p></p>}
                    <button
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target={`#ModalNew`}
                    >Nova Agenda</button>

                    <ul>
                        {agenda && agenda.map(dados=> {
                            if (!date && moment().format('YYYY-MM-DD') == dados.id) {
                                return (
                                    <li>
                                        <p>{moment(dados.id).format('DD/MM/YYYY')}</p>
                                        {dados.agenda.map(item => {
                                            return (
                                                <li>
                                                    <p>{item.nome} <span>{item.hora}</span></p>
                                                </li>
                                            )
                                        })}
                                    </li>
                                )
                            }else if (date == dados.id) {
                                return (
                                    <li>
                                        <p>{moment(dados.id).format('DD/MM/YYYY')}</p>
                                        <ul>
                                            {dados.agenda.map(item => {
                                                return (
                                                    <li>
                                                        <p>{item.nome} <span>{item.hora}</span></p>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            } 


                        })}
                    </ul>

                    
                </div>


            </div>
        }
            <div className="modal " id="ModalNew" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <AddAgenda/>
                    </div>
                </div>
            </div>        
            
        </>
        )
}