import { FaUserCircle } from "react-icons/fa"
import HomeWppDemostracao from "../layouts/layoutsDemonstacoes/HomeWppDemonstracao"
import styles from "./PageDemonstration.module.css"
import { useState } from "react"
import BoxPedido from "../layouts/layoutsDemonstacoes/BoxPedidoDemonstracao"

export default function PageDemonstração () {


    const [show, setShow] = useState(0)

    return (
        <>
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={`${styles.no_padding_no_margin} row`}>
                    <div className={`${styles.no_padding_no_margin} col-md-5`}>
                        <div className={styles.Wpp}>
                            <div className={styles.cont_left}>
                                <div className={styles.cont_user}>
                                    <FaUserCircle className={styles.user}/>
                                    <p>(71) 99999-9999</p>
                                </div>
                                <div className={styles.cont_persons}>
                                    <div className={styles.cont_input}>
                                        <input type="text"
                                        placeholder="Pesquisar ou começar nova conversa"
                                        />
                                    </div>
                                    <div className={styles.person}
                                    >
                                        <div className={styles.flex}
                                        onClick={() => setShow(0)}
                                        >
                                            <img src='data:image/png;base64,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' className={styles.logo}/>
                                            <div className={styles.info_person}>
                                                <div>
                                                    <p>Pizza Guor</p>
                                                    <p>Faça seu pedido</p>
                                                </div>
                                                <div>
                                                    <p className={styles.icon_check}>agora</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.flex}
                                        onClick={() => setShow(1)}
                                        >
                                            <img src='data:image/png;base64,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' className={styles.logo}/>
                                            <div className={styles.info_person}>
                                                <div>
                                                    <p>Pedido</p>
                                                    <p>Ver Meu Pedido</p>
                                                </div>
                                                <div>
                                                    <p className={styles.icon_check}>agora</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.no_padding_no_margin} col-md-7`}>
                        {show == 0 ? <HomeWppDemostracao/>: show == 1 && <BoxPedido/>}
                        
                    </div>
                </div>
            </div>
        </div>
        </>
        )
}