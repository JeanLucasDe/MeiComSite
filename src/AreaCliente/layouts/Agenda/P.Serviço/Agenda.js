
import { useOutletContext } from "react-router-dom"
import styles from "./Agenda.module.css"
import { useEffect, useState } from "react"
import moment from "moment"
import AddAgenda from "./AddAgenda"
import { deleteDoc, doc, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import App from "../../../../Hooks/App"
import {FaCalendarAlt, FaCalendarCheck, FaCheck, FaCheckCircle, FaClock, FaCut, FaHandHoldingUsd, FaPlusCircle, FaTimesCircle, FaUser} from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import 'moment/locale/pt-br';
import Test_gg from "./Teste_gg"



export default function Agenda () {
    
    const [mod, produtos, usuario, vendas, user, agenda, servicos] = useOutletContext()

    const db = getFirestore(App)
    const [date, setDate] = useState()
    const [horarios, setHorarios] = useState(false)
    const [escolhaDate, setEscolhaDate] = useState()
    const [stage, setStage] = useState(0)
    const [cliente, setCliente] = useState()
    var [countDelete, setCountDelete] = useState(0)
    const [pedidoDelete, setPedidoDelete] = useState('')
    const [ListHours, setListHours] = useState()


    useEffect(()=>{
        const SeparaHorarios = () => {
            const DiferencaHoras = () => {
                let abre = usuario && usuario[0].abre 
                let fecha = usuario && usuario[0].fecha
                const Diff = parseInt(fecha.split(':')[0]) -  parseInt(abre.split(':')[0])
                return Diff
            }
            var abre = usuario && usuario[0].abre 
            const Diferenca = DiferencaHoras()
            const ListHoursT = []
            for (let i = 0; i < Diferenca; i++) {
                let d = parseInt(abre.split(':')[0])
                let r = d+=i
                ListHoursT.push({
                    hora: r.toString(),
                    disp: true,
                })
            }
            const result = agenda && agenda.filter(dados => {
                if (dados.date == date) {
                    return dados
                } 
            })
            setListHours(ListHoursT)
        }
        SeparaHorarios()
    },[])
    


    const AddData = async() => {
        await setDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/agenda`, `${date}`), {
            date,
            agenda: ListHours
        })
        toast.success('Data Adicionada com sucesso!')
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
    

    const CancelaAgenda = async(cliente) => {

        setCountDelete(countDelete += 1)
                
        if (countDelete == 1) {
            toast.error('Clique 2 vezes para confirmar')
            setPedidoDelete(cliente)
        }
        if (countDelete == 2) {
            if (pedidoDelete != cliente) {
                return toast.error('Clique 2 vezes para confirmar')
            }
            Horas.length > 0 && Horas[0].agenda.map(dados => {
                if (dados.id == cliente.id) {
                    dados.nome=''
                    dados.telefone=''
                    dados.servico=''
                    dados.disp = true
                }
            }) 
            toast.success('Agenda Cancelada')
            await updateDoc(doc(db, `MeiComSite/${user && user.email}/agenda`, escolhaDate ? escolhaDate: moment(date).format('YYYY-MM-DD')), {
                agenda: Horas.length > 0 && Horas[0].agenda
            });
        }
        setTimeout(() => {
            setCountDelete(0)
        }, 1000);
    }

    const ConfirmarAgenda = async(cliente) => {
        setCountDelete(countDelete += 1)
                
        if (countDelete == 1) {
            toast.error('Clique 2 vezes para confirmar')
            setPedidoDelete(cliente)
        }
        if (countDelete == 2) {
            if (pedidoDelete != cliente) {
                return toast.error('Clique 2 vezes para confirmar')
            }
            Horas.length > 0 && Horas[0].agenda.map(dados => {
                if (dados.id == cliente.id) {
                    dados.status = 2
                }
            }) 
            toast.success('Finalizado com sucesso!')
            await updateDoc(doc(db, `MeiComSite/${user && user.email}/agenda`, escolhaDate ? escolhaDate: moment(date).format('YYYY-MM-DD')), {
                agenda: Horas.length > 0 && Horas[0].agenda
            });
        }
        setTimeout(() => {
            setCountDelete(0)
        }, 1000);
    }

    const DeletarData = async() => {
        setCountDelete(countDelete += 1)
        if (countDelete == 1) {
            toast.error('Clique 2 vezes para confirmar')
        }

        if (countDelete == 2) {
            toast.success('Finalizado com sucesso!')
            const ref = doc(db, `MeiComSite/${user && user.email}/agenda`, escolhaDate?escolhaDate:moment(date).format('YYYY-MM-DD'))
            await deleteDoc(ref)
        }
        setTimeout(() => {
            setCountDelete(0)
        }, 1000);
    }

    const DispHorario = async(index) => {
        const updatedHorarios = [...Horas[0].agenda];
        const indice = updatedHorarios.findIndex((h) => h.hora === index);
        setCountDelete(countDelete += 1)
        if (countDelete == 1) {
            toast.error('Clique 2 vezes para confirmar')
        }
        if (countDelete == 2) {
            updatedHorarios[indice].disp = !updatedHorarios[indice].disp;
            await updateDoc(doc(db, `MeiComSite/${user && user.email}/agenda`, escolhaDate ? escolhaDate: moment(date).format('YYYY-MM-DD')), {
                agenda: updatedHorarios
            });

        }
        setTimeout(() => {
            setCountDelete(0)
        }, 1000);
    }

    function formatarHoraParaAMPM(hora) {
        if (hora < 0 || hora > 23) {
          return 'Hora ou minuto inválido';
        }
        const periodo = hora >= 12 ? 'PM' : 'AM';
        const hora12 = hora % 12 || 12; 
        return `${hora12 < 10 ? '0': ''}${hora12}:00 ${periodo}`;
      }

      const toggleDisponivel = (index) => {
        const updatedHorarios = [...ListHours];
        updatedHorarios[index].disp = !updatedHorarios[index].disp;
        setHorarios(updatedHorarios);
      };
    
      const metade = ListHours && Math.ceil(ListHours.length / 2) || 0;
      const coluna1 = ListHours && ListHours.slice(0, metade) || [];
      const coluna2 = ListHours && ListHours.slice(metade) || [];

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
                                <div className={styles.date_in}>
                                    <input type="date" onChange={(el)=> setDate(el.target.value)}
                                    className={styles.input}
                                    />
                                    {date && ListHours && 
                                    <div>
                                        <div style={{ display: "flex", gap: "30px" }}>
                                            {[coluna1, coluna2].map((coluna, colIndex) => (
                                                <div key={colIndex}>
                                                {coluna.map((horario, index) => (
                                                    <div
                                                    key={index}
                                                    onClick={() => toggleDisponivel(colIndex * metade + index)}
                                                    style={{
                                                        margin: "5px 0",
                                                        backgroundColor: !horario.disp ? "#cbcbcb" : "#FF9100",
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        border: "1px solid #ccc",
                                                        borderRadius: "5px",
                                                    }}
                                                    className={styles.horario}
                                                    >
                                                    {formatarHoraParaAMPM(horario.hora)}
                                                    </div>
                                                ))}
                                                </div>
                                            ))}
                                    </div>
                            </div>}

                                </div>
                                <div
                                className={styles.cont_input_date_buttons}
                                >
                                    <div className={`${styles.p_B} ${styles.cont_input_date_buttons}`}>
                                        {date &&
                                        <button
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
                                    {Horas.length > 0 && <button
                                    className={` ${styles.btn_cancelar}`}
                                    onClick={()=>DeletarData()}
                                    >Cancelar Data</button>}
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
                                                                if (item.disp){
                                                                    return (
                                                                        <li
                                                                        key={item.hora}
                                                                        className={`${styles.hora} ${item.disp ? styles.on : styles.off } ${item.status == 0 && styles.disp}`}
                                                                        onClick={() => setCliente(item)}
                                                                        type="button"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target={`#ModalViewRR`}
                                                                        >
                                                                            <p>
                                                                                <span>{!item.disp ? <FaCalendarCheck className={styles.icon}/>: <FaPlusCircle className={styles.icon}/>}</span>
                                                                                    {item.hora}:00 horas
                                                                            </p>
                                                                        </li>
                                                                    )
                                                                } else {
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
                                                                            {item.status == 2 &&<p>finalizado</p>}
                                                                        </li>
                                                                    )
                                                                }
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
                                        <div className={styles.cont_img}>
                                            <img src="https://img.freepik.com/vetores-gratis/icone-de-fornecimento-escolar-do-bloco-de-notas_24877-83689.jpg?t=st=1736284693~exp=1736288293~hmac=2cfd63658d0990d11281f5fbda0177dbd67785fcf01e19d588acbdfd5a9bad42&w=740" className={styles.img}/>
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
        
                <div className="modal fade" id="ModalView" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`modal-dialog modal-md`}>
                        <div className="modal-content">
                            <div className={styles.card_container}
                            >
                                <div
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={`#ModalView`}
                                className={styles.toggle}
                                >

                                </div>
                                {cliente && cliente.nome ? 
                                <div className={styles.card}>
                                    <h3 className={styles.card_title}>Agendamento Confirmado</h3>
                                    <div className={styles.card_info}>
                                        <p><FaUser className={styles.icon} /> <strong>Cliente:</strong> {cliente &&cliente.nome}</p>
                                        <p><FaHandHoldingUsd className={styles.icon}/> <strong>Serviço:</strong> {cliente &&cliente.servico}</p>
                                        <p><FaCalendarAlt className={styles.icon} /> <strong>Data:</strong> {moment(escolhaDate).format('DD/MM/YYYY')}</p>
                                        <p><FaClock className={styles.icon} /> <strong>Hora:</strong> {cliente && cliente.hora}h</p>
                                    </div>
                                    {cliente && cliente.status == 1 &&
                                    <div className={styles.button_group}>
                                        <button className={`${styles.btn} ${styles.btn_cancel}`} 
                                        onClick={()=> CancelaAgenda(cliente)}
                                        >
                                            Cancelar
                                        </button>
                                        <button className={`${styles.btn} ${styles.btn_conclude}`} 
                                        onClick={()=> ConfirmarAgenda(cliente)}
                                        >
                                            Concluir
                                        </button>
                                    </div>}
                                </div>
                                :
                                <div className={styles.card}>
                                    <h3 className={styles.card_title}>Disponibilizar Horário</h3>
                                    
                                    <div className={styles.button_group}>
                                        <button className={`${styles.btn} ${styles.btn_cancel}`} 
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#ModalView`}
                                        >
                                            Cancelar
                                        </button>
                                        <button className={`${styles.btn} ${styles.btn_conclude}`} 
                                        onClick={()=> DispHorario(cliente.hora)}
                                        >
                                            Confirmar
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="ModalViewRR" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className={`modal-dialog modal-md`}>
                        <div className="modal-content">
                            <div className={styles.card}>
                                <h3 className={styles.card_title}>Fechar Horário</h3>
                                
                                <div className={styles.button_group}>
                                    <button className={`${styles.btn} ${styles.btn_cancel}`} 
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#ModalViewRR`}
                                    >
                                        Cancelar
                                    </button>
                                    <button className={`${styles.btn} ${styles.btn_conclude}`} 
                                    onClick={()=> DispHorario(cliente.hora)}
                                    >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <ToastContainer/>
        </>
        )
}