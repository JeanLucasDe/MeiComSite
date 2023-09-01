import styles from "./Negocio.module.css"
import BoxConfirm from "../../components/BoxConfirm"
import Themes from "../../Documents/Themes.json"
import {Swiper, SwiperSlide} from "swiper/react"
import Loading from "../../components/Loading"
import { useState,useEffect } from "react"
import {auth} from "../../Service/firebase"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs,updateDoc, doc} from "@firebase/firestore";
import { Link } from "react-router-dom"



export default function Negocio () {

    const [load, setLoading] = useState(false)
    const [user, setUser] = useState();
    const [Users, setUsers] = useState([])
    const db = getFirestore(App)
    const UserCollection = collection(db, "MeiComSite")

    useEffect (()=>{
        try{
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
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                setLoading(true)
            };

                
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])

    const usuario = Users && user && Users.filter(dados => dados.iduser == user.id)

    const FormataNome = (nome) => {
        nome = nome.split(' ')
        return nome[0] + " " + nome[1]
    }

    
    return (
            <>
                {Users && user && Users.map(dados => {
                    if (dados.iduser == user.id) {
                        return (
                                <div className={styles.container} key={dados.iduser}>
                                    <h2 className={styles.razao}>Olá, {FormataNome(dados.nome)}</h2>
                                    <div className="row">
                                        <div className="col-sm-6 order-2">
                                            <div className={styles.cont_info}>
                                                <h3>Informações</h3>
                                                <div className={styles.line}></div>
                                                <p>Plano: <strong>{dados.plan}</strong></p>
                                                <p>Membro desde: <strong>{dados.data}</strong></p>
                                                <p>Modalidade: <strong>{dados.mod}</strong></p>
                                                <p>Tema: <strong>{dados.theme}</strong></p>
                                                <p>Funcionamento: 
                                                    <strong> {dados.abre}:00h </strong> às  
                                                    <strong> {dados.fecha}:00h </strong>
                                                </p>
                                                <p>Site: </p>{dados.status == "pronto" ? 
                                                <span>
                                                    <Link to={`/${dados.site}`} className={styles.link}
                                                    target="_blank"
                                                    >meicomsite.netlify.app/{dados.site}</Link>
                                                </span>:
                                                <strong className={styles.link}>{dados.status}</strong>
                                                }
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-6 order-1">
                                            <div className={styles.cont_theme}>
                                                {Themes.map(item => {
                                                    if (item.id == dados.idtheme) {
                                                        return (
                                                            <div className={styles.cont_img}>
                                                                <img src={item.img} className={styles.img}/>
                                                                <div className={styles.line}/>
                                                            </div>
                                                            )
                                                        }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    } 
                })}
                {usuario && usuario.length == 0 &&
                <div className={styles.container_off}>
                    <h4>Usuário não cadastrado</h4>
                    <Link to="/perfil/cadastro">Cadastrar agora!</Link>
                </div>
                }

                
            </>
        )
}