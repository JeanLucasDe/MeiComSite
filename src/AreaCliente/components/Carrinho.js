import { Link, Outlet, useParams } from "react-router-dom"
import styles from "./Carrinho.module.css"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import App from "../../Hooks/App";
import { useEffect, useState } from "react";
import {FaPlus, FaMinus, FaTrash} from "react-icons/fa"
import NavShop from "../components/NavShop"
import BoxConfirm from "../../components/BoxConfirm";
import Loading from "../../components/Loading"

export default function Carrinho () {
    
    const {site} = useParams()
    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [user, setUser] = useState([])
    const [id, setId] = useState()
    const [ação, setAção] = useState()
    const [load, setLoading] = useState(false)

    useEffect(()=>{
        const getUsers = async () => {
            const data = await getDocs(UserCollection)
            setUser((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
            setLoading(true)
        }   
        getUsers()
    }, [])


    const usuario = user && user.filter(dados => {
        if (dados.site == site) {
            return dados
        }
    })
    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        return produtosSalvos
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    const addQtd = (id) => {
        let produtosSalvos = new Array()

        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        let index = produtosSalvos.findIndex(prop => prop.id == id)

        
        const obj = produtosSalvos[index]
        obj['qtd'] += 1 
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        window.location.reload()
    }
    const subQtd = (id) => {
        let produtosSalvos = new Array()

        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        let index = produtosSalvos.findIndex(prop => prop.id == id)

        
        const obj = produtosSalvos[index]
        obj['qtd'] -= 1 
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        window.location.reload()
    }
    
    
    
    const obj = {id, ação}
    const dados = pegaDados()
    
    const dadosUser = dados.filter(dados => dados.site == site)
    


    return (
            <>
            {usuario.length >0 && usuario[0].theme == "Dark" &&
                <div className={`${styles[usuario && usuario[0].theme]}`}>
                {dadosUser.length > 0 ?
                    <div className="row">
                    <div className="col-sm-7">
                    <div>
                        <ul className={`row ${styles.list}`}>
                        {dados && dados.map(dados => {
                            if (dados.site == site) {
                                return (
                                    <li key={dados.id}>
                                        <div className="row">
                                            <div className="col-3 col-sm-4">
                                                <Link
                                                    to={`/${site}/${dados.categoria}/${dados.nome.replaceAll(' ', '').toLowerCase()}`}
                                                >
                                                    <img src={dados.img} className={styles.img}/>
                                                </Link>
                                            </div>
                                            <div className="col-9 col-sm-7">
                                                <div className={styles.cont_desc}>
                                                    <div className="row">
                                                        <h5>{dados.nome}</h5>
                                                        <p>{FormataValor(dados.preço)}</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <strong>x{dados.qtd}</strong>
                                                            <FaPlus className={styles.icon}
                                                            onClick={() => addQtd(dados.id)}
                                                            />
                                                            <FaMinus className={styles.icon}
                                                            onClick={() => subQtd(dados.id)}
                                                            />
                                                        </div>
                                                        <div className="col-2">
                                                            <FaTrash className={styles.icon}
                                                            type="button" 
                                                            data-bs-toggle="modal" 
                                                            data-bs-target={`#ModalDeleteCompra`}
                                                            onClick={()=> {
                                                                setAção("Deletar Compra")
                                                                setId(dados.nome)
                                                            }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                            })}
                        </ul>
                    </div>
                </div>
                <div className={`${styles.no_padding_right} col-sm-5`}>
                    <Outlet context={usuario && usuario[0]}/>
                </div>
            </div>
            :
            <div className="row">
                <div className="col-sm-7">
                    <h1>Ainda não há compras aqui</h1>
                </div>
                <div className="col-sm-5">
                    <Outlet context={usuario && usuario[0]}/>
                </div>
            </div>
            }    
                    
            </div>
                    
            }
            {usuario.length >0 && usuario[0].theme == "Light" && 
                <div className={`${styles[usuario && usuario[0].theme]}`}>
                    <div className="row">
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-sm-7">
                                        <ul className={`row ${styles.list}`}>
                                            {dados && dados.map(dados => {
                                            return (
                                                <li key={dados.id}>
                                                    <div className="row">
                                                        <div className="col-4 col-sm-5">
                                                            <Link
                                                                to={`/${site}/produto/${dados.nome.replaceAll(' ', '').toLowerCase()}`}
                                                            >
                                                                <img src={dados.img} className={styles.img}/>
                                                            </Link>
                                                        </div>
                                                        <div className="col-8 col-sm-7">
                                                            <div className={styles.cont_desc}>
                                                                <div className="row">
                                                                    <h5>{dados.nome}</h5>
                                                                    <p>{FormataValor(dados.preço)}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-10">
                                                                        <strong>x{dados.qtd}</strong>
                                                                        <FaPlus className={styles.icon}
                                                                        onClick={() => addQtd(dados.id)}
                                                                        />
                                                                        <FaMinus className={styles.icon}
                                                                        onClick={() => subQtd(dados.id)}
                                                                        />
                                                                    </div>
                                                                    <div className="col-2">
                                                                        <FaTrash className={styles.icon}
                                                                        ype="button" 
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target={`#ModalDeleteCompra`}
                                                                        onClick={()=> {
                                                                            setAção("Deletar Compra")
                                                                            setId(dados.id)
                                                                        }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                    )
                                                })}
                                        </ul>
                                </div>
                                <div className={`${styles.no_padding_right} col-sm-5`}>
                                    <Outlet context={usuario && usuario[0]}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="modal fade" id="ModalDeleteCompra" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <BoxConfirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#ModalDeleteCompra`}
                            obj = {obj}
                            />
                    </div>
                </div>
            </div>
            {!load && <Loading/>}
            </>
        )
}