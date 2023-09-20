import { useOutletContext } from "react-router-dom"
import styles from "./HomeAgenda.module.css"
import { useState } from "react"
import BoxService from "./BoxServices"


export default function HomeAgenda (props) {

    const usuario = props.usuario && props.usuario
    const [stage, setStage] = useState(0)



    return (

        <>
            <div className={styles.container}>
                
                <BoxService 
                usuario = {usuario && usuario}
                />
                
            </div>
        </>
        )
}