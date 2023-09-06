
import NavBar from "../components/NavBar";
import Footer from "../layouts/layoutsHome/Footer";
import NavBarUser from "../layouts/layoutsPerfil/NavBarUser";
import styles from "../layouts/layoutsPerfil/NavBarUser.module.css"

import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {  Link, Outlet } from "react-router-dom"


export default function Perfil () {
    
    const [verifica, setVerfica] = useState(false)
    const [modo, setModo] = useState()
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [redirect, setRecirect] = useState()
    const [usuarios, setUsuarios] = useState([])
    const [vendas, setVendas] = useState([])
    const db = getFirestore(App)
    const Collec = collection(db, "MeiComSite")
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/produtos`)
    const UserCollectionVendas = collection(db, `MeiComSite/${user && user.email}/vendas`)

    useEffect (()=>{
        try{
            auth.onAuthStateChanged(user => {
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

    const getUsers = async () => {
        const dataUser = await getDocs(Collec)
        setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const data = await getDocs(UserCollection);
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataVendas = await getDocs(UserCollectionVendas);
        setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    };
    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }

    const usuario = usuarios && user && usuarios.filter(dados => dados.email == user.email)
    
    
    const pegaDados = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsitemodo`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsitemodo`))
        }

        if (!produtosSalvos) {
            produtosSalvos.push({modo:true})
            localStorage.setItem(`meicomsitemodo`,JSON.stringify(produtosSalvos))
        }

        return produtosSalvos
    }

    const dados = pegaDados() 
    const mod = dados.length > 0 ? dados[0].modo : true

    if (!verifica) {
        if (mod) {
            setModo(mod)
            setVerfica(true)
        } 
    }


    return (
        <div>
            <NavBar/>
                {user ?
                <div>
                    {usuario && usuario.length > 0 ?
                    <div className="row">

                        {usuario && usuario.length > 0 &&
                        <div className={`${styles.col} col-md-2`}>
                            <NavBarUser/>
                        </div>
                        }
                        
                        <div className="col-md-10">
                            <Outlet context={[mod, produtos, usuario, vendas, user]}/>
                        </div>
                    </div>:
                    <div className={styles.cont_empty}>
                        <img src='https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-8.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais' className={styles.logo}/>
                        <h4>Complete seu cadastro para Continuar</h4>
                        <Link to="/cadastro"
                        className={styles.btn_continue}
                        >Continuar</Link>
                    </div>
                    
                }
                </div>
                :
                <div></div>
                }
                
            <Footer/>
        </div>
        )
}