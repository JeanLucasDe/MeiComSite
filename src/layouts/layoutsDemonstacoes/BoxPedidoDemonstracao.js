import { Form, useOutletContext, useParams } from "react-router-dom"
import styles from "../../AreaCliente/layouts/Wpp/BoxPedido.module.css"
import { useState,useEffect } from "react"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { FaCheck, FaGenderless } from "react-icons/fa";


export default function BoxPedido (props) {


    const vendas = [
        {
        Total: 90,
        nome:'Elis',
        cidade:'Salvador',
        bairro:'Pituba',
        taxa: 7,
        telefone:'(71) 999999999',
        pagamento:'Pix',
        data: '07/09/2023',
        hora:'20:00',
        moradia:'Casa',
        numero:12,
        rua:'Alameda das Espartódeas',
        referencia:'Proximo ao posto de saúde',
        produtos: [
            {
                categoria:'Pizza Grande',
                valor:22,
                produtos: [
                    {
                        qtd:1,
                        sabor:'Frango'
                    },
                    {
                        qtd:1,
                        sabor:'Calabresa'
                    }
                ]
            }

        ]
        }
    ]


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
            {vendas && vendas.map(dados => {
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
                {vendas && vendas.map(dados => {
                        return (
                                <div className="row">
                                    <h2 className={styles.m_bottom}>Pedido # {dados.iden}</h2>
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
                                        <p>Rua: <strong>{dados.rua}</strong></p>
                                        <p>Moradia: <strong>{dados.moradia}</strong></p>
                                        <p>Número: <strong>{dados.numero}</strong></p>
                                        <p>Referência: <strong>{dados.referencia}</strong></p>
                                    </div>
                                    <div className={styles.line}/>
                                    <div>
                                    {dados.produtos.map(item => {
                                        return (
                                                <div>    
                                                    <strong>-{item.categoria} -  {FormataValor(item.valor)}</strong>
                                                    <table>
                                                        {item.produtos.map(info => {
                                                            return (
                                                                <tr className={styles.tr}>
                                                                    <td className={styles.td}>- {info.sabor}</td>
                                                                </tr>
                                                                )
                                                        })}
                                                    </table>
                                                </div>
                                            )
                                    })}
                                    </div>
                                    <div className={styles.line}/>
                                    <div className={styles.cont_preço}>
                                        <h5>Taxa: {FormataValor(dados.taxa)}</h5>
                                        <h3>Total {FormataValor(dados.Total)}</h3>
                                    </div>
    
                                </div>
                            )
                    
                })}
            </div>
        </div>
         
        
        
        </>

        )
}