import { Link, NavLink, useOutletContext } from "react-router-dom"
import styles from "./HomeCardapio.module.css"
import {FaCircle} from "react-icons/fa"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { useState } from "react";
import {Swiper,SwiperSlide} from "swiper/react";
import { FreeMode, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';




export default function HomeCardapio () {
    const [produtoss, usuario, vendas, funcionamento] = useOutletContext()
    var {serviços, razao, email, clientes, logo, site} = usuario.length > 0 && usuario[0]
    const [prod, setProd] = useState([])
    const [ok, setOk] = useState(false)

    const db = getFirestore(App)
    const ProdCollection = collection(db, `MeiComSite/${email}/produtos`)

    const getUsers = async () => {
        const dataProd = await getDocs(ProdCollection)
        setProd((dataProd.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        setOk(true)
    }
    if (!ok) {
        getUsers()
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }


    return (
        <>
        <div className={styles.container}>
            <div className={styles.top_header}/>
            <input className={styles.input_main} type="text"
            placeholder="O que deseja pedir hoje?"
            />
            <div className={styles.shop}>
                <img src={logo}
                className={styles.logo}
                />
                <div className={styles.razao}>
                    <p className={styles.name_shop}> {razao}</p>
                    <p className={styles.status}><FaCircle className={styles.circle}/> Aberto Agora</p>
                </div>
            </div>
            <div className={styles.cont_nav_menu}>
                <Swiper
                slidesPerView={2}
                freeMode={true}
                modules={[FreeMode, Scrollbar]}
                scrollbar={{
                    hide: false,
                    }}
                >
                    {prod && prod.map(dados => {
                        if (dados.produtos.length > 0) {
                            return (
                                <SwiperSlide>
                                    <NavLink
                                    to={`/${site}/${dados.id}`}
                                    className={`${styles.link} ${({ isActive, isPending }) =>
                                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                    }`}>
                                            <p className={styles.name_categorie}>{dados.categoria}</p>
                                        
                                    </NavLink>
                                </SwiperSlide>
                                )
                        }
                    })}
                </Swiper>
            </div>
            <div className={styles.menu_options}>
                <ul className={styles.list_categories}>
                    {prod && prod.map(dados => {
                    if (dados.produtos.length > 0 ) {
                        return (
                            <>
                                <li className={styles.categorie}
                                key={dados.id}
                                >
                                
                                    <h5 className={styles.name_categorie}>{dados.categoria}</h5>
                                    <ul className={styles.list_itens}>
                                        {dados.produtos.map((item, index )=> {
                                            return (
                                                <li key={item.id}
                                                className={styles.item}
                                                >
                                                    <Link
                                                    to={`/${site}/${dados.id}/${index}`}
                                                    >
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <p className={styles.name_item}>{item.nome}</p>
                                                                <p className={styles.preço_item}>{FormataValor(item.preço)}</p>
                                                            </div>
                                                            <div className="col-6">
                                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIrBbM185W0hlTKs928AOWCJkvmZT6gLGnA&usqp=CAU" className={styles.img}/>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>
                                                )
                                        })}
                                    </ul>
                                </li>
                            </>
                        )  
                    }
                    })}
                </ul>
            </div>
        </div>
        
        </>
        )
}