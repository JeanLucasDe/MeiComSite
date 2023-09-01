import styles from "./InfoPerfil.module.css"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";

export default function InfoPerfil () {

    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const [user, setUser] = useState([]);
    const UserCollection = collection(db, "MeiComSite")
    
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                    email
                })
            }
        })
    }, [])
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    let index = produtos && user && produtos.findIndex(prop => prop.iduser == user.id)


    
    return (
        <>
            {user  &&
            index <= 0 ? 
            produtos && produtos.map(dados => {
                if (dados.iduser == user.id) {
                    return (
                            <div>
                                <div className={styles.cont_user}>
                                    <div className={styles.cont_header}>
                                        <h4 className={styles.name}>{dados.nome}<span className={styles.state}>{dados.status}</span></h4>
                                    </div>
                                        <strong>{dados.email}</strong>
                                        <p></p>
                                    <div className={styles.line}></div>
                                    <p>Bem-Vindo</p>
                                </div>
                            </div>
                        )
                }
            })
            :
            <div>

            </div>
            }
            
        </>
        )
}