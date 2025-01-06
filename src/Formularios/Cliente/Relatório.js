import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import moment from "moment";
import DetalhesVenda from "./DetalhesVenda";
import styles_ from "./Relatorio.module.css"
import { FaArrowLeft } from "react-icons/fa";




export default function Relatório () {
    const [mod, produtos, usuario, vendas, user,agenda,servicos] = useOutletContext()
    const [filtroData, setFiltroData] = useState('');
    const [stage, setStage] = useState(1)
    const [date, setDate] = useState()
    const [horarios, setHorarios] = useState()
    const [agendamento, setAgendamento] = useState()

    const [filtroNome, setFiltroNome] = useState('');
    var [filtroStatus, setFiltroStatus] = useState('');
    const [filtroId, setFiltroId] = useState('');

    
    
    const filtrarAtendimentos = () => {
        return agenda.filter((atendimento) => {
          return filtroData === '' || atendimento.date === filtroData;
        });
      };

      
      const filtrarAtendimentosHora = () => {
        if (filtroStatus == 'Pendente') filtroStatus = 0
        if (filtroStatus == 'Concluído') filtroStatus = 1
        if (filtroStatus == 'Cancelado') filtroStatus = 2
        return horarios.filter((atendimento) => {
          const dataMatch = filtroData === '' || atendimento.date === filtroData;
          const nomeMatch = filtroNome === '' || atendimento.nome == filtroNome;
          const statusMatch = filtroStatus === '' || atendimento.status == filtroStatus 
          const idMatch = filtroId === '' || atendimento.id  == filtroId;
    
          return dataMatch && nomeMatch && statusMatch && idMatch
        });
      };


      
    const s = (d) => {
        setDate(d.date)
        setHorarios(d.agenda)
        setStage(2)
    }

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
      function obterDiaDaSemana(data) {
        const diasDaSemana = [
          'Dom', 'Seg', 'Ter', 'Qua', 
          'Qui', 'Sex', 'Sáb','Dom'
        ];
      
        const dataObj = new Date(data); // Converte a data para um objeto Date
      
        // Verifica se a data é válida
        if (isNaN(dataObj)) {
          return 'Data inválida';
        }
      
        // Retorna o dia da semana correspondente à data
        return diasDaSemana[dataObj.getDay()+1];
      }

      
    
    
    const styles = {
        container: {
          fontFamily: 'Arial, sans-serif',
          margin: '0px',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        heading: {
          color: '#2c3e50',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '24px',
          fontWeight: '600',
        },
        inputFocus: {
          borderColor: '#3498db',
        },
        table: {
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
        },
        tableHeader: {
          backgroundColor: '#ff9100',
          color: '#fff',
          textAlign: 'left',
          fontWeight: 'bold',
          fontSize: '16px',
        },
        tableRow: {
          borderBottom: '1px solid #ddd',
          cursor:'pointer'
        },
        tableCell: {
          padding: '12px 15px',
          textAlign: 'left',
          fontSize: '14px',
          color: '#333',
        }
       
      };
    return (
        <>
        <div style={styles.container}>
          <FaArrowLeft onClick={()=>{
            setStage(1)
            setDate('')}}/>
            <h1 style={styles.heading}>Relatório de Atendimentos</h1>
            
            
            <div style={styles.filterContainer}>
                <label htmlFor="data" style={styles.filterLabel}>Filtrar por Data:</label>
                {stage == 1 &&
                <input
                type="date"
                id="data"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
                className={styles_.input}
                />
                }
                {stage == 2 &&
                <h5>{moment(date).format('DD/MM/YYYY')}</h5>
                }
            </div>

            {stage == 1 &&
            <table style={styles.table}>
                <thead>
                <tr style={styles.tableHeader}>
                    <th style={styles.tableCell}>ID</th>
                    <th style={styles.tableCell}>Data</th>
                    <th style={styles.tableCell}>Dia</th>
                </tr>
                </thead>
                <tbody>
                {filtrarAtendimentos().map((atendimento, id) => (
                    <tr key={atendimento.id} style={styles.tableRow}
                    onClick={()=> {
                        s(atendimento)
                    }}
                    >
                    <td style={styles.tableCell}>{id+=1}</td>
                    <td style={styles.tableCell}>{moment(atendimento.date).format('DD/MM/YYYY')}</td>
                    <td style={styles.tableCell}>{obterDiaDaSemana(atendimento.date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            }
            {stage == 2 && 
            <div>
                <div className={styles_.filterContainer}>
                  {/* Filtro por Nome */}
                  <div className={styles_.filterGroup}>
                    <label htmlFor="nome" style={styles_.filterLabel}>Filtrar por Nome:</label>
                    <input
                      type="text"
                      id="nome"
                      value={filtroNome}
                      onChange={(e) => setFiltroNome(e.target.value)}
                      placeholder="Nome do cliente"
                      className={styles_.input}
                    />
                  </div>

                  {/* Filtro por Status */}
                  <div className={styles_.filterGroup}>
                    <label htmlFor="status" style={styles_.filterLabel}>Filtrar por Status:</label>
                    <select
                    className={styles_.input}
                    onChange={(el) => setFiltroStatus(el.target.value)}
                    >
                      <option value=''/>
                      <option>Concluído</option>
                      <option>Pendente</option>
                      <option>Cancelado</option>
                    </select>
                  </div>

                  {/* Filtro por ID */}
                  <div className={styles_.filterGroup}>
                    <label htmlFor="id" style={styles_.filterLabel}>Filtrar por ID:</label>
                    <input
                      type="text"
                      id="id"
                      value={filtroId}
                      onChange={(e) => setFiltroId(e.target.value)}
                      placeholder="ID do atendimento"
                      className={styles_.input}
                    />
                  </div>
                  </div>
              <table style={styles.table}>
                  <thead>
                  <tr style={styles.tableHeader}>
                      <th style={styles.tableCell}>Hora</th>
                      <th style={styles.tableCell}>Cliente</th>
                      <th style={styles.tableCell}>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filtrarAtendimentosHora().map((atendimento) => (
                      <tr key={atendimento.id} style={styles.tableRow}
                      data-bs-toggle="modal"
                      data-bs-target={`#ModalView`}
                      onClick={()=> setAgendamento(atendimento)}
                      >
                      <td style={styles.tableCell}>{formatarHoraParaAMPM(parseInt(atendimento.hora))}</td>
                      <td style={styles.tableCell}>{!atendimento.nome ? 'Vazio' : atendimento.nome.split(' ')[0]}</td>
                      <td style={styles.tableCell}>
                          {atendimento.status == 0 && 'Pendente'}
                          {atendimento.status == 1 && 'Cancelado'}
                          {atendimento.status == 2 && 'Concluído'}
                      </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
            }
        </div>
  
        <div className="modal fade" id="ModalView" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <DetalhesVenda
                    agendamento = {agendamento}
                    date={date}
                    mod='Agenda'
                    type="button" 
                    aria_label="Close"
                    data_bs_toggle="modal" 
                    data_bs_target="#ModalDetalhesVenda"
                    />
                </div>
            </div>
        </div>
        </>
    )
}