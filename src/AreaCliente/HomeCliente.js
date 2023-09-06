import { useState,useEffect } from "react"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Outlet, useParams } from "react-router-dom"
import NavigationBar from "./components/NavegationBar";
import LinkMeiComSite from "./components/LinkMeiComSite"
import styles from "./HomeCliente.module.css"


export default function HomeCliente () {

    
    const {site} = useParams()
    const [clientes, setClientes] = useState([])
    const [vendas, setVendas] = useState([])
    const [ok, setOk] = useState()
    const [prod, setProd] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const cliente = clientes.length > 0 && clientes.filter(dado => dado.site == site)
    const ProdCollection = collection(db, `MeiComSite/${cliente && cliente[0].email}/produtos`)
    const VendasCollection = collection(db, `MeiComSite/${cliente && cliente[0].email}/vendas`)


    const getUsers = async () => {
        const data = await getDocs(UserCollection);
        setClientes((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataProd = await getDocs(ProdCollection)
        setProd((dataProd.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataVendas = await getDocs(VendasCollection)
        setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setOk(true)
    }
    if (!ok) {
        getUsers()
    }


    return (
        <>
            {cliente && cliente.length > 0 && cliente[0].status == "pronto" ?
            <div>
                {/*<NavigationBar info={cliente && cliente[0]}/>*/}
                <Outlet context={[prod && prod, cliente, vendas]}/>
            </div>
            :
            <div className={styles.cont_empty}>
                <img src="https://img.freepik.com/free-vector/computer-user-human-character-program-windows_1284-63445.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"
                />
                <h5>Ainda não há permissão para exibir esta página.</h5>
            </div>
            }
            <LinkMeiComSite/>
            

        </>
        )
}