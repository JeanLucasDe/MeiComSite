import { useEffect, useState } from "react"
import styles from "../../AreaCliente/layouts/Wpp/HomeWpp.module.css"
import BoxConversation from "./BoxConversationDemostracao"
import {useParams } from "react-router-dom"
import BoxPedido from "../../AreaCliente/layouts/Wpp/BoxPedido"

export default function HomeWpp (props) {

    const [show, setShow] = useState()
    const {site} = useParams()
    
    function pegaDadosCompra() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}.compra`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}.compra`))
        }
        return produtosSalvos
    }
    const Compra = pegaDadosCompra()
    const VendaEfetuada = []

    const produtos = [
        {
            categoria: 'Pizza',
            id:123,

            produtos: [
            {
                nome:'Pizza Grande',
                preço:35,
                qtdPessoas:6,
                qtdSabores:2,
                saborComida:[
                {
                    sabor:'Calabresa',
                    ingredientes:'Calabresa, mussarela'
                },
                {
                    sabor:'Frango',
                    ingredientes:'Frango, mussarela'
                }
                ],
                adicionais:[
                    {
                        IngredientesAdicional:'Nutela',
                        saborAdicional: 'Doce',
                        PreçoAdicional: 6
                    }
                ]
            }
            ]
        }
    ]
    const usuario = {
        razao:'Lanches SA',
        cidade:'Salvador',
        bairro:'Sussuarana',
        rua:'Novo horizonte',
        numero:'223',
        telefone:'71982771121',
        listBairros: [
            {
                taxa:5,
                local:'Logradouro'
            }
        ],
        listCidades: [
            {
                local:'Salvador'
            }
        ]
    }


    return (
            <>
    {!VendaEfetuada.length ?
            !show ? <div className={styles.container}>
                <div>
                    <img src="data:image/png;base64,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" className={styles.logo}/>
                </div>
                <h2 className={styles.title}>Comece seu pedido</h2>
                <p className={styles.par}>Converse com nosso robô e facilite seu atendimento.</p>
                <button
                className={styles.start_button}
                onClick={() => setShow(true)}
                >Começar</button>
            </div>:
            <BoxConversation
            produtos={produtos}
            usuario={usuario}
            />
            :
            <BoxPedido/>
            }
            

            </>
        )
}