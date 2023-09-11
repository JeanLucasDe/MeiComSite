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
import { FaCircle, FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa"
import BoxConfirm from "../../components/BoxConfirm"



export default function Produtos () {

    const {categoriaa} = useParams()
    const [mo, produtos, usuario, vendas, user] = useOutletContext()
    const [ação, setAção] = useState()

    

    const indexProd = produtos && produtos.filter(dados => dados.categoria == categoriaa)
    
    const listProdutosTemp = []

    const cat = produtos&& produtos.filter(dados => dados.categoria == categoriaa)
    const destaque = cat.length > 0 && cat[0].destaque
    const mostrar = cat.length > 0 && cat[0].mostrar
    const text = cat.length > 0 && cat[0].text
    const id = cat.length > 0 && cat[0].id
    listProdutosTemp.push(cat.length > 0 && cat[0].produtos)

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



    return (
            <>
                {usuario.length > 0 && usuario[0].admin &&
                <div className={styles.container}>
                    <button
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target={`#ModalAdd`}
                    ><FaPlusCircle/> Novo produto</button>
                    <h3 className={styles.title}>{categoriaa}</h3>
                    <ul className={styles.list}>
                        {produtos &&produtos.length > 0 && produtos.map(dados => {
                            if (dados.produtos) {
                                if (dados.categoria == categoriaa) {
                                    if (dados.produtos.length > 0) {
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
                                                                }}
                                                                />
                                                            </div>
                                                            <div className={styles.info}>
                                                                <div className={styles.info_item}>
                                                                    <p><strong>Preço:</strong>{FormataValor(parseFloat(item.preço))}</p>
                                                                </div>
                                                                <div className={styles.line}/>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                        })
                                        )
                                    } else {
                                        return (
                                            <div className={styles.cont_empty}>
                                                <h3>Ainda não há nada aqui.</h3>
                                                <p>Comece a adicionar</p>
                                            </div>
                                            )
                                    }
                                }
                            } 
                        })
                    }

                    </ul>
                    </div>
                }

                <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <FormAdd
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            email = {user && user.email}
                            categoria = {categoriaa}
                            modalidade= {usuario && usuario.length > 0 && usuario[0].mod}
                            tema = {usuario && usuario.length > 0 && usuario[0].theme} 
                            dados={obj}
                            produtos = {listProdutosTemp && listProdutosTemp}
                            listaProd={produtos && produtos.length > 0 && produtos[0].produtos}
                            destaque={destaque}
                            mostrar={mostrar}
                            text={text}
                            />
                    </div>
                </div>
            </div>
            <div className="modal fade" id="ModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <FormEdit
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal"
                            data_bs_target={'#ModalEdit'}
                            dados={obj}
                            tema = {usuario && usuario.length > 0 && usuario[0].theme} 
                            produtos = {produtos && produtos.length > 0 && produtos[0].produtos}
                            id ={usuario && usuario.length > 0 && usuario[0].email}
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
                            obj={obj}
                            />
                    </div>
                </div>
            </div>
                
            </>
        )
}