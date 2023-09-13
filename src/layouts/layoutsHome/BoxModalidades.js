import { Link } from "react-router-dom"
import styles from "./BoxModalidades.module.css"




export default function BoxModalidade () {
    return (
        <div className={styles.container}>
            <div className="row">
                <h1>Nossas modalidades</h1>
                <div className="col-sm-4">
                    <Link to="/catalogo/alimentação" className={styles.link}>
                        <div className={styles.box}>
                            <div className={styles.container_icon}>
                                <img src="https://img.freepik.com/fotos-gratis/grupo-de-chefs-trabalhando-na-cozinha_53876-42734.jpg?w=740&t=st=1679160064~exp=1679160664~hmac=49f50619d469ee55761e61c8a10b5cdc98aef441a4f6d4c6d632c10563603cff"/>
                                <div className={styles.container_title}>
                                    <h4>Restaurantes</h4>
                                </div>
                            </div>
                                <div>
                                    <p className={styles.description}>Receba pedidos de forma automática, informe se está em preparo ou entrega, deixe seu negócio mais dinâmico.</p>
                                </div>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-4">
                    <div className={styles.box}>
                            <div className={styles.container_icon}>
                                <img src="https://img.freepik.com/fotos-gratis/maos-femininas-escrevendo-em-um-caderno-vazio_23-2148652066.jpg?w=740&t=st=1679160691~exp=1679161291~hmac=448fd27f8704642482112a9c9bff88126fa78fd4b83788fac7a49501848c1faf" className={styles.dashed}/>
                                <div className={styles.container_title}>
                                    <h4>Prest. Serviços - (desenvolvimento)</h4>
                                </div>
                            </div>
                        <div className={styles.description}>
                            <p>Ofereça seus serviços, tenha um melhor controle nos seus projetos e pedidos, agilize seu atendimento com nosso bot.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        )

}