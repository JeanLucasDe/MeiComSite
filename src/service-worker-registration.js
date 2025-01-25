// service-worker-registration.js

export default function register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('https://serviceworker-hfytj6n4kq-uc.a.run.app/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    }
  }
  