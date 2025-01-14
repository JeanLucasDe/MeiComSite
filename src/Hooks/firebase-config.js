import { firebaseConfig,App } from "./App";
import { getMessaging, getToken } from "firebase/messaging";


// Função para solicitar permissões de notificação
export const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const messaging = getMessaging(App);
        const token = await getToken(messaging, {
          vapidKey: "BA6S9WD0UpWmB94zmX9szFl2fICZb3N7BaBjTvt75i2mSm_MWjNzIktvsR7FHNTXGB3u5-JeUg_xLLzTFHJR6co",
        });
        console.log("Token obtido:", token);
        return token;
      } else {
        console.error("Permissão negada");
      }
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error);
    }
  };