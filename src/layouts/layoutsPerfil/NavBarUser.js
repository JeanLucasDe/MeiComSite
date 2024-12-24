import { NavLink } from "react-router-dom";
import styles from "./NavBarUser.module.css"
import {Swiper,SwiperSlide} from "swiper/react";
import { FreeMode, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import {FaCog, FaDatabase, FaClipboardList, FaStore, FaCalendarAlt} from "react-icons/fa"

export default function NavBarUser (props) {
    const modo = props.mod && props.mod
  
    return (
    <>      
            {modo == "Alimentação" &&
                <div>
                    <Swiper
                    breakpoints={{
                        320: {
                        width: 320,
                        slidesPerView: 2,
                        },
                        768: {
                        width: 768,
                        slidesPerView: 2,
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
                            to="/perfil/user/categorias"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                            }
                            >Loja
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
                            to="/perfil/user/config"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                            }
                            >Configurações
                            </NavLink>
                        </SwiperSlide>
                    </Swiper>
                        <div className={`${styles.view_desk}`}>
                            <div className={styles.cont_links}>
                    
                                <NavLink
                                to="/perfil/user/categorias"
                                className={({ isActive, isPending }) =>
                                    isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                }
                                ><FaStore className={styles.icon}/> Loja
                                </NavLink>
                                <NavLink
                                to="/perfil/user/online"
                                className={({ isActive, isPending }) =>
                                    isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                }
                                ><FaClipboardList className={styles.icon}/> Pedidos
                                </NavLink>
                                <NavLink
                                to={"/perfil/user/vendas" }
                                className={({ isActive, isPending }) =>
                                    isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                }
                                ><FaDatabase className={styles.icon}/> Vendas
                                </NavLink>
                                <NavLink
                                to="/perfil/user/config"
                                className={({ isActive, isPending }) =>
                                    isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                }
                                ><FaCog className={styles.icon}/> Configurações
                                </NavLink>
                            </div>
                    
                        </div>
                </div>
            }
            {modo == "Agenda" &&
                <div>
                <Swiper
                breakpoints={{
                    320: {
                    width: 320,
                    slidesPerView: 2,
                    },
                    768: {
                    width: 768,
                    slidesPerView: 2,
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
                        to="/perfil/user/servicos"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                        }
                        >Loja
                        </NavLink>
                    </SwiperSlide>
                    <SwiperSlide>
                        <NavLink
                        to="/perfil/user/agenda"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                        }
                        >Agenda
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
                        to="/perfil/user/config"
                        className={({ isActive, isPending }) =>
                            isPending ? styles.isPendingMob : isActive ? styles.isActiveMob : styles.isPendingMob
                        }
                        >Configurações
                        </NavLink>
                    </SwiperSlide>
                </Swiper>
                    <div className={`${styles.view_desk}`}>
                        <div className={styles.cont_links}>
                
                            <NavLink
                            to="/perfil/user/servicos"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaStore className={styles.icon}/> Loja
                            </NavLink>
                            <NavLink
                            to="/perfil/user/agenda"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaClipboardList className={styles.icon}/> Agenda
                            </NavLink>
                            <NavLink
                            to={"/perfil/user/vendas" }
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaDatabase className={styles.icon}/> Relatório
                            </NavLink>
                            <NavLink
                            to="/perfil/user/config"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaCog className={styles.icon}/> Configurações
                            </NavLink>
                        </div>
                
                    </div>
            </div>
            }
    
    </>
        )

}