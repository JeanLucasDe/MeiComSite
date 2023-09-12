import { useOutletContext } from "react-router-dom"
import styles from "./Online.module.css"
import {FaUser,FaCompactDisc, FaBars, FaClock, FaAngleDoubleRight, FaAngleDoubleLeft} from "react-icons/fa"
import DetalhesVenda from "./DetalhesVenda"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore} from "@firebase/firestore";
import {Swiper,SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import NovoPedido from "./NovoPedido"
import { ToastContainer, toast } from "react-toastify"


export default function BoxPedidos (props) {

    const vendas = props.vendas
    const usuario = props.usuario
    const [obj, setObj] = useState()
    const db = getFirestore(App)
    const [count, setCounte] = useState(1)
    var [countDelete, setCountDelete] = useState(0)
    const [pedidoDelete, setPedidoDelete] = useState('')
    


    const DeletarPedido = async(dados) => {
        

        setCountDelete(countDelete += 1)
        
        if (countDelete == 1) {
            toast.error('Clique 2 vezes para confirmar')
            setPedidoDelete(dados.iden)
        }
        if (countDelete == 2) {
            if (pedidoDelete != dados.iden) {
                return toast.error('Clique 2 vezes para confirmar')
            }
            dados.state = 0
            const ref = doc(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`, dados && dados.id)
            await deleteDoc(ref)
            setObj(dados)
        }
        setTimeout(() => {
            setCountDelete(0)
        }, 1000);
    }

    const AceitarPedido = async (dados) => {
        dados.state = 2
        await updateDoc(doc(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`, dados && dados.id), {
            state: 2
        });
    }
    const AceitarPedidoEntrega = async (dados) => {
        dados.state = 3
        await updateDoc(doc(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`, dados && dados.id), {
            state: 3
        });
    }
    const finalizarPedido = async (dados) => {
        dados.state = 4
        await updateDoc(doc(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`, dados && dados.id), {
            state: 4
        });
    }


    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    const [select, setSelect] = useState(false)
    





    return(
        <>

        <div className={` ${styles.cont_box_pedidos}`} >
            {!select ?
            <div className="row">
                <div className={`${styles.no_margin} col-md-4`} id="aberto">
                    <div className={`${styles.aberto} ${styles.box_pedidos}`}>
                        <div className={styles.title_dinam}>
                            <h5>Em Aberto</h5>
                            <FaAngleDoubleRight
                            onClick={() => {
                                setSelect(1)
                            }}
                            type="button"
                            />
                        </div>
                            <ul className={styles.list}>
                                {vendas.length > 0 && vendas.map(dados => {
                                    if (dados.state == 1) {
                                        return (
                                            <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                                            {dados.lugar == 2 && <span>*Aqui*</span>}
                                            <div className={styles.f_space_bet}>
                                                <h5>Pedido #{dados.iden}</h5>
                                                <FaBars
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#ModalDetalhesVenda`}
                                                onClick={()=> setObj(dados)}
                                                />
                                            </div>
                                            <strong className={styles.clock}><FaClock/> {dados.hora}</strong>
                                            <p><FaUser/> {dados.nome}</p>
                                            <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                                            <div className={styles.cont_button}>
                                                <button className={styles.acc}
                                                onClick={() => {
                                                    AceitarPedido(dados)
                                                    setCounte(count + 1)
                                                }}
                                                >Aceitar Pedido</button>
                                                <button className={styles.del}
                                                onClick={() => {
                                                    DeletarPedido(dados)
                                                    setCounte(count + 1)
                                                }}
                                                >Recusar</button>
                                            </div>
                                        </li>
                                            )
                                    }
                                })}
                            </ul>
                    </div>
                </div>
                <div className={`${styles.no_margin} col-md-4`} id="preparo">
                    <div className={`${styles.preparo} ${styles.box_pedidos}`}>
                    <div className={styles.title_dinam}>
                        <h5>Em Preparo</h5>
                        <FaAngleDoubleRight
                            onClick={() => {
                                setSelect(2)
                            }}
                            type="button"
                            />
                    </div>
                    {vendas.length > 0 && vendas.map(dados => {
                        if (dados.state == 2) {
                            return (
                                <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                                {dados.lugar == 2 && <span>*Aqui*</span>}
                                <div className={styles.f_space_bet}>
                                    <h5>Pedido #{dados.iden}</h5>
                                    <FaBars
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#ModalDetalhesVenda`}
                                    onClick={()=> setObj(dados)}
                                    />
                                </div>
                                <strong className={styles.clock}><FaClock/> {dados.hora}</strong>
                                <p><FaUser/> {dados.nome}</p>
                                <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                                <div className={styles.cont_button}>
                                    <button className={styles.acc}
                                    onClick={() => AceitarPedidoEntrega(dados)}
                                    >Pronto!</button>
                                    <button className={styles.del}
                                    onClick={() => {
                                        DeletarPedido(dados)
                                        setCounte(count + 1)
                                    }}
                                    >Cancelar</button>
                                </div>
                            </li>
                                )
                        }
                    })}
                    </div>
                </div>
                <div className={`${styles.no_margin} col-md-4`} id="entrega">
                    <div className={`${styles.entrega} ${styles.box_pedidos}`}>
                    <div className={styles.title_dinam}>
                        <h5>Em Preparo</h5>
                        <FaAngleDoubleRight
                            onClick={() => {
                                setSelect(3)
                            }}
                            type="button"
                            />
                    </div>
                    {vendas.length > 0 && vendas.map(dados => {
                        if (dados.state == 3) {
                            return (
                                <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                                {dados.lugar == 2 && <span>*Aqui*</span>}
                                <div className={styles.f_space_bet}>
                                    <h5>Pedido #{dados.iden}</h5>
                                    <FaBars
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#ModalDetalhesVenda`}
                                    onClick={()=> setObj(dados)}
                                    />
                                </div>
                                <strong className={styles.clock}><FaClock/> {dados.hora}</strong>
                                <p><FaUser/> {dados.nome}</p>
                                <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                                <div className={styles.cont_button}>
                                    <button className={styles.acc}
                                    onClick={() => {
                                        finalizarPedido(dados)
                                        setCounte(count + 1)
                                    }}
                                    >Finalizar</button>
                                    <button className={styles.del}
                                    onClick={() => {
                                        DeletarPedido(dados)
                                        setCounte(count + 1)
                                    }}
                                    >Cancelar</button>
                                </div>
                            </li>
                                )
                        }
                    })}
                    </div>
                </div>
            </div>
        
            :
            <div className={`
            ${select == 1 && styles.aberto}
            ${select == 2 && styles.preparo}
            ${select == 3 && styles.entrega}
            ${styles.select}
            `}>
            {select == 1 && <h5>Em Aberto</h5>}
            {select == 2 && <h5>Em Preparo</h5>}
            {select == 3 && <h5>Em Entrega</h5>}
            <div className={styles.title_select}
            onClick={() => {
                setSelect(false)
            }}
            type="button"
            >
                <FaAngleDoubleLeft/>
                <strong> Voltar</strong>
            </div>
            <ul className={`${styles.list} row`}>
                <div className="row">
                {vendas.length > 0 && vendas.map(dados => {
                    if (dados.state == select) {
                        return (
                            <div className="col-md-6">
                            <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                            {dados.lugar == 2 && <span>*Aqui*</span>}
                            <div className={styles.f_space_bet}>
                                <h5>Pedido #{dados.iden}</h5>
                                <FaBars
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={`#ModalDetalhesVenda`}
                                onClick={()=> setObj(dados)}
                                />
                            </div>
                            <strong className={styles.clock}><FaClock/> {dados.hora}</strong>
                            <p><FaUser/> {dados.nome}</p>
                            <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                            <div className={styles.cont_button}>
                                <button className={styles.acc}
                                onClick={() => {
                                    AceitarPedido(dados)
                                    setCounte(count + 1)
                                }}
                                >Aceitar Pedido</button>
                                <button className={styles.del}
                                onClick={() => {
                                    DeletarPedido(dados)
                                    setCounte(count + 1)
                                }}
                                >Recusar</button>
                            </div>
                        </li>

                            </div>
                            )
                    }
                })}
                </div>
            </ul>
            </div>
            }
            
        </div>

        <div className={`${styles.mob_Version}`}>
            <div className={styles.title_Mob}>
                <div>
                    <h4 className={styles.text_center}>Painel de Pedidos</h4>
                </div>
                <div>
                    <button
                    className={styles.btn_new}
                    data-bs-toggle="modal"
                    data-bs-target={`#ModalNovoPedido`}
                    >Novo Pedido</button>
                </div>
            </div>
            <Swiper
            slidesPerView={1}
            className={`nav`}
            >
                <SwiperSlide>
                <div className={`${styles.aberto} ${styles.box_mob_content}`}>
                    <h5>Em aberto</h5>
                    <div className={styles.box_mob}>
                        <ul className={styles.list}>
                            {vendas.length > 0 && vendas.map(dados => {
                                if (dados.state == 1) {
                                    return (
                                        <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                                        {dados.lugar == 2 && <span>*Aqui*</span>}
                                        <div className={styles.f_space_bet}>
                                            {dados.lugar == 2 && <span>(casa)</span>}
                                            <h5>Pedido #{dados.iden}</h5>
                                            <FaBars
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#ModalDetalhesVenda`}
                                            onClick={()=> setObj(dados)}
                                            />
                                        </div>
                                        <p><FaUser/> {dados.nome}</p>
                                        <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                                        <div className={styles.cont_button}>
                                            <button className={styles.acc}
                                            onClick={() => {
                                                AceitarPedido(dados)
                                                setCounte(count + 1)
                                            }}
                                            >Aceitar Pedido</button>
                                            <button className={styles.del}
                                            onClick={() => {
                                                DeletarPedido(dados)
                                                setCounte(count + 1)
                                            }}
                                            >Recusar</button>
                                        </div>
                                    </li>
                                        )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            
                </SwiperSlide>
                <SwiperSlide>
                <div className={`${styles.preparo} ${styles.box_mob_content}`}>
                    <h5>Em preparo</h5>
                    <div className={styles.box_mob}>
                        <ul className={styles.list}>
                            {vendas.length > 0 && vendas.map(dados => {
                                if (dados.state == 2) {
                                    return (
                                        <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                                        {dados.lugar == 2 && <span>*Aqui*</span>}
                                        <div className={styles.f_space_bet}>
                                            <h5>Pedido #{dados.iden}</h5>
                                            <FaBars
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#ModalDetalhesVenda`}
                                            onClick={()=> setObj(dados)}
                                            />
                                        </div>
                                        <p><FaUser/> {dados.nome}</p>
                                        <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                                        <div className={styles.cont_button}>
                                            <button className={styles.acc}
                                            onClick={() => {
                                                AceitarPedidoEntrega(dados)
                                                setCounte(count + 1)
                                            }}
                                            >Pronto</button>
                                            <button className={styles.del}
                                            onClick={() => {
                                                DeletarPedido(dados)
                                                setCounte(count + 1)
                                            }}
                                            >Recusar</button>
                                        </div>
                                    </li>
                                        )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            
                </SwiperSlide>
                <SwiperSlide>
                <div className={`${styles.entrega} ${styles.box_mob_content}`}>
                    <h5>Em entrega</h5>
                    <div className={styles.box_mob}>
                        <ul className={styles.list}>
                            {vendas.length > 0 && vendas.map(dados => {
                                if (dados.state == 3) {
                                    return (
                                        <li className={`${dados.lugar == 2 && styles.home} ${styles.item_list}`} key={dados.iden}>
                                        {dados.lugar == 2 && <span>*Aqui*</span>}
                                        <div className={styles.f_space_bet}>
                                            <h5>Pedido #{dados.iden}</h5>
                                            <FaBars
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#ModalDetalhesVenda`}
                                            onClick={()=> setObj(dados)}
                                            />
                                        </div>
                                        <p><FaUser/> {dados.nome}</p>
                                        <p><FaCompactDisc/> {FormataValor(dados.Total)} ({dados.pagamento})</p>
                                        <div className={styles.cont_button}>
                                            <button className={styles.acc}
                                            onClick={() => {
                                                finalizarPedido(dados)
                                                setCounte(count + 1)
                                            }}
                                            >Finalizar</button>
                                            <button className={styles.del}
                                            onClick={() => {
                                                DeletarPedido(dados)
                                                setCounte(count + 1)
                                            }}
                                            >Recusar</button>
                                        </div>
                                    </li>
                                        )
                                }
                            })}
                        </ul>
                    </div>
                </div>
            
                </SwiperSlide>
            </Swiper>
        </div>
        

        <div className="modal fade" id="ModalDetalhesVenda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-lg`}>
                    <div className="modal-content">
                        <DetalhesVenda
                        obj={obj}
                        type="button" 
                        aria_label="Close"
                        data_bs_toggle="modal" 
                        data_bs_target="#ModalDetalhesVenda"
                        />
                    </div>
                </div>
        </div>

        <div className="modal fade" id="ModalNovoPedido" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-lg`}>
                <div className="modal-content">
                    <NovoPedido
                    obj={obj}
                    type="button" 
                    aria_label="Close"
                    data_bs_toggle="modal" 
                    data_bs_target="#ModalDetalhesVenda"
                    />
                </div>
            </div>
        </div>
        <ToastContainer/>
        </>
        )
}