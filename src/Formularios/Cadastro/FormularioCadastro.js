import styles from "./FormularioCadastro.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import Loading from "../../components/Loading"
import {FaPlusCircle, FaRegSave, FaTrashAlt} from "react-icons/fa"
import moment from "moment"
import { toast, ToastContainer } from "react-toastify"

export default function FormularioCadastro () {

    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const [load, setLoading] = useState(false)
    const UserCollection = collection(db, "MeiComSite")
    const formataHora = (hora) => {
        var hora = moment(hora).format('HH:mm').toString()
        return hora
    }
    
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user) {
                const {uid, displayName, photoURL, email} = user
                if (!displayName || !photoURL) {
                    throw new Error('Usuário sem Nome ou foto')
                }
                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                    email
                })
            }
        })
    }, [])

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    useEffect (()=>{
        try{
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoading(true)
                    };
                    getUsers()
                } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    
    
    

    
    const [ação, setAção] = useState()
    const [theme, setTheme] = useState()
    const [mod, setMod] = useState()
    

    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [abre,setAbertura] = useState()
    const [taxa, setTaxa] = useState()
    const [deletebairro, setDeleteBairro] = useState()
    const [deleteCidade, setDeleteCidade] = useState()
    const [fecha, setFecha] = useState()
    var [seed, setSeed] = useState(0)
    const [site, setSite] = useState('')
    const [nascimento,setNascimento] = useState()
    const [novaCidade, setNovaCidade] = useState()
    const [novoBairro, setNovoBairro] = useState()
    const [logo, setLogo] = useState()
    const [addCidade, setAddCidade] = useState(false)
    const [addBairro, setAddBairro] = useState(false)
    
    const obj = {
    nome,
    razao,
    phone,
    mod,
    nascimento,
    abre: moment(abre).format('hh:mm:ss'),
    site,
    fecha: moment(fecha).format('hh:mm:ss'),
    listBairros,
    listCidades,
    logo,
    ação:ação,
    }
    


    let index = produtos && user && produtos.findIndex(prop => prop.iduser == user.id)


    
    var [listCidades, setListCidades] = useState([])
    var [listBairros, setListBairros] = useState([])

    const salvarCidade =  (local) => {
        let index = listCidades.findIndex(prop => prop.local == local)

        if (index < 0) {
            setListCidades([...listCidades, {local:local}])
            setNovaCidade("")
            toast.success('Cidade Salva!')
        }
    }
    const salvarBairro =  (local, taxa) => {
        let index = listBairros.findIndex(prop => prop.local == local)

        if (index < 0) {
            setListBairros([...listBairros, {local:local, taxa:taxa}])
            setNovoBairro("")
            setTaxa("")
            toast.success('Bairro Salvo!')
        }
    }
    const deletaCidade = (local) => {
        let index = listCidades.findIndex(prop => prop.cidade == local)
        listCidades.splice(index, 1)
        setListCidades(listCidades)
        toast.success('Cidade Apagada!')
    }

    const deletaBairro = (local) => {
        let index = listBairros.findIndex(prop => prop.local == local)
        listBairros.splice(index, 1)
        setListBairros(listBairros)
        setSeed(seed += 1)
        toast.success('Bairro Apagado!')
    }
    

    return (
        <>
        
        {index >= 0 ? 
        <div className={styles.center}>
            <h1>Você já é nosso cliente!</h1>
            <Link to="/perfil/user/negocio">Vá para sua Página</Link>
        </div>:
        <>
        <div className={styles.container}>
                        <h4>Cadastro</h4>
                        <form className={`row ${styles.form}`}>
                            <div className={`row ${styles.dados}`}>
                                <div className="col-sm-6">
                                    <label>Nome Completo *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setNome(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Data de nascimento *</label>
                                    <input type="date"
                                    onChange={(el)=> {
                                        setNascimento(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Nome do Negócio *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setRazao(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Telefone *</label>
                                    <input type="phone"
                                    onChange={(el)=> {
                                        setPhone(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <div className={styles.flex}>
                                        <label>Logo </label>
                                    {logo &&  <img src={logo} className={styles.logo}/>}
                                    </div>
                                    <Link to="/suporte/fotos" className={styles.link_help}>Como colocar minha logo?</Link>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setLogo(el.target.value)
                                    }}
                                    placeholder="Digite Aqui"
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_dashed_no_padding}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Abertura *</label>
                                                <input type="time"
                                                onChange={(el)=> {
                                                    setAbertura(formataHora(el.target.value))
                                                }}
                                                required
                                                />
                                                <label>Fechamento *</label>
                                                <input type="time"
                                                onChange={(el)=> {
                                                    setFecha(formataHora(el.target.value))
                                                }}
                                                required
                                                max={8}
                                                />
                                                <label>Site *</label>
                                                <strong className={styles.block}>meicomsite.netlify.com/{site.toLowerCase().replaceAll(' ', '')}</strong>
                                                
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setSite(el.target.value.toLowerCase().replaceAll(' ', ''))
                                                }}
                                                maxLength={10}
                                                required
                                                placeholder="meusite"
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                        <label>Cidades</label>
                                        {addCidade ? 
                                        <div>
                                            <input type="text" 
                                            onChange={(el)=> setNovaCidade(el.target.value)}
                                            value={novaCidade}
                                            placeholder="Digite Aqui..."
                                            className={styles.input}
                                            />
                                            <div className={styles.flex}>
                                                <button
                                                className={styles.btn_save}
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    if (!novaCidade) return 
                                                    salvarCidade(novaCidade)
                                                }}
                                                >
                                                    Salvar
                                                </button>
                                                <button
                                                className={styles.btn_add_cidade}
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    setAddCidade(!addCidade)
                                                }}
                                                >{!addCidade ? <FaPlusCircle/>: "Cancelar"}</button>
                                            </div>
                                        </div>
                                        :
                                        <FaPlusCircle
                                        type="button"
                                        className={styles.btn_add_cidade}
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            setAddCidade(!addCidade)
                                        }}
                                        />
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div>
                                            <select
                                            onChange={(el)=> setDeleteCidade(el.target.value)
                                            }
                                            className={styles.input}
                                            >
                                                <option>--</option>
                                                {listCidades.map(dados => {
                                                    return (
                                                            <option
                                                            value={dados.local}
                                                            >{dados.local}</option>
                                                        )
                                                })}
                                            </select>
                                            {!deleteCidade || deleteCidade != "--" &&
                                                <button key={seed}
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    deletaCidade(deleteCidade)
                                                }}
                                                className={styles.btn_delete}
                                                >
                                                    Apagar
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.line}/>
                                <div className="row">
                                    <div className="col-md-6" >
                                        <label>Bairros</label>
                                        {addBairro ? 
                                        <div>
                                            <input type="text" 
                                            onChange={(el)=> setNovoBairro(el.target.value)}
                                            value={novoBairro}
                                            className={styles.input}
                                            placeholder="Nome do Bairro"
                                            />
                                            <input type="number" 
                                            onChange={(el)=> setTaxa(el.target.value)}
                                            value={taxa}
                                            placeholder="Taxa de transporte"
                                            className={styles.input}
                                            />
                                            <div className={styles.flex}>
                                                <button
                                                className={styles.btn_save}
                                                type="button"
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    if (!novoBairro && !taxa) return 
                                                    salvarBairro(novoBairro, taxa)
                                                }}
                                                >Salvar</button>
                                                <button
                                                className={styles.btn_add_cidade}
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    setAddBairro(!addBairro)
                                                }}
                                                >{!addBairro ? <FaPlusCircle/> : "Cancelar"}</button>
                                            </div>

                                        </div>
                                        :
                                        <FaPlusCircle
                                        type="button"
                                        className={styles.btn_add_cidade}
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            setAddBairro(!addBairro)
                                        }}
                                        />
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div key={seed}>
                                            <select onChange={(el)=> setDeleteBairro(el.target.value)}
                                            className={styles.input}
                                            >
                                                <option value="--">--</option>
                                                {listBairros.map(dados => {
                                                    return (
                                                            <option
                                                            value={dados.local}
                                                            >{dados.local} - ({FormataValor(dados.taxa)})</option>
                                                        )
                                                })}
                                            </select>
                                            {!deletebairro || deletebairro != "--" &&
                                                <button
                                                key={seed}
                                                className={styles.btn_delete}
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    deletaBairro(deletebairro)
                                                }}
                                                >
                                                    Apagar
                                                </button>
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
                                <div className="col-sm-12">
                                    <div className={styles.cont_plan}>
                                        <label>Qual a modalidade?</label>
                                        <select 
                                        onChange={(el)=> setMod(el.target.value)}
                                        className={styles.input}
                                        >
                                            <option>-</option>
                                            <option value="Alimentação">Alimentação</option>
                                            <option value="Serviço">Prestador de Serviço</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.cont_theme}>
                                        <strong>{theme}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
                <div className={styles.cont_save}>
                    {nome && mod && phone 
                    && razao && logo && listBairros && listCidades ?
                        <button
                        type="button" 
                        data-bs-toggle="modal" 
                        data-bs-target="#ModalAdd"
                        onClick={(el)=> {
                            el.preventDefault()
                            setAção("Iniciar Cadastro")
                        }}
                        >
                            Confirmar
                        </button>
                    :
                    <button
                    className={styles.disabled}
                    onClick={(el)=> {
                        el.preventDefault()
                    }}
                    >Confirmar</button>
                    }   
                </div>

        </>      
        }

        <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className={`modal-dialog modal-md`}>
            <div className="modal-content">
                <BoxConfirm
                obj={obj}
                type="button" 
                data_bs_toggle="modal" 
                data_bs_target="#ModalAdd"
                listBairros={listBairros}
                listCidades={listCidades}
                />
            </div>
        </div>
    </div>
            {!load && <Loading/>}
            <ToastContainer/>
        </>
        )
}