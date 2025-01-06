import styles from "./NavBar.module.css"
import { FaRegUser, FaSignOutAlt, FaUserAlt, FaUserCircle } from "react-icons/fa"
import {firebase, auth} from "../Service/firebase"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"



export default function ButtonLogin () {


    const [user, setUser] = useState();
    
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                setUser({
                    id: uid,
                    nome:displayName ? displayName : '',
                    avatar:photoURL ? photoURL : '',
                    email
                })
            }
        })
    }, [])



    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }


    return (
        <>
            {user ? 
            <div>
            
            <img src={!user.avatar ? "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg" : user.avatar} className={styles.avatar}
            type="button" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            />
            <div className={`dropdown-menu ${styles.content_login}`}>
                <div className={styles.cont_user}>
                    <div className={styles.email}>
                        <strong>{user && user.email}</strong>
                    </div>
                    <Link to={`/perfil/user/config`} className={styles.link}><FaUserAlt/> Perfil</Link>
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
                <Link className={`button_link ${styles.btn_login}`} to="/login"><FaRegUser className={styles.icon}/>Entrar</Link>
            </div>
            
            }
           
        </>
        )
}