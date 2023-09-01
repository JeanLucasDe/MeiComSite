import { Link } from "react-router-dom"
import styles from "./PrincipaisDuvidas.module.css"
import {FaRegUserCircle} from "react-icons/fa"


export default function PrincipaisDuvidas () {
return (
    <>
        <div className={styles.container}>
            <h1>Principais Dúvidas</h1>
            <ul className={`row ${styles.list}`}>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Como Crio meu site?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Não pedimos informações pessoais suas, preencha o formulário de cadastro e comece a adicionar seus produtos. Se precisar de ajuda encontre em <Link to="suporte">Central de ajuda</Link></p>
                    </div>
                </li>
                <li className={`col-sm-6 `}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Quanto custa ter um site com a MeiComSite?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Experimente de graça por 30 dias! Cobranças acontecerão após periodo inicial de teste ser aprovado. </p>
                    </div>
                </li>
                <li className={`col-sm-6 }`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Preciso saber programar?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Não! Você pode administrar sua empresa pela própria plataforma.</p>
                    </div>
                </li>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Funciona em computador também?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Sim! Garantimos a responsividade para todas as telas.</p>
                    </div>
                </li>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Estou com problemas.</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Encontre ajuda <Link to="suporte">aqui</Link>. Se mesmo assim seu problema não for solucionado, entre em contato conosco através do <a href="https://api.whatsapp.com/send?phone=71981298548&text=Olá, Quero tirar uma dúvida sobre a MeiComSite." target="_blank">whatsapp</a> ou <a href="mailto:Lucas__jean@outlook.com?subject=MeiComSite">e-mail</a>.</p>
                    </div>
                </li>
                <li className={`col-sm-6`}>
                    <div className={styles.box}>
                        <div className={styles.perfil}>
                            <FaRegUserCircle className={styles.icon}/>
                            <p className={styles.name}></p>
                        </div>
                        <h2>Porque a MeiComSite?</h2>
                        <div className="line"></div>
                        <p className={styles.resposta}>Oferecemos um serviço completo, humano e transparente com nossos clientes. Nosso objetivo é que seu negócio seja visto com mais facilidade aumentando assim, seus lucros. Nosso sistema de administração irá te ajudar a controlar gastos, estoque, ver os preferidos entre outros.</p>
                    </div>
                </li>
            </ul>
        </div>
    </>
    )
}