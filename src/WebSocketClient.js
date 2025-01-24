import React, { useEffect, useState } from "react";

const WebSocketClient = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Desconectado");

  useEffect(() => {
    // Conectando ao servidor WebSocket
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      setStatus("Conectado");
      console.log("Conectado ao servidor WebSocket");
    };

    socket.onmessage = (event) => {
      console.log("Mensagem recebida:", event.data);
      setMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      setStatus("Erro");
    };

    socket.onclose = () => {
      setStatus("Desconectado");
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      <h1>Status WebSocket: {status}</h1>
      <p>Mensagem: {message}</p>
    </div>
  );
};

export default WebSocketClient;