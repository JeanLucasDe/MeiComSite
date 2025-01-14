const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Inicialize o Firebase Admin SDK com o arquivo de credenciais
const serviceAccount = require("./credencials/fir-auth-99797-firebase-adminsdk-p141e-aab96092e7.json"); // Substitua o caminho correto
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Função para enviar notificações
const sendNotification = async (token, title, message) => {
  try {
    const messagePayload = {
      notification: {
        title: title,
        body: message,
      },
      token: token, // Token do destinatário
    };

    // Envia a notificação para o token do destinatário
    const response = await admin.messaging().send(messagePayload);

    console.log("Notificação enviada com sucesso:", response);
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    throw new Error("Erro ao enviar notificação.");
  }
};

// Rota para enviar notificação
app.post("/send-notification", async (req, res) => {
  const { token, title, message } = req.body;
  
  if (!token || !title || !message) {
    return res.status(400).json({ error: "Dados inválidos. Envie token, title e message." });
  }

  try {
    await sendNotification(token, title, message);
    res.status(200).json({ message: "Notificação enviada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});