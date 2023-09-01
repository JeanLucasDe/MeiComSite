import styles from "../AreaCliente/components/MarketHome.module.css"
import { Link, useParams } from "react-router-dom";
import NavShop from "../AreaCliente/components/NavShop"
import Loading from "../components/Loading"
import { useEffect, useState } from "react"
import App from "../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import { FaShoppingBag } from "react-icons/fa";
import { Helmet } from "react-helmet";
import {Swiper, SwiperSlide} from "swiper/react"
import { Scrollbar, Pagination, Autoplay } from 'swiper';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css';
import {auth} from "../Service/firebase"
import NavigationBar from "../AreaCliente/components/NavegationBar";
import LinkMeiComSite from "../AreaCliente/components/LinkMeiComSite"



export default function AreaTeste () {

    const db = getFirestore(App)
    const [users, setUser] = useState([]);
    const [userstable, setUsersTable] = useState([])

    const UserCollection = collection(db, "MeiComSite")
    
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                    email
                })
            }
        })
    }, [])
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setUsersTable((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const usuario = users && userstable && userstable.filter(prop => prop.iduser == users.id)


    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const pegaProdutos = () => {
        let produtosSalvos = new Array()
            
        if (localStorage.hasOwnProperty(`meicomsiteteste`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsiteteste`))
        }
        return produtosSalvos
    }

    const produtos = pegaProdutos()
    
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
            <>
                <>
                <NavigationBar info={usuario && usuario[0]}/>
                {usuario.length > 0 && usuario[0].theme == "Dark" &&
                <>
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
                                                            to={`/`}
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
                                            <Link to={`/`} className={styles.link_categorias}>
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
                                                                        to={`/`}
                                                                        >
                                                                        <img src={item.img} className={styles.img_examples}/>
                                                                        </Link>
                                                                        <div className={styles.info_produto}>
                                                                            <p className={styles.text_info}>{item.nome}</p>
                                                                            <p className={styles.text_info}>{FormataValor(item.preço)}</p>
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


            {usuario.length > 0 && usuario.theme == "Light" && 
                    <div className={`${styles.container} row ${styles[usuario && usuario.theme]}`}>
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-9">
                        <ul className={`row ${styles.list}`}>
                                {produtos && produtos.map(dados=> {
                                    if (dados.status != "inerit") {
                                        return (
                                                <li key={dados.id} className="col-lg-4 col-md-6">
                                                    <div className={styles.item}>
                                                        <div className="row">
                                                            <div className={`col-4 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                                <div className={styles.cont_img}><img src={dados.img} className={styles.img}/></div>
                                                            </div>
                                                            <div className={`col-8 col-lg-12 ${styles.no_padding_no_margin}`}>
                                                                <div className={styles.cont_text}>
                                                                    <h4 className={styles.nome_prod}>{dados.nome}</h4>
                                                                    <p className={styles.desc_prod}>{dados.desc}</p>
                                                                    <p className={styles.preço_prod}>{FormataValor(dados.preço)}</p>
                                                                    <div className={styles.cont_buttons}>
                                                                        <Link
                                                                        to={`/`}
                                                                        >Comprar</Link>
                                                                        <button><FaShoppingBag/></button>
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
                
                
                </>
            
                <Helmet>
                    <title>{usuario.length > 0 && usuario[0].razao + "- Teste"}</title>
                    <link rel="icon" type="image/url" href={usuario.length > 0 && usuario[0].logo} sizes="16x16" />
                </Helmet>
                
        </>
        <LinkMeiComSite/>
        </>
        )
}