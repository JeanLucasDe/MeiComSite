import { useOutletContext } from "react-router-dom"
import styles from "./AddAgenda.module.css"
import moment from "moment"
import { useState } from "react"
import { doc, getFirestore, updateDoc } from "firebase/firestore/lite"
import App from "../../../../Hooks/App"

export default function AddAgenda () {
    const [mod, produtos, usuario, vendas, user, servicos,agenda] = useOutletContext()
    const [date, setDate] = useState()
    const db = getFirestore(App)
    const [nome, setNome] = useState()
    var [hour, setHour] = useState()
    const [telefone, setTelefone] = useState()
    const [servico, setServico] = useState()
    var [seed, setSeed] = useState(0)
    
    const AddAgenda = async() => {
        const Listid = agenda && agenda.filter(dados => dados.id == date)
        await updateDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/agenda`, date), {
            agenda: [...agenda && Listid[0].agenda,{
                nome, 
                telefone,
                servico,
                hora:9
            }]
        });
        window.location.reload()
    }

    const BuscaServico = () => {
        if (servico) {
            var ser = servicos && servicos.filter(dados => dados.nome == servico)
            ser = ser[0].hora.split(':')[0]
            if (parseInt(ser) <10) {
                ser = ser.split('')[1]
            }
            return ser
        }
    }
    const Ser = BuscaServico()




    const horarios = agenda.length > 0 && agenda[0].agenda
    










    const PegaDiff = (hora) => {
        var d = hora + parseInt(Ser)
        console.log(hour, d)
        return d
    }
    var duracao = PegaDiff()
    
    const ListTempHoras = [...horarios && horarios]




    return (
        <>
            <div
            className={styles.container}
            key={seed}
            >
                <h5>Nova agenda</h5>
                <form>
                    <p>Nome Cliente:</p>
                    <input type='text' onChange={(el) =>setNome(el.target.value)}/>
                    <p>Telefone:</p>
                    <input type='number' onChange={(el) =>setTelefone(el.target.value)}/>
                    <p>Serviço</p>
                    <select
                        onChange={(el) => {
                            setServico(el.target.value)
                        }}
                    >
                        <option value="" data-default disabled selected></option>
                        {servicos && servicos.map(dados => {
                            return (
                                <option>{dados.nome}</option>
                            )
                        })}
                    </select>
                    <p>Duração {Ser} horas</p>
                    <p>Data:</p>
                    <select
                    onChange={(el)=> setDate(el.target.value)}
                    >
                        <option value="" data-default disabled selected></option>
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
                    
                    <ul
                    key={seed}
                    >
                        {servico && horarios && horarios.map(dados => {
                            return (
                                <li
                                className={`${styles.hour} ${dados.disp ? styles.true: styles.false}`}
                                onClick={(el)=> {
                                    setHour(el.target.value)
                                    PegaDiff(el.target.value)
                                }}
                                value={dados.hora}

                                >{dados.hora}</li>
                            )
                        })}
                    </ul>
                     
                    <button
                    onClick={(el) => {
                        el.preventDefault()
                    }}
                    >Cancelar</button>

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