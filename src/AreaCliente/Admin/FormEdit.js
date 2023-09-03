import { useState } from "react"
import styles from "./FormEdit.module.css"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc, getFirestore} from "@firebase/firestore";
import { FaPlusCircle, FaRegSave, FaTimesCircle, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Visualizar from "./Visualizar";

export default function FormEdit (props) {

    const obj = props.dados && props.dados
    const id = props.id && props.id

   
    const [nome, setNome] = useState()
    const [qtdSabores, setQtdSabores] = useState()
    const [preço, setPreço] = useState()
    const [deleteSabor, setDeleteSabor] = useState()
    const [qtdPessoas, setQtdPessoas] = useState()
    const [promo, setPromo] = useState()
    const [verifica, setVerifica] = useState()



    var [ação, setAção] = useState()
    const [addsabor, setAddSabor] = useState(false)
    const [sabor, setSabor] = useState()
    const [escolhaSabor, setEscolhaSabor] = useState()
    const [ingredientes, setIngredientes] = useState()
    const db = getFirestore(App)


    var saborPizza = {sabor, ingredientes}

    async function UpdateSabores (ação) {
        if (ação == "Excluir") {
            let index = obj.dados.saborComida.findIndex(prop => prop.sabor == escolhaSabor)
            obj.dados.saborComida.splice(index,1)
            await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.categoriaa), {
                produtos: obj.lista
            });
            window.location.reload()
        
        }
        if (ação == "add") {
            let index = obj.dados.saborComida.findIndex(prop => prop.sabor == sabor)

            if (index < 0) {
                setAddSabor(false)
                obj.dados.saborComida.push(saborPizza)
                await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                    produtos: obj.lista
                });
                toast.success('Sabor adicionado com sucesso!')
            } else {
                toast.error('Sabor já existe.')
            }
            
        }
    }


    async function Update () {  

        
        const index = obj.lista && obj.dados && obj.lista.findIndex(dados => dados.nome == obj.dados.nome)
        const objeto = obj.lista && obj.lista[index]

        objeto['nome'] = !nome ? objeto['nome'] : nome
        objeto['preço'] = !preço ? objeto['preço'] : parseFloat(preço)


        await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.categoriaa), {
            produtos: obj.lista
        });

    window.location.reload() 

    }

    if (!verifica) {
        if (obj && obj.dados && obj.dados.preçopromo > 0) {
            setPromo(obj && obj.dados && obj.dados.preçopromo > 0)
            setVerifica(true)
        }
    }

    return (
            <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>{obj && obj.dados && obj.dados.nome}</h1>
                            <div className={styles.cont_right}>
                                <p
                                className={styles.label}
                                >Nome:</p>
                                <input
                                type="text"
                                className={styles.input}
                                onChange={(el) => setNome(el.target.value)}
                                defaultValue={obj && obj.dados && obj.dados.nome}
                                />
                                <p
                                className={styles.label}
                                >Quantos Sabores?</p>
                                <input
                                type="text"
                                className={styles.input}
                                onChange={(el) => setQtdSabores(el.target.value)}
                                defaultValue={obj && obj.dados && obj.dados.qtdSabores}
                                />
                                <p
                                className={styles.label}
                                >Preço:</p>
                                <input
                                type="number"
                                onChange={(el) => setPreço(el.target.value)}
                                className={styles.input}
                                defaultValue={obj && obj.dados && obj.dados.preço}
                                />
                                <p
                                className={styles.label}
                                >Servem quantas pessoas:</p>
                                <input
                                type="text"
                                className={styles.input}
                                onChange={(el) => setQtdPessoas(el.target.value)}
                                defaultValue={obj && obj.dados && obj.dados.qtdPessoas}
                                />
                                {obj.dados && obj.dados.saborComida &&
                                    <div>
                                        <p
                                        className={styles.label}
                                        >Sabores:</p>
                                            {!addsabor ?
                                                <div>
                                                    <div className={styles.listaSabores}>
                                                        <select
                                                        onChange={(el) => setDeleteSabor(el.target.value)}
                                                        className={styles.input}
                                                        >
                                                            <option>--</option>
                                                            {obj.dados.saborComida.map(dados => {
                                                                return (
                                                                    <option
                                                                    value={dados.sabor}
                                                                    key={dados.sabor}                             >{dados.sabor}
                                                                    </option>
                                                                    )
                                                            })}
                                                        </select>
                                                        {deleteSabor && deleteSabor != "--" &&
                                                        <button
                                                        type="button"
                                                        onClick={()=> {
                                                            UpdateSabores("Excluir")
                                                        }}
                                                        className={styles.btn_delete_sabor}
                                                        >Apagar</button>
            
                                                        }
                                                    </div>
                                                    <button
                                                    type="button"
                                                    onClick={()=> {
                                                    setAddSabor(!addsabor)
                                                    }}
                                                    className={styles.btn_add}
                                                    >
                                                        <FaPlusCircle/> Adicionar
                                                    </button>
                                                </div>
                                                :
                                                <div>
                                                    <div className={styles.listaSabores}>
                                                        <input type="text" className={styles.input}
                                                        onChange={(el)=> setSabor(el.target.value)}
                                                        placeholder="Sabor"
                                                        />
                                                        <input type="text" className={styles.input}
                                                        onChange={(el)=> setIngredientes(el.target.value)}
                                                        placeholder="Ingredientes"
                                                        />
                                                        <div>
                                                            <button
                                                            type="button"
                                                            onClick={()=> {
                                                                UpdateSabores("add")
                                                            }}
                                                            className={styles.btn_add}
                                                            ><FaRegSave/> Salvar</button>

                                                            <button
                                                            type="button"
                                                            className={styles.btn_cancel}
                                                            onClick={()=> {
                                                            setAddSabor(!addsabor)
                                                            }}
                                                            >
                                                                <FaTimesCircle/> Cancelar
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.cont_buttons}>
                            {nome || qtdPessoas || qtdSabores || preço 
                            && 
                            <button
                            onClick={()=> Update()}
                            className={styles.btn_save}
                            >Confirmar</button>}
                            <button
                            type={props.type}
                            dismiss={props.dismiss}
                            aria-label={props.aria_label}
                            data-bs-toggle={props.data_bs_toggle}
                            data-bs-target={props.data_bs_target}
                            >Cancelar</button>
                        </div>
                    </div>
            <ToastContainer/>
            </>
        )
}