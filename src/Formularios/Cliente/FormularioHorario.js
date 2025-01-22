import { useState } from "react"
import styles from "./FormularioEdit.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { useOutletContext } from "react-router-dom"
import styles_form  from "./Form.module.css"


export default function FormularioHorario () {

    const [mod, produtos, usuario, vendas, user] = useOutletContext()

    const [abreUSer,setAbertura] = useState()
    const [fechaUser, setFecha] = useState()
    const [ação, setAção] = useState()
    
    const {abre , fecha} = usuario && usuario

    const obj = {
        abre: abreUSer,
        fecha: fechaUser,
        ação
    }

    return (
        <>
        <div className={styles_form.container}>
            <h2 className={styles.title_h2}>Horário de Funcionamento</h2>
            <label>Abertura *</label>
            <input type="time"
            onChange={(el)=> {
                setAbertura(el.target.value)
            }}
            defaultValue={abre}
            required
            />
            <label>Fechamento *</label>
            <input type="time"
            onChange={(el)=> {
                setFecha(el.target.value)
            }}
            defaultValue={fecha}
            required
            />

            <button
            type="button"
            data-bs-toggle={abre || fecha && "modal"}
            data-bs-target={abre || fecha && "#ModalAdd"}
            className={styles.btn_save_add}
            onClick={(el)=> {
                el.preventDefault()
                setAção("Editar")
            }}
            >
                Salvar
            </button>
        </div>

        <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-md`}>
            <div className="modal-content">
                <BoxConfirm
                obj={obj}
                type="button" 
                data_bs_toggle="modal" 
                data_bs_target="#ModalAdd"
                />
            </div>
        </div>
    </div>
        </>
    )
}