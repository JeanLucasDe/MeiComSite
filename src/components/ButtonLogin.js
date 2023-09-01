import styles from "./NavBar.module.css"
import { FaRegUser, FaSignOutAlt, FaUserAlt } from "react-icons/fa"
import User from "../Hooks/User"
import {firebase, auth} from "../Service/firebase"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"



export default function ButtonLogin () {

    const [user, setUser] = useState();
    
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




    const [userLogin, setUserLogin] = useState();

    const HandleClickLoginGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider);
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


    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }

   
    return (
        <>
            {user ? 
            <div>
            <img src={User && User[0].avatar} className={styles.avatar}
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            />
            <div className={`dropdown-menu ${styles.content_login}`}>
                <div className={styles.cont_user}>
                    <div className={styles.email}>
                        <strong>{User && User[0].email}</strong>
                    </div>
                    <Link to={`/perfil/user/negocio`} className={styles.link}><FaUserAlt/> Perfil</Link>
                    <div className={styles.logout}>
                        <div>
                            <button onClick={handleClickLogOut}><FaSignOutAlt/> sair</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            :
            <div>
                <button className={`button_link ${styles.btn_login}`} onClick={HandleClickLoginGoogle}><FaRegUser className={styles.icon}/>Entrar</button>
            </div>
            
            }
           
        </>
        )
}