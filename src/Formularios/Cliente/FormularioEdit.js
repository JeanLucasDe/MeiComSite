import styles from "./FormularioEdit.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, updateDoc, doc, deleteDoc} from "@firebase/firestore";
import {FaEdit, FaPauseCircle, FaPlayCircle, FaPlusCircle} from "react-icons/fa"
import moment from 'moment/moment';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useOutletContext } from "react-router-dom"
import RecuperaPassWord from "../../components/RecuperaPassWord"
import { FaCopy, FaExternalLinkSquareAlt } from "react-icons/fa";
import copy from "copy-to-clipboard";



export default function FormularioEdit () {

    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const [Onlogo, setOnlogo] = useState(false)
    const [ação, setAção] = useState()
    const [novaCidade, setNovaCidade] = useState()
    const [novoBairro, setNovoBairro] = useState()
    const [deleteCidade, setDeleteCidade] = useState()
    var [seed, setSeed] = useState(0)
    const [deletebairro, setDeleteBairro] = useState()
    const [taxa, setTaxa] = useState()
    const [pause, setPause] = useState()


    const [cidadeUser, setCidadeUser] = useState()
    const [bairroUser, setBairroUser] = useState()
    const [rua, setRua] = useState()
    const [cep, setCep] = useState()
    const [numeroUser, setNumeroUser] = useState()
    const [abre,setAbertura] = useState()
    const [fecha, setFecha] = useState()


    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [site, setSite]= useState()
    const [logo, setLogo] = useState()
    const [modalidade, setModalidade] = useState('')
    const [theme, setTheme] = useState()
    const [alterMod, setAlterMod] = useState(false)
    const [addCidade, setAddCidade] = useState()
    const [addBairro, setAddBairro] = useState()
    const [deleteEmail, setDeleteEmail] = useState()
    

   const ApagaUsuário = async () => {
    const ref = doc(db, `MeiComSite`, user && user.email)
    await deleteDoc(ref)
    window.location.href = '/'
    }
    
    const copyToClipboard = (text) => {
        copy(text);
        toast.success('Copiado com sucesso!');
    }

    const listCidades = []
    const listBairros = []

    
    
    const salvarLocal = async () => {
        await usuario.map(dados => {
            dados.listCidades.map(item => {
                listCidades.push({local: item.local})
            })
            dados.listBairros.map(item => {
                listBairros.push({local: item.local, taxa: item.taxa})
            })
            
        })

        listCidades.push({local: novaCidade})
        listBairros.push({local: novoBairro, taxa:parseFloat(taxa)})
        setSeed(seed += 1)

        if (novaCidade) {
            await updateDoc(doc(db, `MeiComSite`, user.email), {
                listCidades: listCidades
            });
            setAddCidade(!addCidade)
            toast.success('Cidade Adicionada!')
        }
        if (novoBairro && taxa) {
            await updateDoc(doc(db, `MeiComSite`, user.email), {
                listBairros: listBairros
            });
            setAddBairro(!addBairro)
            toast.success('Bairro Adicionado!')
        } 
    }

    const obj = {
        nome,
        razao,
        phone, 
        mod: modalidade.trim(),
        theme,
        site,
        cidade: cidadeUser,
        bairro: bairroUser,
        rua,
        cep,
        abre, 
        fecha,
        numero: numeroUser,
        novoBairro,
        novaCidade,
        deletebairro,
        deleteCidade,
        listBairros,
        listCidades,
        ação:ação
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
        {user && usuario.length && usuario.map(dados => {
            if (dados.iduser == user.id) {
                return (
                    <>
                        {!dados.admin && 
                        <div className={styles.status}>
                            <p>Status : <strong>{dados.status}</strong></p>
                        </div>}
                        <div className={styles.container} key={dados.id}>
                            <h4>Meu Perfil</h4>
                            <form className={`row ${styles.form}`}>
                                <div className={`row ${styles.dados}`}>
                                    <div className="col-lg-6">
                                        <label>Nome Completo </label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setNome(el.target.value)
                                        }}
                                        defaultValue={dados.nome}/>
                                        <label>Razão Social</label>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setRazao(el.target.value)
                                        }}
                                        defaultValue={dados.razao}/>
                                        <label>Nascimento </label>
                                        <input type="text"
                                        defaultValue={moment(dados.nascimento).format('DD/MM/YYYY')}
                                        disabled
                                        />
                                        <label>Site </label>
                                        <strong>meicomsite.netlify.app/{dados.site}</strong>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setSite(el.target.value)
                                        }}
                                        maxLength={20}
                                        defaultValue={dados.site}/>
                                        </div>

                                    <div className="col-lg-6">
                                        <label>Telefone</label>
                                        <input type="phone"
                                        onChange={(el)=> {
                                            setPhone(el.target.value)
                                        }}
                                        defaultValue={dados.telefone}/>
                                    </div>
                                    <div className={styles.cont_save}>
                                        {nome || phone || razao || site || logo ?
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
                                        className={` ${styles.btn_save_add} ${styles.disabled}`}
                                        onClick={(el)=> {
                                            el.preventDefault()
                                        }}
                                        >Salvar</button>
                                        }   
                                    </div>
                                </div>
                            </form>    
                        </div>
                        <div className={styles.line}/>

                        <div className={styles.container}>
                            <div className={styles.cont_btn_del}>
                                <h4>Meu Link</h4>
                                <div className={`${styles.cont_link} `}>
                                    <div className={`${styles.no_padding_no_margin}`}>
                                        <div className={styles.link}>
                                            <Link to={`/${usuario && usuario[0].site}`} target="_blank"
                                            className={styles.copy_link}
                                            >
                                            <span>sitemei.netlify.app{`/${usuario && usuario[0].site}`} </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`${styles.no_padding_no_margin}`}>
                                        <div className={styles.copy}>
                                            <FaCopy
                                            type="button"
                                            onClick={() => 
                                                copyToClipboard(`sitemei.netlify.app/${usuario && usuario[0].site}`)
                                            }
                                            className={styles.icon}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.cont_btn_del}>
                                <h4>Meu ID</h4>
                                <div className={`${styles.cont_link} `}>
                                    <div className={`${styles.no_padding_no_margin}`}>
                                        <div className={styles.link}>
                                            <Link
                                            className={styles.copy_link}
                                            onClick={() => 
                                                copyToClipboard(`${usuario && usuario[0].idloja}`)
                                            }
                                            >
                                            <span>{usuario && usuario[0].idloja}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={`${styles.no_padding_no_margin}`}>
                                        <div className={styles.copy}>
                                            <FaCopy
                                            type="button"
                                            onClick={() => 
                                                copyToClipboard(`${usuario && usuario[0].idloja}`)
                                            }
                                            className={styles.icon}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className={styles.line}/>
                        <div className={styles.container}>
                            <h4>Áreas Atendidas</h4>
                            <div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className={styles.p}>Cidades</p>
                                        {addCidade && 
                                        <div>
                                            <input type="text" 
                                            onChange={(el)=> setNovaCidade(el.target.value)}
                                            placeholder="Nome da Cidade"
                                            className={styles.input}
                                            />
                                            <div className={styles.flex}>
                                                <button
                                                className={styles.btn_save}
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    if (!novaCidade) return 
                                                    salvarLocal()
                                                }}
                                                >Salvar</button>
                                                <button
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    setAddCidade(false)
                                                }}
                                                className={styles.btn_cancel}
                                                >Cancelar</button>
                                            </div>
                                        </div>
                                        }
                                        {!addCidade &&
                                            <button
                                            className={styles.btn_add_cidade}
                                            onClick={(e)=> {
                                                e.preventDefault()
                                                setAddCidade(true)
                                            }}
                                            ><FaPlusCircle/> Adicionar
                                            </button>
                                        }
                                    </div>



                                    <div className="col-md-6">
                                        <div>
                                            <h5>Cidades</h5>
                                            <select
                                            onChange={(el)=> setDeleteCidade(el.target.value)}
                                            className={styles.input}
                                            key={seed}
                                            >
                                                <option>--</option>
                                                {dados.listCidades && dados.listCidades.map(item => {
                                                    return (
                                                        <option value={item.local}>
                                                            {item.local}
                                                        </option>
                                                        )
                                                })}
                                            </select>
                                            {!deleteCidade || deleteCidade != "--" &&
                                                <button
                                                type="button" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#ModalAdd"
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    setAção("Deletar Cidade")
                                                }}
                                                className={styles.btn_delete}
                                                >Apagar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.line}/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className={styles.p}>Bairros</p>
                                        {addBairro && 
                                        <div className={styles.cont_input}>
                                            <input type="text" 
                                            placeholder="Nome do bairro"
                                            onChange={(el)=> setNovoBairro(el.target.value)}
                                            className={styles.input}
                                            />
                                            <input type="number" 
                                            placeholder="Taxa de Entrega"
                                            onChange={(el)=> setTaxa(el.target.value)}
                                            className={styles.input}
                                            />
                                            <div className={styles.flex}>
                                                <button
                                                className={styles.btn_save}
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    if (!novoBairro && !taxa) return 
                                                    salvarLocal()
                                                }}
                                                >Salvar</button>
                                                <button
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    setAddBairro(false)
                                                }}
                                                className={styles.btn_cancel}
                                                >Cancelar</button>
                                            </div>
                                        </div>
                                        }
                                        {!addBairro &&
                                        <button
                                        className={styles.btn_add_cidade}
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            setAddBairro(true)
                                        }}
                                        ><FaPlusCircle/> Adicionar</button>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div >
                                            <h5>Bairros</h5>
                                            <select onChange={(el)=> setDeleteBairro(el.target.value)}
                                            className={styles.input}
                                            key={seed}
                                            >
                                                <option>--</option>
                                                {dados.listBairros && dados.listBairros.map(item => {
                                                    return (
                                                        <option value={item.local} key={item.local}>
                                                            {item.local} - {item.taxa}
                                                        </option>
                                                        )
                                                })}
                                            </select>
                                            {!deletebairro || deletebairro != "--" &&
                                                <button
                                                type="button" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#ModalAdd"
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    setAção("Deletar Bairro")
                                                }}
                                                className={styles.btn_delete}
                                                >Apagar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className={styles.line}/>

                        <div className={styles.container}>
                            <h4>Seu negócio</h4>
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


                                </div>
                                <div className="col-md-6">
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
                                    <label>Abertura *</label>
                                    <input type="time"
                                    onChange={(el)=> {
                                        setAbertura(el.target.value)
                                    }}
                                    defaultValue={dados.abre}
                                    required
                                    />
                                    <label>Fechamento *</label>
                                    <input type="time"
                                    onChange={(el)=> {
                                        setFecha(el.target.value)
                                    }}
                                    defaultValue={dados.fecha}
                                    required
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
                                                <option>Alimentação</option>
                                                <option value='Agenda'>Agendamento</option>
                                            </select>
                                            {mod && mod != "--" &&
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
                            <div className={styles.cont_save}>
                                {cidadeUser || bairroUser || numeroUser || rua || cep || modalidade || abre || fecha || pause || !pause ?
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
                    </div>
                    <div className={styles.line}/>

                    <div className={styles.container}>
                        <div className={styles.cont_btn_del}>
                            <h4>Área de Perigo</h4>
                            <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#ModalDeleteUser"
                            className={styles.btn_delete_account}
                            >Apagar esta conta</button>
                            <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#ModalRecupera`}
                            className={styles.btn_delete_account}
                            >Alterar Senha</button>
                        </div>
                    </div>
                </>
                )
            }
        })        
        
        }
         
        <div className="modal fade" id="ModalDeleteUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <div className={styles.cont_delete_user}>
                        <div className={styles.title_delete}>
                            <h4>Você Tem Certeza?</h4>
                            <p>Escreva seu email para continuar:</p>
                        </div>
                        <strong>{user && user.email}</strong>
                        <input type="text" 
                        className={styles.input}
                        placeholder="Digite aqui seu email..."
                        onChange={(el)=> setDeleteEmail(el.target.value)}
                        />
                        {user && deleteEmail == user.email &&
                        <button
                        className={`${styles.all_right} ${styles.btn_delete_account}`}
                        onClick={()=> {
                            ApagaUsuário()
                        }}
                        >Apagar Usuário</button>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="ModalRecupera" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <RecuperaPassWord email ={user && user.email}/>
                </div>
            </div>
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
            <ToastContainer/>
        </>
        )
}