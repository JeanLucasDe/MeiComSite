
import { useOutletContext } from "react-router-dom"
import styles from "./Agenda.module.css"
import { useState } from "react"
import moment from "moment"
import AddAgenda from "./AddAgenda"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import App from "../../../../Hooks/App"
import {FaCalendarAlt, FaCalendarCheck, FaCheck, FaCheckCircle, FaPlusCircle, FaTimesCircle} from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import 'moment/locale/pt-br';



export default function Agenda () {
    
    const [mod, produtos, usuario, vendas, user, servicos, agenda] = useOutletContext()

    const db = getFirestore(App)
    const [date, setDate] = useState()
    const DateDefault = moment().format('DD/MM/YYYY')
    const abre = usuario && usuario[0].abre
    const fecha = usuario && usuario[0].fecha
    const [horarios, setHorarios] = useState(false)
    const [escolhaDate, setEscolhaDate] = useState()
    const [stage, setStage] = useState(0)
    const [cliente, setCliente] = useState()





    const AddData = async() => {
        const DiferencaHoras = () => {
            let abre = usuario && usuario[0].abre 
            let fecha = usuario && usuario[0].fecha
            const Diff = parseInt(fecha.split(':')[0]) -  parseInt(abre.split(':')[0])
            return Diff
        }
        var abre = usuario && usuario[0].abre 
        const Diferenca = DiferencaHoras()
        const ListHours = []
        for (let i = 0; i < Diferenca; i++) {
            let d = parseInt(abre.split(':')[0])
            let r = d+=i
            ListHours.push({
                hora: r.toString(),
                disp: true,
            })
        }


        const result = agenda && agenda.filter(dados => {
            if (dados.date == date) {
                return dados
            } 
        })

        if (!result.length) {
            await setDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/agenda`, `${date}`), {
                date,
                agenda: ListHours
            })
            toast.success('Data Adicionada com sucesso!')
            window.location.reload()
        }
        
    }



    const Horas = agenda && agenda.filter(dados => {
        if (!escolhaDate) {
            if (dados.date == moment().format('YYYY-MM-DD')) {
                return dados
            }
        } else {
            if (dados.date == escolhaDate) {
                return dados
            }
        }
    })


    moment.locale('pt')
    const dia = moment(escolhaDate).format('dddd')
    
    const CancelaAgenda = () => {
        
    }



    return (
        <>
        {usuario && usuario.length > 0 && usuario[0].mod =="Agenda" &&
            <div className={styles.container}>
                <h5>Bem Vindo(a) a Sua Agenda</h5>
                <div className="line"/>
                    <div
                    className={styles.cont_buttons}
                    >
                        <button
                        className={styles.button_new}
                        onClick={() => setHorarios(true)}
                        >
                            <FaCalendarAlt/> Abrir Horário
                        </button>
                    </div>
                {horarios && 
                <div className="row">
                    <div className="col-lg-6">
                        <div
                        className={styles.agendamento}
                        >
                            <h5>Selecione a nova data</h5>
                            <div className="line"/>
                            <div
                            className={styles.cont_input_date}
                            >
                                <div>
                                    <input type="date" onChange={(el)=> setDate(el.target.value)}
                                    className={styles.input}
                                    />
                                </div>
                                <div
                                className={styles.cont_input_date}
                                >
                                    {date && <button
                                    onClick={() => AddData(moment(date).format('DD/MM/YYYY'))}
                                    className={styles.button_new}
                                    ><FaCheckCircle/></button>}
                                    <button
                                    onClick={() => {
                                        setDate('')
                                        setHorarios(false)}}
                                    className={styles.button_back}
                                    ><FaTimesCircle/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }

                <div className="line"/>
                <div>
                    <div>
                        <div
                        className="row"
                        >
                            <div className="col-lg-8">
                                <p className={styles.date}>Data:</p>
                                {escolhaDate && <p>Selecione a Data</p>}
                                <input type="date" onChange={(el)=> setEscolhaDate(el.target.value)}
                                className={styles.input}/>
                                {!escolhaDate && 
                                <div
                                className={styles.today}
                                >
                                    <h5>Hoje </h5>
                                    <p>{moment().format('DD/MM/YYYY')}</p>
                                </div>}
                                <h5 className={styles.dia}>{dia}</h5>
                                <div>
                                    <button
                                    onClick={() => setStage(0)}
                                    className={`${stage == 0 && styles.stage_on} ${styles.buttns}`}
                                    >Todos</button>
                                    <button
                                    onClick={() => setStage(1)}
                                    className={`${stage == 1 && styles.stage_on} ${styles.buttns}`}
                                    >Ocupados</button>
                                    <button
                                    onClick={() => setStage(2)}
                                    className={`${stage == 2 && styles.stage_on} ${styles.buttns}`}
                                    >Livres</button>
                                </div>
                                <div
                                className={styles.cont_horarios}
                                >
                                        {Horas.length ?
                                            stage == 0 ?
                                            <div>
                                                <ul
                                                className={styles.list}
                                                >
                                                    {Horas.map(dados => {
                                                        return (
                                                            dados.agenda.map(item => {
                                                                return (
                                                                    <li
                                                                    key={item.hora}
                                                                    className={`${styles.hora} ${item.disp ? styles.on : styles.off }`}
                                                                    type="button"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target={`#ModalView`}
                                                                    onClick={() => setCliente(item)}
                                                                    >
                                                                        <p>
                                                                            <span>{!item.disp ? <FaCalendarCheck className={styles.icon}/>: <FaPlusCircle className={styles.icon}/>}</span>
                                                                                {item.hora}:00 horas
                                                                        </p>
                                                                    </li>
                                                                )
                                                            })
                                                        )
                                                    })}
                                                </ul>
                                            </div>:
                                            stage == 1 ?
                                            <div>
                                                <ul
                                                className={styles.list}
                                                >
                                                    {Horas.map(dados => {
                                                        return (
                                                            dados.agenda.map(item => {
                                                                if (!item.disp) {
                                                                    return (
                                                                        <li
                                                                        key={item.hora}
                                                                        className={`${styles.hora} ${item.disp ? styles.on : styles.off }`}
                                                                        >
                                                                            <p>
                                                                                <span>{!item.disp ? <FaCalendarCheck className={styles.icon}/>: <FaPlusCircle className={styles.icon}/>}</span>
                                                                                {item.hora}:00 horas
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                }
                                                            })
                                                        )
                                                    })}
                                                </ul>
                                            </div>:
                                            stage == 2 &&
                                            <div>
                                                <ul
                                                className={styles.list}
                                                >
                                                    {Horas.map(dados => {
                                                        return (
                                                            dados.agenda.map(item => {
                                                                if (item.disp) {
                                                                    return (
                                                                        <li
                                                                        key={item.hora}
                                                                        className={`${styles.hora} ${item.disp ? styles.on : styles.off }`}
                                                                        >
                                                                            <p>
                                                                                <span>{!item.disp ? <FaCalendarCheck className={styles.icon}/>: <FaPlusCircle className={styles.icon}/>}</span>
                                                                                    {item.hora}:00 horas
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                }
                                                            })
                                                        )
                                                    })}
                                                </ul>
                                            </div>




                                        : 
                                        <div>
                                            <h5>Esta Data está Livre</h5>
                                        </div>
                                        
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
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

            <div className="modal " id="ModalView" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <div
                        className={styles.cont_modal}
                        >
                            <h5>Cliente</h5>
                            <div className="line"/>
                            <p>Nome: {cliente && cliente.nome}</p>
                            <p>Telefone: {cliente && cliente.telefone}</p>
                            <p>Serviço: {cliente && cliente.servico}</p>
                            <button
                            onClick={() => {
                                CancelaAgenda()
                            }}
                            className={styles.btn_delete_account}
                            >Cancelar Agenda</button>
                        </div>
                    </div>
                </div>
            </div>        
            <ToastContainer/>
        </>
        )
}