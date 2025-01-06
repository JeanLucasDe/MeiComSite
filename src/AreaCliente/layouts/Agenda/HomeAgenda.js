import { useOutletContext } from "react-router-dom"
import styles from "./HomeAgenda.module.css"
import { useState } from "react"
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";
import App from "../../../Hooks/App";
import {FaArrowLeft, FaArrowRight, FaCheck, FaUndo } from "react-icons/fa"
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";


export default function HomeAgenda (props) {

    const [ prod, cliente, vendas, agenda, servicos] = useOutletContext()
    const [stage, setStage] = useState(0)
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
    var [finalHour, setFinalHour] = useState()


    const SeparaHoras = (item) => {
        if (!selectHour) {
            const listHour = []
            const horas = []
            const result = (parseInt(item.hora) + parseInt(escolhaServico.hora))
            agenda && agenda.map(dados => {
                if (dados.date == hoje.getFullYear()+'-'+meses[mesAtual].id+'-'+selectDate) {
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
                        if (dados.date == hoje.getFullYear()+'-'+meses[mesAtual].id+'-'+selectDate) {
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
                    toast.success('Horário Selecionado')
                }
            }
        } 
    }


    const CancelaHora = () => {

        agenda && agenda.map(dados => {
            if (dados.date == hoje.getFullYear()+'-'+meses[mesAtual].id+'-'+selectDate) {
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
    const number = cliente && cliente[0].telefone;  // Número de telefone (com código de país)
    const message = `Olá, gostaria de confirmar meu agendamento para o dia ${moment(escolhaData).format('DD/MM/YYYY')} as ${escolhaHora}h para o serviço: ${Service}`; 

    function sendMessageToWhatsApp(number, message) {
        toast.success('Agendamento Concluído com sucesso!')
        setTimeout(function() {
            const encodedMessage = encodeURIComponent(message);
            const url = `https://wa.me/+55${number}?text=${encodedMessage}`; 
            window.location.href = url;
        }, 2000);
      }
      
    const Confirmar = async () => {
        let result = []
        agenda && agenda.map(dados => {
            if (dados.id == escolhaData) {
                dados.agenda.map(item=> {
                    listHoras.map(horas => {
                        if (horas.hora == item.hora) {
                            item.nome = nome;
                            item.telefone = celular;
                            item.servico = Service
                        }
                    })
                })
            }
        })
        agenda && agenda.map(dados => {
            if (dados.id == escolhaData) {
                dados.agenda.map(item => {
                    result.push(item)
                })
            }
        })
        await updateDoc(doc(db, `MeiComSite/${cliente && cliente[0].email}/agenda`, escolhaData), {
            agenda: result
        });
        sendMessageToWhatsApp(number,message)
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const fimHour = parseFloat(finalHour) + 1


    const formataTelefone = (numero) => {
        // Remove caracteres não numéricos
        const numeros = numero.replace(/\D/g, '');
    
        // Verifica se o número tem 11 ou 10 dígitos
        if (numeros.length === 11) {
          // Formato para número de celular (com DDD)
          return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
        } else if (numeros.length === 10) {
          // Formato para número fixo (com DDD)
          return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
        } else {
          return numero; // Retorna o número original caso não seja válido
        }
      };
    
      const rolarParaFinal = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight, // Vai até o final da página
          behavior: 'smooth' // Rolar suavemente
        });
      };



      const meses = [
        {mes:'Janeiro',id:'01'}, 
        {mes:'Fevereiro',id:'02'}, 
        {mes:'Abril',id:'03'},
        {mes:'Março',id:'04'}, 
        {mes:'Maio',id:'05'}, 
        {mes:'Junho',id:'06'},
        {mes:'Julho',id:'07'}, 
        {mes:'Agosto',id:'08'}, 
        {mes:'Setembro',id:'09'}, 
        {mes:'Outubro',id:'10'}, 
        {mes:'Novembro',id:'11'}, 
        {mes:'Dezembro',id:'12'}, 
      ];
      const [mesAtual, setMesAtual] = useState(new Date().getMonth());

      const proximoMes = () => {
        setMesAtual((prevMes) => (prevMes + 1) % 12);
      };
    const mesAnterior = () => {
        setMesAtual((prevMes) => (prevMes - 1 + 12) % 12); // Vai para o mês anterior, voltando ao Dezembro após Janeiro
    };

    function obterDiaDaSemana(data) {
        const diasDaSemana = [
          'Dom', 'Seg', 'Ter', 'Qua', 
          'Qui', 'Sex', 'Sáb'
        ];
      
        const dataObj = new Date(data); // Converte a data para um objeto Date
      
        // Verifica se a data é válida
        if (isNaN(dataObj)) {
          return 'Data inválida';
        }
      
        // Retorna o dia da semana correspondente à data
        return diasDaSemana[dataObj.getDay()];
      }
      

      const hoje = new Date();



      const ListDias = agenda && agenda.filter(dados => {
        if (parseInt(dados.date.split('-')[1]) == meses[mesAtual].id) {
            if (hoje.getFullYear() == parseInt(dados.date.split('-')[0])) {
                if (hoje.getDate() <= parseInt(dados.date.split('-')[2]) ) {
                    return dados
                }
            }
        } 
    })

    const todosUndefined = ListDias.every(item => item === undefined);


    const dataEscolhida = hoje.getFullYear()+'-'+meses[mesAtual].id+'-'+selectDate

    function formatarHoraParaAMPM(hora) {
        // Garantir que a hora e o minuto estão dentro dos intervalos válidos
        if (hora < 0 || hora > 23) {
          return 'Hora ou minuto inválido';
        }
      
        // Determinar AM ou PM
        const periodo = hora >= 12 ? 'PM' : 'AM';
      
        // Converter a hora para o formato de 12 horas
        const hora12 = hora % 12 || 12; // Se for 0 (meia-noite), exibe 12
      
        // Retornar no formato hh:mm AM/PM
        return `${hora12 < 10 ? '0': ''}${hora12}:00 ${periodo}`;
      }

      

    return (

        <>
            <div className={styles.container}>
                {stage == 0 &&

                <div>
                    <div
                    className={styles.header}
                    >
                        <h1
                        className={styles.title}
                        >{cliente && cliente[0].razao}</h1>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.line}/>
                        <button className={styles.btn_start}
                        onClick={() => setStage(1)}
                        >
                            
                        Ir para Agenda</button>
                    </div>
                </div>    
                 }
                {stage > 0 &&
                <div className={styles.header_1}>
                    {stage == 1 ?
                    <div>
                        <FaArrowLeft className={styles.btn_back_1}
                        onClick={()=> {
                            setSelectDate(false)
                            CancelaHora()
                            setStage(0)}}
                        />
                        <h1
                        className={styles.title_1}
                        >{cliente[0].razao}
                        </h1>
                        <div className={styles.endereco}>
                            <h5>{cliente[0].cidade}, {cliente[0].bairro}</h5>
                            <h5>{cliente[0].rua} nº{cliente[0].numero}</h5>
                            <h5>{formataTelefone(cliente[0].telefone)}</h5>
                        </div>
                        <div className={styles.line}/>
                    </div>
                    :
                    <div>
                        <FaArrowLeft className={styles.btn_back_1}
                        onClick={()=> {
                            setSelectDate(false)
                            CancelaHora()
                            setStage(1)}}
                        />
                        <h1
                        className={styles.title_1}
                        >{Service}
                        </h1>
                    </div>
                    
                    }
                    
                </div>
                }
                {stage == 1 && 
                <div className={styles.cont_stage}>
                    
                    <div className={styles.main_1}>
                        <h4 className={styles.under}>Serviços</h4>
                        <div
                        className={styles.cont_buttons}
                        >
                        {servicos && servicos.map(dados => {
                            return (
                                <button
                                className={`${Service == dados.nome && styles.select} ${styles.button}`}
                                onClick={()=> {
                                    setEscolhaServico(dados)
                                    setSelectService(dados.nome)
                                    rolarParaFinal()
                                }
                                }
                                value={dados.nome}
                                key={dados.nome}
                                >
                                    <div
                                    className={`${styles.info}`}
                                    >
                                        <div>
                                            <p className={styles.name_service}>{dados.nome}</p>
                                            <p>{dados.hora} horas</p>
                                        </div>
                                        <div>
                                            <p
                                            className={`${Service == dados.nome && styles.select} ${styles.price}`}
                                            >{FormataValor(parseFloat(dados.valor))}</p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    <div className={`${styles.green} ${styles.line}`}/>
                    {Service && 
                    <button
                    className={styles.btn_next}
                    onClick={()=> {
                        setEscolhaServico(escolhaServico)
                        setStage(2)
                    }}
                    >Avançar</button>
                    }

                    </div>
                </div>
                }
                {stage == 2 && 
                    <div>
                        <div className={styles.line}/>
                        <div className={styles.cont_stage_1}>
                            <h3 className={styles.Enriqueta}>2025</h3>
                            <div className={styles.cont_months}>
                                <FaArrowLeft
                                onClick={mesAnterior}
                                />
                                <p className={`${styles.under} ${styles.Enriqueta}`}
                                >{meses[mesAtual].mes}</p>
                                <FaArrowRight
                                onClick={proximoMes}
                                />
                            </div>
                            <div>

                                {!todosUndefined ? 
                                <div className={styles.cont_dates}>
                                    {
                                    ListDias && ListDias.map(dados => {
                                        
                                            return (
                                                <button className={`
                                                    ${selectDate ? dados.date.split('-')[2] == selectDate ? styles.on : styles.off: styles.btn_date }
                                                    `}
                                                    onClick={()=> 
                                                    {
                                                        if (!selectDate) {
                                                            setSelectDate((dados.date.split('-')[2]))
                                                        }    
                                                    }
                                                }
                                                    
                                                >
                                                    <p>{obterDiaDaSemana(dados.date)}</p>
                                                    <p>{(dados.date.split('-')[2])}</p>
                                                </button>
                                            )
                                        
                                    })
                                    }
                                </div>
                            :
                                <div>
                                    <p>Não há datas disponíveis</p>
                                </div>
                                }
                            {selectDate &&
                            <button
                            onClick={()=> setSelectDate(false)}
                            className={styles.btn_trocar}
                            >
                                <FaUndo/> Trocar
                            </button>
                            }

                        </div>




                            {stage == 0 && selectDate ?
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
                        <div
                        className={styles.cont_horarios}
                        >
                            <h5 className={styles.title_2}>Horários</h5>
                            <div>
                                <ul
                                className={styles.list}
                                >
                                {agenda && agenda.map(dados => {
                                    if (dados.date == dataEscolhida) {
                                        return (
                                            dados.agenda.map(item => {
                                                return (
                                                    <li
                                                    key={item.id}
                                                    className={`${item.disp ? styles.disp : styles.indisp} ${styles.hora}`}

                                                    onClick={()=> {

                                                        setEscolhaHora(item.hora)
                                                        if (item.disp) {
                                                            SeparaHoras(item)
                                                        } else {
                                                            return
                                                        }
                                                    }}
                                                    value={item.hora}
                                                    >
                                                        <p className={styles.hora_info}>{formatarHoraParaAMPM(item.hora)}</p>
                                                    </li>
                                                )
                                            })
                                        )
                                    }
                                })}
                                </ul>
                            </div>
                        </div>
                        }
                    </div>
                    }
                        
                    {stage == 2 && selectHour && <button
                    className={styles.btn_trocar}
                    onClick={()=> CancelaHora() }
                    ><FaUndo/> Trocar</button>}
                    {stage == 2 && selectHour &&
                    <button
                    onClick={() => setStage(3)}
                    className={styles.btn_next}
                    >
                        Avançar
                    </button>}


                {stage == 3 &&
                <div
                className={styles.cont_stage}
                >
                    <h5>Confirme seus dados</h5>
                    <p>Data : {escolhaData}</p>
                    <p>Serviço: {Service}</p>
                    <p>Horario: das {escolhaHora}h as {fimHour}h</p>
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
            <ToastContainer/>
        </>
        )
}