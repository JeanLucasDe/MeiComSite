import { Link } from "react-router-dom"
import styles from "./negocios.module.css"

export default function Negocios(props) {
    const user = props.user && props.user
    const usuario = props.usuario && props.usuario    

    return (
        <div className={styles.container}>
            <div>
                
                <div className={`${styles.container_img} `}>
                    <img src="https://img.freepik.com/free-vector/marketing-concept-illustration_114360-3903.jpg?w=740&t=st=1681761026~exp=1681761626~hmac=ae9f4d04dfb59c0e4755e367f792b1b7bdb0c662de24f556aeb1e550f4587406" className={styles.img}/>
                </div>
                <div>
                    <h1 className={styles.big_text}>Gerencie seu negócio na palma da sua mão</h1>
                </div>
                <div className={styles.cont_buttons}>
                    {!user ?
                            <Link className={styles.btn_start}
                            to="/login"
                            >Começar Grátis</Link>
                    :
                        <Link to={usuario && usuario.length == 0 ? "/login": "/perfil/user/config"}>
                            <button className={styles.btn_start}>Começar Grátis</button>
                        </Link>
                        
                    }

                    <Link to="/suporte"
                    >
                        <button className={styles.btn_plan}>Ajuda</button>
                    </Link>
                </div>
            </div>
        </div>
        )
}