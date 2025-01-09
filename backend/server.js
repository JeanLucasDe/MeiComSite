const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Servidor WebSocket
const wss = new WebSocket.Server({ noServer: true });

// Conexões WebSocket
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
  
  // Enviar uma mensagem para o cliente
  ws.send('Você está conectado ao servidor de notificações!');
  
  // Ouvir mensagens do cliente
  ws.on('message', (message) => {
    console.log('Mensagem recebida: ', message);
  });
});

// Roteamento do servidor
app.get('/', (req, res) => {
  res.send('Servidor Backend');
});

// Iniciar o servidor
const server = app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Atualizando o servidor para suportar WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});