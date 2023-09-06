import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import styles from "./Login.module.css"
import firebase from 'firebase/compat/app';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import RecuperaPassWord from "../components/RecuperaPassWord";




export default function Login () {

    const [register, setRegister] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [user, setUser] = useState();
    const [showPass, setShowPass] = useState(false)


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
        if (!email || !pass) {
            return toast.error('Campos não podem ficar Vazios')
        }
        firebase.auth().signInWithEmailAndPassword(email, pass).then(() => {
            window.location.href = "/"
            return toast.success('Conectado com sucesso!')
        })
        .catch(() =>toast.error("Email ou senha incorretos"))
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
                        <img src="https://img.freepik.com/free-vector/handling-order-processing-abstract-concept-vector-illustration-order-documentation-processing-system-handling-customer-request-logistics-automated-logistics-operations-abstract-metaphor_335657-1789.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais" className={styles.logo}/>
                    </div>
                    <div className="col-md-5">
                        {!user?
                        <div className={styles.cont_login}>
                            <h4 className={styles.title}>Entrar</h4>
                            <strong>Email</strong>
                            <input type="email" onChange={(el)=> setEmail(el.target.value)}
                            placeholder="Digite seu Email"
                            />
                            <strong>Senha</strong>
                            <input type={!showPass ? "password": "text"} onChange={(el)=> setPass(el.target.value)}
                            placeholder="*********"
                            />
                            <div className={styles.cont_check}>
                                <input type="checkbox" onChange={()=> setShowPass(!showPass)}
                                className={styles.input_check}
                                />
                                <p>Mostrar senha</p>
                            </div>
                            <Link
                            className={styles.esqueceu_link}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#ModalRecupera`}
                            >Esqueceu a senha?</Link>
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
                            >
                            <img src="data:image/png;base64,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" className={styles.logo_google}/> Entrar com Google</button>

                            <p className={styles.rr}>Ainda não tem conta? <Link 
                            className={styles.btn_register}
                            to="/register"
                            onClick={() => setRegister(!register)}
                            >Registre-se agora!</Link></p>
                        </div>
                        :
                        <div >
                        </div>
                        }
                    </div>
                </div>

            </div>
            <ToastContainer/>

            <div className="modal fade" id="ModalRecupera" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <RecuperaPassWord/>
                    </div>
                </div>
            </div>
        </>
        )
}