import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';




const firebaseConfig = {
  apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
  authDomain: "fir-auth-99797.firebaseapp.com",
  projectId: "fir-auth-99797",
  storageBucket: "fir-auth-99797.appspot.com",
  messagingSenderId: "673295267800",
  appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const messaging = firebase.messaging();


async function requestPermission() {
  try {
    await Notification.requestPermission();
    console.log("Permissão concedida!");
    console.log("Pegando seu Token")
    await getTokenAndValidate();
  } catch (error) {
    console.error("Permissão de notificação negada:", error);
  }
}
async function getTokenAndValidate() {
  try {
    const currentToken = await messaging.getToken({
      vapidKey: 'BA6S9WD0UpWmB94zmX9szFl2fICZb3N7BaBjTvt75i2mSm_MWjNzIktvsR7FHNTXGB3u5-JeUg_xLLzTFHJR6co', // Sua VAPID Key
    });

    if (currentToken) {
      
      // Aqui você pode enviar o token para o backend para validação ou salvar em um banco de dados
      const isValid = await validateTokenWithBackend(currentToken);

      console.log('Token FCM:', currentToken);

      if (!isValid) {
        console.warn('Token inválido detectado. Excluindo...');
        await messaging.deleteToken();
        console.log('Token excluído com sucesso!');
      } else {
        console.log('Token válido!');
        localStorage.setItem('fcmToken', currentToken);
      }
    } else {
      console.log('Não foi possível obter o token.');
    }
  } catch (error) {
    console.error('Erro ao obter o token:', error);
  }
}

async function validateTokenWithBackend(token) {
  try {
    // Substitua pela URL do endpoint do seu backend que valida tokens
    const response = await fetch('https://us-central1-backmeicomsite.cloudfunctions.net/validateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.isValid; // O backend deve retornar se o token é válido
    } else {
      console.error('Erro ao validar o token no backend:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Erro ao se comunicar com o backend:', error);
    return false;
  }
}


  requestPermission()
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
    <App/>
  </React.StrictMode>
);