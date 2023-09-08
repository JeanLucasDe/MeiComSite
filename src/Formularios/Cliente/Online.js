import { useOutletContext } from "react-router-dom"
import styles from "./Online.module.css"
import BoxPedidos from "./BoxPedidos"
import { useState } from "react"
import Contador from "./Contador"


export default function Online () {

    const [mod, produtos, usuario, vendas] = useOutletContext()
    var [seed, setSeed] = useState(0)

    setTimeout(()=> {
        setSeed(seed += 1)
    },1000)




    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <Contador/>
                    <h4 className={styles.text_center}>Painel de Pedidos</h4>
                    <div>
                        <button
                        className={styles.btn_new}
                        data-bs-toggle="modal"
                        data-bs-target={`#ModalNovoPedido`}
                        >Novo Pedido</button>
                    </div>
                </div>
            </div>
            <BoxPedidos vendas={vendas && vendas} usuario ={usuario && usuario} seed={seed}/>

        </>
        )
}