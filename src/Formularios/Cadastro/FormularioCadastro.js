import styles from "./FormularioCadastro.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { Link, useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import {Swiper, SwiperSlide} from "swiper/react"
import Themes from "../../Documents/Themes.json"
import Loading from "../../components/Loading"
import {FaPlusCircle, FaRegSave, FaTrashAlt} from "react-icons/fa"

export default function FormularioCadastro () {

    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const db = getFirestore(App)
    const [load, setLoading] = useState(false)
    const UserCollection = collection(db, "MeiComSite")
    
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
    

    const [plan, setPlan] = useState()
    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [abre,setAbertura] = useState()
    const [fecha, setFecha] = useState()
    const [site, setSite] = useState()
    const [nascimento,setNascimento] = useState()
    const [token, setToken] = useState()
    const [cidade, setCidade] = useState()
    const [novaCidade, setNovaCidade] = useState()
    const [novoBairro, setNovoBairro] = useState()
    const [logo, setLogo] = useState()
    const [idtheme, setIdTheme] = useState()
    const [addCidade, setAddCidade] = useState(false)
    const [addBairro, setAddBairro] = useState(false)
    
    const obj = {
    nome,
    razao,
    phone, 
    idtheme,
    cidade,
    theme,
    mod,
    nascimento,
    plan,
    token,
    abre,
    site,
    fecha,
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
        }
    }
    const salvarBairro =  (local) => {
        let index = listBairros.findIndex(prop => prop.local == local)

        if (index < 0) {
            setListBairros([...listBairros, {local:local}])
            setNovoBairro("")
        }
    }
    const deletaCidade = (local) => {
        let index = listCidades.findIndex(prop => prop.cidade == local)

        listCidades.splice(index, 1)

        setListCidades(listCidades)
    }

    const deletaBairro = (local) => {
        let index = listBairros.findIndex(prop => prop.local == local)

        listBairros.splice(index, 1)

        setListCidades(listBairros)
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
                        <h4>Dados Pessoais</h4>
                        <form className={`row ${styles.form}`}>
                            <div className={`row ${styles.dados}`}>
                                <div className="col-sm-6">
                                    <label>Nome Completo *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setNome(el.target.value)
                                    }}
                                    required
                                    />
                                    <label>Data de nascimento *</label>
                                    <input type="date"
                                    onChange={(el)=> {
                                        setNascimento(el.target.value)
                                    }}
                                    required
                                    />
                                    <label>Razão Social *</label>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setRazao(el.target.value)
                                    }}
                                    required
                                    />
                                    <label>Telefone *</label>
                                    <input type="phone"
                                    onChange={(el)=> {
                                        setPhone(el.target.value)
                                    }}
                                    required
                                    />
                                    <div className={styles.flex}>
                                        <label>Logo </label>
                                    {logo &&  <img src={logo} className={styles.logo}/>}
                                    </div>
                                    <Link to="/suporte/fotos" className={styles.link_help}>Como colocar minha logo?</Link>
                                    <input type="text"
                                    onChange={(el)=> {
                                        setLogo(el.target.value)
                                    }}/>
                                </div>
                                <div className="col-sm-6">
                                    <label className={styles.title_small}>Informações do negócio</label>
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
                                                max={8}
                                                />
                                                <label>Site *</label>
                                                <strong className={styles.block}>meicomsite.netlify.com/{site}</strong>
                                                
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setSite(el.target.value)
                                                }}
                                                maxLength={12}
                                                required
                                                />
                                                <label>Cidade *</label>
                                                <input type="text"
                                                onChange={(el)=> {
                                                    setCidade(el.target.value)
                                                }}
                                                required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>    
                    </div>
                    <div className={styles.container}>
                            <label className={styles.title_small}>Áreas Atendidas</label>
                            <div className={styles.cont_dashed_no_padding}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Cidades</label>
                                        {addCidade && 
                                        <div className={styles.flex}>
                                            <input type="text" 
                                            onChange={(el)=> setNovaCidade(el.target.value)}
                                            value={novaCidade}
                                            />
                                            <FaRegSave
                                            type="button"
                                            className={styles.btn_save}
                                            onClick={(e)=> {
                                                e.preventDefault()
                                                if (!novaCidade) return 
                                                salvarCidade(novaCidade)
                                            }}
                                            />
                                        </div>
                                        }
                                        <button
                                        className={styles.btn_add_cidade}
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            setAddCidade(!addCidade)
                                        }}
                                        >{!addCidade ? <FaPlusCircle/>: "Cancelar"}</button>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.flex_space_around}>
                                            <select
                                            onChange={(el)=> setNovaCidade(el.target.value)
                                            }
                                            >
                                                {listCidades.map(dados => {
                                                    return (
                                                            <option
                                                            value={dados.local}
                                                            >{dados.local}</option>
                                                        )
                                                })}
                                            </select>
                                            {novaCidade &&
                                                <FaTrashAlt
                                                type="button" 
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    deletaCidade(novaCidade)
                                                }}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.line}/>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Bairros</label>
                                        {addBairro && 
                                        <div className={styles.flex}>
                                            <input type="text" 
                                            onChange={(el)=> setNovoBairro(el.target.value)}
                                            value={novoBairro}
                                            />

                                            <FaRegSave
                                            className={styles.btn_save}
                                            type="button"
                                            onClick={(e)=> {
                                                e.preventDefault()
                                                if (!novoBairro) return 
                                                salvarBairro(novoBairro)
                                            }}
                                            />
                                        </div>
                                        }
                                        <button
                                        className={styles.btn_add_cidade}
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            setAddBairro(!addBairro)
                                        }}
                                        >{!addBairro ? <FaPlusCircle/> : "Cancelar"}</button>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.flex_space_around}>


                                            <select onChange={(el)=> setNovoBairro(el.target.value)}>
                                                {listBairros.map(dados => {
                                                    return (
                                                            <option
                                                            value={dados.local}
                                                            >{dados.local}</option>
                                                        )
                                                })}
                                            </select>



                                            {novoBairro &&
                                                <FaTrashAlt
                                                type="button" 
                                                onClick={(el)=> {
                                                    el.preventDefault()
                                                    deletaBairro()
                                                }}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    <div className={styles.container}>
                <h4>Seu negócio</h4>
                    <div className={`col-sm-12`}>
                        <div className={styles.cont_dashed}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className={styles.cont_plan}>
                                        <label>Plano:</label>
                                        <select 
                                        onChange={(el)=> setPlan(el.target.value)}
                                        >
                                            <option>-</option>
                                            <option value="Basic">Basic</option>
                                            <option value="Plus">Plus</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                        <Link 
                                        className={styles.btn_theme}
                                        to="/planos"
                                        >
                                            ver planos
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Modalidade</label>
                                            <select id="modalidade"
                                            onChange={(el)=> setMod(el.target.value)}
                                            defaultValue="-"
                                             >
                                                <option>-</option>
                                                <option>Loja Virtual</option>
                                                <option>Restaurante</option>
                                            </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_theme}>
                                        <label>Tema:</label>
                                        <strong>{theme}</strong>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.container_themes}>
                                <Swiper
                                spaceBetween={10}
                                className={styles.cont_slides}
                                breakpoints={{
                                    320: {
                                        width: 320,
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        width: 768,
                                        slidesPerView: 2,
                                        },
                                    }}>
                                        {Themes.map(item => {
                                            if (mod == item.modalidade) {
                                                return (
                                                    <SwiperSlide key={item.id} className={styles.item}
                                                    onClick={(el)=> {
                                                        el.preventDefault()
                                                        setTheme(item.name)
                                                        setIdTheme(item.id)
                                                    }}
                                                    >
                                                        <img src={item.img} className={styles.img}/>
                                                        <div className={styles.cont_escolha}>
                                                            <p>{item.name}</p>
                                                        </div>
                                                    </SwiperSlide>
                                                    )
                                            }
                                        })}
                                </Swiper>
                            </div>
                            
                        </div>
                    </div>
            </div>
                <div className={styles.cont_save}>
                    {nome && theme && mod && phone 
                    && razao && plan &&
                    cidade && logo && listBairros && listCidades ?
                        <button
                        type="button" 
                        data-bs-toggle="modal" 
                        data-bs-target="#ModalAdd"
                        onClick={(el)=> {
                            el.preventDefault()
                            setAção("Iniciar Cadastro")
                        }}
                        >
                            salvar
                        </button>
                    :
                    <button
                    className={styles.disabled}
                    onClick={(el)=> {
                        el.preventDefault()
                    }}
                    >salvar</button>
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
        </>
        )
}