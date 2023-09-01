import styles from "./BoxPlanos.module.css"
import {FaCheck, FaTimes} from "react-icons/fa"

export default function BoxPlanos () {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className="row">
                    <div className="col-md-4">
                        <div className={styles.box}>
                            <h4>Basic</h4>
                            <div className="line"></div>
                            <div className={styles.conteudo}>
                                <ul className={styles.list}>
                                    <li><FaCheck className={styles.check}/>Gestão de Pedidos</li>
                                    <li><FaCheck className={styles.check}/>Gestão de Estoque</li>
                                    <li><FaCheck className={styles.check}/>1 Membro</li>
                                    <li><FaCheck className={styles.check}/>Adicione até 40 produtos</li>
                                    <li><FaCheck className={styles.check}/>Adicionar fotos com <abbr title="Você pode adicionar imagens pelo seu OnDrive ou imagens em link externo. Veja em Ajuda">url</abbr>
                                    </li>
                                    <li><FaCheck className={styles.check}/>3 escolhas para layout</li>
                                    <li><FaCheck className={styles.check}/>Finalizar por Whatsapp</li>
                                    <li><FaTimes className={styles.false}/>Adicionar fotos por upload</li>
                                    <li><FaTimes className={styles.false}/>Finalizar com Pix</li>
                                    <li><FaTimes className={styles.false}/>Cálculo Frete automático</li>
                                    <li><FaTimes className={styles.false}/>Favoritar produtos</li>
                                    <li><FaTimes className={styles.false}/>Login de Usuário</li>
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <h4>Em análise</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.box}>
                            <h4>Plus</h4>
                            <div className="line"></div>
                            <div className={styles.conteudo}>
                                <ul className={styles.list}>
                                    <li><FaCheck className={styles.check}/>Gestão de Pedidos</li>
                                    <li><FaCheck className={styles.check}/>Login de Usuário</li>
                                    <li><FaCheck className={styles.check}/>Gestão de Estoque</li>
                                    <li><FaCheck className={styles.check}/>Adicione até 100 produtos</li>
                                    <li><FaCheck className={styles.check}/>2 Membros</li>
                                    <li><FaCheck className={styles.check}/>Adicionar fotos com <abbr title="Você pode adicionar imagens pelo seu OnDrive ou imagens em link externo. Veja em Ajuda">url</abbr>
                                    </li>
                                    <li><FaCheck className={styles.check}/>Cálculo Frete automático</li>
                                    <li><FaCheck className={styles.check}/>Favoritar produtos</li>
                                    <li><FaCheck className={styles.check}/>5 escolhas para layout</li>
                                    <li><FaCheck className={styles.check}/>Finalizar por Whatsapp</li>
                                    <li><FaCheck className={styles.check}/>Adicionar fotos por upload</li>
                                    <li><FaCheck className={styles.check}/>Finalizar com Pix</li>
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <h4>Em análise</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className={styles.box}>
                            <h4>Premium</h4>
                            <div className="line"></div>
                            <div className={styles.conteudo}>
                                <ul className={styles.list}>
                                    <li><FaCheck className={styles.check}/>Gestão de Pedidos</li>
                                    <li><FaCheck className={styles.check}/>Login de Usuário</li>
                                    <li><FaCheck className={styles.check}/>Gestão de Estoque</li>
                                    <li><FaCheck className={styles.check}/>Adicione até 300 produtos</li>
                                    <li><FaCheck className={styles.check}/>4 Membros</li>
                                    <li><FaCheck className={styles.check}/>Adicionar fotos com <abbr title="Você pode adicionar imagens pelo seu OnDrive ou imagens em link externo. Veja em Ajuda">url</abbr>
                                    </li>
                                    <li><FaCheck className={styles.check}/>12 escolhas para layout</li>
                                    <li><FaCheck className={styles.check}/>Finalizar por Whatsapp</li>
                                    <li><FaCheck className={styles.check}/>Adicionar fotos por upload</li>
                                    <li><FaCheck className={styles.check}/>Cálculo Frete automático</li>
                                    <li><FaCheck className={styles.check}/>Favoritar produtos</li>
                                    <li><FaCheck className={styles.check}/>Finalizar com Pix</li>
                                </ul>
                            </div>
                            <div className={styles.price}>
                                <h4>Em análise</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}