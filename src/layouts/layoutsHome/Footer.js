import styles from "./Footer.module.css"
import {FaInstagram,FaWhatsapp} from "react-icons/fa"
import { Link } from "react-router-dom"

export default function Footer () {
    return (
        <div className={styles.container}>
            <div className="row">
                <div className="col-sm-3">
                    <div className={styles.perfil}>
                        <h3>MeiComSite</h3>
                        <p className={styles.description}>
                            MeiComSite é uma iniciativa privada que tem como objetivo promover o seu negócio dando a ele uma presença online.
                            Acreditamos no novo e investindo em tecnologia, você pode ir muito além.
                        </p>
                        <div className={styles.redes}>
                            <a href="https://www.instagram.com/bro.lucass/" target="_blank" className={styles.icon}>
                                <FaInstagram/>
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=71981298548&text=" target="_blank" className={styles.icon}>
                                <FaWhatsapp/>
                            </a>
                        </div>

                    </div>
                </div>
                <div className="col-sm-8 offset-sm-1">
                    <div className={styles.container_lists}>
                        <ul className={styles.list}>
                            <h4>Modalidades</h4>
                            <li><Link to="/catalogo/shopping">Loja Virtual</Link></li>
                            <li><Link to="/catalogo/alimentação">Restaurante</Link></li>
                        </ul>
                        <ul className={styles.list}>
                            <h4>Empresa</h4>
                            <li><a href="#">Termos de uso</a></li>
                            <li><a href="#">Politica de privacidade</a></li>
                            <li><a href="#">Nos ajude</a></li>
                        </ul>
                        <ul className={styles.list}>
                            <h4>Ajuda</h4>
                            <li><Link to="/suporte/query">Central de ajuda</Link></li>
                            <li><a href="#">Entre em contato</a></li>
                        </ul>
                    </div>
                </div>  
                </div>


                <div className={`${styles.mobile} accordion accordion-flush`} id="accordionFlushExample">
  <div className={` accordion-item`}>
    <h2 className="accordion-header" id="flush-headingOne">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        Modalidades
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
                <ul className={styles.list}>
                  <li><Link to="/catalogo/shopping">Loja Virtual</Link></li>
                  <li><Link to="/catalogo/alimentação">Restaurante</Link></li>
                </ul>
            </div>
    </div>
  </div>
  <div className={`${styles.item} accordion-item`}>
    <h2 className="accordion-header" id="flush-headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        Empresa
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body"> 
            <ul className={styles.list}>
                <li><a href="#">Dados e armazenamento</a></li>
                <li><a href="#">Termos de uso</a></li>
                <li><a href="#">Politica de privacidade</a></li>
                <li><a href="#">Nos ajude</a></li>
            </ul>
        </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        Ajuda
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">
            <ul className={styles.list}>
              <li><Link to="/suporte">Central de Ajuda</Link></li>
            </ul>
        </div>
    </div>
  </div>
</div>
           
        </div>
        )
}