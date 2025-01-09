import React, { useState, useEffect } from 'react';

const NotificacaoDono = () => {
  const [socket, setSocket] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Conectar ao WebSocket
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      ws.send(JSON.stringify({ role: 'businessOwner' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'newOrder') {
        const { order, clientName } = data;
        setPedidos((prev) => [...prev, { order, clientName }]);

        // Mostrar notificação
        if (Notification.permission === 'granted') {
          new Notification('Novo Pedido', {
            body: `Pedido de ${clientName}: ${order}`,
          });
        }
      }
    };

    ws.onclose = () => console.log('Desconectado do WebSocket');
    ws.onerror = (error) => console.error('Erro no WebSocket:', error);

    return () => ws.close();
  }, []);

  // Solicitar permissão para notificações
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div>
      <h1>Dono do Negócio - Pedidos Recebidos</h1>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>
            <strong>{pedido.clientName}</strong>: {pedido.order}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificacaoDono;