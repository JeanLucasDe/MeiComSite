import { useState } from "react"
import styles from "./Servicos.module.css"
import BoxConfirm from "../../../../components/BoxConfirm"
import { useOutletContext } from "react-router-dom"
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
            {state == 1 ? 
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
                <h5>Novo Serviço</h5>
                <div className="line"/>
                <div
                className="row"
                >
                    <div className="col-lg-6">
                        <form
                        >
                            <p className={styles.label}>Nome :</p>
                            <input type="text" onChange={(el) => setNome(el.target.value)}
                            required
                            className={styles.input}
                            />
                            <p className={styles.label}>Valor :</p>
                            <input type="number" onChange={(el) => setValor(el.target.value)} required
                            className={styles.input}
                            />
                            <div>
                                <p className={styles.label}>Duração (min: 1hora) :</p>
                                <input type="time" onChange={(el) => setHora(el.target.value)}
                                min="00:30" max="12:00" required
                                className={styles.input}
                                title="Apartir de 1 hora"
                                />
                            </div>
                            <div
                            className={styles.cont_btn}
                            >
                                <button
                                onClick={(el)=> {
                                    el.preventDefault()
                                    setState(1)
                                    setNome('')
                                    setHora('')
                                    setValor('')
                                }}
                                    className={styles.button_back}
                                >Cancelar</button>
                                {nome && valor && horaV  && <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={`#ModalConfirmTrash`}
                                className={styles.button_new}
                                onClick={(el)=> {
                                    el.preventDefault()
                                    setAção('AddServico')
                                }}
                                >Confirmar</button>}
                            </div>
                        </form>
                    </div>
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