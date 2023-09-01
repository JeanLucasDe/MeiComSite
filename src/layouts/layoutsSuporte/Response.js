import { useParams } from "react-router-dom"
import styles from "./Response.module.css"
import querie from "../../Documents/queries.json"
import {FaPhoneAlt} from "react-icons/fa"

export default function Response () {
    
    const {query} = useParams()

    

return(
    <div className={styles.container}>
        {querie && querie.map(item => {
        if (item.pergunta == query) {
            return (
                <div key={item.pergunta}>
                    <h3>{item.titulo}</h3>

                    <div className={styles.content}>
                        <div>
                            {item.resposta.length == 1 ? 
                            <div className={styles.content_response}>
                                <p className={styles.response}>{item.resposta}</p>
                            </div>
                            : item.resposta.map(dados => 
                            {
                                return (
                                    <div className={styles.passos}>
                                        <strong className={styles.title}>{dados.titulo}</strong>
                                        <p>{dados.conteudo}</p>
                                    </div>
                                    )
                            }
                            )}
                        </div>
                    </div>
                    <div className={styles.cont_button}>
                        <button><FaPhoneAlt/> Falar conosco</button>
                    </div>
                </div>
                )
        }

        })}
        
        
       

    </div>
    )

}