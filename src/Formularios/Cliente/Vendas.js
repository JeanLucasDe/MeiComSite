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
                <Outlet  context={[vendas && vendas]} />
            </>
        )
}