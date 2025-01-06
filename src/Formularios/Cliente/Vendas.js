import App from "../../Hooks/App"
import styles from "./Vendas.module.css"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {auth} from "../../Service/firebase"
import { useState,useEffect } from "react"
import Loading from "../../components/Loading"
import VerDetalhesPedido from "../../components/VerDetalhesPedido";
import { Link, NavLink, Outlet, useOutletContext } from "react-router-dom";
import DetalhesVenda from "./DetalhesVenda";



export default function Vendas () {
    
    const [mod, produtos, usuario,vendas] = useOutletContext()
    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
  

    return (
            <>
                {usuario.length > 0 && usuario[0].admin && usuario[0].mod == 'Alimentação' ?
                <Outlet  context={[vendas && vendas, usuario]} />
                :
                <div className={styles.cont_empty}>
                    <img src="https://img.freepik.com/free-vector/hand-drawn-facepalm-illustration_23-2150199871.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"/>
                    <h4>Desculpe, você ainda não tem permissão para prosseguir</h4>

                </div>
                }
            </>
        )
}