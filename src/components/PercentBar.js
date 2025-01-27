

const PercentBar = ({ serviceName, percentage }) => {
    return (
      <div style={{ margin: '10px 0' }}>
        <div>{serviceName}</div>
        <div
          style={{
            height: '20px',
            width: `${percentage}%`,
            backgroundColor: '#4caf50',
            borderRadius: '5px',
          }}
        />
        <div>{percentage}%</div>
      </div>
    );
  };
  
  // Componente principal que exibe os serviços e suas porcentagens
  export default function ServicePercentage ({ services })  {

    

   
  
  };
  
  // Exemplo de uso

  
