
import styles from "./ViewPedido.module.css"
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import {App} from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import NavBar from "../components/NavBar"
import { Link } from "react-router-dom";


export default function View_pedido () {

    const [user, setUser] = useState();
    const [usuarios, setUsuarios] = useState([])
    const [idloja, setIDLoja] = useState()
    const [idpedido, setIDpedido] = useState()
    const [vendas, setVendas] = useState([])
    var [seed, setSeed] = useState(0)
    const db = getFirestore(App)
    const Collec = collection(db, "MeiComSite")
    const UserCollectionVendas = collection(db, `MeiComSite/${user && user.email}/vendas`)
    const [showPedido, setShowPedido] = useState(false)

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
            const getUsers = async () => {
                const dataUser = await getDocs(Collec)
                setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                const dataVendas = await getDocs(UserCollectionVendas);
                setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
            };
            getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const usuario = usuarios && usuarios.filter(dados =>  parseFloat(idloja) == dados.idloja)
 
    
    
    
    return (
            <>
                <NavBar/>
                <div className={styles.container}>
                        <div className={styles.content_pedido}>
                        <h4>Qual o ID da loja?</h4>
                        {usuario && usuario.length > 0 &&
                        <div>
                            <div className={styles.cont_loja}>
                                <h5>{usuario && usuario[0].razao}</h5>
                            </div>
                        </div>
                        }
                        <input type="number" 
                        placeholder="Digite aqui"
                        onChange={(el)=> setIDLoja(el.target.value)}
                        className={styles.input}
                        />
                        {usuario.length > 0 && 
                        <Link
                        to={`/entregas/${usuario[0].idloja}`}
                        className={styles.btn_busca}
                        onClick={()=> setShowPedido(false)}
                        >Ver Pedidos</Link>}
                    </div>
                </div>
                
                

            </>
        )
}