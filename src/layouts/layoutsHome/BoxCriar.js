import styles from "./BoxCriar.module.css"
import {FaAngleDoubleRight, FaArrowRight} from "react-icons/fa"
import {firebase, auth} from "../../Service/firebase"
import { useEffect, useState } from "react"
import App from "../../Hooks/App"
import { collection,  getFirestore, getDocs} from "@firebase/firestore";
import { Link } from "react-router-dom"

export default function BoxCriar () {
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
        <>
            <div className={styles.container}>
                <div className={`${styles.row} row`}>
                    <div className="col-sm-6">
                        <h1>Dê o primeiro passo</h1>
                    </div>
                    <div className="col-sm-6">
                        {user.length == 0  ?
                                <button className={styles.btn_start}
                                onClick={HandleClickLoginGoogle}
                                >Criar agora <FaAngleDoubleRight/></button>
                        :
                            <Link to={index && index < 0 ? "/cadastro": "/perfil/user/config"}>
                                <button className={styles.btn_start}>Começar <FaArrowRight/></button>
                            </Link>
                            
                        }
                    </div>
                </div>
                
            </div>
        </>
        )
    }