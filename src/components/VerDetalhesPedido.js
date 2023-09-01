import styles from "./VerDetalhesPedidos.module.css"

export default function VerDetalhesPedido (props) {
    const obj = props.obj && props.obj

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }


    return (
        <>
        {props.ação == 'Ver Pedido'&& 
        <>
            <div className={styles.container}>
                <h3>Detalhes do pedido</h3>
                <div className="line"/>
                <ul className={styles.list}>
                    {obj.pedido.map(dados => {
                        return (
                            <>
                            <li key={dados.id}>
                                <div>
                                    <strong>Produto:</strong>
                                    <div className={styles.flex_space_between}>
                                        <p>{dados.nome}</p>
                                        <p>x{dados.qtd}</p>
                                        <p>{FormataValor(dados.preço)}</p>
                                    </div>
                                    <ul>
                                        {dados.saboresEscolhidos.map(item=> {
                                            return (
                                                    <li key={item.id}>
                                                        <div className={styles.flex}>
                                                            <strong>sabor:</strong>
                                                            <p>{item.sabor}</p>
                                                        </div>
                                                    </li>
                                                )
                                        })}
                                    </ul>
                                </div>
                            </li>
                            <div className="line"/>
                            </>
                            )
                    })}
                </ul>
                <div className={styles.flex_flex_end}>
                    <h5>Total:</h5>
                    <h4>{FormataValor(obj.total)}</h4>
                </div>
            </div>
        </>
        }
        {props.ação == 'Ver Endereço'&& 
        <>
            <div className={styles.container}>
                <h3>Detalhes do Endereço</h3>
                <div className="line"/>
                <div className={styles.flex}>
                    <strong>Nome:</strong>
                    <p>{obj.nome}</p>
                </div>
                <div className={styles.flex}>
                    <strong>Telefone:</strong>
                    <p>{obj.telefone}</p>
                </div>
                <div className={styles.flex}>
                    <strong>Cidade:</strong>
                    <p>{obj.cidade}</p>
                </div>
                <div className={styles.flex}>
                    <strong>Bairro:</strong>
                    <p>{obj.bairro}</p>
                </div>
                <div className={styles.flex}>
                    <strong>Rua:</strong>
                    <p>{obj.rua}</p>
                </div>
                <div className={styles.flex}>
                    <strong>Número:</strong>
                    <p>{obj.numero}</p>
                </div>
                <div className={styles.flex}>
                    <strong>Pagamento:</strong>
                    <p>{obj.pagamento}</p>
                </div>
            </div>
        </>
        }
        </>
        )
}