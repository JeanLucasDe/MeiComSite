import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import register from './service-worker-registration'; 
import { firebaseConfig } from './Hooks/App';


firebase.initializeApp(firebaseConfig);

// Solicitar permissão para notificações
const messaging = firebase.messaging();

async function requestNotificationPermission() {
  try {
    await messaging.requestPermission(); // Solicita permissão para notificações
    console.log("Permissão para notificações concedida.");
    getFCMToken();  // Chama para obter o token FCM
  } catch (error) {
    console.error("Permissão para notificações negada:", error);
  }
}

function getFCMToken() {
  messaging
  .getToken({
    vapidKey: "BA6S9WD0UpWmB94zmX9szFl2fICZb3N7BaBjTvt75i2mSm_MWjNzIktvsR7FHNTXGB3u5-JeUg_xLLzTFHJR6co"
  })
  .then((currentToken) => {
    if (currentToken) {
        console.log("Token FCM:", currentToken);
      } else {
        console.log("Sem token disponível.");
      }
    })
    .catch((err) => {
      console.log("Erro ao obter token:", err);
    });
  }
  
  
  // Chama para pedir permissão
  requestNotificationPermission();
  register()
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
);