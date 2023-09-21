import { useOutletContext, useParams } from "react-router-dom"
import styles from "./BoxDates.module.css"
import moment from "moment"
import { useState } from "react"
import { getFirestore, setDoc, doc, updateDoc} from "@firebase/firestore";
import App from "../../../Hooks/App"


export default function BoxDates () {

    const {site, index} = useParams()
    const db = getFirestore(App)
    const [produtoss, usuario, vendas] = useOutletContext()
    var {agenda, serviços, razao,email, clientes} = usuario.length > 0 && usuario[0]
    const dataAtual = parseFloat(moment().format('DD'))
    const [nome, setNome] = useState()
    const [hour, setHour] = useState()
    const [day, setDay] = useState()
    const [data, setData] = useState()

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    const FormataDay = (date) => {
        let s = date.split('/')
        const dataDeNascimento = new Date(`${s[1]}/${s[0]}/2023'`);
        switch (dataDeNascimento.getDay()) {
            case 0 : return 'Domingo'
            case 1 : return 'Segunda'
            case 2 : return 'Terça'
            case 3 : return 'Quarta'
            case 4 : return 'Quinta'
            case 5 : return 'Sexta'
            case 6 : return 'Sábado'
        }

    }
    const FormataMonth = (date) => {
        let s = date.split('/')
        const dataDeNascimento = new Date(`${s[1]}/${s[0]}/2023'`);
        switch (dataDeNascimento.getMonth()) {
            case 0 : return 'Janeiro'
            case 1 : return 'Fevereiro'
            case 2 : return 'Março'
            case 3 : return 'Abril'
            case 4 : return 'Maio'
            case 5 : return 'Junho'
            case 6 : return 'Julho'
            case 7 : return 'Agosto'
            case 8 : return 'Setembro'
            case 9 : return 'Outubro'
            case 10 : return 'Novembro'
            case 11 : return 'Dezembro'
        }

    }
    const ReturnDay = (date) => {
        let s = date.split('/')
        setData(parseFloat(s[0]))
    }
    agenda = agenda && agenda.sort(function compare(a, b) {
        if (a.dia < b.dia) return -1;
        if (a.dia > b.dia) return 1;
        return 0;
    })


    const ConfirmAgenda = async() => {
        if (!clientes) {
            usuario[0].clientes = [
                {
                nome,
                data: day,
                hora: hour,
                dia: data
            }
            ]
            await setDoc(doc(db, `MeiComSite`, email), 
                usuario[0]
            );
        } else {
            clientes.push({
                nome,
                data: day,
                hora: hour,
                dia: data
            })
            await updateDoc(doc(db, "MeiComSite", email), {
                clientes: clientes
            });
        }
    }
    


    return (
        <>
            <div className={styles.container}>
                <h4>Agenda {razao}</h4>
                <h5 className={styles.title}>{serviços[index].servico} - {FormataValor(serviços[index].preço)}</h5>
                <ul
                className={styles.list}
                >
                    {agenda && agenda.map((dados, index) => {
                        if (dados.dia >= dataAtual && dados.on && dados.horarios.length > 0) {
                            return (
                                <li
                                className={`${dados.on ? styles.on : styles.off} ${styles.date}`}
                                onClick={()=> {
                                    setDay(dados.data)
                                    ReturnDay(dados.data)
                                }}
                                key={index}
                                >
                                    <div className={`accordion accordion-flush`} id="accordionFlushExample4">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                            <button className={`${dados.on ? styles.on : styles.off} ${styles.hour}  accordion-button ${styles.open_btn} collapsed`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                            <div className={styles.info_date}>
                                                <p>{FormataDay(dados.data)}</p>
                                                <p>{dados.data}</p>
                                                <p>{FormataMonth(dados.data)}</p>
                                            </div>

                                            </button>
                                            </h2>
                                                <div id={`flush-collapseOne${index}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                    <div className={`${styles.body} accordion-body`}>
                                                        <ul
                                                        className={styles.list_hour}
                                                        >
                                                            {dados.horarios && dados.horarios.map((item, pos) => {
                                                                return (
                                                                    <li
                                                                    type="button"
                                                                    key={pos}
                                                                    className={`${hour == item.hora && styles.on} ${styles.hora}`}
                                                                    onClick={() => {setHour(item.hora)}}
                                                                    >
                                                                        {item.hora}
                                                                    </li>
                                                                    )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </li>
                                )
                        }
                    })}
                </ul>
                { day && hour &&
                <div className={styles.box_name}>
                    <p>Digite seu nome:</p>
                    <input type='text' onChange={(el)=> setNome(el.target.value)} className={styles.input_name}/>
                </div>
                }
                { day && hour && nome && 
                <div>
                    <button
                    className={styles.btn_confirm}
                    onClick={() => ConfirmAgenda()}
                    >
                        <div>
                            <h5>Confirmar</h5>
                            <div>
                                <p>Dia: {day}</p>
                                <p>Hora: {hour}</p>
                            </div>
                        </div>
                    </button>
                    <button
                    onClick={() => {
                    setNome(false)
                    setHour(false)
                    setDay(false)
                    }}
                    className={styles.btn_cancel}
                    >
                        Cancelar
                    </button>
                </div>
                }
            </div>
        </> 
        )
}