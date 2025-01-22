import { useState } from "react"
import styles from "./FormularioEdit.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { Link, useOutletContext } from "react-router-dom"
import { App } from "../../Hooks/App"
import { doc, getFirestore, updateDoc } from "@firebase/firestore"
import { FaCopy, FaEdit, FaPauseCircle, FaPlayCircle } from "react-icons/fa"
import copy from "copy-to-clipboard";
import { toast, ToastContainer } from "react-toastify"
import styles_form from "./Form.module.css"
import moment from "moment"


export default function FormularioEmpresa () {


    const db = getFirestore(App)
    const [mod, produtos, usuario, vendas, user] = useOutletContext()

    
    const [pause, setPause] = useState()
    const [cidadeUser, setCidadeUser] = useState()
    const [bairroUser, setBairroUser] = useState()
    const [rua, setRua] = useState()
    const [cep, setCep] = useState()
    const [numeroUser, setNumeroUser] = useState()
    const [alterMod, setAlterMod] = useState(false)
    const [modalidade, setModalidade] = useState('')
    const [desc, setDesc] = useState()
    const [especialidade, setEspecialidade] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [site, setSite]= useState()
    
    const [ação, setAção] = useState()


    const obj = {
        mod: modalidade.trim(),
        cidade: cidadeUser,
        bairro: bairroUser,
        rua,
        cep,
        numero: numeroUser,
        desc,
        especialidade,
        razao,
        phone,
        site,
        ação
    }
    const copyToClipboard = (text) => {
        copy(text);
        toast.success('Copiado com sucesso!');
    }

    const PauseActives = async(state) => {
            
            if (state) {
                await updateDoc(doc(db, `MeiComSite`, user && user.email), {
                    pause: false
                });
            } else {
                await updateDoc(doc(db, `MeiComSite`, user && user.email), {
                    pause: true
                });
            }
            window.location.reload()
        }

    return (
        <>
        <ToastContainer/>
        <div className={styles_form.card}>
            <div className={styles_form.header}>
                <div>
                    <h2 className={styles_form.siteName}>{usuario && usuario[0].razao}</h2>
                    <h5>ID: {usuario && usuario[0].idloja}</h5>
                    <Link to={`http://sitemei.netlify.app/${usuario && usuario[0].site}`} className={styles_form.siteLink}>https://sitemei.netlify.app/{usuario && usuario[0].site}</Link>
                    
                </div>
            </div>
            <div>
                <p className={styles_form.date}>Criado em: {usuario && moment(usuario[0].data).format('DD/MM/YYYY')}</p>
            </div>
        </div>
        <div className={styles_form.container}>
            <h4>Seu negócio</h4>
            {usuario.map(dados => {
                return (
                    <div className="row">
                <div className="col-md-6">
                    <label>Cidade *</label>
                    <input type="text"
                    onChange={(el)=> {
                        setCidadeUser(el.target.value)
                    }}
                    required
                    defaultValue={dados.cidade}
                    placeholder="Digite Aqui"
                    />
                    <label>Bairro *</label>
                    <input type="text"
                    onChange={(el)=> {
                        setBairroUser(el.target.value)
                    }}
                    required
                    defaultValue={dados.bairro}
                    placeholder="Digite Aqui"
                    
                    />
                    <label>Rua *</label>
                    <input type="text"
                    defaultValue={dados.rua}
                    onChange={(el)=> {
                        setRua(el.target.value)
                    }}
                    required
                    placeholder="Digite Aqui"
                    />
                <label>Número *</label>
                <input type="text"
                onChange={(el)=> {
                    setNumeroUser(el.target.value)
                }}
                defaultValue={dados.numero}
                required
                placeholder="Digite Aqui"
                />
                <label>CEP *</label>
                <input type="number"
                defaultValue={dados.cep}
                onChange={(el)=> {
                    setCep(el.target.value)
                }}
                required
                placeholder="Digite Aqui"
                maxLength={8}
                />




                    <div className={styles.cont_theme}>
                        <label>Segmento:</label>
                        {!alterMod &&
                        <div>
                            <strong>{dados.mod}</strong>
                            <FaEdit
                            onClick={() => setAlterMod(!alterMod)}
                            type="button"
                            />
                        </div>
                        }
                        {alterMod && alterMod != "--" &&
                        <div>
                            <select
                            className={styles.input}
                            onChange={(el)=> setModalidade(el.target.value)}
                            >
                                <option selected disabled defaultChecked>--</option>
                                <option disabled >Alimentação (construção)</option>
                                <option value='Agenda'>Agendamento</option>
                            </select>
                            {modalidade&&
                                <button
                                className={`${styles.save} ${styles.btn_delete}`}
                                type="button" 
                                data-bs-toggle="modal" 
                                data-bs-target="#ModalAdd"
                                onClick={(el)=> {
                                    el.preventDefault()
                                    setAção("Editar")
                                }}
                                >
                                    Salvar
                                </button>
                            }

                            <button
                            className={`${styles.btn_delete}`}
                            onClick={()=> {
                                setAlterMod(false)
                            }}
                            >
                                Cancelar
                            </button>
                        </div>
                        }
                        
                    </div>
                    <div className={styles.cont_check}>
                        <button
                        className={`${styles.btn_pause} ${dados.pause ? styles.btn_pause : styles.off}`}
                        onClick={() => {
                            PauseActives(dados.pause)
                        }}
                        >{dados.pause ?<span><FaPauseCircle className={styles.icon}/> Pausar Atividades</span>: <span><FaPlayCircle className={styles.icon}/> Retomar Atividades</span>}</button>
                    </div>

                </div>
                <div className="col-md-6">
                <label>Razão Social</label>
                <input type="text"
                onChange={(el)=> {
                    setRazao(el.target.value)
                }}
                defaultValue={dados.razao}/>
                <label>Site: </label>
                <strong className={styles.d_block}>meicomsite.netlify.app/{dados.site}</strong>
                <input type="text"
                onChange={(el)=> {
                    setSite(el.target.value)
                }}
                maxLength={20}
                defaultValue={dados.site}/>
                <label>Telefone</label>
                <input type="phone"
                onChange={(el)=> {
                    setPhone(el.target.value)
                }}
                defaultValue={dados.telefone}/>
                <label>Especialidade *</label>
                <input type="text"
                onChange={(el)=> {
                    setEspecialidade(el.target.value)
                }}
                required
                placeholder="Digite Aqui"
                defaultValue={dados.especialidade}
                />
                <label>Descreva sua especialidade *</label>
                <textarea type="text"
                onChange={(el)=> {
                    setDesc(el.target.value)
                }}
                required
                placeholder="Digite Aqui"
                defaultValue={dados.descrição}
                className={styles.input}
                />
                </div>
            <div className={styles.cont_save}>
                {cidadeUser || bairroUser || numeroUser || rua || cep || modalidade ||  pause || !pause|| desc|| phone || site || razao ?
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
                :
                <button
                className={`${styles.btn_save_add} ${styles.disabled}`}
                onClick={(el)=> {
                    el.preventDefault()
                }}
                >Salvar</button>
                }
            </div>
            </div>
                    
                )
            })}
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