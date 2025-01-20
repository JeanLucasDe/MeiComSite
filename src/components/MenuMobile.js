import {FaCog, FaDatabase, FaClipboardList, FaStore, FaCalendarAlt, FaArrowAltCircleRight, FaArrowCircleDown, FaArrowRight, FaArrowDown, FaHome, FaHouseDamage, FaClock, FaAngleDown, FaAngleLeft, FaTh, FaToolbox, FaDonate, FaHandHoldingUsd, FaDollarSign, FaConciergeBell, FaAngleRight, FaBroom} from "react-icons/fa"
import { Link, NavLink, useOutletContext } from "react-router-dom"
import styles from "../layouts/layoutsPerfil/NavBarUser.module.css"
import { useState } from "react"

export default function MenuMobile (props) {



    const razao = ''
    const [openTagConfig, setOpenTagConfig] = useState(false)




    return (
        <>
        <div className={styles.view_mob}>
            <FaAngleRight
            type={props.type}
            data-bs-dismiss={props.data_bs_dismiss}
            aria-label={props.aria_label}
            className={styles.icon}
            />
            <div className={styles.cont_mob}>
                <h4 className={styles.razao}>{razao}</h4>
                <div className={styles.cont_links}>
                    <NavLink
                    to="/perfil/user/painel"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                    }
                    ><FaTh className={styles.icon}/> Painel
                    </NavLink>
                    {/**<NavLink
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
                    <NavLink
                    to="/perfil/user/consultas"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                    }
                    ><FaClock className={styles.icon}/> Consultas
                    </NavLink>
                    {/*
                    <NavLink
                    to="/perfil/user/agenda"
                    className={({ isActive, isPending }) =>
                        isPending ? styles.isPending : isActive ? styles.isActive : styles.isPending
                    }
                    ><FaConciergeBell className={styles.icon}/> Clientes
                    </NavLink>*/}
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
                            ><FaBroom className={styles.icon}/> Temas
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
        </>
        )
}