import { useState } from "react";
import BoxConfirm from "../../components/BoxConfirm";
import styles from "./DetalhesVenda.module.css"
import {FaCheck, FaExclamation} from "react-icons/fa"


export default function DetalhesVenda (props) {

    const obj = props.obj && props.obj


    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const ReturnState = () => {
        if (obj) {
            if (obj.state == 1) return 'Em aberto'
            if (obj.state == 2) return 'Em Preparo'
            if (obj.state == 3) return 'Em Entrega'
            if (obj.state == 4) return 'Finalizado'
        }
    }

    const status = ReturnState()


    return (
            <>
            <div className={styles.container}>
            <div className={styles.block}
            type={props.type} 
            data-bs-toggle={props.data_bs_toggle} 
            data-bs-target={props.data_bs_target}
            />
                <div className={styles.header}>
                    <h4>Venda: #  {obj &&  obj.iden}</h4>
                    <div className={styles.cont_date}>
                        <span className={styles.date}>Data: {obj &&  obj.data}</span>
                        <span className={styles.date}>Hora: {obj &&  obj.hora}</span>
                    </div>
                </div>
                <div className={styles.info_comprador}>
                    <div className="row">
                        <div className="col-md-6">
                            <p className={styles.info}>Nome: <span>{obj && obj.nome}</span></p>
                            {obj && obj.lugar == 1 && <p className={styles.info}>Telefone: <span>{obj && obj.telefone}</span></p>}
                            <p className={styles.info}>Pagamento: <span>{obj && obj.pagamento}</span></p>
                            {obj && obj.mesa && <p className={styles.info}>Mesa: <span>{obj && obj.mesa}</span></p>}
                            <p className={styles.info}>Status: {status}</p>
                        </div>
                        <div className="col-md-6">
                            {obj && obj.lugar == 1 &&
                            <div>
                                <p className={styles.info}>Cidade: <span>{obj && obj.cidade}</span></p>
                                <p className={styles.info}>Bairro: <span>{obj && obj.bairro}</span></p>
                                <p className={styles.info}>rua: <span>{obj && obj.rua}</span></p>
                                <p className={styles.info}>Número: <span>{obj && obj.numero}</span></p>
                                <p className={styles.info}>P. Refencia: <span>{obj && obj.referencia}</span></p>
                            </div>
                            
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.line}/>
                <div>
                    {obj && obj.lugar == 1 && <div className={styles.cont_total}>
                        <h5>Taxa</h5>
                        <h5>{obj && FormataValor(obj.taxa)}</h5>
                    </div>}
                    <div className={styles.cont_total}>
                        <h5>Total da venda</h5>
                        <h5>{obj && FormataValor(obj.Total)}</h5>
                    </div>
                </div>
                <div className={styles.line}/>
                <div>
                    <h5>Detalhes</h5>   
                    <ul className={styles.list_main}>
                    {obj && obj.produtos && obj.produtos.map(dados => {
                        return (
                                <li> 
                                    <strong>{dados.categoria} - {FormataValor(dados.valor)}</strong>
                                    <p className={styles.p_sabor}>
                                        <span>Sabor: </span>
                                        {dados.produtos.map(item => {
                                            return (
                                                <strong>{item.sabor},</strong>
                                                )
                                        })}
                                    </p>
                                    {dados.adicionais && <p className={styles.p_sabor}>
                                        <span>Adicionais: </span>
                                        {dados.adicionais && dados.adicionais.map(item => {
                                            return (
                                                <strong>{item.sabor},</strong>
                                                )
                                        })}
                                    </p>}
                                    
                                </li>
                            )
                    })}
                    </ul>
                </div>
                <div className={styles.block}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                />
            </div>


        
            </>
        )
}