import { useOutletContext } from "react-router-dom"
import styles from "./HomeAgenda.module.css"
import { useState } from "react"
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";
import App from "../../../Hooks/App";
import {FaCheck, FaUndo } from "react-icons/fa"


export default function HomeAgenda (props) {

    const [ prod, cliente, vendas, agenda, servicos] = useOutletContext()
    const [stage, setStage] = useState(0)
    const [pack, setPack] = useState()
    const [escolhaServico, setEscolhaServico] = useState()
    const [escolhaData, setEscolhaData] = useState()
    const [escolhaHora, setEscolhaHora] = useState()
    const [Service, setSelectService] = useState()
    const [listHoras, setListHoras] = useState()
    const [selectHour, setSelectHour] = useState(false)
    const db = getFirestore(App)
    const [selectDate, setSelectDate] = useState(false)
    const [nome, setNome] = useState()
    const [celular, setCelular] = useState()
    const [finalHour, setFinalHour] = useState()


    const SeparaHoras = (item) => {
        if (!selectHour) {
            const listHour = []
            const horas = []
            const result = (parseInt(item.hora) + parseInt(escolhaServico.hora))
            agenda && agenda.map(dados => {
                if (dados.date == escolhaData) {
                    dados.agenda.map(item => {horas.push(item.hora)})
                }
            })
            const max = Math.max.apply(null, horas)
            if (result - 1 <= max) {
                setFinalHour(result - 1)
                for (let i = parseInt(item.hora); i < result; i++) {
                    listHour.push({'hora': i.toString()})
                }
                setListHoras(listHour)
                const numbers = [];
                agenda && agenda.map(dados => {
                    if (dados.date == escolhaData) {
                        dados.agenda.map(item => {
                            listHour.map(horas => {
                                if (horas.hora == item.hora) {
                                    numbers.push(item.disp)
                                }
                            })
                        })
                        
                    }
                })
                const allTrue = numbers.every(function(number) {
                return number == true;
                });
                if (allTrue) {
                    agenda && agenda.map(dados => {
                        if (dados.date == escolhaData) {
                            dados.agenda.map(item => {
                                listHour.map(horas => {
                                    if (horas.hora == item.hora) {
                                        item.disp = false
                                    }
                                })
                            })
                            
                        }
                    })
                    setSelectHour(true)
                }
            }
            else console.log('Limite de tempo excede')
        } else {
            console.log('horario sleecionado')
        }
    }


    const CancelaHora = () => {

        agenda && agenda.map(dados => {
            if (dados.date == escolhaData) {
                dados.agenda.map(item => {
                    listHoras.map(horas => {
                        if (horas.hora == item.hora) {
                            item.disp = true
                        }
                    })
                })
                
            }
        })



        setSelectHour(false)
    }

    const Confirmar = async () => {
        let result = []
        agenda && agenda.map(dados => {
            if (dados.date == escolhaData) {
                dados.agenda.map(item => {
                    result.push(item)
                })
            }
        })
        await updateDoc(doc(db, `MeiComSite/${cliente && cliente[0].email}/agenda`, escolhaData), {
            agenda: result
        });
    }

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    return (

        <>
            <div className={styles.container}>
                <div
                className={styles.header}
                >
                    <h1>{cliente && cliente[0].razao}</h1>
                    <div className={styles.end}>
                        <p>{cliente && cliente[0].rua}, {cliente && cliente[0].numero} </p>
                        <p>{cliente && cliente[0].cidade}, {cliente && cliente[0].bairro}</p>
                        <p>{cliente && cliente[0].telefone}</p>
                    </div>
                
                </div>
                
                {stage == 0 && 
                <div className={styles.cont_stage}>
                    <h3
                    className={styles.font_title}
                    >Selecione o serviço</h3>
                    <div className={styles.line}/>
                    <div
                    className={styles.cont_buttons}
                    >
                        {servicos && servicos.map(dados => {
                            return (
                                <button
                                className={`${Service == dados.nome && styles.select} ${styles.button}`}
                                onClick={()=> {
                                    setEscolhaServico(dados)
                                    setSelectService(dados.nome)}}
                                value={dados.nome}
                                key={dados.nome}
                                >
                                    <div
                                    className={styles.info}
                                    >
                                        <div>
                                            <p className={styles.enriqueta_regular}>{dados.nome}</p>
                                            <p>{dados.hora} horas</p>
                                        </div>
                                        <p
                                        className={styles.cookie_regular}
                                        >{FormataValor(parseFloat(dados.valor))}</p>
                                    </div>
                                </button>
                            )
                        })}
                    {Service && 
                    <button
                    className={styles.btn_next}
                    onClick={()=> {
                        setEscolhaServico(escolhaServico)
                        setStage(1)
                    }}
                    >Avançar</button>
                    }
                    </div>
                </div>
                }


                {stage == 1 && 
                    <div
                    className={styles.cont_stage}
                    >
                        {escolhaServico && <h4>{escolhaServico.nome}</h4>}
                        <div className={styles.line}/>
                        <div>
                            <h5>Escolha a data:</h5>
                            {!selectDate?<select
                                onChange={(el)=> setEscolhaData(el.target.value)}
                                >
                                <option value="" data-default disabled selected></option>
                                {agenda && agenda.map(dados => {
                                    return (
                                        <option
                                        value={dados.date}
                                        >{dados.date}</option>
                                    )
                                })}
                            </select>:
                            <p>{escolhaData}</p>
                            }
                            {console.log(escolhaData)}
                            {selectDate ?
                                <button
                                onClick={()=> setSelectDate(false)}
                                className={styles.btn_trocar}
                                >
                                    <FaUndo/> Trocar
                                </button>
                                :
                                escolhaData &&
                                <button
                                onClick={()=> {
                                    if(escolhaData) {
                                        setSelectDate(true)
                                    }
                                }}
                                className={styles.check}
                                >
                                    <FaCheck/>
                                </button>
                            }
                        </div>
                        {selectDate && 
                        <div>
                            <h5>Escolha a Hora</h5>
                            <p>Até {escolhaServico.hora} horas</p>
                            <div
                            className={styles.cont_horas}
                            >
                                {agenda && agenda.map(dados => {
                                    if (dados.date == escolhaData) {
                                        return (
                                            dados.agenda.map(item => {
                                                return (
                                                    <div
                                                    onClick={()=> {
                                                        setEscolhaHora(item.hora)
                                                        if (item.disp) {
                                                            SeparaHoras(item)




                                                        } else {
                                                            console.log('ocupado')
                                                        }
                                                    }}
                                                    value={item.hora}
                                                    className={`${item.disp ? styles.on : styles.off} ${styles.hora}`}
                                                    >
                                                        {item.hora}
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        }

                        {selectHour && <button
                        className={styles.btn_trocar}
                        onClick={()=> CancelaHora() }
                        ><FaUndo/> Trocar</button>}


                        <div 
                        className={styles.cont_buttonsNec}
                        >
                            <button
                            onClick={() => {
                                setEscolhaData()
                                setEscolhaHora()
                                setStage(0)
                                setSelectDate(false)
                            }}
                            className={styles.btn_back}
                            >Voltar</button>
                            
                            {selectHour &&
                            <button
                            onClick={() => setStage(2)}
                            className={styles.btn_next}
                            >
                                Avançar
                            </button>}
                        </div>
                    </div>
                }
                {stage == 2 &&
                <div
                className={styles.cont_stage}
                >
                    <h5>Confirme seus dados</h5>
                    <p>Data : {escolhaData}</p>
                    <p>Serviço: {Service}</p>
                    <p>Horario: das {escolhaHora}h as {finalHour}h</p>
                    <div className={styles.line}/>
                    <form
                    className={styles.form}
                    >
                        <label 
                        className={styles.label}
                        >Nome Completo:</label>
                        <input type="text" onChange={(el)=> setNome(el.target.value)}
                        className={styles.input}
                        />
                        <label
                        className={styles.label}
                        >Celular:</label>
                        <input type="number" onChange={(el)=> setCelular(el.target.value)}
                        className={styles.input}
                        />
                        <div
                        className={styles.cont_buttonsNec}
                        >
                            <button
                            onClick={(el) => {
                                setStage(1)
                                el.preventDefault()
                            }}
                            className={styles.btn_back}
                            >Voltar</button>
                            <button
                            onClick={(el) => {
                                if(nome, celular) {
                                    Confirmar()
                                }
                                el.preventDefault()
                            }}
                            className={styles.btn_next}
                            >
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
                }

                
            </div>
        </>
        )
}