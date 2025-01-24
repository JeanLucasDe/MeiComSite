/* eslint-env serviceworker */


import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST || []);



self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    // Realize tarefas de instalação aqui, como cache de recursos
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado');
    // Realize tarefas de ativação aqui, como limpar cache antigo
  });
  
  // Este evento é disparado quando uma notificação push é recebida
  self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.notification.title || 'Notificação de Exemplo';
    const options = {
      body: data.notification.body || 'Corpo da notificação',
      icon: 'images/icon.png',
      badge: 'images/badge.png',
      data: { url: data.data.url },
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  // Este evento é disparado quando o usuário clica na notificação
  self.addEventListener('notificationclick', (event) => {
    const url = event.notification.data.url;
    event.notification.close();
  });
  