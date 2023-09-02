import { useOutletContext, useParams } from "react-router-dom"
import styles from "./Produtos.module.css"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs, setDoc, doc} from "@firebase/firestore";
import FormAdd from "../../AreaCliente/Admin/FormAdd"
import FormEdit from "../../AreaCliente/Admin/FormEdit"
import Loading from "../../components/Loading"
import { FaCircle, FaEdit, FaTrashAlt } from "react-icons/fa"
import BoxConfirm from "../../components/BoxConfirm"



export default function Produtos () {

    const {categoriaa} = useParams()
    const [mod] = useOutletContext()
    const [load, setLoading] = useState(false)
    const [ListaProdutos, SetListaProdutos] = useState()
    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [ação, setAção] = useState()
    const db = getFirestore(App)
    const Collec = collection(db, "MeiComSite")
    const UserCollection = collection(db, `MeiComSite/${user && user.email}/produtos`)

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
        const dataUser = await getDocs(Collec)
        setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        const data = await getDocs(UserCollection);
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setLoading(true)
    };
    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }
    
    const usuario = []

    user && usuarios.filter(dados => {
        if (dados.iduser == user.id) {
            usuario.push(dados)
        }
    })


   

    const indexProd = produtos && produtos.filter(dados => dados.categoria == categoriaa)
    
    const listProdutosTemp = []

    const cat = produtos.length > 0 && produtos.filter(dados => dados.categoria == categoriaa)
    const img = cat && cat[0].img
    const destaque = cat && cat[0].destaque
    const mostrar = cat && cat[0].mostrar
    const text = cat && cat[0].text
    const id = cat && cat[0].id
    listProdutosTemp.push(cat && cat[0].produtos)

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    const [dados, setDados] = useState()


    const obj = {
        dados,
        ação,
        lista: indexProd.length > 0 && indexProd[0].produtos,
        categoriaa,
        id
    }

    const [index, setIndex] = useState()


    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsiteteste`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsiteteste`))
        }

        return produtosSalvos
    }
    
    const dadosTest = pegaDados()


    var listReturn = []

    if (mod) {
        produtos && produtos.map(dados => listReturn.push(dados))
    } else {
        dadosTest && dadosTest.map(dados => listReturn.push(dados))
    }





    return (
            <>
                <div className={styles.container}>
                    <button
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target={`#ModalAdd`}
                    >Novo produto</button>
                    <h4  className={styles.title}>{categoriaa}</h4>
                    <ul className={styles.list}>
                        {produtos && produtos.length > 0 ? listReturn.map(dados => {
                            if (dados.produtos) {
                                if (dados.categoria == categoriaa) {
                                    return (
                                        dados.produtos.map(item => {
                                        return (
                                                <li key={dados.nome} className={`row ${styles.cont_item}`}>
                                                    <div className="col-12">
                                                        <h4>&#9679; {item.nome}</h4>
                                                        <div className={styles.cont_buttons}>
                                                            <FaEdit
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#ModalEdit`}
                                                            onClick={()=> setDados(item)}
                                                            className={styles.icon}
                                                            />
                                                            <FaTrashAlt
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target={`#ModalTrash`}
                                                            className={styles.icon}
                                                            onClick={()=> {
                                                                setDados(item)
                                                                setAção("Deletar Produto")
                                                                setIndex(1)
                                                            }}
                                                            />
                                                        </div>
                                                        <div className={styles.info}>
                                                            <div className={styles.info_item}>
                                                                <p><strong>Preço:</strong>{FormataValor(item.preço)}</p>
                                                            </div>
                                                            <div className={styles.line}/>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                    })
                                    )
                                }
                            } 
                        })
                        :
                        <div>
                            <h4>Ainda não há nada aqui</h4>
                        </div>
                        }

                    </ul>
                    </div>


                <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-xl`}>
                    <div className="modal-content">
                        <FormAdd
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            email = {user && user.email}
                            categoria = {categoriaa}
                            modalidade= {usuario.length > 0 && usuario[0].mod}
                            tema = {usuario.length > 0 && usuario[0].theme} 
                            produtos = {listProdutosTemp && listProdutosTemp}
                            destaque={destaque}
                            mostrar={mostrar}
                            modo={mod}
                            text={text}
                            img={img}
                            />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-xl`}>
                    <div className="modal-content">
                        <FormEdit
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            dados={obj}
                            tema = {usuario.length > 0 && usuario[0].theme} 
                            produtos = {listProdutosTemp && listProdutosTemp}
                            id ={usuario.length > 0 && usuario[0].email}
                            />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="ModalTrash" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <BoxConfirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#ModalTrash`}
                            mod={mod}
                            obj={obj}
                            />
                    </div>
                </div>
            </div>
                
            </>
        )
}