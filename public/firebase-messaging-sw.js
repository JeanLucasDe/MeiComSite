// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js");

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
  authDomain: "fir-auth-99797.firebaseapp.com",
  projectId: "fir-auth-99797",
  storageBucket: "fir-auth-99797.appspot.com",
  messagingSenderId: "673295267800",
  appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Inicializa o Firebase Messaging
const messaging = firebase.messaging();

// Gerencia mensagens recebidas em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log("Mensagem recebida em segundo plano:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});