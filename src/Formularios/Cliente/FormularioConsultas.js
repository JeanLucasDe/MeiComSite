import React, { useState } from "react";
import "./FormularioConsultas.css";
import styles from "./FormularioEdit.module.css"
import moment from "moment/moment";
import { useOutletContext } from "react-router-dom";
import DetalhesVenda from "./DetalhesVenda";

const FormularioConsulta = () => {
  const [mod, produtos, usuario, vendas, user, agenda, servicos] = useOutletContext();
  const [agendamento, setAgendamento] = useState()


  const [filter, setFilter] = useState({
    period: "todas", // "dia", "semana", "mes"
    status: "todas", // "pendente", "concluido", "cancelado"
    customDate: "",  // Data personalizada (formato YYYY-MM-DD)
    customMonth: "", // Mês personalizado (formato YYYY-MM)
  });

  // Função para verificar se a data está no período
  const isInPeriod = (appointmentDate) => {
    const today = moment(); // Usando moment para a data atual
    const currentDate = moment(appointmentDate); // Convertendo a data do agendamento para moment
    
    // Comparação de "Hoje"
    if (filter.period === "dia") {
      return currentDate.isSame(today, "day");
    }

    // Comparação de "Semana"
    if (filter.period === "semana") {
      const startOfWeek = today.clone().startOf("week");
      const endOfWeek = today.clone().endOf("week");

      return currentDate.isBetween(startOfWeek, endOfWeek, null, "[]"); // Inclui os limites ([])
    }

    // Comparação de "Mês" - Ajuste: considerando até o último dia do mês
    if (filter.period === "mes") {
      const startOfMonth = today.clone().startOf("month");
      const endOfMonth = today.clone().endOf("month");  // Pegando o último dia do mês

      return currentDate.isBetween(startOfMonth, endOfMonth, null, "[]");  // Inclui o último dia do mês
    }

    // Comparação de "Data Específica"
    if (filter.period === "data_especifica" && filter.customDate) {
      return currentDate.isSame(moment(filter.customDate), "day");
    }

    // Comparação de "Mês Específico"
    if (filter.period === "mes_especifico" && filter.customMonth) {
      const month = moment(filter.customMonth, "YYYY-MM");
      return currentDate.isSame(month, "month");
    }

    return filter.period === "todas"; // Caso seja "todas", sem filtro de data
  };

  // Função para filtrar o status
  const isStatusMatch = (scheduleStatus) => {
    return filter.status === "todas" || scheduleStatus === filter.status;
  };

  // Função para garantir que não haja agendamentos duplicados pelo id
  const uniqueSchedules = (schedules) => {
    const seenIds = new Set();
    return schedules.filter((schedule) => {
      if (seenIds.has(schedule.id)) {
        return false; // Se o id já foi visto, ignora o agendamento
      } else {
        seenIds.add(schedule.id);
        return true; // Caso contrário, mantém o agendamento
      }
    });
  };

  // Função para filtrar os agendamentos
  const filterAppointments = () => {
    const filteredAppointments = agenda && agenda.filter((appointment) => {
      return (
        isInPeriod(appointment.date) &&
        appointment.agenda.some((schedule) => isStatusMatch(schedule.status))
      );
    });

    // Aplicando a função uniqueSchedules para garantir que não haja duplicidades
    return filteredAppointments.map((appointment) => ({
      ...appointment,
      agenda: uniqueSchedules(appointment.agenda), // Filtra os agendamentos únicos por ID
    }));
  };

  // Função para obter a cor do status (para mobile)
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "yellow"; // Pendente
      case 2:
        return "green";  // Concluído
      case 3:
        return "red";    // Cancelado
      default:
        return "gray";   // Desconhecido
    }
  };

  // Função para exibir o status como texto (desktop)
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Pendente";
      case 2:
        return "Concluído";
      case 3:
        return "Cancelado";
      default:
        return "Desconhecido";
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

  return (
    <div className="app">
      <h1 className="h1">Controle de Agendamentos</h1>

      {/* Filtro de Período */}
      <div className="filters">
        <h2>Selecione o Período</h2>
        <button
          className={`button ${filter.period === "dia" ? "active" : ""}`}
          onClick={() => setFilter({ ...filter, period: "dia", status: "todas", customDate: "", customMonth: "" })}
        >
          Hoje
        </button>
        <button
          className={`button ${filter.period === "semana" ? "active" : ""}`}
          onClick={() => setFilter({ ...filter, period: "semana", status: "todas", customDate: "", customMonth: "" })}
        >
          Semana
        </button>
        <button
          className={`button ${filter.period === "mes" ? "active" : ""}`}
          onClick={() => setFilter({ ...filter, period: "mes", status: "todas", customDate: "", customMonth: "" })}
        >
          Mês
        </button>
        <button
          className={`button ${filter.period === "mes_especifico" ? "active" : ""}`}
          onClick={() => setFilter({ ...filter, period: "mes_especifico", status: "todas", customDate: "" })}
        >
          Mês Específico
        </button>
        <button
          className={`button ${filter.period === "data_especifica" ? "active" : ""}`}
          onClick={() => setFilter({ ...filter, period: "data_especifica", status: "todas", customMonth: "" })}
        >
          Data Específica
        </button>
      </div>

      {filter.period === "mes_especifico" && (
        <div className="filters">
          <input
            type="month"
            value={filter.customMonth}
            onChange={(e) => setFilter({ ...filter, customMonth: e.target.value })}
            className={styles.input}
          />
        </div>
      )}

      {filter.period === "data_especifica" && (
        <div className="filters">
          <input
            type="date"
            value={filter.customDate}
            onChange={(e) => setFilter({ ...filter, customDate: e.target.value })}
            className={styles.input}
          />
        </div>
      )}

      {/* Filtro de Status */}
      {(filter.period !== "todas" && filter.period !== "dia") && (
        <div className="filters">
          <h2>Selecione o Status</h2>
          <button
            className={`button ${filter.status === 1 ? "active" : ""}`}
            onClick={() => setFilter({ ...filter, status: 1 })}
          >
            Pendentes
          </button>
          <button
            className={`button ${filter.status === 2 ? "active" : ""}`}
            onClick={() => setFilter({ ...filter, status: 2 })}
          >
            Concluídos
          </button>
          <button
            className={`button ${filter.status === 3 ? "active" : ""}`}
            onClick={() => setFilter({ ...filter, status: 3 })}
          >
            Cancelados
          </button>
        </div>
      )}

      {/* Tabela de Agendamentos */}
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">ID</th>
            <th className="th">Cliente</th>
            <th className="th">Data</th>
            <th className="th">Hora</th>
            <th className="th">Status</th>
          </tr>
        </thead>
        <tbody>
          {filterAppointments().map((appointment, index) =>
            appointment.agenda.map((schedule, scheduleIndex) => {
              if (schedule.nome) {
                return (
                  <tr key={`${index}-${scheduleIndex}`} className="tr" onClick={()=> setAgendamento(schedule)}
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalView`}
                  >
                    <td className="td">{schedule.id}</td>
                    <td className="td">{schedule.nome}</td>
                    <td className="td">{moment(appointment.date).format("DD/MM/YYYY")}</td>
                    <td className="td">{formatarHoraParaAMPM(schedule.hora.split(':')[0])}</td>
                    <td className="status">
                      <span className="status-text d-none d-lg-block">{getStatusText(schedule.status)}</span>
                      <span className="status-circle d-block d-lg-none" style={{ backgroundColor: getStatusColor(schedule.status) }}></span>
                    </td>
                  </tr>
                )
              }
            })
          )}
        </tbody>
      </table>
      
      <div className="modal fade" id="ModalView" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <DetalhesVenda
                    agendamento = {agendamento}
                    date={agendamento && agendamento.date}
                    mod='Agenda'
                    type="button" 
                    aria_label="Close"
                    data_bs_toggle="modal" 
                    data_bs_target="#ModalDetalhesVenda"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default FormularioConsulta;
