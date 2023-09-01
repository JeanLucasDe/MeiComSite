import styles from "./Links.module.css"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Link } from "react-router-dom"
import { FaCopy, FaExternalLinkSquareAlt, FaLink } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";



export default function Membros () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [Users, setUsers] = useState([])
    const [copyText, setCopyText] = useState('');
    const [Usuario, SetUsuario] = useState([])
    const db = getFirestore(App)
    const Collection = collection(db, "MeiComSite")
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/membros`)
    
    useEffect (()=>{
        try{
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
        } catch (e) {
            <button> tentar novamente </button>
        }
        


    },[])

    
    const getUsers = async () => {
        const dataUss = await getDocs(Collection);
        SetUsuario((dataUss.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        const data = await getDocs(UserCollection);
        setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoading(true)
        setState(true)
    };  
    
    if (user) {
        if (!state) {
            getUsers()
        }
    }
    const usuario = Usuario && user && Usuario.filter(dados => dados.iduser == user.id)
    
    const copyToClipboard = (text) => {
        copy(text);
        toast.success('Link copiado com sucesso!');
     }

    
    return (
            <>
                {usuario && usuario.map(item => {
                    if (item.iduser == user.id) {
                        return (
                                <div className={styles.container_list}>
                                    <ul className={styles.list}>
                                        <strong>Link real</strong>
                                        <li>
                                            <div className={`${styles.cont_link} `}>
                                                <div className={`${styles.no_padding_no_margin}`}>
                                                    <div className={styles.link}>
                                                        <Link to={`/${usuario && usuario[0].site}`} target="_blank"
                                                        className={styles.copy_link}
                                                        >
                                                        <span>meicomsite.netlify.app{`/${usuario && usuario[0].site}`} </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className={`${styles.no_padding_no_margin}`}>
                                                    <div className={styles.copy}>
                                                        <FaCopy
                                                        type="button"
                                                        onClick={() => 
                                                            copyToClipboard(`meicomsite.netlify.app/${usuario && usuario[0].site}`)
                                                        }
                                                        className={styles.icon}
                                                        />
                                                        <Link
                                                        to={`/${usuario && usuario[0].site}`}
                                                        className={styles.btn_link}
                                                        target="_blank"
                                                        >
                                                            <FaExternalLinkSquareAlt
                                                            className={styles.icon}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <strong>Link de teste</strong>
                                        <li>
                                            <div className={`${styles.cont_link} `}>
                                                <div className={`${styles.no_padding_no_margin}`}>
                                                    <div className={styles.link}>
                                                        <Link to={`/${usuario && usuario[0].site}/testarea`} target="_blank"
                                                        className={styles.copy_link}
                                                        >
                                                            <span>meicomsite.netlify.app{`/${usuario && usuario[0].site}/testarea`} </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className={`${styles.no_padding_no_margin}`}>
                                                    <div className={styles.copy}>
                                                        <FaCopy
                                                        type="button"
                                                        onClick={() => copyToClipboard(`meicomsite.netlify.app/${usuario && usuario[0].site}/testarea`)}
                                                        className={styles.icon}
                                                        />
                                                        <Link
                                                        to={`/${usuario && usuario[0].site}/testarea`}
                                                        className={styles.btn_link}
                                                        target="_blank"
                                                        >
                                                            <FaExternalLinkSquareAlt
                                                            className={styles.icon}
                                                            />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                    }
                })}
                {usuario && usuario.length == 0 &&
                <div className={styles.container_off}>
                    <h4>Usuário não cadastrado</h4>
                    <Link to="/perfil/cadastro">Cadastrar agora!</Link>
                </div>
                }
                <ToastContainer/>

            
            </>
        )
}