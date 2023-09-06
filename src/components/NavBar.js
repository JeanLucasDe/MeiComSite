import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import {FaBars, FaHome} from "react-icons/fa"
import MenuMobile from "./MenuMobile"
import ButtonLogin from "./ButtonLogin"

import { useEffect, useState } from "react"
import firebase from 'firebase/compat/app';


export default function NavBar () {

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

return (
    <div className={styles.container}>
        
        <div className={styles.content}>
            <Link to="/" className={styles.logo}>MeiComSite</Link>
            <div className={styles.menu}>
            <div className={`dropdown`}>
                <a className={`btn btn-secondary dropdown-toggle ${styles.link_drop}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                >
                    Explorar
                </a>
                <ul className={`${styles.list} dropdown-menu`}>
                    <li><Link to="/catalogo/alimentação" className={`${styles.item} dropdown-item`}>Restaurantes</Link></li>
                    <li><Link to="/catalogo/shopping" className={`${styles.item} dropdown-item`}>Lojas</Link></li>
                </ul>
            </div>
                <Link to="/planos">Planos e Preços</Link>
                <Link to="/page/demo" target="_blank">Demo</Link>
                <Link to="/suporte">Ajuda</Link>
            </div>
            <div className={styles.login}>
                {user &&
                <Link to="/perfil/user/config" className={styles.icon_home}><FaHome/></Link>
                }
                
                <div className={styles.border_left}></div>

                <ButtonLogin/>
                <div>
                    <FaBars className={`${styles.icon_mobile} navbar-toggler`} 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasNavbar" 
                    aria-controls="offcanvasNavbar"/>
                </div>

            </div>
        </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="h-100%">
                    <div class="overflow-auto"> 
                        <MenuMobile 
                        type="button"
                        data_bs_dismiss="offcanvas" 
                        aria_label="Close"
                        />
                    </div>
                </div>
            </div>
    </div>
    )
}