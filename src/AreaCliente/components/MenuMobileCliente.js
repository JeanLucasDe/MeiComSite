import { FaAngleDoubleRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import styles from "./MenuMobileCliente.module.css"
import {App} from "../../Hooks/App"
import { useEffect,useState } from "react"
import { getFirestore, collection, getDocs} from "@firebase/firestore";

export default function MenuMobileCliente (props) { 

    const obj = props.dados && props.dados

    const db = getFirestore(App)
    const [produtos, setProdutos] = useState([])
    
    useEffect(()=>{
        const getProdutos = async () => {
            const ProdutosCollection = obj && collection(db, `MeiComSite/${obj.email}/produtos`)
            const data = await getDocs(ProdutosCollection)
            setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        }
        getProdutos()
    },[])
    
    
    const reduced = [] 
    
    produtos && produtos.forEach((item) => {
        var duplicated  = reduced.findIndex(redItem => {
            return item.categoria == redItem.categoria;
        }) > -1;
    
        if(!duplicated) {
            reduced.push(item);
        }
    });


    return (
            <div>
                {props.tema && props.tema == "Light" &&
                    <ul className={styles.list}>
                    <FaAngleDoubleRight
                        type={props.type}
                        data-bs-dismiss={props.data_bs_dismiss}
                        aria-label={props.aria_label}
                        className={styles.icon}
                    />
                    <Link>Pedidos</Link>
                    <Link>Contato</Link>
                    <Link>Cardápio Completo</Link>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Categorias
                            </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">

                                <div className="accordion-body">
                                    <ul className={styles.list}>
                                        <Link>Comida Baiana</Link>
                                        <Link>Pizza</Link>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </ul>
                }
                {props.tema && props.tema == "Dark" &&
                    <ul className={styles.list}>
                    <FaAngleDoubleRight
                        type={props.type}
                        data-bs-dismiss={props.data_bs_dismiss}
                        aria-label={props.aria_label}
                        className={styles.icon}
                    />
                    <Link>Pedidos</Link>
                    <div
                    type={props.type}
                    data-bs-dismiss={props.data_bs_dismiss}
                    aria-label={props.aria_label}
                    >
                        <Link to={`/${obj.site}/estoque`}
                        >Catálogo</Link>
                    </div>
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Categorias
                            </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">

                                <div className="accordion-body">
                                    <ul className={styles.list}>
                                        {reduced && reduced.map(dados => {
                                            return (
                                                    <li key={dados.id}
                                                    type={props.type}
                                                    data-bs-dismiss={props.data_bs_dismiss}
                                                    aria-label={props.aria_label}
                                                    >
                                                        <Link>
                                                        {dados.categoria}
                                                        </Link>
                                                    </li>
                                                )
                                        })}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </ul>
                }
            </div>
        )
}