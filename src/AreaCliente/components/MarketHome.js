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
import Conversation from "../layouts/Wpp/Conversation";
import HomeAgenda from "../layouts/Agenda/HomeAgenda";



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
            {usuario.length > 0 && usuario[0].theme == "Dark" &&
            <>
            {!load && <Loading/>}
            <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>
                <div className="col-md-12">
                    <div className={styles.list}>
                    <Swiper
                    spaceBetween={10}
                    className={`mySwiper ${styles.cont_slides_destaque}`}
                    slidesPerView={1}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                        }}
                    >
                    {produtos && produtos.map(dados => {
                        if (dados.destaque) {
                            return (
                                    <SwiperSlide key={dados.id} className={`${styles.li}`}>
                                        <div className="row">
                                            <div className="col-6 col-sm-5 col-md-6 col-lg-8">
                                                <div className={styles.cont_text_destaque}>
                                                    <div>
                                                        <h1 className={styles.text_destaque}>{dados.text}</h1>
                                                        <Link
                                                        to={`/${site}/${dados.categoria}`}
                                                        className={styles.link_destaque}>
                                                        Confira</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 col-sm-7 col-md-6 col-lg-4">
                                                <div className={styles.cont_img_destaque}><img src={dados.img} className={styles.img_destaque}/></div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                        }
                            
                        })
                        }
                    </Swiper>
                    <h2 className={styles.text_align_center}>Categorias</h2>
                    <Swiper
                    spaceBetween={1}
                    breakpoints={{
                        320: {
                            width: 320,
                            slidesPerView: 2,
                        },
                        576: {
                            width: 576,
                            slidesPerView: 3,
                        },
                    }}
                    scrollbar={{
                    hide: true,
                    }}
                    modules={[Scrollbar]}

                    >
                        {produtos && produtos.map(dados => {
                            return (
                                    <SwiperSlide key={dados.id} className={`${styles.li}`}>
                                        <Link to={`/${site}/${dados.categoria}`} className={styles.link_categorias}>
                                            <div className={styles.cont_categorias}>
                                                <img src={dados.img} className={styles.img_categoria}/>
                                                <p className={styles.text_categoria}>{dados.categoria}</p>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            
                        })
                        }

                    </Swiper>

                        <div className={styles.cont_prod}>
                                {produtos && produtos.map(dados => {
                                if (dados.mostrar) {
                                    if (dados.produtos && dados.produtos.length > 0) {
                                        return (
                                            <>
                                                
                                                <h5 key={dados.categoria} className={styles.title_categoria}>{dados.categoria}</h5>

                                                <Swiper
                                                spaceBetween={25}
                                                loop={true}
                                                pagination={true}
                                                breakpoints={{
                                                    320: {
                                                        width: 320,
                                                        slidesPerView: 2,
                                                    },
                                                    576: {
                                                        width: 576,
                                                        slidesPerView: 1,
                                                    },
                                                }}
                                                >
                                                    {dados.produtos.map(item => {
                                                        return (
                                                            <SwiperSlide key={dados.nome}>
                                                                <div>
                                                                    <Link
                                                                    to={`/${site}/${dados.categoria}/${item.nome.toLowerCase().replaceAll(' ','')}`}
                                                                    >
                                                                    <img src={item.img} className={styles.img_examples}/>
                                                                    </Link>
                                                                    <div className={styles.info_produto}>
                                                                        <div>
                                                                            <p className={styles.text_info}>{item.nome}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className={`${item.preçopromo > 0 && styles.price_from} ${styles.text_info}`}>{item.preçopromo > 0 && "De "}{FormataValor(item.preço)}</p>

                                                                            {item.preçopromo > 0 && <p className={styles.text_info}>Por: {FormataValor(item.preçopromo)}</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                            )
                                                    })}
                                                </Swiper>
                                                
                                                    
                                            </>
                                            )
                                    }
                                }    
                                })
                                }
                        </div>
                    </div>
                    </div>
            </div>
            
            </>
            }
            
            {usuario.length > 0 && usuario[0].theme == "Light" && 
                <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>
                    <div className="col-lg-3">
                        <NavShop/>
                    </div>
                    <div className="col-lg-9">
                    <ul className={`row ${styles.list}`}>
                            {produtos && produtos.map(dados=> {
                                if (dados.status != "inerit" && dados.produtos) {
                                    return (
                                            <li key={dados.id} className="col-lg-4 col-md-6">
                                                <div className={styles.item}>
                                                    <div className="row">
                                                        <div className={`col-4 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                            <div className={styles.cont_img}><img src={dados.img} className={styles.img}/></div>
                                                        </div>
                                                        <div className={`col-8 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                            <div className={styles.cont_text}>
                                                                <h4 className={styles.nome_prod}>{dados.categoria}</h4>
                                                                <p className={styles.desc_prod}>{dados.desc}</p>
                                                                <div className={styles.cont_buttons}>
                                                                    <Link
                                                                    to={`/${site}/${dados.categoria}`}
                                                                    >Ver</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            }

            {usuario.length > 0 && usuario[0].theme == "Wpp" &&
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
            {usuario.length > 0 && usuario[0].theme == "Agenda" &&
                <>
                    <HomeAgenda
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