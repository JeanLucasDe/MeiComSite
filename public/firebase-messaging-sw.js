importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Inicializa o Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
});

// Obtém a instância do Firebase Messaging
const messaging = firebase.messaging();

// Fica ouvindo as mensagens recebidas quando o app está em segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Mensagem recebida em segundo plano ', payload);
  // Mostra a notificação
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    image: payload.notification.image,
    data: {
      click_action: payload.data.click_action || '/', // Link para redirecionamento
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notificação clicada:', event);
  event.notification.close();

  // Abrir o link especificado no campo `click_action`
  const clickAction = event.notification.data.click_action;
  if (clickAction) {
    event.waitUntil(clients.openWindow(clickAction));
  }
});