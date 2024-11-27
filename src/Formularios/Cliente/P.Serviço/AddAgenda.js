import { useOutletContext } from "react-router-dom"
import styles from "./AddAgenda.module.css"
import moment from "moment"
import { useState } from "react"
import { doc, getFirestore, updateDoc } from "firebase/firestore/lite"
import App from "../../../Hooks/App"

export default function AddAgenda () {
    const [mod, produtos, usuario, vendas, user, servicos,agenda] = useOutletContext()
    const [date, setDate] = useState()
    const db = getFirestore(App)
    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [servico, setServico] = useState()
    const [hora, setHora] = useState()

    const AddAgenda = async() => {
        const Listid = agenda && agenda.filter(dados => dados.id == date)
        await updateDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/agenda`, date), {
            agenda: [...agenda && Listid[0].agenda,{
                nome, 
                telefone,
                servico,
                hora
            }]
        });
        window.location.reload()
    }
    

    return (
        <>
            <div
            className={styles.container}
            >
                <h5>Nova agenda</h5>
                <form>
                    <p>Nome Cliente:</p>
                    <input type='text' onChange={(el) =>setNome(el.target.value)}/>
                    <p>Telefone:</p>
                    <input type='number' onChange={(el) =>setTelefone(el.target.value)}/>
                    <p>Serviço</p>
                    <select
                        onChange={(el) => setServico(el.target.value)}
                    >
                        {servicos && servicos.map(dados => {
                            return (
                                <option>{dados.nome}</option>
                            )
                        })}
                    </select>
                    <p>Data:</p>
                    <select
                    onChange={(el)=> setDate(el.target.value)}
                    >
                        {agenda && agenda.map(dados => {
                            return (
                                <option
                                value={dados.id}    
                                >
                                    {dados.id}
                                </option>
                            )
                        })}
                    </select>
                    <p>Horário:</p>
                    <select
                    onChange={(el) =>setHora(el.target.value)}
                    >
                        <option>10:00</option>
                        <option>15:00</option>
                    </select>
                    <button
                    className={styles.btn_confirm}
                    onClick={(el)=> {
                        el.preventDefault()
                        AddAgenda()
                    }}
                    >Confirmar</button>
                </form>
            </div>
        </>
    )
}