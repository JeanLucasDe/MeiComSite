

import NavBarUser from "../layouts/layoutsPerfil/NavBarUser";
import styles from "../layouts/layoutsPerfil/NavBarUser.module.css"
import Loading from "../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import {App, vapidKey} from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs,doc, setDoc, updateDoc} from "@firebase/firestore";
import {  Link, Outlet } from "react-router-dom"
import { getMessaging, getToken } from "firebase/messaging";
import NavBar from "../components/NavBar"



export default function Perfil () {
    
    const [verifica, setVerfica] = useState(false)
    const [modo, setModo] = useState()
    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const [servicos, setServicos] = useState([])
    const [agenda, setAgenda] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [vendas, setVendas] = useState([])
    const [loading, setLoading] = useState(false)
    const [tokens, setTokens] = useState([])
    const [token, setToken] = useState()
    const db = getFirestore(App)
    const messaging = getMessaging(App);
    const Collec = collection(db, "MeiComSite")
    const UserCollectionTokens = collection(db, "tokens")
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/produtos`)
    const UserCollectionVendas = collection(db, `MeiComSite/${user && user.email}/vendas`)
    const UserCollectionServicos = collection(db, `MeiComSite/${user && user.email}/servicos`)
    const UserCollectionAgenda = collection(db, `MeiComSite/${user && user.email}/agenda`)

    
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
                } else window.location.href='/login'
            })
            const getUsers = async () => {
                const dataUser = await getDocs(Collec)
                setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                const usuario = usuarios && user && usuarios.filter(dados => dados.email == user.email) || []

            };
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                getToken(messaging, { vapidKey: 'BA6S9WD0UpWmB94zmX9szFl2fICZb3N7BaBjTvt75i2mSm_MWjNzIktvsR7FHNTXGB3u5-JeUg_xLLzTFHJR6co' }).then((currentToken) => {
                    if (currentToken) {
                    setToken(currentToken); // Armazena o token do dispositivo
                    } else {
                    console.log("Nenhum token disponível.");
                    }
                });
                } else {
                console.log("Permissão de notificação negada");
                }
            });
            getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const usuario = usuarios && user && usuarios.filter(dados => dados.email == user.email) || []

    console.log(token)
    

    if (user) {
        setTimeout(()=> {
            if (usuario.length > 0) {
                if (!loading) {
                    const dataSeach = async() => {
                        const data = await getDocs(UserCollection);
                        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                        const dataVendas = await getDocs(UserCollectionVendas);
                        setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                        const dataServicos = await getDocs(UserCollectionServicos);
                        setServicos((dataServicos.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                        const dataAgenda = await getDocs(UserCollectionAgenda);
                        setAgenda((dataAgenda.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                        const dataTokens = await getDocs(UserCollectionTokens);
                        setTokens((dataTokens.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    }
                    const VerificaToken = async() => {
                        if (usuario[0].tokenID) {
                            if (usuario[0].tokenID != token) {
                                await updateDoc(doc(db, `MeiComSite`, `${user.email}`), {
                                    tokenID:token
                                })
                            } 
                        } else {
                            await updateDoc(doc(db, `MeiComSite`, `${user.email}`), {
                                tokenID:token
                            })
                        }
                    }
                    dataSeach()
                    setLoading(true)
                }
            } else {
                setLoading(true)
            }
        },2000)
    }
   

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
            <div className={styles.container}>
                {!loading ? <Loading/> : 
                <div>
                    {usuario.length > 0 ?
                    <div>
                        {usuario && usuario[0].mod == 'Alimentação' && 
                        <div className="row">
                            <div className={`${styles.col} col-lg-2`}>
                                <NavBarUser mod={usuario && usuario[0].mod} usuario={usuario && usuario[0]} user={user}/>
                            </div>
                            <div className={`${styles.main} col-lg-10`}>
                                
                                <Outlet context={[mod, produtos && produtos, usuario, vendas, user]} className={styles.main}/>
                            </div>
                        </div>}
                        
                        
                        {usuario && usuario[0].mod == 'Agenda' && 
                            <div> 
                                <div className={styles.navBar}>
                                    <NavBar/>
                                </div>
                                <div className="row">
                                    <div className={`col-lg-3 col-md-4`}>
                                        <div className={styles.col}>
                                            <NavBarUser mod={usuario && usuario[0].mod} usuario={usuario && usuario[0]} user={user}/>
                                        </div>
                                    </div>
                                    <div className={`col-lg-9 col-md-8 col-sm-12`}>
                                        <div className={styles.main}>
                                            <Outlet context={[mod, produtos && produtos, usuario, vendas, user, agenda,servicos, token]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }


                    </div>
                    :
                    <div className={styles.cont_empty}>
                        <img src='https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-8.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais' className={styles.logo}/>
                        <h4>Complete seu cadastro para Continuar</h4>
                        <Link to="/cadastro"
                        className={styles.btn_continue}
                        >Continuar</Link>
                    </div>
                }
                {!user && <div className={styles.cont_empty}>
                    <img src='https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-8.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais' className={styles.logo}/>
                    <h4>Faça Login Para continuar</h4>
                    <Link to="/login"
                    className={styles.btn_continue}
                    >Continuar</Link>
                </div>}

                </div>
            }
                
                    
            </div>
                
                
                
                
        </div>
        )
}