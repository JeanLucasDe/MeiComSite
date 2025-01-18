import { useState } from "react";
import styles from "./FormularioEdit.module.css"
import { useOutletContext } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { App } from "../../Hooks/App";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import moment  from "moment/moment"




export default function Agenda () {

    const [mod, produtos, usuario, vendas, user, agenda, servicos] = useOutletContext();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectHours, setSelectHours] = useState([])
  const db = getFirestore(App)
  const [selectedDate, setSelectedDate] = useState({
    year: null,
    month: null,
    day: null,
  });

  const { abre, fecha, email } = usuario && usuario[0];
  const dif = parseInt(fecha.split(":")[0]) - parseInt(abre.split(":")[0]);
  const [hours, setHours] = useState([]);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Função para gerar os dias do mês
  const getDaysInMonth = (year, month) => {
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    return { daysArray, firstDay };
  };

  const { daysArray, firstDay } = getDaysInMonth(currentYear, currentMonth);

  // Navegação entre os meses
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Seleção de dia
  const handleDayClick = (day) => {
    const selectedAgenda = agenda.find(
      (item) =>
        new Date(item.date).getFullYear() === currentYear &&
        new Date(item.date).getMonth() === currentMonth &&
        new Date(item.date).getDate() === day-1
    );

    setSelectHours(selectedAgenda &&  selectedAgenda.agenda )
    if (selectedAgenda) {
      setHours(selectedAgenda.agenda);
    } else {
      setHours(Array.from({ length: dif }, (_, i) => ({ hora: `${parseInt(abre.split(":")[0]) + i}:00`, disp: false })));
    }

    setSelectedDate({
      year: currentYear,
      month: currentMonth + 1,
      day,
    });
  };

  // Alterar disponibilidade de horário
  const toggleDisponibilidade = (index) => {
    setHours((prev) =>
      prev.map((hora, i) => (i === index ? { ...hora, disp: !hora.disp } : hora))
    );
  };

  // Função para verificar status do dia
  const getDayStyles = (day) => {
    const agendaItem = agenda.find(
      (item) =>
        new Date(item.date).getFullYear() === currentYear &&
        new Date(item.date).getMonth() === currentMonth &&
        new Date(item.date).getDate() === day
    );

    if (agendaItem) {
      const allAvailable = agendaItem.agenda.every((h) => h.disp);
      const allOccupied = agendaItem.agenda.every((h) => !h.disp);
      if (allAvailable) {
        return { borderColor: "green" };
      } else if (allOccupied) {
        return { textDecoration: "dashed" };
      }
    }
    return {};
  };

  const formataForZero = (date) => {
    if (date < 10) {
        return "0"+date
    } else return date.toString()
  }
  const dateForm = selectedDate.year+"-"+formataForZero(selectedDate.month)+"-"+formataForZero(selectedDate.day)
  

  const ConfirmarAgenda = async() => {
    agenda.find(dados => dados.date == dateForm)
    const index = agenda.findIndex(dados => dados.date == dateForm)

    if (index >= 0) {
        await updateDoc(doc(db, `MeiComSite/${email}/agenda`, dateForm ), {
            date: dateForm,
            agenda:hours
        });
    } else {
        await setDoc(doc(db, `MeiComSite/${email}/agenda`, dateForm ), {
            date: dateForm,
            agenda:hours
        });
    } 
    
}

  return (
    <div className={styles.container}>
      <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
        {/* Ano e Navegação */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <FaAngleLeft onClick={handlePrevMonth} style={{ cursor: "pointer" }} />
          <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
          <FaAngleRight onClick={handleNextMonth} style={{ cursor: "pointer" }} />
        </div>

        {/* Dias da Semana */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", fontWeight: "bold" }}>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Dias do Mês */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}
          {daysArray.map((day) => {
                const dayStyles = getDayStyles(day); 
                return(
                    <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    style={{
                        padding: "10px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        textAlign: "center",
                        textDecoration: dayStyles.textDecoration || "none",
                      }}
                    >
                    <span className={`${styles.day_number}`}
                    style={{
                      backgroundColor:
                      selectedDate.day == day && selectedDate.month == currentMonth + 1
                        ? "#FF9100"
                        : "",
                    color:
                      selectedDate.day == day && selectedDate.month == currentMonth + 1
                        ? "#fff"
                        : "#000",
                    }}
                    >{day}</span>
                    </div>
                )
            })}
        </div>

        {/* Tabela de Horários */}
        {selectedDate.year && (
          <div style={{ marginTop: "2rem" }}>
            <h3>{`Horários para ${moment(dateForm).format("DD/MM/YYYY")}`}</h3>
            <table style={{ margin: "auto", borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Horário</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Disponível</th>
                </tr>
              </thead>
              <tbody>
                {hours.map((hour, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{hour.hora}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {!hour.nome ? 
                        <input
                        type="checkbox"
                        checked={hour.disp}
                        onChange={() => toggleDisponibilidade(index)}
                        />
                        :
                        <span>agendado</span>
                        }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Botão de Confirmação */}
        {selectedDate.year && (
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
                onClick={() => ConfirmarAgenda()}
                style={{
                padding: "10px 20px",
                fontSize: "1.2rem",
                color: "#fff",
                backgroundColor: "#FF9100",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight:"700"
                }}
            >
                Confirmar
            </button>
            </div>
        )}
      </div>
    </div>
  );
      
}