import styles from "./BoxCriarSiteGuia.module.css"
import {FaAngleDoubleRight} from "react-icons/fa"
import {firebase, auth} from "../../Service/firebase"
import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { Link } from "react-router-dom"

export default function BoxCriarSiteGuia () {

    const [userLogin, setUserLogin] = useState();
    const [user, setUser] = useState([]);
    const [produtos, setProdutos] = useState([])
    
    const db = getFirestore(App)
    const UserCollection = collection(db, "MeiComSite")

    const HandleClickLoginGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider);

        if (!result.user) {
            const {uid, displayName, photoURL} = result.user
            if (!displayName && !photoURL) {
                throw new Error('Usuário sem Nome ou foto')
            }
            setUserLogin({
                id: uid,
                avatar: photoURL,
                name: displayName
            })
        }
    }
    useEffect(()=>{
        const getUsers = async () => {
            const data = await getDocs(UserCollection);
            setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        };
        getUsers()

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


    let index = produtos && user && produtos.findIndex(prop => prop.iduser == user.id)




return (
    <div className={styles.container} id="guia">
        <div className="row">
            <div className="col-md-5 order-2 order-md-1 col-lg-6">
                <div className={styles.container_text}>
                    <h1>Como criar seu site</h1>
                    <h4>Em poucos passos impulsione seu negócio</h4>
                    <br/>
                    <ol className={styles.list}>
                        <li><strong>Preencha suas informações.</strong></li>
                        <li><strong>Informe os locais que vai atender.</strong></li>
                        <li><strong>Configure seu Pix do Mercago Pago (plus)</strong></li>
                        <li><strong>Selecione o layout que deseja na sua página.</strong></li>
                        <li><strong>Adicione fotos do seu One drive.</strong> <Link to="/suporte/fotos">Veja como</Link></li>
                        <li><strong>Adicione seus produtos.</strong></li>
                    </ol>

                    {user.length == 0  ?
                            <button className={styles.btn_start}
                            onClick={HandleClickLoginGoogle}
                            >Criar agora <FaAngleDoubleRight/></button>
                    :
                        <Link to={index && index < 0 ? "/cadastro": "/perfil/user/categorias"}>
                            <button className={styles.btn_start}>Começar Grátis</button>
                        </Link>
                        
                    }
                </div>
            </div>
            <div className="col-md-7 order-1 col-lg-6">
                <div>
                    <img src="https://img.freepik.com/fotos-gratis/ilustracao-3d-smartphone-com-tela-branca-em-branco-e-caixas-de-papelao-conceito-de-servico-de-comercio-eletronico-e-frete_58466-14530.jpg?w=740&t=st=1679048604~exp=1679049204~hmac=e298b81ac413a86e313e65064171cec12bba83689664e1fff660d696048eecf1"
                    className={styles.img}
                    />
                </div>
            </div>
        </div>

    </div>
    )
}