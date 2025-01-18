import { NavLink } from "react-router-dom";
import styles from "./NavBarUser.module.css"
import {Swiper,SwiperSlide} from "swiper/react";
import { FreeMode, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import {FaCog, FaDatabase, FaClipboardList, FaStore, FaCalendarAlt, FaArrowAltCircleRight, FaArrowCircleDown, FaArrowRight, FaArrowDown, FaHome, FaHouseDamage, FaClock, FaAngleDown, FaAngleLeft, FaTh, FaToolbox, FaDonate, FaHandHoldingUsd, FaDollarSign, FaConciergeBell} from "react-icons/fa"
import { useState } from "react";

export default function NavBarUser (props) {
    const modo = props.mod && props.mod
    const {razao} = props.usuario
    const user = props.user
    const [openTagConfig, setOpenTagConfig] = useState(false)
  
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
                                ><FaStore className={styles.icon}/> Serviços
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
                    <div className={`${styles.view_desk}`}>
                        <h4 className={styles.razao}><img src={user.avatar}/> {razao}</h4>
                        <div className={styles.cont_links}>
                            <NavLink
                            to="/perfil/user/painel"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaTh className={styles.icon}/> Painel
                            </NavLink>
                            {/***<NavLink
                            to="/perfil/user/assinatura"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaDollarSign className={styles.icon}/> Assinatura
                            </NavLink>**/}
                            <NavLink
                            to="/perfil/user/servicos"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaToolbox className={styles.icon}/> Serviços
                            </NavLink>
                            <NavLink
                            to="/perfil/user/agenda"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaClipboardList className={styles.icon}/> Agenda
                            </NavLink>
                            {/***<NavLink
                            to="/perfil/user/consultas"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaClock className={styles.icon}/> Consultas
                            </NavLink>***/}
                            {/***<NavLink
                            to="/perfil/user/clientes"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaConciergeBell className={styles.icon}/> Clientes
                            </NavLink>**/}
                            <div
                            to="/perfil/user/config"
                            className={`${styles.button} ${openTagConfig ? styles.onscrool : styles.isPending}`}
                            onClick={()=> setOpenTagConfig(!openTagConfig)}
                            ><FaCog className={styles.icon}/> Configurações {openTagConfig ?  <FaAngleDown/>: <FaAngleLeft/>}
                            </div>
                            {openTagConfig && 
                                <div className={styles.cont_btn_config}>
                                    <NavLink
                                    to="/perfil/user/empresa"
                                    className={({ isActive, isPending }) =>
                                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                    }
                                    ><FaHome className={styles.icon}/> Empresa
                                    </NavLink>
                                    <NavLink
                                    to="/perfil/user/config"
                                    className={({ isActive, isPending }) =>
                                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                    }
                                    ><FaCog className={styles.icon}/> Geral
                                    </NavLink>
                                    
                                    <NavLink
                                    to="/perfil/user/horarios"
                                    className={({ isActive, isPending }) =>
                                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                    }
                                    ><FaClock className={styles.icon}/> Horário de Funcionamento
                                    </NavLink>
                                    <NavLink
                                    to="/perfil/user/temas"
                                    className={({ isActive, isPending }) =>
                                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                                    }
                                    ><FaCog className={styles.icon}/> Temas
                                    </NavLink>
                                </div>
                            }
                            {/**<NavLink
                            to="/perfil/user/config"
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaHandHoldingUsd className={styles.icon}/> Cupons
                            </NavLink>**/}
                            <NavLink
                            to={"/perfil/user/relatorio" }
                            className={({ isActive, isPending }) =>
                                isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                            }
                            ><FaDatabase className={styles.icon}/> Relatório
                            </NavLink>
                        </div>
                
                </div>
            </div>
            }
    
    </>
        )

}