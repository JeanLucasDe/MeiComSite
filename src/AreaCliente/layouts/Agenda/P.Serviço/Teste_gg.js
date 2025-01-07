import { useState } from "react";

export default function Test () {

  const [horarios, setHorarios] = useState([
    { hora: "08:00", disponivel: true },
    { hora: "09:00", disponivel: true },
    { hora: "10:00", disponivel: true },
    { hora: "11:00", disponivel: true },
    { hora: "12:00", disponivel: true },
    { hora: "13:00", disponivel: true },
    { hora: "14:00", disponivel: true },
    { hora: "15:00", disponivel: true },
    { hora: "16:00", disponivel: true },
    { hora: "17:00", disponivel: true },
  ]);

  const toggleDisponivel = (index) => {
    const updatedHorarios = [...horarios];
    updatedHorarios[index].disponivel = !updatedHorarios[index].disponivel;
    setHorarios(updatedHorarios);

    // Retornando a lista atualizada no console
    console.log("Lista atualizada:", updatedHorarios);
  };

  // Dividir horários em duas colunas
  const metade = Math.ceil(horarios.length / 2);
  const coluna1 = horarios.slice(0, metade);
  const coluna2 = horarios.slice(metade);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {[coluna1, coluna2].map((coluna, colIndex) => (
        <div key={colIndex}>
          {coluna.map((horario, index) => {
            const globalIndex = colIndex * metade + index;
            return (
              <div
                key={globalIndex}
                onClick={() => toggleDisponivel(globalIndex)}
                style={{
                  padding: "10px",
                  margin: "5px 0",
                  backgroundColor: horario.disponivel
                    ? "lightgreen"
                    : "lightcoral",
                  cursor: "pointer",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                {horario.hora}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );


}