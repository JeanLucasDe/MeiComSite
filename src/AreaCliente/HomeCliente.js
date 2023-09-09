import { useState,useEffect } from "react"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { Outlet, useParams } from "react-router-dom"
import NavigationBar from "./components/NavegationBar";
import LinkMeiComSite from "./components/LinkMeiComSite"
import styles from "./HomeCliente.module.css"
import Loading from "../components/Loading";
import moment from "moment/moment";


export default function HomeCliente () {

    
    const {site} = useParams()
    const [clientes, setClientes] = useState([])
    const [vendas, setVendas] = useState([])
    const [ok, setOk] = useState()
    const [funcionamento, setFuncionamento] = useState(false)
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
        if (cliente && cliente.length > 0) {
            if (horarioAtual <= fechaHora && horarioAtual >= abreHora) {
                setFuncionamento(1)
            } else {
                setFuncionamento(2)
            }
        }
        setOk(true)

    }
    if (!ok) {
        getUsers()
    }

    const {abre, fecha} =  cliente.length > 0 && cliente[0]
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
            {!cliente.length && <Loading/>}

            {cliente.length > 0 && cliente[0].admin &&
            <div>
                {cliente && cliente[0].admin ?

                
                <div>
                    {cliente && cliente[0].admin && ok &&funcionamento == 1 ?
                    <div>
                        {/*<NavigationBar info={cliente && cliente[0]}/>*/}
                        <Outlet context={[prod && prod, cliente, vendas]}/>
                    </div>:
                    <div>
                        <div className={styles.cont_empty}>
                            <img src="https://img.freepik.com/free-vector/postponed-concept-hand-drawn-design_23-2148500980.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"
                            />
                            <h5>Desculpe, estamos fechados.</h5>
                        </div>
                    </div>
                    }
                </div>
                
                :

                cliente && cliente.length > 0 &&

                <div className={styles.cont_empty}>
                    <img src="https://img.freepik.com/free-vector/computer-user-human-character-program-windows_1284-63445.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"
                    />
                    <h5>Ainda não há permissão para exibir esta página.</h5>
                </div>
            }
                
            </div>
            }
            <LinkMeiComSite/>
            

        </>
        )
}