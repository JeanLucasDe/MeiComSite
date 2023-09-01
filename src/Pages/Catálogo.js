import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../layouts/layoutsHome/Footer"
import Exposed from "../layouts/layoutsExposed/Exposed"
import styles from "../layouts/layoutsExposed/Exposed.module.css"


export default function Catalogo () {
    const {modalidade} = useParams()
    
    return (
            <>
                <NavBar/>
                <h1 className={styles.title}>{modalidade}</h1>
                <Exposed modalidade={modalidade}/>
                <Footer/>
            </>
        )
}