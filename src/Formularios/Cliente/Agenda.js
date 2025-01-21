import { useState } from "react";
import styles from "./FormularioEdit.module.css";
import { useOutletContext } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { App } from "../../Hooks/App";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import TipBox from "../../components/TipBox"

export default function Agenda() {
  const [mod, produtos, usuario, vendas, user, agenda, servicos] = useOutletContext();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const db = getFirestore(App);
  const [selectedDates, setSelectedDates] = useState([]); // Armazena múltiplas datas
  const { abre, fecha, email } = usuario && usuario[0];
  const dif = parseInt(fecha.split(":")[0]) - parseInt(abre.split(":")[0]);
  const [listHours ,setListHours] = useState([]);

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

  const getDaysInMonth = (year, month) => {
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysArray = Array.from({ length: days }, (_, i) => i + 1);
    return { daysArray, firstDay };
  };

  const { daysArray, firstDay } = getDaysInMonth(currentYear, currentMonth);

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

  const handleDayClick = (day) => {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const existingAgenda = agenda.find((item) => item.date === dateKey);

    const defaultHours = Array.from({ length: dif }, (_, i) => ({
      hora: `${parseInt(abre.split(":")[0]) + i}:00`,
      disp: false,
    }));

    setSelectedDates((prev) => {
      if (prev.some((date) => date.date === dateKey)) {
        // Remover a data se já estiver selecionada
        return prev.filter((date) => date.date !== dateKey);
      } else {
        // Adicionar a nova data com horários padrão ou existentes
        return [...prev, { date: dateKey, hours: existingAgenda ? existingAgenda.agenda : defaultHours }];
      }
    });
  };

  const toggleDisponibilidade = (dateKey, hourIndex) => {
    setSelectedDates((prev) =>
      prev.map((date) =>
        date.date === dateKey
          ? {
              ...date,
              hours: date.hours.map((hour, i) =>
                i === hourIndex ? { ...hour, disp: !hour.disp } : hour
              ),
            }
          : date
      )
    );
  };

  const ConfirmarAgenda = async () => {
    for (const { date, hours } of selectedDates) {
      const index = agenda.findIndex((dados) => dados.date === date);
      if (index >= 0) {
        await updateDoc(doc(db, `MeiComSite/${email}/agenda`, date), { date, agenda: selectedDates[0].hours });
      } else {
        await setDoc(doc(db, `MeiComSite/${email}/agenda`, date), { date, agenda: selectedDates[0].hours });
      }
    }
    setSelectedDates([]); // Limpa as datas selecionadas após confirmar
    alert("Agenda confirmada!");
    setTimeout(()=> window.location.reload(), 1000)
  };

  return (
    <div>
      <TipBox message="Dica: Para alterar multiplas datas, selecione primeiro uma data vazia" />
      <div className={styles.container}>
        <h1
        className={styles.title}
        style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto", textAlign: "center" }}>Faça seu Horário</h1>
        <div className="line"/>
        <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <FaAngleLeft onClick={handlePrevMonth} style={{ cursor: "pointer" }} />
            <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
            <FaAngleRight onClick={handleNextMonth} style={{ cursor: "pointer" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px", fontWeight: "bold" }}>
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`}></div>
            ))}
            {daysArray.map((day) => {
              const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const isSelected = selectedDates.some((date) => date.date === dateKey);
              return (
                <div
                  key={day}
                  onClick={() => handleDayClick(day)}
                  style={{
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <span className={styles.day_number}
                  style={{
                    backgroundColor: isSelected ? "#FF9100" : "",
                    color: isSelected ? "#fff" : "#000",
                    fontWeight:isSelected ? "bold" : "normal",
                  }}
                  >{day}</span>
                </div>
              );
            })}
          </div>
          {selectedDates.length > 0 && (() => {
          // Verifica se todas as datas selecionadas têm horários válidos (sem o atributo "nome")
          const allNamesValid = selectedDates.every(({ hours }) =>
            hours.every((hour) => !hour.nome )
          );
          const consolidatedHours = selectedDates
          .flatMap(({ date, hours }) =>
            hours.map((hour) => ({ ...hour, dateKey: date })) // Inclui o dateKey em cada horário
          )
          .filter(
            (hour, index, self) =>
              self.findIndex((h) => h.hora === hour.hora) === index // Remove duplicados
          );
      
          if (!allNamesValid) {
            if (selectedDates.length > 1) {
              return (
                <div>
                  <div className="line"/>
                  <h5>Alguma Data já está comprometida</h5>
                  <p>Deve ser Alterada individualmente</p>
                </div>
              )
            } else {
              return (
                <div>
                  <div className="line"/>
                    <div>
                      {consolidatedHours &&
                        <div style={{ marginTop: "2rem" }}>
                                <h4>Horários Selecionados</h4>
                                <table style={{ margin: "auto", borderCollapse: "collapse", width: "100%" }}>
                                  <thead>
                                    <tr>
                                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Horário</th>
                                      <th style={{ border: "1px solid #ddd", padding: "8px" }}>Disponível</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {consolidatedHours.map((hour, index) => (
                                      <tr key={index}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{hour.hora}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                          <input
                                            type="checkbox"
                                            checked={hour.disp}
                                            onChange={() => {
                                              toggleDisponibilidade(hour.dateKey, index)}}
                                            disabled={hour.nome}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                              </tbody>
                            </table>
                        </div>
                      }
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
                          fontWeight: "700",
                        }}
                      >
                        Confirmar
                      </button>
                    </div>
                  </div>
      
                </div>
              )
            }
          }
          return (
              <div>
                {consolidatedHours &&
                  <div style={{ marginTop: "2rem" }}>
                      <h3>Horários Selecionados</h3>
                      <table style={{ margin: "auto", borderCollapse: "collapse", width: "100%" }}>
                        <thead>
                          <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Horário</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Disponível</th>
                          </tr>
                        </thead>
                        <tbody>
                          {consolidatedHours.map((hour, index) => (
                            <tr key={index}>
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{hour.hora}</td>
                              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                <input
                                  type="checkbox"
                                  checked={hour.disp}
                                  onChange={() => toggleDisponibilidade(hour.dateKey, index)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  </div>
                  }
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
                      fontWeight: "700",
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
      
          );
        })()}
      
      
        </div>
      </div>
    </div>
  );
}
