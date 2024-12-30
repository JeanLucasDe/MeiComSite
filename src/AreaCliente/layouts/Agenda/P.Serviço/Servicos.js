import { useState } from "react"
import styles from "./Servicos.module.css"
import BoxConfirm from "../../../../components/BoxConfirm"
import { Link, useOutletContext } from "react-router-dom"
import {FaPenAlt, FaPlus, FaTrashAlt} from "react-icons/fa"

export default function Servicos () {

    const [mod, produtos, usuario, vendas, user,servicos] = useOutletContext()
    const [hora, setHora] = useState('')
    const [valor, setValor] = useState()
    const [nome, setNome] = useState()
    const [state, setState] = useState(1)
    const [ação, setAção] = useState()
    const [uid, setUid] = useState()
    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 100000);
        return numeroAleatorio
    }
    const id = geraId()

    const obj = {
        ação,
        nome,
        valor,
        hora,
        uid
    }

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    function horaMaiorQueUmaHora() {
        const p = hora && hora.split(':')
        if (parseInt(p[0])>0) {
            return parseInt(p[0])
        }
      }
      
      const horaV = horaMaiorQueUmaHora()


    

    return (
        <>
            {state == 1 && usuario && usuario[0].mod == 'Agenda' ? 
            <div
            className={styles.container}
            >
                <button
                onClick={()=> setState(2)} 
                className={`${styles.margin_Bottom} ${styles.button_new}`}
                ><span><FaPlus/></span>  Novo</button>

                <div>
                    <h5>Meus Serviços</h5>
                    <div className="line"/>
                    <ul
                    className={styles.list}
                    >
                        {servicos && servicos.map(dados => {
                            return(
                                <li
                                key={dados.id}
                                className={styles.item}
                                >
                                    <div
                                    className={styles.info_item}
                                    >
                                        <div>
                                            <p className={styles.nome}>{dados.nome}</p>
                                            <p>{dados.hora} horas</p>
                                        </div>
                                        <p>{FormataValor(parseInt(dados.valor))}</p>
                                    </div>

                                    <div
                                    className={styles.cont_pen}
                                    >
                                        <FaPenAlt
                                        className={styles.edit}
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#ModalConfirmEdit`}
                                        onClick={() => {
                                            setNome(dados.nome)
                                            setHora(dados.hora)
                                            setValor(dados.valor)
                                            setUid(dados.id)
                                            setAção('EditarServico')}}
                                        />
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            :
            <div className={styles.cont_modal}>
                <div className={styles.cont_empty}>
                    <img src="https://img.freepik.com/free-vector/hand-drawn-facepalm-illustration_23-2150199871.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"/>
                    <h4>Opa, Algo deu errado.</h4>
                    <p>Contate nosso suporte <Link to='/suporte'>suporte</Link></p>

                </div>
            </div>
            }

            <div className="modal fade" id="ModalConfirmTrash" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className={`modal-dialog modal-sm`}>
                    <div className="modal-content">
                        <BoxConfirm
                            type="button"
                            dismiss="modal"
                            aria_label="Close"
                            data_bs_toggle="modal" 
                            data_bs_target={`#ModalConfirmTrash`}
                            obj={obj}
                            id={id}
                            uid={uid}
                            email = {usuario && usuario[0].email}
                            />
                    </div>
                </div>
            </div>






            <div className="modal fade" id="ModalConfirmEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <div>
                        <BoxConfirm
                        type="button"
                        dismiss="modal"
                        aria_label="Close"
                        data_bs_toggle="modal" 
                        data_bs_target={`#ModalConfirmEdit`}
                        obj={obj}
                        email = {usuario && usuario[0].email}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}