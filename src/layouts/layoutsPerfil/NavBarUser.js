import { NavLink } from "react-router-dom";
import styles from "./NavBarUser.module.css"
import {Swiper,SwiperSlide} from "swiper/react";
import { FreeMode, Scrollbar} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import {
    FaTh,
    FaToolbox,
    FaClipboardList,
    FaClock,
    FaCog,
    FaAngleDown,
    FaAngleLeft,
    FaHome,
    FaDatabase,
    FaBroom,
    FaStore,
    FaDollarSign,
  } from "react-icons/fa";
import { useState } from "react";
import firebase from "firebase/compat/app";

export default function NavBarUser (props) {
    const modo = props.mod && props.mod
    const {razao} = props.usuario
    const user = props.user
    const [openTagConfig, setOpenTagConfig] = useState(false)

    const handleClickLogOut = () => {
        firebase.auth().signOut()
        .then(() => {window.location.href = "/"})
        .catch(() => {alert('não foi possivel sair da conta')})
    }
  
    
    const navItems = [
        { to: "/perfil/user/painel", icon: <FaTh className={styles.icon}/>, label: "Painel" },
        { to: "/perfil/user/planos", icon: <FaDollarSign className={styles.icon}/>, label: "Planos" },
        { to: "/perfil/user/servicos", icon: <FaToolbox className={styles.icon}/>, label: "Serviços" },
        { to: "/perfil/user/agenda", icon: <FaClipboardList className={styles.icon}/>, label: "Agenda" },
        { to: "/perfil/user/consultas", icon: <FaClock className={styles.icon}/>, label: "Consultas" },
        { to: "/perfil/user/relatorio", icon: <FaDatabase className={styles.icon}/>, label: "Relatório" },
    ];
    
    const configItems = [
        { to: "/perfil/user/empresa", icon: <FaHome className={styles.icon}/>, label: "Empresa" },
        { to: "/perfil/user/config", icon: <FaCog className={styles.icon}/>, label: "Geral" },
        { to: "/perfil/user/horarios", icon: <FaClock className={styles.icon}/>, label: "Horários" },
        { to: "/perfil/user/temas", icon: <FaBroom className={styles.icon}/>, label: "Temas" },
    ];
    
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
                <div className={styles.sidebar}>
                <div className={styles.sidebar_header}>
                  <h4>
                    {user.avatar && <img src={user.avatar} alt="Avatar" className={styles.avatar} />} {razao}
                  </h4>
                </div>
                  <div
                    className={`${styles.config_toggle} ${openTagConfig ? styles.expanded : styles.collapsed}`}
                    onClick={() => setOpenTagConfig(!openTagConfig)}
                  >
                    <FaCog className={styles.icon}/> Configurações {openTagConfig ? <FaAngleDown /> : <FaAngleLeft />}
                  </div>
                  {openTagConfig && (
                    <div className={`${styles.sidebar_links} ${styles.config_links}`}>
                      {configItems.map((item, index) => (
                        <NavLink
                          key={index}
                          to={item.to}
                          className={({ isActive }) => (isActive ? styles.active_link : styles.inactive_link)}
                        >
                          {item.icon} {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                <div className={styles.sidebar_links}>
                  {navItems.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.to}
                      className={({ isActive }) => (isActive ? styles.active_link : styles.inactive_link)}
                    >
                      {item.icon} {item.label}
                    </NavLink>
                  ))}
          
                  <button className={styles.logout_button} onClick={handleClickLogOut}>
                    <FaDatabase /> Sair
                  </button>
                </div>
              </div>
            }
    
    </>
        )

}