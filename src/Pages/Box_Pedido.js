import { Link, useParams } from "react-router-dom"
import styles from "./ViewPedido.module.css"
import App from "../Hooks/App"
import { useState, useEffect } from "react"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import NavBar from "../components/NavBar";


export default function Box_Pedido() {

    const {loja} = useParams()
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

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const FiltraVendasEntrega = () => {
        let filter = vendas.length > 0 && vendas.filter(dados => dados.state ==  3 )
        return filter
    }
    const vendasEntrega = FiltraVendasEntrega()
    


    return(
        <>
            <NavBar/>
            <div className={styles.container}>
                    <div className={styles.content_pedido}>
                    <h4>Pedidos a entregar</h4>
                    {usuario && usuario.length > 0 &&
                    <div>
                        <div className={styles.cont_loja}>
                            <h5>{usuario && usuario[0].razao}</h5>
                        </div>
                    </div>
                    }
                    <div className="line"/>
                    {vendasEntrega.length > 0 ? vendasEntrega.map(dados => {
                        return (
                            <Link
                            to={`/pedidos/${usuario[0].idloja}/${dados.id}`}
                            className={styles.btn_busca}
                            >
                                <p>{dados.nome}</p>
                                <p>{dados.bairro} - {FormataValor(dados.taxa)}</p>
                            </Link>
                            )
                    })
                    :
                    <div>
                        <div className="line"/>
                        <h5>Não há pedidos para entregar ainda.</h5>
                    </div>
                }
                </div>
            </div>

        </>
        )
}