import BoxConfirm from "../../components/BoxConfirm";
import styles from "./DetalhesVenda.module.css"
import {FaCheck, FaExclamation} from "react-icons/fa"


export default function DetalhesVenda (props) {

    const obj = props.obj && props.obj
    

    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

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
                        <div className="col-sm-6">
                            <p className={styles.info}>Nome: <span>{obj && obj.nome}</span></p>
                            {obj && obj.lugar == 1 && <p className={styles.info}>Telefone: <span>{obj && obj.telefone}</span></p>}
                            <p className={styles.info}>Pagamento: <span>{obj && obj.pagamento}</span></p>
                            {obj && obj.mesa && <p className={styles.info}>Mesa: <span>{obj && obj.mesa}</span></p>}
                        </div>
                        <div className="col-sm-6">
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
                    <ul className={styles.list}>
                    {obj && obj.produtos && obj.produtos.map(dados => {
                        return (
                                <li> 
                                    <strong>{dados.categoria} - {FormataValor(dados.valor)}</strong>
                                    <ul className={styles.list}>
                                        {dados.produtos.map(item => {
                                            return (
                                                <li>
                                                    <p>-<span>{item.sabor}</span></p>
                                                    
                                                </li>
                                                )
                                        })}
                                    </ul>
                                    
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