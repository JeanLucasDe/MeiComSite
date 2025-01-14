import { useState } from "react"
import styles from "./FormEdit.module.css"
import {App} from "../../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc, getFirestore} from "@firebase/firestore";
import { FaPlusCircle, FaRegSave, FaTimesCircle, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function FormEdit (props) {

    const obj = props.dados && props.dados
    const id = props.id && props.id

   
    const [nome, setNome] = useState()
    const [qtdSaboresAdicional, setqtdSaboresAdicional] = useState()
    const [saborAdicional, setsaborAdicional] = useState()
    const [PreçoAdicional, setPreçoAdicional] = useState()
    const [IngredientesAdicional, setIngredientesAdicional] = useState()
    const [deleteSaborAdicional, setdeleteSaborAdicional] = useState()
    const [addsaborAdicional, setaddsaborAdicional] = useState()


    const [qtdSabores, setQtdSabores] = useState()
    const [preço, setPreço] = useState()
    const [deleteSabor, setDeleteSabor] = useState()
    const [qtdPessoas, setQtdPessoas] = useState()



    var [ação, setAção] = useState()
    const [addsabor, setAddSabor] = useState(false)
    const [sabor, setSabor] = useState()
    const [escolhaSabor, setEscolhaSabor] = useState()
    const [ingredientes, setIngredientes] = useState()
    const db = getFirestore(App)


    var saborPizza = {sabor, ingredientes}
    var adicional = {saborAdicional, IngredientesAdicional, PreçoAdicional}

    async function UpdateSabores (ação) {
        if (ação == "Excluir") {
            let index = obj.dados.saborComida.findIndex(prop => prop.sabor == deleteSabor)
            obj.dados.saborComida.splice(index,1)
            await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                produtos: obj.lista
            });
            toast.success('O sabor foi deletado.')
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
        if (ação == 'add adicional') {
            let index = obj.dados.adicionais.findIndex(prop => prop.saborAdicional == saborAdicional)

            if (index < 0) {
                setaddsaborAdicional(false)
                obj.dados.adicionais.push(adicional)
                await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                    produtos: obj.lista
                });
                toast.success('Sabor adicionado com sucesso!')
            } else {
                toast.error('Sabor já existe.')
            }
        }
        if (ação == "Excluir Adicional") {
            let index = obj.dados.adicionais.findIndex(prop => prop.saborAdicional == deleteSaborAdicional)
            obj.dados.adicionais.splice(index,1)
            await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                produtos: obj.lista
            });
            toast.success('O sabor foi deletado.')
        }
    }


    async function Update () {  

        
        const index = obj.lista && obj.dados && obj.lista.findIndex(dados => dados.nome == obj.dados.nome)
        const objeto = obj.lista && obj.lista[index]

        objeto['nome'] = !nome ? objeto['nome'] : nome
        objeto['preço'] = !preço ? objeto['preço'] : parseFloat(preço)
        objeto['qtdPessoas'] = !qtdPessoas ? objeto['qtdPessoas'] : parseFloat(qtdPessoas)
        objeto['qtdSabores'] = !qtdSabores ? objeto['qtdSabores'] : parseFloat(qtdSabores)
        objeto['qtdSaboresAdicional'] = !qtdSaboresAdicional ? objeto['qtdSaboresAdicional'] : parseFloat(qtdSaboresAdicional)


        await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
            produtos: obj.lista
        });

    window.location.reload() 

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


                                {obj.dados && obj.dados.adicionais &&
                                    <div>
                                        <p
                                        className={styles.label}
                                        >Adicionais:</p>
                                            {!addsaborAdicional ?
                                                <div>
                                                    <div className={styles.listaSabores}>
                                                        <select
                                                        onChange={(el) => setdeleteSaborAdicional(el.target.value)}
                                                        className={styles.input}
                                                        >
                                                            <option>--</option>
                                                            {obj.dados.adicionais.map(dados => {
                                                                return (
                                                                    <option
                                                                    value={dados.saborAdicional}
                                                                    key={dados.saborAdicional}                             >{dados.saborAdicional}
                                                                    </option>
                                                                    )
                                                            })}
                                                        </select>
                                                        {deleteSaborAdicional && deleteSaborAdicional != "--" &&
                                                        <button
                                                        type="button"
                                                        onClick={()=> {
                                                            UpdateSabores("Excluir Adicional")
                                                        }}
                                                        className={styles.btn_delete_sabor}
                                                        >Apagar</button>
            
                                                        }
                                                    </div>
                                                    <button
                                                    type="button"
                                                    onClick={()=> {
                                                    setaddsaborAdicional(!addsaborAdicional)
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
                                                        onChange={(el)=> setsaborAdicional(el.target.value)}
                                                        placeholder="Sabor"
                                                        />
                                                        <input type="text" className={styles.input}
                                                        onChange={(el)=> setIngredientesAdicional(el.target.value)}
                                                        placeholder="Ingredientes"
                                                        />
                                                        <input type="number" className={styles.input}
                                                        onChange={(el)=> setPreçoAdicional(el.target.value)}
                                                        placeholder="Preço"
                                                        />
                                                        <div>
                                                            <button
                                                            type="button"
                                                            onClick={()=> {
                                                                UpdateSabores("add adicional")
                                                            }}
                                                            className={styles.btn_add}
                                                            ><FaRegSave/>Salvar</button>

                                                            <button
                                                            type="button"
                                                            className={styles.btn_cancel}
                                                            onClick={()=> {
                                                            setaddsaborAdicional(!addsaborAdicional)
                                                            }}
                                                            >
                                                                <FaTimesCircle/>Cancelar
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
                            
                            <button
                            onClick={()=> Update()}
                            className={styles.btn_save}
                            >Confirmar</button>
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