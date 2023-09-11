import { Link, useParams } from "react-router-dom"
import styles from "./ViewPedido.module.css"
import App from "../Hooks/App"
import { useState, useEffect } from "react"
import '@firebase/firestore';
import NavBar from "../components/NavBar";
import DetalhesVenda from "../Formularios/Cliente/DetalhesVenda"
import '@firebase/firestore';
import { doc, updateDoc, getFirestore, collection, getDocs} from "@firebase/firestore";


export default function EntregaPedido() {

    const {loja, pedido} = useParams()
    const [usuarios, setUsuarios] = useState([])
    const [vendas, setVendas] = useState([])
    const [lista, setLista] = useState(false)

    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const usuario = usuarios.length > 0 && usuarios.filter(dado => dado.idloja == parseFloat(loja))
    const VendasCollection = collection(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`)



   
    const getUsers = async () => {
        const dataUser = await getDocs(UserCollection)
        setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const datavendas = await getDocs(VendasCollection)
        setVendas((datavendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLista(true)
    }
    if(!lista) {
        getUsers()
    }

    const FiltraEntrega = () => {
        let filter = vendas.length > 0 && vendas.filter(dados => dados.id ==  pedido )
        return filter
    }
    const vendasEntrega = FiltraEntrega()
    
    const FinalizarEntrega = async() => {
        await updateDoc(doc(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`, pedido), {
            state: 4
        });
        window.location.href = `/pedidos/${loja}`
    }


    return(
        <>
            <NavBar/>
            <div className={styles.content_pedido}>
                {vendasEntrega && 
                <div>
                    <DetalhesVenda obj={vendasEntrega[0]}/>
                </div>
                }
                    
            </div>

            <button
            className={`${styles.t_center} ${styles.btn_busca}`}
            onClick={() => FinalizarEntrega()}
            >
                Finalizar Entrega
            </button>
        </>
        )
}