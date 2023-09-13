import { Link } from "react-router-dom"
import styles from "./ControlSuporte.module.css"

export default function ControlSuporte () {
    return (
            <div className={styles.container}>
                <div className="row">
                    <div className="col-sm-7">
                        <img src="https://img.freepik.com/free-vector/call-center-concept-illustration_1284-69913.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais" className={styles.img}/>
                    </div>
                    <div className="col-sm-4">
                        <h3>Como podemos ajuda?</h3>
                        <h2>Suporte Online</h2>
                        <div className={styles.cont_text}>
                            <p className={styles.p_text}>Tire todas as suas dúvidas sobre nosso sistema atráves do nosso Whatsapp.</p>
                        </div>
                        <div>
                            <a href="https://api.whatsapp.com/send?phone=71981298548&text=" 
                            target="_blank" className={styles.btn}>Whatsapp</a>
                            <a href="mailto:Lucas__jean@outlook.com?subject=MeiComSite"
                            className={styles.btn}
                            >E-mail</a>.
                        </div>
                    </div>
                </div>
            </div>
        )
}