import { Link } from "react-router-dom"
import styles from "./BoxSuporte.module.css"

export default function BoxSuporte () {
return (
    <>
    <div className={styles.container}>
        <div className="row">
            <div className="col-md-5 offset-md-1">
                <div className={styles.container_text}>
                    <h1>Oferecemos todo suporte a você </h1>
                    <p>Conte conosco para tirar suas dúvidas sobre a MeiComSite com suporte 24h por Whatsapp ou E-mail</p>
                </div>
                <Link to="/suporte">Central de ajuda</Link>
            </div>
            <div className="col-md-6">
                <div>
                    <img src="https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899173.jpg?w=740&t=st=1679175024~exp=1679175624~hmac=1bb5868f775a6747150953903ae9eef5f3427942320cf260599e8e934ead5880"
                    className={styles.img}
                    />
                </div>
            </div>
        </div>
    </div>
    </>
    )
}