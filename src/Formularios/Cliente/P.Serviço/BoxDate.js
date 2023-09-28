import { useState } from "react"
import styles from "./BoxDate.module.css"
import { useOutletContext } from "react-router-dom"
import App from "../../../Hooks/App"
import { getFirestore, setDoc, doc, updateDoc} from "@firebase/firestore";
import moment from "moment";


export default function BoxDate (props) {
    const obj = props.obj && props.obj
    const [selectHour, setSelectHour] = useState()
    const [add, setAdd] = useState()
    const [addHour, setAddHour] = useState()
    const [nome, setNome] = useState()
    const [hour, setHour] = useState()
    const [servico, setServico] = useState()
    var [seed, setSeed] = useState(0)
    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    const db = getFirestore(App)


    
    const CancelaHorario = async() => {
        const index = obj.horarios && obj.horarios.filter(dados => dados.hora == selectHour)
        index[0].cliente = false
        index[0].on = true

        await updateDoc(doc(db, `MeiComSite`, user && user.email), {
            agenda: usuario.length > 0 && usuario[0].agenda
        });
    }

    
    const SalvaCliente = async() => {
        const index = obj.horarios && obj.horarios.filter(dados => dados.hora == selectHour)
        index[0].cliente = {nome, servico}
        index[0].on = false

        await updateDoc(doc(db, `MeiComSite`, user && user.email), {
            agenda: usuario.length > 0 && usuario[0].agenda
        });
    }
    const SalvaHora = async() => {
        if (obj.horarios) {
            obj.horarios && obj.horarios.push({cliente:false, hora: hour, on: true})
            
        } else {
            usuario.length > 0 && usuario[0].agenda.push({
                data: obj.data.toString() + "/" + moment().format('MM'),
                dia: obj.data,
                horarios: [],
                on:true
            })
        }
        await updateDoc(doc(db, `MeiComSite`, user && user.email), {
            agenda: usuario.length > 0 && usuario[0].agenda
        });
    }
    
    

    const FormularioAddCliente = 
    <form>
        <p>Nome:</p>
        <input type="text"
        onChange={(el)=> setNome(el.target.value)}
        />
        <p>Serviço:</p>
        <input type="text"
        onChange={(el)=> setServico(el.target.value)}
        />
        <div>
            {nome && servico && <button
            onClick={(el) => {
                el.preventDefault()
                setSeed(seed+=1)
                SalvaCliente()}}
            >Salvar</button>}
            <button
            onClick={(el)=> {
                el.preventDefault()
                setAdd(!add)}}
            >Cancelar</button>
        </div>
    </form>
        
    const FormularioAddHour = 
    <form>
        <strong>Horario: </strong>
        <input type="time"
        onChange={(el)=> setHour(el.target.value)}
        className={styles.input_time}
        />
        <div>
            {hour && <button
            onClick={(el) => {
                el.preventDefault()
                setSeed(seed+=1)
                SalvaHora()}}
            >Salvar</button>}
            <button
            onClick={(el)=> {
                el.preventDefault()
                setAddHour(!addHour)}}
            >Cancelar</button>
        </div>
    </form>

  
    return (
        <>
        {obj && obj.horarios ?
        <>
            <div>
                <h2>Dia {obj.data} de {props.month}</h2>
                <div key={seed}>
                    {!addHour ?
                    <button
                    onClick={() => setAddHour(!addHour)}
                    >Adicionar hora</button>
                    :
                    FormularioAddHour
                    }
                    <ul
                    className={styles.list}
                    >
                        <h5>Horarios</h5>
                        {obj.horarios && obj.horarios.map((dados,index) => {
                            return (
                                <li key={dados.id}
                                type="button"
                                onClick={() => {
                                    setSelectHour(dados.hora)
                                }}
                                >
                                    <div className={`accordion accordion-flush`} id="accordionFlushExample4">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                            <button className={`${dados.on ? styles.on : styles.off} ${styles.hour}  accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                                {dados.hora}
                                            </button>
                                            </h2>
                                            <div id={`flush-collapseOne${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                <div className={`${styles.body} accordion-body`}>
                                                    {dados.cliente ?
                                                        <div>
                                                            <div>
                                                                <p>Nome: {dados.cliente.nome}</p>
                                                                <p>Serviço: {dados.cliente.servico}</p>
                                                            </div>
                                                            <button
                                                            onClick={() => {
                                                                setSeed(seed+=1)
                                                                CancelaHorario()}}
                                                            >Cancelar Agenda</button>
                                                        </div>
                                                    :
                                                    <div>
                                                        {!add?
                                                        <button
                                                        onClick={()=> {
                                                            setAdd(!add)}}
                                                        >Adicionar</button>
                                                        :
                                                        FormularioAddCliente
                                                        }
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                )
                        })}
                    </ul>
                </div>
            </div>
        </>
        :
        <div key={seed} className={styles.container}>
            <h2>Dia {obj && obj.data} de {props.month}</h2>
            {!addHour ?
            <button
            onClick={() => setAddHour(!addHour)}
            >Adicionar hora</button>
            :
            FormularioAddHour
            }
        </div>
        }
        </>
        )
}