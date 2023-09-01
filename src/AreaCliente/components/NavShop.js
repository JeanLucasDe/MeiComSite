import styles from "./NavShop.module.css"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {  Link, useParams } from "react-router-dom";
import {FaBookReader, FaFireAlt, FaShoppingBag} from "react-icons/fa"


export default function NavShop () {

    const db = getFirestore(App)
    const UserCollection = collection(db, `MeiComSite`)
    const [produtos, setProdutos] = useState([])
    const [users, setUsers] = useState([])
    const [state, setState] = useState("start")
    const {site} = useParams()
    
    const getProdutos = async () => {
        const ProdutosCollection = usuario && collection(db, `MeiComSite/${usuario[0].email}/produtos`)
        const data = await getDocs(ProdutosCollection)
        setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("fim")
    }
    const getCliente = async () => {
        const data = await getDocs(UserCollection)
        setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setState("produto")
    }

    const usuario = users && users.filter(dados => {
        if (dados.site == site) {
            return dados
        }
    })

    if (usuario) {
        if (state == "produto") {
            getProdutos()
        }
    }

    if (state == "start") {
        getCliente()
    }
   
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
        <>
        {usuario.length > 0 && usuario[0].theme == "Dark" &&
            <div className={`${styles.container} ${styles[usuario && usuario[0].theme]}`}>
                <div className={styles.cont_left}>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Categorias
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul className={styles.list_categories}>
                                        {reduced && reduced.map(item => {
                                            return (
                                                    <li key={item.id}>
                                                        <Link
                                                        to={`/${site}/${item.categoria.toLowerCase()}`}
                                                        >{item.categoria}</Link>
                                                    </li>
                                                )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne">
                                Filtrar
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <ul>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        {usuario.length > 0 && usuario[0].theme == "Light" &&
            <div className={`${styles.container} ${styles[usuario && usuario[0].theme]}`}>
                <div className={`${styles.cont_options}`}>
                    <ul className={styles.list}>
                        <li>
                            <Link
                            to={`/${usuario[0].site}/compras`}
                            >
                            <FaShoppingBag className={`item ${styles.icon}`}/>Sacola
                            </Link>
                        </li>

                        <li>

                            <Link
                            to={`/${usuario[0].site}`}
                            >
                                <FaBookReader className={styles.icon}/>Cardápio
                            </Link>
                        </li>

                        <li>
                            <Link
                            >
                                <FaFireAlt className={styles.icon}/>Promoções
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        }

        </>
        )
}