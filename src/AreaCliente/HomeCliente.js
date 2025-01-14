import { useState,useEffect } from "react"
import {App} from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Outlet, useParams } from "react-router-dom"
import LinkMeiComSite from "./components/LinkMeiComSite"
import styles from "./HomeCliente.module.css"
import Loading from "../components/Loading";
import moment from "moment/moment";


export default function HomeCliente () {

    
    const {site} = useParams()
    const [clientes, setClientes] = useState([])
    const [vendas, setVendas] = useState([])
    const [servicos, setServicos] = useState([])
    const [agenda, setAgenda] = useState([])
    const [ok, setOk] = useState()
    const [funcionamento, setFuncionamento] = useState(1)
    const [prod, setProd] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const cliente = clientes.length > 0 && clientes.filter(dado => dado.site == site)
    const ProdCollection = collection(db, `MeiComSite/${cliente.length > 0 && cliente[0].email}/produtos`)
    const VendasCollection = collection(db, `MeiComSite/${cliente.length > 0 && cliente[0].email}/vendas`)
    const UserCollectionServicos = collection(db, `MeiComSite/${cliente.length > 0 && cliente[0].email}/servicos`)
    const UserCollectionAgenda = collection(db, `MeiComSite/${cliente.length > 0 && cliente[0].email}/agenda`)


    const {abre, fecha, pause} =  cliente.length > 0 && cliente[0]
    const modalidade = cliente.length > 0 && cliente[0].mod
    

    const getUsers = async () => {
        const data = await getDocs(UserCollection);
        setClientes((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataProd = await getDocs(ProdCollection)
        setProd((dataProd.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataVendas = await getDocs(VendasCollection)
        setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        const dataServicos = await getDocs(UserCollectionServicos);
        setServicos((dataServicos.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataAgenda = await getDocs(UserCollectionAgenda);
        setAgenda((dataAgenda.docs.map((doc) => ({...doc.data(), id: doc.id}))))

        if (cliente && cliente.length > 0) {
            if (cliente[0].admin) {
                if (modalidade == 'Agenda') {
                    if (pause) {
                        setFuncionamento(2)
                    } else {
                        setFuncionamento(3)
                    }
                } 
                if (modalidade == 'Alimentação') {
                    if (pause) {
                        if (horarioAtual >= abreHora && horarioAtual <= fechaHora) {
                            setFuncionamento(2)
                        } else {
                            setFuncionamento(3)
                        }
                    } else {
                        setFuncionamento(3)
                    }
                } 
            } else {
                setFuncionamento(0)
            }
        }

        setOk(true)
    }

    if (!ok) {
        getUsers()
    }

    const FormataHora = (hora) => {
        let date = hora.split(':')

        return parseFloat(date[0]) 
    }

    var abreHora = cliente.length > 0 && FormataHora(abre)
    var fechaHora = cliente.length > 0 && FormataHora(fecha)
    var horarioAtual = moment().format('HH')
    horarioAtual = parseFloat(horarioAtual)



    return (
        <>
            {funcionamento == 1  && <Loading/>}


            {funcionamento == 2 &&
            <div>
                <Outlet context={[prod && prod, cliente, vendas, agenda, servicos]}/>
            </div>}

            {funcionamento == 3 &&
            <div>
                <div className={styles.cont_empty}>
                    <img src="https://img.freepik.com/free-vector/postponed-concept-hand-drawn-design_23-2148500980.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"
                    />
                    <h5>Desculpe, estamos fechados.</h5>
                </div>
            </div>
            }
                
            {funcionamento == 0  && <div className={styles.cont_empty}>
                <img src="https://img.freepik.com/free-vector/computer-user-human-character-program-windows_1284-63445.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"
                />
                <h5>Ainda não há permissão para exibir esta página.</h5>
            </div>}

        </>
        )
}