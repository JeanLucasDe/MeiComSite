const CircularProgress = ({ percentage, max = 100 , color}) => {
    const radius = 50; // Raio do círculo
    const strokeWidth = 10; // Espessura da borda
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / max) * circumference;
  
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <svg
          height={radius * 2}
          width={radius * 2}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Círculo de fundo */}
          <circle
            stroke="#e6e6e6"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Círculo de progresso */}
          <circle
            stroke="#ff8800"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            fontSize: "1.5em",
            fontWeight: "bold",
            color: color,
          }}
        >
          {Math.round((percentage / max) * 100)}%
        </div>
      </div>
    );
  };
  
  export default CircularProgress;