import styles from "./FormularioEdit.module.css"
import styles_form from "./Form.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import { useState } from "react"
import {App} from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, updateDoc, doc, deleteDoc} from "@firebase/firestore";
import { FaPlusCircle} from "react-icons/fa"
import moment from 'moment/moment';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Link, useOutletContext } from "react-router-dom"
import RecuperaPassWord from "../../components/RecuperaPassWord"
import { FaCopy, FaExternalLinkSquareAlt } from "react-icons/fa";
import copy from "copy-to-clipboard";



export default function FormularioEdit () {

    const [mod, produtos, usuario, vendas, user,agenda,servicos,token] = useOutletContext()
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
    const [cor, setCor] = useState()


    const [cidadeUser, setCidadeUser] = useState()
    const [bairroUser, setBairroUser] = useState()


    const [nome, setNome] = useState()
    const [razao, setRazao] = useState()
    const [phone, setPhone] = useState()
    const [site, setSite]= useState()
    const [logo, setLogo] = useState()
    const [addCidade, setAddCidade] = useState()
    const [addBairro, setAddBairro] = useState()
    const [deleteEmail, setDeleteEmail] = useState()
    const [desc, setDesc] = useState()
    const [especialidade, setEspecialidade] = useState()
    const [targetNumber, setTargetNumber] = useState()
    

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

    
    const obj = {
        nome,
        phone, 
        cidade: cidadeUser,
        bairro: bairroUser,
        numero: targetNumber,
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
         {usuario && !usuario[0].admin && 
        <div className={styles.status}>
            <p>Status : <strong>{usuario && usuario[0].status}</strong></p>
        </div>}
         <div className={styles_form.card}>
            <div className={styles_form.header}>
                <div>
                    <h2 className={styles_form.siteName}>{usuario && usuario[0].razao}</h2>
                    <h5>ID: {usuario && usuario[0].idloja}</h5>
                    {token && <h5>TokenID: <input value={token} className={styles_form.input}/></h5>}
                    <Link to={`http://sitemei.netlify.app/${usuario && usuario[0].site}`} className={styles_form.siteLink}>https://sitemei.netlify.app/{usuario && usuario[0].site}</Link>
                    <Link className={styles_form.configureButton}
                    to="/perfil/user/empresa"
                    >
                    ⚙️ configurar
                    </Link>
                </div>
            </div>
            <div>
                <p className={styles_form.date}>Criado em: {usuario && moment(usuario[0].data).format('DD/MM/YYYY')}</p>
            </div>
        </div>

        <div className={styles_form.container}>
            <h1 className={styles_form.title}>Dados Pessoais</h1>
            <form className={styles_form.form}>
                <div className={styles_form.formGroup}>
                <label htmlFor="name" className={styles_form.label}>Nome Completo</label>
                <input
                    type="text"
                    id="name"
                    className={styles_form.input}
                    defaultValue={usuario && usuario[0].nome}
                    onChange={(e)=> setNome(e.target.value)}
                />
                </div>
                <div className={styles_form.formGroup}>
                <label htmlFor="email" className={styles_form.label}>Email</label>
                <input
                    type="email"
                    id="email"
                    className={styles_form.input}
                    defaultValue={user.email}
                    placeholder="Enter your email"
                    disabled
                />
                </div>
                <div className={styles_form.formGroup}>
                <label htmlFor="phone" className={styles_form.label}>Celular</label>
                <input
                    type="tel"
                    id="phone"
                    className={styles_form.input}
                    defaultValue={usuario && usuario[0].telefone}
                    onChange={(el) => setTargetNumber(el.target.value)}
                    placeholder="Enter your phone number"
                />
                </div>
                <button type="button" className={styles_form.button}
                data-bs-toggle={targetNumber || nome &&  'modal'} 
                data-bs-target={targetNumber || nome &&  '#ModalAdd'} 
                onClick={(e)=> {
                    e.preventDefault()
                    if (targetNumber || nome) {
                        setAção("Editar")
                    }
                }}
                >Salvar</button>
            </form>
        </div>
        <div className={styles_form.container}>
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