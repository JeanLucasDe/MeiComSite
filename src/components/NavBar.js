import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import {FaBars, FaHome, FaUser} from "react-icons/fa"
import MenuMobile from "./MenuMobile"
import styles_ from "../Pages/Casa.module.css"
import logo from "../imagens/logo.png"
import { useEffect, useState } from "react"
import firebase  from 'firebase/compat/app' 
import {app} from "../Service/firebase" 


export default function NavBar () {

    const [user, setUser] = useState();

    
    
    useEffect (()=>{
        try{
            
            app.auth().onAuthStateChanged(user => {
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
    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }

return (
    <div className={styles.container}>
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles_.navbar}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <img src={logo} alt="logo" className={styles_.logo} />ei com Site
                </Link>
                <div>
                    {user && <Link to="/perfil/user/config" className={styles.icon_mobile}>
                        <FaUser className={styles.ico}/>
                    </Link>}
                    <button
                    className={`navbar-toggler ${styles.ico}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className={`navbar-toggler-icon`}></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {/* Dropdown de Serviços */}
                        <li className="nav-item dropdown">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuLink"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Serviços
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <ul className={styles.g_2}>
                                <li ><Link className="dropdown-item" to="/perfil/user/painel">Painel</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/planos">Planos</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/servicos">Serviços</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/agenda">Agenda</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/consultas">Consultas</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/relatorio">Relatório</Link></li>
                            </ul>
                        </div>
                        </li>
                        {/* Dropdown de Configurações */}
                        <li className="nav-item dropdown">
                        {user && <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdownMenuConfig"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Configurações
                        </a>}
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuConfig">
                            <ul className={styles.g_2}>
                                <li><Link className="dropdown-item" to="/perfil/user/config">Geral</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/empresa">Empresa</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/horarios">Horário</Link></li>
                                <li><Link className="dropdown-item" to="/perfil/user/temas">Temas</Link></li>
                            </ul>
                        </div>
                        </li>

                        {/* Outros links */}
                        {!user && <li className="nav-item">
                        <Link className="nav-link" to="/login">Entrar</Link>
                        </li>}
                        <li className="nav-item">
                        <Link className="nav-link" to="/suporte">Ajuda</Link>
                        </li>
                        {user && <li className="nav-item">
                        <a className="nav-link" onClick={() => handleClickLogOut()}>Sair</a>
                        </li>}
                    </ul>
                </div>
                    {user && <Link to="/perfil/user/config" className={styles.icon_desk}>
                        <FaUser className={styles.ico}/>
                    </Link>}
            </div>
        </nav>
    </div>
    )
}