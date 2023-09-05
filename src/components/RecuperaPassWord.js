import { useState } from "react"
import styles from "./RecuperaPassWord.module.css"
import firebase from 'firebase/compat/app';
import { toast, ToastContainer } from "react-toastify";


export default function RecuperaPassWord () {
    const [email, setEmail] = useState()

    const RecoveryPassWord = () => {
        firebase.auth().sendPasswordResetEmail(email).then(()=> {
            toast.success('Email Enviado com sucesso!')
        }).catch (()=> {
            toast.error('Confira se o email está correto.')
        })
    }

    return (
        <>
        <div className={styles.container}>
            <h5>Insira seu Email</h5>
            <input type="email" 
            className={styles.input}
            placeholder="Digite Aqui"
            onChange={(el)=> setEmail(el.target.value)}/>
            {email && <p>Confira sua caixa de spam</p>}
            {email &&
            <button
            className={styles.btn_send}
            onClick={RecoveryPassWord}
            >Enviar</button>
            }
        </div>
        </>
        )
}