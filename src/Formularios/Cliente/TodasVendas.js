import { useOutletContext } from "react-router-dom";
import styles from "./Vendas.module.css"
import DetalhesVenda from "./DetalhesVenda";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment/moment";
import { useState } from "react";

export default function TodasVendas (props) {

    
    const [vendas] = useOutletContext();
    const [obj, setObj] = useState()
    const result = []
    const busca = props.busca 


    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }



    if (busca && !busca.idvenda && !busca.comprador && !busca.telefone && !busca.região || busca.região == "--" && !busca.datain) {
        vendas && vendas.filter(dados => {
                result.push(dados)
        })
    }

    //Se só tiver ID


    if (busca && busca.idvenda) {
        vendas && vendas.filter(dados => {
            if (dados.iden == busca.idvenda) {
                result.push(dados)
            }
        })
    }

   //Se tiver só a região 

    if (busca && !busca.idvenda && !busca.comprador && !busca.telefone && busca.região) {
        vendas && vendas.filter(dados => {
            if (dados.bairro.toLowerCase() == busca.região.toLowerCase() ) {
                if (dados.data == moment(busca.datain).format('DD/MM/YYYY')) {
                    if (dados.status == busca.status) {
                        if (dados.pagamento == busca.pagamento) {
                            result.push(dados)
                        } else if (!busca.pagamento || busca.pagamento == "--") {
                            result.push(dados)
                        }
                    } else if (busca.status == "--" || !busca.status){
                        if (busca.pagamento == dados.pagamento) {
                            result.push(dados)
                        } else if (!busca.pagamento || busca.pagamento == "--") {
                            result.push(dados)
                        }
                    } 
                } else if (!busca.datain) {
                    result.push(dados)
                }
            }
        })
    }

    

    //Se só tiver Comprador

    if (busca && !busca.idvenda && busca.comprador) {
        vendas && vendas.filter(dados => {
            if (dados.nome.toLowerCase().includes(busca.comprador.toLowerCase())) {
                if (dados.data == moment(busca.datain).format('DD/MM/YYYY')) {
                    if (dados.status == busca.status) {
                        if (dados.pagamento == busca.pagamento) {
                            result.push(dados)
                        } else if (!busca.pagamento || busca.pagamento == "--") {
                            result.push(dados)
                        }
                    } else if (busca.status == "--" || !busca.status){
                        if (busca.pagamento == dados.pagamento) {
                            result.push(dados)
                        } else if (!busca.pagamento || busca.pagamento == "--") {
                            result.push(dados)
                        }
                    } 
                } else if (!busca.datain) {
                    result.push(dados)
                } 
            }
        })
    }


    //Se só tiver o telefone
    if (busca && !busca.idvenda && !busca.comprador && busca.telefone ) {
        vendas && vendas.filter(dados => {
            if (dados.telefone == busca.telefone) {
                if (dados.data == moment(busca.datain).format('DD/MM/YYYY')) {
                    if (dados.status == busca.status) {
                        if (dados.pagamento == busca.pagamento) {
                            result.push(dados)
                        } else if (!busca.pagamento || busca.pagamento == "--") {
                            result.push(dados)
                        }
                    } else if (busca.status == "--" || !busca.status){
                        if (busca.pagamento == dados.pagamento) {
                            result.push(dados)
                        } else if (!busca.pagamento || busca.pagamento == "--") {
                            result.push(dados)
                        }
                    } 
                } else if (!busca.datain) {
                    result.push(dados)
                }
            }
        })
    


    //Se só tiver a data
    if (busca && !busca.idvenda && !busca.comprador && !busca.telefone && !busca.região || busca.região == "--" && busca.datain) {
        vendas && vendas.filter(dados => {
            if (dados.data == moment(busca.datain).format('DD/MM/YYYY')) {
                if (dados.status == busca.status) {
                    if (dados.pagamento == busca.pagamento) {
                        result.push(dados)
                    } else if (!busca.pagamento || busca.pagamento == "--") {
                        result.push(dados)
                    }
                } else if (busca.status == "--" || !busca.status){
                    if (busca.pagamento == dados.pagamento) {
                        result.push(dados)
                    } else if (!busca.pagamento || busca.pagamento == "--") {
                        result.push(dados)
                    }
                } 
            } 
        })
    }

    //Se não tiver data
    if (busca && !busca.idvenda && !busca.comprador && !busca.telefone && !busca.região || busca.região == "--" && !busca.datain) {
        vendas.map(dados => {
            if (dados.status == busca.status) {
                if (dados.pagamento == busca.pagamento) {
                    result.push(dados)
                } else if (!busca.pagamento || busca.pagamento == "--") {
                    result.push(dados)
                }
            } else if (busca.status == "--" || !busca.status){
                if (busca.pagamento == dados.pagamento) {
                    result.push(dados)
                } else if (!busca.pagamento || busca.pagamento == "--") {
                    result.push(dados)
                }
            } 
        })
    }
    } 
    






    return (
            <>

                    {result && result.length > 0 ? 

                    <>
                    <h5 className={styles.title_result}>Resultado de busca ({result.length})</h5>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td className={styles.td_header}>Id <span className={styles.view_desk}>Venda</span></td>
                                <td className={`${styles.td_header} ${styles.view_desk }`}>Status</td>
                                <td className={`${styles.td_header} ${styles.view_desk }`}>Data</td>
                                <td className={styles.td_header}>Comprador</td>
                                <td className={styles.td_header}>Total</td>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {result.map(dados => {
                            return (
                                <>
                                    <tr
                                    data-bs-toggle="modal"
                                    data-bs-target={`#ModalDetalhesVenda`}
                                    className={styles.td_button}
                                    onClick={()=> setObj(dados)}
                                    key={dados.iden}
                                    >
                                        <td className={styles.td}>{dados.iden}</td>
                                        <td className={`${styles.td} ${styles.view_desk }`}>{dados.state}</td>
                                        <td className={`${styles.td} ${styles.view_desk }`}>{dados.data}</td>
                                        <td className={styles.td}>{dados.nome}</td>
                                        <td className={styles.td}>{FormataValor(dados.Total)}</td>
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>

                    </>
                
                :
                <>
                <h5 className={styles.title_empty}>Sem resultados para esta busca</h5>
                </>
                
                }



            <div className="modal fade" id="ModalDetalhesVenda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <DetalhesVenda
                        obj={obj}
                        type="button" 
                        aria_label="Close"
                        data_bs_toggle="modal" 
                        data_bs_target="#ModalDetalhesVenda"
                        />
                    </div>
                </div>
            </div>


            </>


        )
}