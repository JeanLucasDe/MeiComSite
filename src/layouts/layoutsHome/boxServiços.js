import styles from "./BoxServiços.module.css"
import {FaRegCheckCircle} from "react-icons/fa"

export default function BoxServiços () {
return (
    <div className={styles.container}>
        <div className="row">
            <div className="col-md-5">
                <div className={styles.container_img}>
                    <img src="https://img.freepik.com/free-vector/online-marketing-abstract-concept-illustration-digital-marketing-online-sales-social-media-strategy-seo-optimization-ecommerce-agency-service-internet-advertising_335657-54.jpg?t=st=1679352992~exp=1679353592~hmac=c0b0553f5f33b4b9810f85089abea6060ab41f591f8bc669b1e7c24258a8eded"/>
                </div>
            </div>
            <div className="col-md-7">
                <div className={styles.container_text}>
                    <h3>Se joga no novo!</h3>
                    <h4 className="title_light">Torne o seu negócio Virtual</h4>
                    <ul className={styles.list}>
                        <li><FaRegCheckCircle className={styles.icon}/> Controlador de estoque</li>
                        <li><FaRegCheckCircle/> Calcular Frete</li>
                        <li><FaRegCheckCircle/> Integração do pix mercado pago</li>
                        <li><FaRegCheckCircle/> Integração com firebase</li>
                        <li><FaRegCheckCircle/> Login de usuários para compra</li>
                        <li><FaRegCheckCircle/> Fácil Manipulação de estoque</li>
                        <li><FaRegCheckCircle/> Favoritar produtos</li>
                        <li>Muito mais</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}