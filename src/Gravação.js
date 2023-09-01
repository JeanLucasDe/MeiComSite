import { useState } from "react"
import styles from "./Gravação.module.css"


export default function ListaFrutas () {


    const lista = ["maçã", "abacaxi", "uva", "pêra", "abobora", "mamão"]
    const [busca, setBusca] = useState()
    const FrutasFiltradas = lista.filter(dados => dados.includes(busca))


    return (
            <>
                <div className={styles.container}>
                    <h1>Qual fruta quer hoje?</h1>
                    <input type="text" onChange={(el)=> setBusca(el.target.value)}/>
                    <ul>
                        {FrutasFiltradas.map(dados => {
                            return (
                                <li>{dados}</li>
                                )
                        })}
                    </ul>
                </div>
            
            </>        
        )
}