import firebase from 'firebase/compat/app';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
    authDomain: "fir-auth-99797.firebaseapp.com",
    projectId: "fir-auth-99797",
    storageBucket: "fir-auth-99797.appspot.com",
    messagingSenderId: "673295267800",
    appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
  };
const App = firebase.initializeApp(firebaseConfig)

const vapidKey = "BA6S9WD0UpWmB94zmX9szFl2fICZb3N7BaBjTvt75i2mSm_MWjNzIktvsR7FHNTXGB3u5-JeUg_xLLzTFHJR6co"


export  {App, firebaseConfig, vapidKey}