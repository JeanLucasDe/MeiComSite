import { useState } from "react";

export default function Test () {

    const [horarios, setHorarios] = useState([
        { hora: 8, disp: true },
        { hora: 9, disp: true },
        { hora: 10, disp: true },
        { hora: 11, disp: true },
        { hora: 12, disp: true },
        { hora: 13, disp: true },
        { hora: 14, disp: true },
        { hora: 15, disp: true },
        { hora: 16, disp: true },
        { hora: 17, disp: true },
      ]);
    
      const toggleDisponivel = (index) => {
        setHorarios((prevHorarios) =>
          prevHorarios.map((horario, i) =>
            i === index ? { ...horario, disponivel: !horario.disponivel } : horario
          )
        );
      };
    
      const metade = Math.ceil(horarios.length / 2);
      const coluna1 = horarios.slice(0, metade);
      const coluna2 = horarios.slice(metade);
    
      return (
        <div style={{ display: "flex", gap: "20px" }}>
          {[coluna1, coluna2].map((coluna, colIndex) => (
            <div key={colIndex}>
              {coluna.map((horario, index) => (
                <div
                  key={index}
                  onClick={() => toggleDisponivel(colIndex * metade + index)}
                  style={{
                    padding: "10px",
                    margin: "5px 0",
                    backgroundColor: horario.disponivel ? "lightgreen" : "lightcoral",
                    cursor: "pointer",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  {horario.hora}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
}