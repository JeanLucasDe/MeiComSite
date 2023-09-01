import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXXzaD7NWOJf12qCggMp0fKoEA0elNhyM",
  authDomain: "fir-auth-99797.firebaseapp.com",
  projectId: "fir-auth-99797",
  storageBucket: "fir-auth-99797.appspot.com",
  messagingSenderId: "673295267800",
  appId: "1:673295267800:web:afe6dd9d2f8934591fe4ad"
};
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export {firebase, auth, app} 
