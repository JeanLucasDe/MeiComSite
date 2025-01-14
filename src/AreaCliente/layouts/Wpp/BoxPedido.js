import { Form, useOutletContext, useParams } from "react-router-dom"
import styles from "./BoxPedido.module.css"
import { useState,useEffect } from "react"
import {App} from "../../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { FaCheck, FaGenderless } from "react-icons/fa";


export default function BoxPedido (props) {

    const [produtos, usuario, vendas] = useOutletContext()
    const db = getFirestore(App)


    const {site} = useParams()
    
    function pegaDadosCompra() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}.compra`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}.compra`))
        }
        return produtosSalvos
    }
    const Compra = pegaDadosCompra()


    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    
    const comprador = vendas && Compra.length > 0 && vendas.filter(dados => dados.iden == Compra[0].id)
    
    
    const contador = () => {
        setTimeout(() => {
            window.location.reload()
        }, 180000);
    }
    
    const VendaEfetuada = vendas && Compra.length > 0 && vendas.filter(dados => dados.iden == Compra.length > 0 && Compra[0].id)
    
    if (VendaEfetuada.length > 0) {
        contador()
    }



    return (
        <>
        
        <div className={styles.container}>
            {comprador && comprador.map(dados => {
                return (
                        <div className={styles.cont_states}>
                            {dados.state >= 1 ?
                                <div className={styles.state}>
                                    <FaCheck/>
                                    <p>Enviado</p>
                                </div>
                                :
                                <div className={styles.state}>
                                    <FaGenderless/>
                                    <p>Enviado</p>
                                </div>
                            }
                            {dados.state >= 2 ?
                                <div className={styles.state}>
                                    <FaCheck/>
                                    <p>Preparo</p>
                                </div>
                                :
                                <div className={styles.state}>
                                    <FaGenderless/>
                                    <p>Preparo</p>
                                </div>
                            }
                            {dados.state >= 3 ?
                                <div className={styles.state}>
                                    <FaCheck/>
                                    <p>À Caminho</p>
                                </div>
                                :
                                <div className={styles.state}>
                                    <FaGenderless/>
                                    <p>À Caminho</p>
                                </div>
                            }
                        </div>
                    )
            })}
            <div className={styles.content}>
                {comprador && comprador.map(dados => {
                        return (
                                <div className="row">
                                    <h3 className={styles.m_bottom}>Pedido # {dados.iden}</h3>
                                    {dados.identrega && <h5 className={styles.m_bottom}>ID Entrega: {dados.identrega}</h5>}
                                    <div className={styles.line}/>
                                    <div className="col-sm-6">
                                        <p>Nome: <strong>{dados.nome}</strong></p>
                                        <p>Telefone: <strong>{dados.telefone}</strong></p>
                                        <p>Pagamento: <strong>{dados.pagamento}</strong></p>
                                        <p>Data: <strong>{dados.data}</strong></p>
                                        <p>Hora: <strong>{dados.hora}</strong></p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p>Cidade: <strong>{dados.cidade}</strong></p>
                                        <p>Bairro: <strong>{dados.bairro}</strong></p>
                                        <p>Moradia: <strong>{dados.moradia}</strong></p>
                                        <p>Número: <strong>{dados.numero}</strong></p>
                                        <p>Referência: <strong>{dados.referencia}</strong></p>
                                    </div>
                                    <div className={styles.line}/>
                                    <div>
                                        <div>
                                            {dados.produtos.map(item => {
                                                return ( 
                                                <p className={styles.strong}>- {item.categoria} -  {FormataValor(item.valor)}</p>
                                                )
                                            })}
                                            <strong className={styles.strong}>Sabor:</strong>
                                            {dados.produtos && dados.produtos[0].produtos.map(item => {
                                                return (
                                                    <span> {item.sabor}, </span>
                                                    )
                                            })}
                                            {dados.adicionais &&
                                            <div>
                                                <strong className={styles.strong}>Adicionais:</strong>
                                                {dados.adicionais && dados.produtos[0].adicionais.map(item => {
                                                    return (
                                                        <span> {item.saborAdicional}, </span>
                                                        )
                                                })}
                                            </div>}
                                        </div>
                                    </div>
                                    <div className={styles.line}/>
                                    <div className={styles.cont_preço}>
                                        <h5>Taxa: {FormataValor(comprador && comprador[0].taxa)}</h5>
                                        <h3>Total {FormataValor(comprador && comprador[0].Total)}</h3>
                                    </div>
    
                                </div>
                            )
                    
                })}
            </div>
        </div>
         
        
        
        </>

        )
}