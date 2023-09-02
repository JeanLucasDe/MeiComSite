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

    const [img, setImg] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
    const [nome, setNome] = useState()
    const [small_desc, setSmallDesc] = useState()
    const [desc, setDesc] = useState()
    const [preço, setPreço] = useState()
    const [material, setMaterial] = useState()
    const [promo, setPromo] = useState()
    const [preçopromo, setPreçopromo] = useState()
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
                obj.dados.saborComida.push(saborPizza)
                await updateDoc(doc(db, `MeiComSite/${id && id}/produtos`, obj.id), {
                    produtos: obj.lista
                });
                toast.success('Sabor adicionado com sucesso!')
                window.location.reload()
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
                    <div className="row">
                        <div className="col-md-0">
                            <div className={styles.cont_left}>
                                <Visualizar
                                tema={props.tema}
                                imagem={obj.dados && !img ? obj.dados.img : img}
                                nome={obj.dados && !nome ? obj.dados.nome : nome}
                                preço={obj.dados && !preço ? obj.dados.preçopromo ? obj.dados.preçopromo: obj.dados.preço : preço}
                                desc={obj.dados && !desc ? obj.dados.desc : desc}
                                small_desc={obj.dados && !small_desc ? obj.dados.small_desc : small_desc}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles.cont_right}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p
                                        className={styles.label}
                                        >Nome:</p>
                                        <input
                                        type="text"
                                        className={styles.input}
                                        onChange={(el) => setNome(el.target.value)}
                                        defaultValue={obj && obj.dados && obj.dados.nome}
                                        />
                                        <div className={styles.cont_input_check}>
                                            <input type="checkbox" onChange={()=> setPromo(!promo)}
                                            defaultChecked={obj && obj.dados && obj.dados.preçopromo > 0}
                                            checked={promo}
                                            />
                                        </div>
                                        <p
                                        className={styles.label}
                                        >{!promo ? "Preço": "De"}:</p>
                                        <input
                                        type="number"
                                        onChange={(el) => setPreço(el.target.value)}
                                        className={styles.input}
                                        defaultValue={obj && obj.dados && obj.dados.preço}
                                        />

                                        {obj && obj.dados && obj.dados.preço && 
                                        promo ? 
                                        <div>
                                            <p
                                            className={styles.label}
                                            >Por :</p>
                                            <input
                                            type="number"
                                            onChange={(el) => setPreçopromo(el.target.value)}
                                            className={styles.input}
                                            defaultValue={obj && obj.dados && obj.dados.preçopromo}
                                            />
                                        </div>:
                                        <div>
                                        <p
                                        className={styles.label}
                                        >Por :</p>
                                        <input
                                            type="number"
                                            className={styles.input}
                                            disabled
                                            />
                                        </div>
                                        }
                                    </div>
                                    <div className="col-sm-6">
                                        <p
                                        className={styles.label}
                                        >Material:</p>
                                        <input
                                        type="text"
                                        className={styles.input}
                                        onChange={(el) => setMaterial(el.target.value)}
                                        defaultValue={obj && obj.dados && obj.dados.material}
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
                                                                onChange={(el) => setEscolhaSabor(el.target.value)}
                                                                className={styles.select}
                                                                >
                                                                    {obj.dados.saborComida.map(dados => {
                                                                        return (
                                                                            <option
                                                                            value={dados.sabor}
                                                                            key={dados.sabor}                             >{dados.sabor}
                                                                            </option>
                                                                            )
                                                                    })}
                                                                </select>
                                                                {escolhaSabor &&
                                                                <FaTrash
                                                                type="button"
                                                                onClick={()=> {
                                                                    UpdateSabores("Excluir")
                                                                }}
                                                                />
                    
                                                                }
                                                            </div>
                                                            <FaPlusCircle
                                                            type="button"
                                                            className={styles.icon_plus}
                                                            onClick={()=> {
                                                            setAddSabor(!addsabor)
                                                            }}
                                                            />
                                                        </div>
                                                        :
                                                        <div>
                                                            <div className={styles.listaSabores}>
                                                                <input type="text" className={styles.select}
                                                                onChange={(el)=> setSabor(el.target.value)}
                                                                placeholder="Sabor"
                                                                />
                                                                <input type="text" className={styles.select}
                                                                onChange={(el)=> setIngredientes(el.target.value)}
                                                                placeholder="Ingredientes"
                                                                />
                                                                <FaRegSave
                                                                type="button"
                                                                onClick={()=> {
                                                                    UpdateSabores("add")
                                                                }}
                                                                />
                                                            </div>
                                                            <FaTimesCircle
                                                            type="button"
                                                            className={styles.icon_plus}
                                                            onClick={()=> {
                                                            setAddSabor(!addsabor)
                                                            }}
                                                            />
                                                        </div>
                                                    }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cont_buttons}>
                            <button
                            onClick={()=> Update()}
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
                </div>
            </div> 
            <ToastContainer/>
            </>
        )
}