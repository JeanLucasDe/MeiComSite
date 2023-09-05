import styles from "./Register.module.css"
import { useState } from "react"
import firebase from 'firebase/compat/app';
import NavBar from "../components/NavBar";

export default function Register () {
    
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [register, setRegister] = useState()

    const HandleSignIn = () => {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
    }

    return (
            <>
                <NavBar/>
                <div className={styles.container}>
                    <h4>Registrar</h4>
                    <p>Email</p>
                    <input type="email" onChange={(el)=> setEmail(el.target.value)}/>
                    <p>Senha</p>
                    <input type="password" onChange={(el)=> setPass(el.target.value)}/>
                    <button
                    onClick={() => HandleSignIn()}
                    >
                    Registrar
                    </button>
                </div>
                
            
            </>
        )
}