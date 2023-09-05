import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import styles from "./Login.module.css"
import Register from "./Register"
import firebase from 'firebase/compat/app';
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";




export default function Login () {

    const [register, setRegister] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [user, setUser] = useState();

    useEffect (()=>{
        try{
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const {uid, displayName, photoURL, email} = user
                    setUser({
                        id: uid,
                        avatar: photoURL ? photoURL : '',
                        name: displayName ? displayName : '',
                        email
                    })
                }
            })
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const HandleLoginIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, pass)
    }
    
    const [userLogin, setUserLogin] = useState();

    const HandleClickLoginGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider);
        if (!result.user) {
            const {uid, displayName, photoURL} = result.user
            if (!displayName && !photoURL) {
                throw new Error('Usuário sem Nome ou foto')
            }
            setUserLogin({
                id: uid,
                avatar: photoURL,
                name: displayName
            })
        }
    }

    return (
        <>
            <NavBar/>
            <div className={styles.container}>
                <div className="row">
                    <div className="col-md-7">

                    </div>
                    <div className="col-md-5">
                        {!user?
                        <div className={styles.cont_login}>
                            <h4>Entrar</h4>
                            <p>Email</p>
                            <input type="email" onChange={(el)=> setEmail(el.target.value)}
                            placeholder="Digite seu Email"
                            />
                            <p>Senha</p>
                            <input type="password" onChange={(el)=> setPass(el.target.value)}
                            placeholder="*********"
                            />
                            <button
                            onClick={() => HandleLoginIn()}
                            className={styles.btn_login}
                            >
                            Entrar
                            </button>
                            <div className={styles.space}/>
                            <p className={styles.or}>Ou Entre com</p>

                            <button
                            onClick={() => HandleClickLoginGoogle()}
                            className={styles.btn_google}
                            ><FaGoogle/> Entrar com Google</button>

                            <p>Ainda não tem conta? <Link 
                            className={styles.btn_register}
                            to="/register"
                            onClick={() => setRegister(!register)}
                            >Registre-se agora!</Link></p>
                        </div>
                        :
                        <div className={styles.cont_login}>
                            <h4>Você já está logado!</h4>
                        </div>
                        }
                    </div>
                </div>

            </div>
        </>
        )
}