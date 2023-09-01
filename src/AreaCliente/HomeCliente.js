import { useState,useEffect } from "react"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Outlet, useParams } from "react-router-dom"
import NavigationBar from "./components/NavegationBar";
import LinkMeiComSite from "./components/LinkMeiComSite"


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
            
            <div>
                {/*<NavigationBar info={cliente && cliente[0]}/>*/}
                <Outlet context={[prod && prod, cliente, vendas]}/>
            </div>
            <LinkMeiComSite/>
            

        </>
        )
}