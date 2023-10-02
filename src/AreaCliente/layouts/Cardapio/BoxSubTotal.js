import { useParams } from "react-router-dom"
import styles from "./BoxSubTotal.module.css"
import {FaTrash} from "react-icons/fa"

export default function BoxSubTotal (props) {

    const show = props.show && props.show
    const {site, id, idproduto} = useParams()

    const PegaDados = () => {
        let produtosSalvos = new Array()
            if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
                produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
            }
        return produtosSalvos
    }
    const Dados = PegaDados()
    const PegaTotal = () => {
        var SomaTotal = Dados.reduce((soma, i) => {return soma + i.valor},0)
        return SomaTotal
    }

    const Total = PegaTotal()

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    return (
            <>
                <div className={`${show ? styles.show: styles.none}`}>
                    <div className={styles.cont_itens}>
                        <ul className={styles.list_itens}>
                            {Dados && Dados.map(dados => {
                                return (
                                    <li key={dados.id}
                                    className={styles.item}
                                    >
                                        <FaTrash/>
                                        <div>
                                            <p>{dados.categoria}</p>
                                            <p>{FormataValor(dados.valor)}</p>
                                        </div>
                                    </li>
                                    )
                            })}
                        </ul>

                    </div>

                    <h5>Total da Compra</h5>
                    <p className={styles.preço}>{FormataValor(Total)}</p>
                    <button className={styles.confirm}>Confirmar</button>
                </div>
            </>
        )
}