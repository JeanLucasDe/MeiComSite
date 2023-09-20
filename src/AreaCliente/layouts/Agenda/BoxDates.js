import { useOutletContext } from "react-router-dom"
import styles from "./BoxDates.module.css"
import moment from "moment"
import { useState } from "react"


export default function BoxDates () {

    const [produtoss, usuario, vendas] = useOutletContext()
    const {agenda, serviços} = usuario.length > 0 && usuario[0]
    const dataAtual = parseFloat(moment().format('DD'))
    const [nome, setNome] = useState()
    const [hour, setHour] = useState()
    const [day, setDay] = useState()


    return (
        <>
            <div className={styles.container}>
                <h1>Selecione as Datas</h1>
                <ul
                className={styles.list}
                >
                    {agenda && agenda.map((dados, index) => {
                        if (dados.data >= dataAtual && dados.on) {
                            return (
                                <li
                                className={`${dados.on ? styles.on : styles.off} ${styles.date}`}
                                onClick={()=> setDay(dados.data) }
                                key={index}
                                >
                                    <div className={`accordion accordion-flush`} id="accordionFlushExample4">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                            <button className={`${dados.on ? styles.on : styles.off} ${styles.hour}  accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                            {dados.data}
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
                    <p>Seu nome:</p>
                    <input type='text' onChange={(el)=> setNome(el.target.value)}/>
                </div>
                }
                { day && hour && nome && 
                <div>
                    <button
                    className={styles.btn_confirm}
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
                    >
                        Cancelar
                    </button>
                </div>
                }
            </div>
        </> 
        )
}