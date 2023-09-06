import { useState } from "react"
import styles from "./RecuperaPassWord.module.css"
import firebase from 'firebase/compat/app';
import { toast, ToastContainer } from "react-toastify";


export default function RecuperaPassWord (props) {
    const [email, setEmail] = useState()

    const RecoveryPassWord = () => {
        firebase.auth().sendPasswordResetEmail(email || props.email).then(()=> {
            toast.success('Email de recuperação enviado com sucesso!')
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
            defaultValue={props.email && props.email}
            onChange={(el)=> setEmail(el.target.value)}/>
            {email || props.email && <strong>Confira sua caixa de spam</strong>}
            
            {email || props.email &&
            <button
            className={styles.btn_send}
            onClick={RecoveryPassWord}
            >Enviar</button>
            }
        </div>
        </>
        )
}