import styles from "./MarketHome.module.css"
import { Link, useOutletContext, useParams } from "react-router-dom";
import NavShop from "./NavShop"
import Loading from "../../components/Loading"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { Helmet } from "react-helmet";

import {Swiper, SwiperSlide} from "swiper/react"
import { Scrollbar, Pagination, Autoplay } from 'swiper';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css';
import HomeWpp from "../layouts/Wpp/HomeWpp";
import HomeAgenda from "../layouts/Agenda/HomeAgenda";
import HomeCardapio from "../layouts/Cardapio/HomeCardapio";



export default function MarketHome () {
    const [produtos, usuario] = useOutletContext()
    const [count, setCount] = useState(0)
    const [conversation, setShowConversation] = useState()
    const [pedidos, setPedidos] = useState()
    const [load, setLoading] = useState(false)
    const {site} = useParams()
    

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    return (
        <>
            <>

            {usuario.length > 0 && usuario[0].mod == "Wpp" &&
                <>
                <div className={`${styles[usuario && usuario[0].theme]}`}>
                    <div className={styles.block_green}/>
                    <div className={styles.content}>
                        <div className={styles.cont_left}>

                            <div className={styles.cont_user}>
                                <FaUserCircle className={styles.user}/>
                                <p>{usuario.length > 0 && usuario[0].telefone}</p>
                            </div>

                            <div className={styles.cont_persons}>
                                <div className={styles.cont_input}>
                                    <input type="text"
                                    placeholder="Pesquisar ou começar nova conversa"
                                    />
                                </div>
                                <div className={styles.person}
                                onClick={() => {
                                        setPedidos(false)
                                        setShowConversation(true)
                                        setCount(1) 
                                }}
                                >
                                    <div className={styles.flex}>
                                        <img src={usuario.length > 0 && usuario[0].mod == "Alimentação" && "https://static.vecteezy.com/system/resources/previews/011/097/612/non_2x/waiters-for-food-delivery-business-icon-png.png"} className={styles.logo}/>
                                        <div className={styles.info_person}>
                                            <div>
                                                <p>{usuario.length > 0 && usuario[0].razao}</p>
                                                <p>Faça seu pedido</p>
                                            </div>
                                            <div>
                                                <p className={styles.icon_check}>agora</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cont_right}>
                            <HomeWpp 
                            produtos={produtos && produtos}
                            usuario={usuario[0] && usuario[0]}
                            /> 
                        </div>
                        
                    </div>
                </div>
                </>
            } 
            {usuario.length > 0 && usuario[0].mod == "Agenda" &&
                <>
                    <HomeAgenda
                    produtos={produtos && produtos}
                    usuario={usuario[0] && usuario[0]}
                    />
                </>
            } 
            {usuario.length > 0 && usuario[0].mod == "Alimentação" &&
                <>
                    <HomeCardapio
                    produtos={produtos && produtos}
                    usuario={usuario[0] && usuario[0]}
                    />
                </>
            } 
                
                
            </>

            
            <Helmet>
                <title>{usuario.length > 0 && usuario[0].razao}</title>
                <link rel="icon" type="image/url" href={usuario.length > 0 && usuario[0].logo} sizes="16x16" />
            </Helmet>
        </>
        )
}