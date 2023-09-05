import styles from "./Negocio.module.css"
import '@firebase/firestore';
import { Link, useOutletContext } from "react-router-dom"



export default function Negocio () {

    const [mod, produtos, usuario, vendas, user] = useOutletContext()


    const FormataNome = (nome) => {
        nome = nome.split(' ')
        return nome[0] + " " + nome[1]
    }
   

    return (
            <>
                {user && usuario && usuario.map(dados => {
                    if (dados.iduser == user.id) {
                        return (
                                <div className={styles.container} key={dados.iduser}>
                                    <h2 className={styles.razao}>Olá, {FormataNome(dados.nome)}</h2>
                                    <div className={styles.cont_info}>
                                        <h5>Suas Informações</h5>
                                        <div className={styles.line}></div>
                                        <p>Membro desde: <strong>{dados.data}</strong></p>
                                        <p>Modalidade: <strong>{dados.mod}</strong></p>
                                        <p>Tema: <strong>{dados.theme}</strong></p>
                                        <p>Funcionamento: 
                                            <strong> {dados.abre}:00h </strong> às  
                                            <strong> {dados.fecha}:00h </strong>
                                        </p>
                                        <p>Site: {dados.status == "pronto" ? 
                                        <span>
                                            <Link to={`/${dados.site}`} className={styles.link}
                                            target="_blank"
                                            >meicomsite.netlify.app/{dados.site}</Link>
                                        </span>:
                                        <strong className={styles.link}>{dados.status}</strong>
                                        }
                                        </p>
                                    </div>
                                </div>
                            )
                    } 
                })}
                {usuario && usuario.length == 0 &&
                <div className={styles.container_off}>
                    <h4>Usuário não cadastrado</h4>
                    <Link to="/perfil/cadastro">Cadastrar agora!</Link>
                </div>
                }

                
            </>
        )
}