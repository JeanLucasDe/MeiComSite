import styles from "./FormularioEdit.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import Themes from "../../Documents/Themes.json"
import {Swiper, SwiperSlide} from "swiper/react"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc} from "@firebase/firestore";
import {FaEdit, FaPlusCircle} from "react-icons/fa"
import moment from 'moment/moment';
import FormularioCadastro from "../Cadastro/FormularioCadastro"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useOutletContext } from "react-router-dom"



export default function FormularioEdit () {

    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const [ação, setAção] = useState()
    const [novaCidade, setNovaCidade] = useState()
    const [novoBairro, setNovoBairro] = useState()
    const [deleteCidade, setDeleteCidade] = useState()
    var [seed, setSeed] = useState(0)
    const [deletebairro, setDeleteBairro] = useState()
    const [taxa, setTaxa] = useState()



    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [token,setToken] = useState()
    const [site, setSite]= useState()
    const [logo, setLogo] = useState()
    const [plan, setPlan] = useState()
    const [stateTheme,setStateTheme] = useState(false)
    const [stateMod,setStateMod] = useState(false)
    const [theme, setTheme] = useState()
    const [alterMod, setAlterMod] = useState(false)
    const [addCidade, setAddCidade] = useState()
    const [addBairro, setAddBairro] = useState()
    const [deleteEmail, setDeleteEmail] = useState()
    

   const ApagaUsuário = async () => {
    const ref = doc(db, `MeiComSite`, user && user.email)
    await deleteDoc(ref)
    window.location.reload()
    }
    


    const listCidades = []
    const listBairros = []

    Users && Users.map(dados => {
        if (dados.iduser == user.id) {
            dados.listCidades.map(item => {
                listCidades.push({local: item.local})
            })
            dados.listBairros.map(item => {
                listBairros.push({local: item.local, taxa: item.taxa})
            })
        }
    })
    
    const salvarLocal = async () => {
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
        token,
        plan,
        mod,
        theme,
        site,
        logo, 
        novoBairro,
        novaCidade,
        deletebairro,
        deleteCidade,
        listBairros,
        listCidades,
        ação:ação
    }
    



    return (
        <>
        {user && usuario && usuario.map(dados => {
            if (dados.iduser == user.id) {
                return (
                    <>
                        {dados.status != "pronto" && 
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
                                        defaultValue={dados.site}/>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className={styles.flex}>
                                            <label>Logo </label>
                                            <img src={dados.logo} className={styles.logo}/>
                                        </div>
                                        <input type="text"
                                        onChange={(el)=> {
                                            setLogo(el.target.value)
                                        }}
                                        defaultValue={dados.logo}/>
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
                                            onClick={(el)=> {
                                                el.preventDefault()
                                                setAção("Editar")
                                            }}
                                            >
                                                Salvar
                                            </button>
                                        :
                                        <button
                                        className={styles.disabled}
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
                                                    setAddCidade(!addCidade)
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
                                                setAddCidade(!addCidade)
                                            }}
                                            ><FaPlusCircle/> Adicionar
                                            </button>
                                        }
                                    </div>



                                    <div className="col-md-6">
                                        <div>
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
                                        {!addCidade && addBairro && 
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
                                                    setAddBairro(!addBairro)
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
                                            setAddBairro(!addBairro)
                                        }}
                                        ><FaPlusCircle/> Adicionar</button>
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div >
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
                            <div className={`col-sm-12`}>
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
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
                                                    >
                                                        <option>--</option>
                                                        <option>Alimentação</option>
                                                        <option>Prest. Serviços</option>
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
                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <div className={styles.line}/>

                    <div className={styles.container}>
                        <h4>Área de Perigo</h4>
                        <button
                        type="button" 
                        data-bs-toggle="modal" 
                        data-bs-target="#ModalDeleteUser"
                        className={styles.btn_delete_account}
                        >Deletar esta conta</button>
                    </div>
                </>
                )
            }
        })        
        
        }
         

        {usuario && usuario.length == 0 &&
        <FormularioCadastro/>
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