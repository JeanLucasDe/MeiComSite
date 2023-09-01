import { useOutletContext } from "react-router-dom"
import styles from "./Online.module.css"
import {FaUser,FaCompactDisc, FaBars} from "react-icons/fa"
import DetalhesVenda from "./DetalhesVenda"
import { useState } from "react"

export default function BoxVenda (props) {
    var dados = props.dados && props.dados
    const [obj, setObj] = useState()
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }



    return (
        <>
            <li className={styles.item_list} key={dados.id}>
                <div className={styles.f_space_bet}>
                    <h5>Pedido #{dados.iden}</h5>
                    <FaBars 
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalDetalhesVenda`}
                    onClick={()=> setObj(dados)}
                    />
                </div>
                <p><FaUser/> {dados.nome}</p>
                <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                <div className={styles.cont_button}>
                    <button className={styles.acc}
                    >Aceitar Pedido</button>
                    <button className={styles.del}>Recusar</button>
                </div>
            </li>

            <li className={styles.item_list} key={dados.id}>
                <div className={styles.f_space_bet}>
                    <h5>Pedido #{dados.iden}</h5>
                    <FaBars 
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalDetalhesVenda`}
                    onClick={()=> setObj(dados)}
                    />
                </div>
                <p><FaUser/> {dados.nome}</p>
                <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                <div className={styles.cont_button}>
                    <button className={styles.acc}
                    >Aceitar Pedido</button>
                    <button className={styles.del}>Recusar</button>
                </div>
            </li>
        </>
        )
}