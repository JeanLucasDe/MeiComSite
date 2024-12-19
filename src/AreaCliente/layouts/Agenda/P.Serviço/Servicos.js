import { useState } from "react"
import styles from "./Servicos.module.css"
import BoxConfirm from "../../../../components/BoxConfirm"
import { useOutletContext } from "react-router-dom"

export default function Servicos () {

    const [mod, produtos, usuario, vendas, user,servicos] = useOutletContext()
    const [hora, setHora] = useState()
    const [valor, setValor] = useState()
    const [nome, setNome] = useState()
    const [state, setState] = useState(1)
    var ação = 'AddServico'
    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 100000);
        return numeroAleatorio
    }
    const id = geraId()

    const obj = {
        ação,
        nome,
        valor,
        hora
    }

    

    return (
        <>
            {state == 1 ? 
            <div
            className={styles.container}
            >
                <button
                onClick={()=> setState(2)}
                >Adicionar um serviço</button>

                <div>
                    <h5>Aqui estão seus serviços</h5>
                    <ul>
                        {servicos && servicos.map(dados => {
                            return(
                                <li>
                                    <p>{dados.nome}</p>
                                    <p>{dados.valor}</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            :
            <div className={styles.cont_modal}>
                <h5>Preencha o formulário</h5>
                <form>
                    <p>Serviço:</p>
                    <input type="text" onChange={(el) => setNome(el.target.value)}
                    required
                    />

                    <p>Valor:</p>
                    <input type="number" onChange={(el) => setValor(el.target.value)} required/>

                    <div>
                        <p>Duração:</p>
                        <input type="time" onChange={(el) => setHora(el.target.value)}
                        min="00:30" max="12:00" required
                        />
                    </div>
                    <button
                    type="button" 
                    data-bs-toggle="modal" 
                    data-bs-target={`#ModalConfirmTrash`}
                    >Confirmar</button>
                    <button
                    onClick={(el)=> {
                        el.preventDefault()
                        setState(1)}}
                    >Cancelar</button>
                </form>
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
                            email = {usuario && usuario[0].email}
                            />
                    </div>
                </div>
            </div>
        </>
    )
}