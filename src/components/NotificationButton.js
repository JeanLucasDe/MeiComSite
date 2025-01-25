import React, { useState } from 'react';

const NotificationButton = () => {
  const [status, setStatus] = useState(null); // Status de erro ou sucesso

  const sendNotification = async () => {
    const message = "Sua mensagem de notificação aqui";

    try {
      const response = await fetch('https://sendmessage-ta34b4bdwa-uc.a.run.app/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: "fyohAKf5d3Z0VT-bmIVzSq:APA91bFddMzBMQYPzO9j3TOi7aT8OD-9cLG1_RBYh4EHyuEYj5ZLLYn6sQKOVPd92fQ8lqQ4cuBaXY5yjYObO1FV59wNe9Q9yJ5r8uL-ogs5K-kX8ivLGdU", // Enviando o token obtido do Firebase
          message: 'testando na web',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus('Notificação enviada com sucesso!');
      } else {
        setStatus(`Erro: ${data.message || 'Falha ao enviar notificação'}`);
      }
    } catch (error) {
      console.error('Erro ao enviar a notificação:', error);
      setStatus('Erro ao enviar a notificação');
    }
  };

  return (
    <div>
      <button onClick={sendNotification}>Enviar Notificação</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default NotificationButton;