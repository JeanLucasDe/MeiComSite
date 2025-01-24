importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-sw.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js');

const firebaseConfig = {
  apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
  authDomain: "fir-auth-99797.firebaseapp.com",
  projectId: "fir-auth-99797",
  storageBucket: "fir-auth-99797.appspot.com",
  messagingSenderId: "673295267800",
  appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Notificação recebida em segundo plano:', payload);

  const notificationTitle = payload.notification?.title || 'Nova Notificação';
  const notificationOptions = {
    body: payload.notification?.body || 'Você tem uma nova mensagem!',
    icon: payload.notification?.icon || '/default-icon.png',
    data: {
      url: payload.data?.url || null, // URL a ser redirecionada
    },
  };

  // Exibe a notificação
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Evento para cliques na notificação
self.addEventListener('notificationclick', (event) => {
  console.log('Notificação clicada:', event.notification);

  // Fecha a notificação
  event.notification.close();

  // Verifica se há uma URL nos dados da notificação
  const url = event.notification.data?.url || "https://sitemei.netlify.app";

  if (url) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        for (const client of clientList) {
          // Foca a aba se ela já está aberta no mesmo URL
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        // Abre uma nova aba se não está aberta
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  } else {
    console.warn('URL não encontrada nos dados da notificação.');
  }
});