import { NavLink } from "react-router-dom";
import styles from "./NavBarUser.module.css"
import {Swiper,SwiperSlide} from "swiper/react";
import { FreeMode, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { useState } from "react";
import {FaLandmark,FaLayerGroup,FaChartPie,FaLink,FaWrench, FaPowerOff} from "react-icons/fa"

export default function NavBarUser () {

    const [verifica, setVerfica] = useState(false)
    const [modo, setModo] = useState()
    
    
    
    const pegaDados = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsitemodo`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsitemodo`))
        }

        if (!produtosSalvos) {
            produtosSalvos.push({modo:true})
            localStorage.setItem(`meicomsitemodo`,JSON.stringify(produtosSalvos))
        }

        return produtosSalvos
    }
    const AlterarModo = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsitemodo`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsitemodo`))
        }
        if (produtosSalvos.length == 0) {
            produtosSalvos.push({modo:false})
            localStorage.setItem(`meicomsitemodo`,JSON.stringify(produtosSalvos))
        } else {
            produtosSalvos[0].modo = modo == true ?  false : true
            localStorage.setItem(`meicomsitemodo`,JSON.stringify(produtosSalvos))
        }
    }

    const dados = pegaDados() 
    const mod = dados.length > 0 ? dados[0].modo : true

    if (!verifica) {
        if (mod) {
            setModo(mod)
            setVerfica(true)
        } 
    }


    return (
    <>
            <Swiper 
            breakpoints={{
                320: {
                  width: 320,
                  slidesPerView: 2,
                },
                768: {
                  width: 768,
                  slidesPerView: 4,
                },
              }}
            className={`${styles.navigation} nav`}
            freeMode={true}
            modules={[FreeMode, Scrollbar]}
            scrollbar={{
                hide: true,
                }}
            >
                <SwiperSlide>
                    <NavLink
                    to="/perfil/user/negocio"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                    }
                    >Visão Geral
                    </NavLink>  
                </SwiperSlide>

                <SwiperSlide>
                    <NavLink
                    to="/perfil/user/categorias"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                    }
                    >Produtos
                    </NavLink>  
                </SwiperSlide>
                <SwiperSlide>
                    <NavLink
                    to="/perfil/user/online"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                    }
                    >Pedidos
                    </NavLink>  
                </SwiperSlide>

                <SwiperSlide>
                    <NavLink
                    to="/perfil/user/vendas"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                    }
                    >Relatório
                    </NavLink>  
                </SwiperSlide>

                <SwiperSlide>
                    <NavLink
                    to="/perfil/user/membros"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                    }
                    >Links
                    </NavLink>  
                </SwiperSlide>
                <SwiperSlide>
                    <NavLink
                    to="/perfil/user/config"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                    }
                    >Configurações
                    </NavLink>  
                </SwiperSlide>

            </Swiper>

                <div className={`${styles.view_desk}`}>
                    <div className={`${!mod && styles.isTest} ${styles.cont_mod}`}>
                        <a
                        href="/perfil/user/negocio"
                        >
                            <div className={styles.cont_range}
                            onClick={()=> AlterarModo()}
                            >
                                <div className={`${styles.btn_range} ${ mod ? styles.isLeft : styles.isRight}`}/>
                            </div>
                        </a>
                        <div>
                            {mod ? <strong>Modo Real</strong>:
                            <strong>Modo de Teste</strong>}
                        </div>
                    </div>
                    <div className={styles.cont_links}>
                        <NavLink
                        to="/perfil/user/negocio"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                        }
                        ><FaLandmark className={styles.icon}/> Visão Geral
                        </NavLink>
                        <NavLink
                        to="/perfil/user/categorias"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                        }
                        ><FaLayerGroup className={styles.icon}/> Produtos
                        </NavLink>
                        <NavLink
                        to="/perfil/user/online"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                        }
                        ><FaPowerOff className={styles.icon}/> Pedidos
                        </NavLink>
                        <NavLink
                        to={"/perfil/user/vendas" }
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                        }
                        ><FaChartPie className={styles.icon}/> Vendas
                        </NavLink>
                        <NavLink
                        to="/perfil/user/membros"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                        }
                        ><FaLink className={styles.icon}/> Links
                        </NavLink>
                        <NavLink
                        to="/perfil/user/config"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                        }
                        ><FaWrench className={styles.icon}/> Configurações
                        </NavLink>
                    </div>
                
                </div>
    </>
        )

}