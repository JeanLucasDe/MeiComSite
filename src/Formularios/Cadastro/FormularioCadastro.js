import styles from "./FormularioCadastro.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { Link} from "react-router-dom"
import { useState, useEffect} from "react"
import {FaCheck, FaPlusCircle, FaTimes} from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import {vapidKey, App} from "../../Hooks/App"
import { auth } from "../../Service/firebase"
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import NavBar from "../../components/NavBar";
import { getMessaging, getToken } from "firebase/messaging";

export default function FormularioCadastro () {

    const [user, setUser] = useState();
    const [state, setState] = useState(false)
    const [usuarios, setUsuarios] = useState([])
    const [tokenID, setTokenId] = useState()
    const db = getFirestore(App)
    const messaging = getMessaging(App);
    const Collec = collection(db, "MeiComSite")

    useEffect (()=>{
        try{
            auth.onAuthStateChanged(user => {
                if (user) {
                    const {uid, displayName, photoURL, email} = user
                    setUser({
                        id: uid,
                        avatar: photoURL ? photoURL : '',
                        name: displayName ? displayName : '',
                        email
                    })
                }
            })
            getNotificationToken()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const getUsers = async () => {
        const dataUser = await getDocs(Collec)
        setUsuarios((dataUser.docs.map((doc) => ({...doc.data(), id: doc.id}))))
    };
    if (user) {
        if (!state) {
            getUsers()
            setState(true)
        }
    }

    const usuario = usuarios && user && usuarios.filter(dados => dados.email == user.email)
    

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    
    
    const [ação, setAção] = useState()
    const [theme, setTheme] = useState()
    

    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [abre,setAbertura] = useState()
    const [fecha, setFecha] = useState()
    const [taxa, setTaxa] = useState()
    const [deletebairro, setDeleteBairro] = useState()
    const [deleteCidade, setDeleteCidade] = useState()
    const [modalidade, setModalidade] = useState('')
    const [cor, setCor] = useState()

    const [cidadeUser, setCidadeUser] = useState()
    const [bairroUser, setBairroUser] = useState()
    const [rua, setRua] = useState()
    const [cep, setCep] = useState()
    const [numeroUser, setNumeroUser] = useState()
    const [desc, setDesc] = useState()
    const [especialidade, setEspecialidade] = useState()


    var [seed, setSeed] = useState(0)
    const [site, setSite] = useState('')
    const [OnLogo, setOnLogo]= useState()
    const [nascimento,setNascimento] = useState()
    const [novaCidade, setNovaCidade] = useState()
    const [novoBairro, setNovoBairro] = useState()
    const [addCidade, setAddCidade] = useState(false)
    const [addBairro, setAddBairro] = useState(false)

    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 10000000);
        return numeroAleatorio
    }
    const idCat = geraId()

    const getNotificationToken = () => {
    // Obtém o token do dispositivo
    getToken(messaging, { vapidKey })
        .then((currentToken) => {
        if (currentToken) {
            console.log("Token obtido com sucesso:");
            setTokenId(currentToken)
            // Agora você pode salvar esse token no seu banco de dados
        } else {
            console.log("Não foi possível obter o token.");
        }
        })
        .catch((err) => {
        console.error("Erro ao obter o token:", err);
        });
    };

    
    const obj = {
    nome,
    razao,
    phone,
    mod:modalidade.trim(),
    nascimento,
    abre,
    site,
    cidade: cidadeUser,
    bairro: bairroUser,
    rua,
    cep,
    idLoja: parseFloat(idCat),
    numero: numeroUser,
    fecha: fecha,
    listBairros,
    listCidades,
    theme:modalidade,
    cor,
    tokenID,
    especialidade,
    descrição: desc,
    ação:ação,
    }
    
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
    

    function temSomenteLetras() {
        const regex = /^[A-Za-z]+$/; // Expressão regular para verificar se contém somente letras (maiúsculas ou minúsculas)
        return regex.test(site);
      }
    function semAcento() {
    const regex = /^[^áéíóúàèìòùãõâêîôûäëïöüç]*$/i; // Expressão regular que aceita apenas caracteres sem acento
    return regex.test(site);
    }

    const acento = semAcento()
    const alpha = temSomenteLetras()

    return (
        <>
        <NavBar/>
        {usuario && usuario.length == 0 ?
            <>
            <div className={styles.container}>
                        <h4>Cadastre seus Dados</h4>
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
                                    className={styles.input}
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
                                    <label>Especialidade *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setEspecialidade(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Descreva sua especialidade *</label>
                                    <textarea type="text"
                                    onChange={(el)=> {
                                        setDesc(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Telefone *</label>
                                    <input type="number"
                                    onChange={(el)=> {
                                        setPhone(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />

                                    <label>Cidade *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setCidadeUser(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Bairro *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setBairroUser(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Número *</label>
                                    <input type="number"
                                    onChange={(el)=> {
                                        setNumeroUser(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>Rua *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setRua(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    />
                                    <label>CEP *</label>
                                    <input type="number"
                                    onChange={(el)=> {
                                        setCep(el.target.value)
                                    }}
                                    required
                                    placeholder="Digite Aqui"
                                    maxLength={8}
                                    />
                                    <p>Cor</p>
                                    <input type='text' 
                                    placeholder="#0000"
                                    value={cor}
                                    onChange={(e)=> setCor(e.target.value)}/>
                                    <input type='color' 
                                    onChange={(e)=> setCor(e.target.value)}
                                    />
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_dashed_no_padding}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Abertura *</label>
                                                <input type="time"
                                                onChange={(el)=> {
                                                    setAbertura(el.target.value)
                                                }}
                                                required
                                                />
                                                <label>Fechamento *</label>
                                                <input type="time"
                                                onChange={(el)=> {
                                                    setFecha(el.target.value)
                                                }}
                                                required
                                                />
                                                <label>Site *</label>
                                                <strong className={styles.block}>meicomsite.netlify.com/{site.toLowerCase().replaceAll(' ', '')}</strong>
                                                
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setSite(el.target.value.toLowerCase().replaceAll(' ', ''))
                                                }}
                                                maxLength={20}
                                                required
                                                placeholder="meusite"
                                                />
                                                <p>{acento ? <FaCheck className={acento ? styles.ok : styles.off}/>: <FaTimes className={acento ? styles.ok : styles.off}/>} Sem Acento</p>
                                                <p>{alpha ? <FaCheck className={alpha ? styles.ok : styles.off}/>: <FaTimes className={alpha ? styles.ok : styles.off}/>} Somente Letras</p>
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
                                        <div className={styles.cont_add}>
                                            {addCidade ?
                                            <div>
                                                <label>Cidade:</label>
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
                                                    className={styles.btn_cancel}
                                                    onClick={(e)=> {
                                                        e.preventDefault()
                                                        setAddCidade(!addCidade)
                                                    }}
                                                    >{!addCidade ? <FaPlusCircle/>: "Cancelar"}</button>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <label>Cidade:</label>
                                                <button
                                                type="button"
                                                className={styles.btn_add_cidade}
                                                onClick={(e)=> {
                                                    e.preventDefault()
                                                    setAddCidade(!addCidade)
                                                }}
                                                ><FaPlusCircle/> Adicionar</button>
                                            </div>
                                            
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.cont_select}>
                                            <strong>Cidades</strong>
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
                                        <div className={styles.cont_add}>
                                            {addBairro ?
                                            <div>
                                                <label>Bairro:</label>
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
                                                        if (novoBairro && taxa) {
                                                            salvarBairro(novoBairro, taxa)
                                                        }
                                                    }}
                                                    >Salvar</button>
                                                    <button
                                                    className={styles.btn_cancel}
                                                    onClick={(e)=> {
                                                        e.preventDefault()
                                                        setAddBairro(!addBairro)
                                                    }}
                                                    >{!addBairro ? <FaPlusCircle/> : "Cancelar"}</button>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <label>Bairro:</label>
                                                <button
                                                type="button"
                                                className={styles.btn_add_cidade}
                                                onClick={(e)=> {
                                                        setAddBairro(!addBairro)
                                                    e.preventDefault()
                                                }}
                                                ><FaPlusCircle/> Adicionar</button>
                                            </div>
                                            
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div key={seed} className={styles.cont_select}>
                                            <strong>Bairros</strong>
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
                                        className={styles.input}
                                        onChange={(el)=> setModalidade(el.target.value)}
                                        >
                                            <option value="-" selected disabled defaultChecked>-</option>
                                            <option value="Alimentação" disabled>Alimentação (em construção)</option>
                                            <option value="Agenda">Agendamento</option>
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
                {desc && especialidade && nome && modalidade && modalidade != '-' && phone 
                && razao && cidadeUser && bairroUser && numeroUser && cep && listBairros && listCidades && alpha && acento ?
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
        
        :
        usuario && usuario.length > 0 ?
        <div>
            {window.location.href = '/perfil/user/config'}
        </div>
        :
        <div className={styles.cont_empty}>
            <img src='https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-8.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais' className={styles.logo_empty}/>
            <h4>Faça Login para Continuar!</h4>
            <Link to="/login"
            className={styles.btn_continue}
            >Continuar</Link>
        </div>
        }
        


        <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog modal-md`}>
                <div className={styles.cont_box}>
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
        </div>
            <ToastContainer/>
        </>
        )
}