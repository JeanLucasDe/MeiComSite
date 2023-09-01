import App from "../../Hooks/App"
import styles from "./Vendas.module.css"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {auth} from "../../Service/firebase"
import { useState,useEffect } from "react"
import Loading from "../../components/Loading"
import VerDetalhesPedido from "../../components/VerDetalhesPedido";
import { Link, NavLink, Outlet } from "react-router-dom";
import DetalhesVenda from "./DetalhesVenda";



export default function Vendas () {
    
    const [vendas, setVendas] = useState()
    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/vendas`)
    
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
        const data = await getDocs(UserCollection);
        setVendas((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoading(true)
    };

    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }

 
    console.log(vendas)


    
    return (
            <>
                <Outlet  context={[vendas && vendas]} />
            </>
        )
}