import { useState } from "react"
import styles from "./FormularioEdit.module.css"
import { useOutletContext } from "react-router-dom"
import BoxConfirm from "../../components/BoxConfirm"


export default function FormularioTheme () {

    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    const [theme, setTheme] = useState()
    const [cor, setCor] = useState()
    const [ação, setAção] = useState()

    const obj = {
        theme,
        cor,
        ação
    }

    return (
        <>
        <div className={styles.container}>
            <label>Tema:</label>
            <select
            className={styles.input}
            onChange={(el)=> setTheme(el.target.value)}
            defaultValue={usuario && usuario[0].theme}
            defaultChecked
            >
                <option selected disabled defaultChecked>--</option>
                <option value='Agenda'>Agenda Padrão</option>
                <option value='Agenda Brilhante'>Agenda Brilhante</option>
                <option value='Agenda Calendario'>Agenda Calendario</option>
            </select>  
            <p>Cor</p>
            <input type='text' 
            placeholder="#0000"
            defaultValue={usuario && usuario[0].cor}
            onChange={(e)=> setCor(e.target.value)}/>
            <input type='color' 
            onChange={(e)=> setCor(e.target.value)}
            defaultValue={usuario && usuario[0].cor}
            />
            
            <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#ModalAdd"
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