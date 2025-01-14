import BoxCriar from "../layouts/layoutsHome/BoxCriar";
import BoxCriarSiteGuia from "../layouts/layoutsHome/BoxCriarSiteGuia";
import BoxModalidade from "../layouts/layoutsHome/BoxModalidades";
import BoxPix from "../layouts/layoutsHome/BoxPix";
import BoxServiços from "../layouts/layoutsHome/boxServiços";
import BoxSuporte from "../layouts/layoutsHome/BoxSuporte";
import BoxTemplates from "../layouts/layoutsHome/BoxTemplates";
import Negocios from "../layouts/layoutsHome/negocios";
import PrincipaisDuvidas from "../layouts/layoutsHome/PrincipaisDuvidas";
import NavBar from "../components/NavBar"
import Footer from "../layouts/layoutsHome/Footer"

import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import {App} from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";

export default function Home () {

    const [verifica, setVerfica] = useState(false)
    const [modo, setModo] = useState()
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [vendas, setVendas] = useState([])
    const db = getFirestore(App)
    const Collec = collection(db, "MeiComSite")
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/produtos`)
    const UserCollectionVendas = collection(db, `MeiComSite/${user && user.email}/vendas`)

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
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const getUsers = async () => {
        const dataUser = await getDocs(Collec)
        setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const data = await getDocs(UserCollection);
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const dataVendas = await getDocs(UserCollectionVendas);
        setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    };
    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }

    const usuario = usuarios && user && usuarios.filter(dados => dados.email == user.email)
    
    
    const pegaDados = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsitemodo`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsitemodo`))
        }

        if (!produtosSalvos) {
            produtosSalvos.push({modo:true})
            localStorage.setItem(`meicomsitemodo`,JSON.stringify(produtosSalvos))
        }

        return produtosSalvos
    }

    const dados = pegaDados() 
    const mod = dados.length > 0 ? dados[0].modo : true

    if (!verifica) {
        if (mod) {
            setModo(mod)
            setVerfica(true)
        } 
    }


return (
    <div>
        <NavBar/>
        <Negocios user={user} usuario={usuario}/>
        <BoxServiços/>
        {/**<BoxPix/>*/}
        <BoxCriarSiteGuia user={user} usuario={usuario}/>
        <BoxModalidade/>
        <BoxTemplates/>
        <BoxCriar user={user} usuario={usuario}/>
        <BoxSuporte/>
        <PrincipaisDuvidas/>
        <Footer/>
    </div>    
    )
}