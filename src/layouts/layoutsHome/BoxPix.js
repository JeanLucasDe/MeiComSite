import { Link } from "react-router-dom"
import styles from "./BoxPix.module.css"
import {FaRegCheckCircle} from "react-icons/fa"


export default function BoxPix () {
return (
    <div className={styles.container}>
        <div className="row">
            <div className="col-sm-6 col-md-4 order-3 order-sm-1">
                <div className={styles.container_text}>
                    <div className={styles.content_title}>
                        <h1 className={styles.title}>Pagamento com QR Code</h1>
                        <Link to="/suporte/pagamentos" className="button_orange">Saiba como</Link>
                    </div>
                </div>  
            </div>
            <div className="col-sm-6 col-md-4 order-2 order-sm-2">
                <img src="https://img.freepik.com/vetores-gratis/varredura-de-codigo-qr-com-ilustracao-de-personagem_23-2148613581.jpg?w=740&t=st=1679161203~exp=1679161803~hmac=9f8b35bed70e3baf6e69e8bd80f907a689f5fb896a19a1daf85f923f5a7c7ba7" className={styles.img}/>
            </div>
            <div className="col-sm-12 col-md-4 order-1 order-sm-2">
                
                <ul className={`row ${styles.list}`}>
                    <li className="col-sm-4 col-md-12">
                        <div>
                            <FaRegCheckCircle className={styles.icon}/> Vendas mais rápidas
                        </div>
                    </li>
                    <li className="col-sm-4 col-md-12">
                        <div>
                            <FaRegCheckCircle className={styles.icon}/> Maior controle em estoque
                        </div>
                    </li>
                    <li className="col-sm-4 col-md-12">
                        <div>
                            <FaRegCheckCircle className={styles.icon}/> Maior conforto ao seu cliente
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    ) 

}