import { Link } from "react-router-dom"
import styles from "./negocios.module.css"
import {firebase, auth} from "../../Service/firebase"
import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";

export default function Negocios() {

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
        <div className={styles.container}>
            <div>
                
                <div className={`${styles.container_img} `}>
                    <img src="https://img.freepik.com/free-vector/marketing-concept-illustration_114360-3903.jpg?w=740&t=st=1681761026~exp=1681761626~hmac=ae9f4d04dfb59c0e4755e367f792b1b7bdb0c662de24f556aeb1e550f4587406" className={styles.img}/>
                </div>
                <div>
                    <h1 className={styles.big_text}>Gerencie seu negócio na palma da sua mão</h1>
                </div>
                <div className={styles.cont_buttons}>
                    {user.length == 0  ?
                            <button className={styles.btn_start}
                            onClick={HandleClickLoginGoogle}
                            >Começar Grátis</button>
                    :
                        <Link to={index < 0 ? "/perfil/cadastro": "/perfil/user/negocio"}>
                            <button className={styles.btn_start}>Começar Grátis</button>
                        </Link>
                        
                    }

                    <Link to="/planos">
                        <button className={styles.btn_plan}>Conheça os Planos</button>
                    </Link>
                </div>
            </div>
        </div>
        )
}