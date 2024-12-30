import { Link, useOutletContext, useParams } from "react-router-dom"
import '@firebase/firestore';
import styles from "./Categorias.module.css"
import NavShop from "./NavShop";
import { Helmet } from "react-helmet";
import { FaAngleLeft, FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function Categorias () {
    const [prod, usuario] = useOutletContext()
    const {site, id, idproduto} = useParams()
    var [seed, setSeed] = useState(0)
    var [multiplicador, setMultiplicador] = useState(1)
    
    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    const CatProd = prod && prod.filter(dados => dados.id == id)
    const produto = CatProd[0].produtos.length > 0 && CatProd[0].produtos[idproduto]

    const {nome, preço, saborComida, adicionais} = produto && produto

    const PegaSubTotal = () => {
        let ItemAdicionais = []
        let AdicionaisEscolhidos = adicionais && adicionais.filter(dados => {
            if (dados.qtd > 0) {
                return dados.qtd
            }
        })
        AdicionaisEscolhidos && AdicionaisEscolhidos.map(dados => {
            ItemAdicionais.push({qtd:dados.qtd, preço: dados.PreçoAdicional})
        })
        var somaAdicional = ItemAdicionais.reduce((soma, i) => {return soma + i.qtd * i.preço}, preço * multiplicador)
        return somaAdicional
    }
    var sub_Total = PegaSubTotal()



    const ConfirmaCompra = () => {
        let AdicionaisEscolhidos = adicionais && adicionais.filter(dados => {
            if (dados.qtd > 0) {
                return dados.qtd
            }
        })

        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        produtosSalvos.push(
            {
                valor: sub_Total,
                adicionais: AdicionaisEscolhidos,
                categoria: nome,
                produtos: [{
                    qtd:1,
                    sabor: nome
                }]
            }
        )
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        toast.success('Produto Adicionado a Sacola!')
    }

    return (
            <>
                {usuario.length > 0 && usuario[0].mod == "Alimentação" &&
                    <div className={`${styles[usuario && usuario[0].theme]}`}> 
                        <div className={styles.container}>
                            <div className={styles.header_prod}>
                                <Link
                                to={`/${site}`}
                                className={styles.arrow_left}
                                >
                                    <FaAngleLeft/>
                                </Link>
                                <p>Detalhes do produto</p>
                            </div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIIrBbM185W0hlTKs928AOWCJkvmZT6gLGnA&usqp=CAU"
                            className={styles.img}
                            />
                            <div className={styles.info}>
                                <h5 className={styles.name}>{nome}</h5>
                                <p className={styles.ingredientes}>Carne, Pão, Molho, Alface</p>
                                <p className={styles.preço}>{FormataValor(preço)}</p>
                            </div>
                            <div className={styles.cont_adicionais}>
                                <p>Deseja Adicionais?</p>
                                <ul
                                className={styles.list_adicionais}
                                key={seed}
                                >
                                    {adicionais.length > 0 && adicionais.map(dados => {
                                        return (
                                            <li key={dados.id}>
                                                <div className={styles.item_add}>
                                                    <div>
                                                        <p className={styles.saborAdd}>{dados.saborAdicional}</p>
                                                        <p className={styles.preçoAdd}>{FormataValor(dados.PreçoAdicional)}</p>
                                                    </div>

                                                    <div className={styles.cont_add_btn}>
                                                        <button className={`${styles.icon_adicional} ${styles.icon}`}
                                                        onClick={()=> {
                                                            if (dados.qtd == 0) return
                                                            dados.qtd -= 1
                                                            setSeed(seed+=1)
                                                        }}
                                                        >
                                                            <FaMinus/>
                                                        </button>
                                                        <p className={styles.count}>{!dados.qtd ? 0 : dados.qtd}</p>
                                                        <button className={`${styles.icon_adicional} ${styles.icon}`}
                                                        onClick={()=> {
                                                            if (!dados.qtd) {
                                                                dados.qtd = 1
                                                                setSeed(seed+=1)
                                                            } else {
                                                                dados.qtd += 1
                                                                setSeed(seed+=1)
                                                            }
                                                        }}
                                                        >
                                                            <FaPlus/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                            )
                                    })}
                                </ul>
                            </div>
                        </div> 


                        <div className={styles.cont_subtotal}>
                                <button className={styles.icon}
                                onClick={()=> {
                                    if (multiplicador == 1) return
                                    setMultiplicador(multiplicador -= 1)
                                }}
                                >
                                    <FaMinus/>
                                </button>
                                <p className={styles.count}>{multiplicador}</p>
                                <button className={styles.icon}
                                onClick={()=> {
                                    setMultiplicador(multiplicador += 1)
                                }}
                                >
                                    <FaPlus/>
                                </button>
                                <button className={styles.btn_subtotal}
                                onClick={() => {
                                    ConfirmaCompra()
                                }}
                                >
                                    <span>Adicionar {FormataValor(sub_Total)}</span>
                                </button>
                        </div>
                    </div>
                }

            <Helmet>
                <link rel="icon" type="image/url" href={usuario.length > 0 && usuario[0].logo} sizes="16x16" />
            </Helmet>
            <ToastContainer/>
            </>
        )
}