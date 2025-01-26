import { useState } from "react";
import moment from "moment";
import styles_ from "./DetalhesVenda.module.css"
import { doc, getFirestore, updateDoc} from "@firebase/firestore";
import { App } from "../../Hooks/App";
import {FaTimes} from "react-icons/fa"


export default function DetalhesVenda (props) {

    const obj = props.obj && props.obj
    const agendamento = props.agendamento && props.agendamento || {}
    const agenda = props.agenda &&props.agenda
    const date = props.date && props.date
    const email = props.email && props.email
    const [alter, setAlter] = useState(false)
    const db = getFirestore(App)
    var [count, setCount] = useState(0)

    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const ReturnState = () => {
        if (obj) {
            if (obj.state == 1) return 'Em aberto'
            if (obj.state == 2) return 'Em Preparo'
            if (obj.state == 3) return 'Em Entrega'
            if (obj.state == 4) return 'Finalizado'
        }
    }

    const status = ReturnState()
    

    const styles = {
        container: {
          width: '100%',
          maxWidth: '600px',
          margin: '0px auto',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
        },
        header: {
          textAlign: 'center',
          marginBottom: '30px',
        },
        title: {
          fontSize: '28px',
          color: '#2c3e50',
          fontWeight: '700',
        },
        subTitle: {
          fontSize: '16px',
          color: '#7f8c8d',
          marginTop: '5px',
        },
        detailsContainer: {
          marginBottom: '30px',
        },
        detailRow: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          fontSize: '16px',
          color: '#34495e',
        },
        statusBox: {
          backgroundColor:"#28a745",
          color: "#fff",
          padding:"20px",
          borderRadius:"5px",
          fontSize:"16px",
          fontWeight:"bold",
          margin: "1em auto",
          textAlign:"center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        },
        label: {
          fontWeight: 'bold',
        },
        value: {
          color: '#2c3e50',
        },
        status: {
          Confirmado: {
            color: '#27ae60',
            fontWeight: 'bold',
          },
          Pendente: {
            color: '#f39c12',
            fontWeight: 'bold',
          },
          Cancelado: {
            color: '#e74c3c',
            fontWeight: 'bold',
          },
        },
        actionButtonContainer: {
          textAlign: 'center',
        },
        button: {
          padding: '12px 30px',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          display:'block'
        },
        buttonHover: {
          backgroundColor: '#2980b9',
        },
        boxStyle : {
          backgroundColor: "#f9f9f9",
          borderTop: "2px solid rgb(255, 61, 47)",
          borderRadius: "8px",
          padding: "16px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          color: "#000",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          margin: "20px auto",
        },
      
        textStyle : {
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom:'0'
        },
      
        highlightStyle : {
          color: "#d32f2f",
        }
      };

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
      const handleAlterStatus = async(status) => {
        setCount(count+=1)
        
        if (count == 2) {
          const listHours = []
          if (status == "confirmar") {
              agenda.filter(dados => {
                if (dados.date == date){
                  dados.agenda.filter(item => {
                    if (item.id == agendamento.id) {
                      item.status = 2
                    }
                    listHours.push(item)
                  })
                }
              })
              await updateDoc(doc(db, `MeiComSite/${email}/agenda`, date), {
                agenda: listHours
              });
              setAlter(true)
            agendamento.status = 2
          }
          if (status == "cancelar") {
              agenda.filter(dados => {
                if (dados.date == date){
                  dados.agenda.filter(item => {
                    if (item.id == agendamento.id) {
                      item.status = 3
                    }
                    listHours.push(item)
                  })
                }
              })
              await updateDoc(doc(db, `MeiComSite/${email}/agenda`, date), {
                agenda: listHours
              });
              agendamento.status = 3
              setAlter(true)
          }
        }
        setTimeout(()=> {
          setCount(0)
        },1000)
      }


    return (
            <>
            
            {props.mod == 'Agenda' ? 
                <div style={styles.container}>
                    {/* Cabeçalho */}
                    <div style={styles.header}>
                        <h1 style={styles.title}>Comprovante de Agendamento</h1>
                        <p style={styles.subTitle}>Detalhes do agendamento</p>
                    </div>

                    
                    <div style={styles.detailsContainer}>
                        <div style={styles.detailRow}>
                        <span style={styles.label}>Código do Agendamento:</span>
                        <span style={styles.value}>{agendamento.id}</span>
                        </div>
                        <div style={styles.detailRow}>
                        <span style={styles.label}>Cliente:</span>
                        <span style={styles.value}>{agendamento.nome}</span>
                        </div>
                        <div style={styles.detailRow}>
                        <span style={styles.label}>Data:</span>
                        <span style={styles.value}>{moment(date && date).format('DD/MM/YYYY')}</span>
                        </div>
                        <div style={styles.detailRow}>
                        <span style={styles.label}>Hora:</span>
                        <span style={styles.value}>{formatarHoraParaAMPM(agendamento.hora && agendamento.hora.split(':')[0])}</span>
                        </div>
                        <div style={styles.detailRow}>
                        <span style={styles.label}>Telefone:</span>
                        <span style={styles.value}>{agendamento.telefone}</span>
                        </div>
                        <div style={styles.detailRow}>
                            <span style={styles.label}>Serviço:</span>
                            <span style={styles.value}>{agendamento.servico}</span>
                        </div>
                        <div style={styles.detailRow}>
                            <span style={styles.label}>Valor:</span>
                            <span style={styles.value}>{agendamento.valor && FormataValor(parseInt(agendamento.valor))}</span>
                        </div>
                        <div style={styles.detailRow}>
                        <span style={styles.label}>Status:</span>
                        <span style={styles.status[agendamento.status]}>
                            {agendamento.status == 1 && 'Pendente'}
                            {agendamento.status == 2 && 'Concluído'}
                            {agendamento.status == 3 && 'Cancelado'}
                        </span>
                      </div>
                        {alter && <div style={styles.statusBox}>
                          Status alterado com sucesso!
                        </div>}
                        <div  style={styles.boxStyle}>
                          <p style={styles.textStyle}>Clique <strong style={styles.highlightStyle}>duas vezes</strong> para confirmar</p>
                        </div>
                        </div>
                          <button
                          className={`${styles_.btn}`}
                          onClick={()=> handleAlterStatus("confirmar")}
                          >
                          Confirmar Agenda
                          </button>
                          <button
                          className={`${styles_.btn} ${styles_.cancel}`}
                          onClick={()=> handleAlterStatus("cancelar")}
                          >
                          Cancelar Agenda
                          </button>
                          <button
                          className={`${styles_.btn} ${styles_.close}`}
                          type={props.type} 
                          data-bs-toggle={props.data_bs_toggle} 
                          data-bs-target={props.data_bs_target}
                          >
                          Sair
                          </button>
                            

                    
                </div>


            :
            <div className={styles.container}>
            <div className={styles.block}
            type={props.type} 
            data-bs-toggle={props.data_bs_toggle} 
            data-bs-target={props.data_bs_target}
            />
                <div className={styles.header}>
                    <div>
                        <h4>Pedido: #  {obj &&  obj.iden}</h4>
                        {obj && obj.identrega && obj.state == 4 && <h5>ID Entrega: {obj &&  obj.identrega}</h5>}
                    </div>
                    <div className={styles.cont_date}>
                        <span className={styles.date}>Data: {obj &&  obj.data}</span>
                        <span className={styles.date}>Hora: {obj &&  obj.hora}</span>
                    </div>
                </div>
                <div className={styles.info_comprador}>
                    <div className="row">
                        <div className="col-md-6">
                            <p className={styles.info}>Nome: <span>{obj && obj.nome}</span></p>
                            {obj && obj.lugar == 1 && <p className={styles.info}>Telefone: <span>{obj && obj.telefone}</span></p>}
                            <p className={styles.info}>Pagamento: <span>{obj && obj.pagamento}</span></p>
                            {obj && obj.mesa && <p className={styles.info}>Mesa: <span>{obj && obj.mesa}</span></p>}
                            <p className={styles.info}>Status: {status}</p>
                        </div>
                        <div className="col-md-6">
                            {obj && obj.lugar == 1 &&
                            <div>
                                <p className={styles.info}>Cidade: <span>{obj && obj.cidade}</span></p>
                                <p className={styles.info}>Bairro: <span>{obj && obj.bairro}</span></p>
                                <p className={styles.info}>rua: <span>{obj && obj.rua}</span></p>
                                <p className={styles.info}>Número: <span>{obj && obj.numero}</span></p>
                                <p className={styles.info}>P. Refencia: <span>{obj && obj.referencia}</span></p>
                            </div>
                            
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.line}/>
                <div>
                    {obj && obj.lugar == 1 && <div className={styles.cont_total}>
                        <h5>Taxa</h5>
                        <h5>{obj && obj.taxa ? FormataValor(obj.taxa): 'Retirada no local'}</h5>
                    </div>}
                    <div className={styles.cont_total}>
                        <h5>Total da venda</h5>
                        <h5>{obj && FormataValor(obj.Total)}</h5>
                    </div>
                </div>
                <div className={styles.line}/>
                <div className={styles.cont_detalhes}>
                    <h5>Detalhes</h5>   
                    <ul className={styles.list_main}>
                    {obj && obj.produtos && obj.produtos.map(dados => {
                        return (
                                <li> 
                                    <strong>{dados.categoria} - {FormataValor(dados.valor)}</strong>
                                    <p className={styles.p_sabor}>
                                        <span>Sabor: </span>
                                        {dados.produtos.map(item => {
                                            return (
                                                <strong>{item.sabor},</strong>
                                                )
                                        })}
                                    </p>
                                    {dados.adicionais && <p className={styles.p_sabor}>
                                        <span>Adicionais: </span>
                                        {dados.adicionais && dados.adicionais.map(item => {
                                            return (
                                                <strong>{item.saborAdicional},</strong>
                                                )
                                        })}
                                    </p>}
                                    
                                </li>
                            )
                    })}
                    </ul>
                </div>
                <div className={styles.block}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                />
            </div>

            }

        
            </>
        )
}