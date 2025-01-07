import { useState } from "react"
import styles from "./Servicos.module.css"
import BoxConfirm from "../../../../components/BoxConfirm"
import { Link, useOutletContext } from "react-router-dom"
import {FaArrowLeft, FaPenAlt, FaPlus, FaTrashAlt} from "react-icons/fa"
import { toast } from "react-toastify"

export default function Servicos () {

    const [mod, produtos, usuario, vendas, user,agenda, servicos] = useOutletContext()
    const [hora, setHora] = useState('')
    const [valor, setValor] = useState()
    const [nome, setNome] = useState()
    const [state, setState] = useState(1)
    const [ação, setAção] = useState()
    const [uid, setUid] = useState()
    const [selecionado, setSelecionado] = useState("");
    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 100000);
        return numeroAleatorio
    }
    const id = geraId()

    const obj = {
        ação,
        nome,
        valor,
        hora: hora.toString(),
        uid,
        precoFixo:selecionado,
        id
    }

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
      const handleChange = (event) => {
        setSelecionado(event.target.value); // Atualiza o estado com o valor do botão de rádio selecionado
      };
    



    return (
        <>
            {usuario && usuario[0].mod == 'Agenda' ? 
            <div>
                {state == 1  &&
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
                            {servicos.length > 0 ?
                            
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
                                                data-bs-target={`#ModalConfirm`}
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
                            </ul>:
                            <div className={styles.cont_modal}>
                            <div className={styles.cont_empty}>
                                <img src="https://img.freepik.com/free-vector/hand-drawn-facepalm-illustration_23-2150199871.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"/>
                                <h4>Você ainda não tem serviços</h4>
                                <p>Comece a adicionar</p>
            
                            </div>
                        </div>
                            }
                        </div>
                    </div>}
                {state == 2 &&
                <div className="row">
                    <div className="col-md-8">
                        <div
                        className={styles.container}
                        >
                            <button
                            className={`${styles.margin_Bottom} ${styles.back}`}
                            onClick={()=>{
                                setNome('')
                                setHora('')
                                setValor('')
                                setState(1)}}
                            ><FaArrowLeft/> Voltar</button>
                            <h5>Adicionar Serviço</h5>
                            <div>
                                <p className={styles.label}>Nome:</p>
                                <input type='text'
                                className={styles.input}
                                onChange={(el)=> setNome(el.target.value)}
                                />
                                <p className={styles.label}>Preço:</p>
                                <div>
                                    <input
                                        type="radio"
                                        id="opcao1"
                                        name="opcoes"
                                        value="1"
                                        checked={selecionado === "1"}
                                        onChange={handleChange}
                                        />
                                        <span className={styles.m_left}>Preço Fixo</span>
                                </div>
                                <div>
                                    <input
                                    type="radio"
                                    id="opcao2"
                                    name="opcoes"
                                    value="2"
                                    checked={selecionado === "2"}
                                    onChange={handleChange}
                                    />
                                    <span className={styles.m_left}>Apartir</span>
                                </div>
                                <input type='number'
                                className={styles.input}
                                onChange={(el)=> setValor(el.target.value)}
                                placeholder="R$ 00"
                                />
                                <p className={styles.label}>Tempo de duração:</p>
                                <input type='number'
                                className={styles.input}
                                onChange={(el)=> setHora(el.target.value)} 
                                placeholder="Apenas número"
                                />
                                {selecionado && nome && valor && hora ?
                                <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={`#ModalConfirm`}
                                className={styles.confirm}
                                onClick={() => {
                                    setAção('AddServico')
                                }}
                                >Salvar</button>
                                :
                                <button disabled className={styles.cancel}>
                                    Salvar
                                </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>}
                
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



            <div className="modal fade" id="ModalConfirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <div>
                        <BoxConfirm
                        type="button"
                        dismiss="modal"
                        aria_label="Close"
                        data_bs_toggle="modal" 
                        data_bs_target={`#ModalConfirm`}
                        obj={obj}
                        email = {usuario && usuario[0].email}
                        servicos={servicos}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}