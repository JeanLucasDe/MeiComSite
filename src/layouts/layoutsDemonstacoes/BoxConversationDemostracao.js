import { useEffect, useState } from "react"
import styles from "../../AreaCliente/layouts/Wpp/BoxConversation.module.css"
import { toast, ToastContainer } from "react-toastify"
import { FaEdit, FaMinusCircle, FaPlus, FaPlusCircle, FaRegLaughBeam, FaRegPaperPlane, FaSave, FaTrashAlt } from "react-icons/fa"
import styles1 from "../../AreaCliente/layouts/Wpp/Conversation.module.css"
import {useParams } from "react-router-dom"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore} from "@firebase/firestore";
import BoxPedido from "../../AreaCliente/layouts/Wpp/BoxPedido"

export default function BoxConversation (props) {
    
    const lista = props.produtos && props.produtos
    const usuario = props.usuario && props.usuario

    const db = getFirestore(App)
    const vendas = []

    var listIds = []
    vendas && vendas.map(dados => {
        listIds.push(dados.iden)
    })
    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 1000000000);
        return numeroAleatorio
    }
    const id = geraId()

    const [pedido, setPedido] = useState()
    const {site} = useParams()
    const [nome, setNome] = useState()
    const [editNome, setEditNome] = useState()
    const [cidade, setCidade] = useState()
    const [rua, setRua] = useState()
    const [editRua, setEditRua] = useState()
    const [editCidade, setEditCidade] = useState()
    const [bairro, setBairro] = useState()
    const [editBairro, setEditBairro] = useState()
    const [moradia, setMoradia] = useState()
    const [telefone, setTelefone] = useState()
    const [editTelefone, setEditTelefone] = useState()
    const [editMoradia, setEditMoradia] = useState()
    const [numero, setNumero] = useState()
    const [editNumero, setEditNumero] = useState()
    const [referencia, setReferencia] = useState()
    const [editReferencia, setEditReferencia] = useState()
    const [pagamento, setPagamento] = useState()
    const [editPagamento, setEditPagamento] = useState()
    const [valor, setValor] = useState()
    const [ação, setAção] = useState()
    const [save, setSave] = useState()
    

    const [next, setNext] = useState(0)
    const [categoria, setCategoria] = useState()
    var [saboresEscolhidos, setSaboresEscolhidos] = useState([])
    var [seed, setSeed] = useState(0)
    var [render, setRender] = useState(1)
    

    const ResetaEscolha = () => {
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify([]))
    }
    useEffect(()=> {
        ResetaEscolha()
    }, [])

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    const removeListaEscolhidos = (id, nome, sabor) => {
        const indexFirst = lista && lista.filter(dados => dados.id == id)
        const indexSecond = indexFirst && indexFirst[0].produtos.filter(dados => dados.nome == nome)
        const indexThree = indexSecond && indexSecond[0].saborComida.filter (dados => dados.sabor == sabor)
        const index = saboresEscolhidos.findIndex(dados => dados.sabor == sabor) 
        if (saboresEscolhidos.length > 0 &&  saboresEscolhidos[index].qtd == 1) {
            saboresEscolhidos[index].qtd -= 1
            saboresEscolhidos.splice(index, 1)
        }
        indexThree[0].qtd -= 1
        setSeed(seed += 1)
    }
    const addListaEscolhidos = (id, nome, sabor) => {
        const indexFirst = lista && lista.filter(dados => dados.id == id)
        const indexSecond = indexFirst && indexFirst[0].produtos.filter(dados => dados.nome == nome)
        const indexThree = indexSecond && indexSecond[0].saborComida.filter(dados => dados.sabor == sabor)
        const index = saboresEscolhidos.findIndex(dados => dados.sabor == sabor)

        if (indexSecond[0].qtdSabores > saboresEscolhidos.length) {
            if (index < 0) {
                setSaboresEscolhidos([...saboresEscolhidos, {sabor, qtd:1}])
                indexThree[0].qtd = 1
            } else {
                setSaboresEscolhidos([...saboresEscolhidos, {sabor, qtd:1}])
                indexThree[0].qtd += 1
            }

        } else {
            return toast.error('capacidade alcançada')
        }
        setSeed(seed += 1)
    }
    const LimpaQtds = () => {
        lista && lista.map(dados => {
            if (dados.produtos) {
                dados.produtos.map(item => {
                    item.saborComida.map(sabor => {
                        if (sabor.qtd) {
                            sabor.qtd = 0
                        }
                    })
                })
            }
        })
    }

    const SalvaEscolha = () => {
        LimpaQtds()
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (!saboresEscolhidos.length) return
        produtosSalvos.push({valor, categoria, produtos: saboresEscolhidos})
        
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        toast.success('Produto adicionado ao carrinho')
        setSaboresEscolhidos([])
    }

    const DeletaEscolha = (id) => {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        produtosSalvos.splice(id, 1)
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        toast.success('Produto retirado do carrinho')
        setRender(render += 1)
    }

    function pegaDados() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        return produtosSalvos
    }

    const PegaTaxa = () => {
        var bairroS = bairro && bairro.toString().split('-')
        const index =  usuario && bairroS && usuario.listBairros.filter(dados => dados.local == bairroS[0].trim())
        const taxa = index && index[0].taxa
        return parseFloat(taxa)
    }

    const taxa = PegaTaxa()

    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (listGeral.length === 0) {
            return 0
        } else {
            let listPrecos = []
            listGeral.map(item => {return listPrecos.push({valor: item.valor})})
            var soma = listPrecos.reduce((soma, i) => {return soma + i.valor}, 0)
            return  taxa ? soma += taxa: soma
        }
    }
    const Total = pegaPreco()
    const ListaEscolha = pegaDados()


    const AddPedidoStorage = () => {

        let produtosSalvos = new Array()

        produtosSalvos.push({id})
        
        localStorage.setItem(`itenscarrinho.${site}.compra`,JSON.stringify(produtosSalvos))

        setSave(true)
        AdicionarUSer()
    }

    

    const AdicionarUSer = async () => {
        setTimeout(() => {
            window.location.reload()
        }, 3000);
    };
    
    const VendaEfetuada = []

    

    const cc = document.querySelector('#cont')
    const DescePágina = () => {
        if (cc) {
            cc.scrollTo({
            top: 0,
            behavior:'smooth'
            });
        }
    }


    
    
    return (
            <>
                {!VendaEfetuada.length ? !pedido && 
                <div className={styles.container}>
                    <div className={`conten ${styles.content}`} id="cont">
                        <div className={`${styles.header} dropdown`}>
                            <button className={`${styles.btn_tog} btn btn-secondary dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" className={styles.user_logo}  xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                                </svg>
                                <div className={styles.cont_button}>
                                    <h5 className={styles.razao}>{usuario && usuario.razao}</h5>
                                    <p>Ver endereço da loja</p>
                                </div>
                            </button>
                            <ul className={`${styles.box_info} dropdown-menu`}>
                                <li className={styles.info}>
                                    <p>Cidade: {usuario && usuario.cidade}</p>
                                    <p>Bairro: {usuario && usuario.bairro}</p>
                                    <p>Rua: {usuario && usuario.rua}</p>
                                    <p>Número: {usuario && usuario.numero}</p>
                                    <p>Telefone: {usuario && usuario.telefone}</p>
                                </li>
                            </ul>
                        </div>



                        <ul className={styles.list}>
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>                                
                                    <p>Olá, Em que podemos ajuda?</p>
                                    {next == 0 && <button className={styles.btn}
                                    onClick={() => {
                                        if (next > 1) return
                                        setNext(1)
                                        DescePágina()
                                    }
                                    }
                                    >Ver Cardápio</button>}
                                </div>
                            </li>
                            {
                            next >= 1 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>  
                                    <h5>Cardápio</h5> 
                                    {lista && lista.map(dados => {
                                        
                                            return (
                                            <>
                                                {dados.produtos && dados.produtos.map(item => {
                                                    return (
                                                        <div key={item.nome}
                                                        className={`${next == 1 && styles.item_sabor}`}
                                                        onClick={()=> {
                                                            if (next > 1) return 
                                                            setCategoria(item.nome)
                                                            setValor(item.preço)
                                                            setNext(2)
                                                            setRender(render+=1)
                                                            DescePágina()
                                                        }}
                                                        >
                                                            <div>
                                                                <p className={styles.p_title}>{item.nome}</p>
                                                                {item.qtdSabores > 0 &&
                                                                <p className={styles.p_sub_title}>até {item.qtdSabores} sabores</p>}
                                                            </div>
                                                            <div>
                                                                <p className={styles.p_preço}>{FormataValor(item.preço)}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </>    
                                            )
                                    })}    
                                    {render > 3 && next == 1 && 
                                    <button className={`${styles.error} ${styles.btn_continue}`}
                                    onClick={() => {
                                        if (next > 1) return
                                        setNext(3)
                                    }}
                                    >Cancelar</button>}
                                </div>
                            </li>
                            }
                            {next >= 2 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <h5>{categoria}</h5>
                                    {lista && lista.map(dados => {
                                        if (dados.produtos) {
                                            return (
                                            <>
                                                {dados.produtos && dados.produtos.map(item => {
                                                    if (item.nome == categoria) {
                                                        return (
                                                            <>
                                                            <p>Até {item.qtdSabores} sabores</p>
                                                            {item.saborComida.map(sabor => {
                                                                return (
                                                                    <div 
                                                                    key={sabor.sabor}
                                                                    className={`row ${sabor.qtd > 0 && styles.select} ${styles.item_sabor}`}
                                                                    >
                                                                        <div className="col-9">
                                                                            <p>{sabor.sabor}</p>
                                                                            <p className={styles.ingredientes}>{sabor.ingredientes}</p>
                                                                            <div className={styles.cont_buttons}>
                                                                                <FaPlusCircle
                                                                                onClick={()=> {
                                                                                    if (next > 2) return
                                                                                    addListaEscolhidos(dados.id, item.nome, sabor.sabor)
                                                                                }}
                                                                                className={styles.btn_control}
                                                                                type="button"
                                                                                />
                                                                                <FaMinusCircle
                                                                                onClick={()=> {
                                                                                    if (next > 2) return
                                                                                    removeListaEscolhidos(dados.id, item.nome, sabor.sabor)
                                                                                }}
                                                                                className={styles.btn_control}
                                                                                type="button"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div key={render} className={` col-3`}>
                                                                            <p className={styles.input_qtd_sabor}
                                                                            >{!sabor.qtd ? 0 : parseFloat(sabor.qtd)}</p>
                                                                        </div>
                                                                    </div>
                                                                    )
                                                            })}
                                                            {item.qtdSabores == saboresEscolhidos.length && next == 2 &&
                                                            <button
                                                            className={styles.btn_continue}
                                                            onClick={() => {
                                                                if (next != 2 && next != 4) return 
                                                                SalvaEscolha()
                                                                setRender(3)
                                                                setNext(3)
                                                                DescePágina()
                                                            }}
                                                            >Continuar</button>
                                                            } 
                                                            </>
                                                            
                                                        )
    
                                                    }
                                                })
                                                
                                                }
                                            </>    
                                            )
                                        }
                                    })}    
                                {next == 2 && <button className={`${styles.error} ${styles.btn_continue}`}
                                    onClick={() => {
                                        if (next > 2) return
                                        if (render == 2) {
                                            setNext(1) 
                                            setRender(1)
                                            setSaboresEscolhidos([])
                                        }
                                        if (render >= 3) {
                                            setNext(3) 
                                            setRender(3)
                                        }

                                        LimpaQtds()
                                    }}
                                >Cancelar</button>}
                                </div>

                            </li>
                            }

                            {next >= 3 &&
                            <li
                            className={`${styles.box} ${styles.rem}`}
                            >
                                <div className={`${styles.rem} ${styles.li}`}>
                                    <strong className={styles.m_bottom}>Quer continuar pedindo?</strong>
                                    
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#detalhes" aria-expanded="false" aria-controls="collapseOne">
                                                Ver Minhas Compras
                                                </button>
                                            </h2>
                                            <div id="detalhes" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <div key={render}>
                                                        <ul className={styles.list_escolha}>
                                                            {ListaEscolha && ListaEscolha.length > 0 && ListaEscolha.map((item, index)=> {
                                                            return (
                                                                        <li className={styles.item_escolha} key={index}>
                                                                            <div>
                                                                                <strong>
                                                                                    <FaTrashAlt
                                                                                    className={styles.btn_delete_item}
                                                                                    onClick={()=> {
                                                                                        DeletaEscolha(index)
                                                                                    }}
                                                                                    />
                                                                                    {item.categoria} {FormataValor(item.valor)}
                                                                                </strong>
                                                                                <ul className={styles.list_escolha_sabores}>
                                                                                    {item.produtos.map(info => {
                                                                                        return (
                                                                                                <li key={item.sabor}>- {info.sabor}</li>
                                                                                            )
                                                                                    })}
                                                                                </ul>
                                                                            </div>
                                                                        </li>
                                                                        
                                                                
                                                                )
                                                            })}
                                                        </ul>
                                                        <p>Total : <strong>{FormataValor(Total)}</strong></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                    className={`${styles.btn_escolha}`}
                                    onClick={()=> {
                                        if (next > 4) return
                                        setNext(1)
                                    }}
                                    >Pedir mais</button>
                                    <button
                                    className={`${styles.btn_escolha} ${styles.continue}`}
                                    onClick={()=> {
                                        if (next > 4) return
                                        setNext(5)
                                        DescePágina()
                                    }}
                                    >Confirmar Pedido</button>
                                    
                                </div>

                            </li>
                            }
                            {next >= 5 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <p>Qual seu nome?</p>
                                    {next == 5 ? 
                                    <input type="text" onChange={(el)=> setNome(el.target.value)}
                                    className={styles.input}
                                    placeholder="Nome"
                                    />:
                                    <div>
                                        {!editNome ?
                                        <strong>{nome}</strong> :
                                        <input type="text" onChange={(el)=> setNome(el.target.value)}
                                        className={styles.input}
                                        placeholder="Nome"
                                        />
                                        }
                                        {next > 5 && !editNome ? next < 14 && <FaEdit 
                                        type="button"
                                        onClick={()=> setEditNome(true)}
                                        className={styles.icon_edit}
                                        /> :
                                        <FaSave
                                        onClick={()=> setEditNome(false)}
                                        type="button"
                                        className={styles.icon_edit}
                                        />
                                        } 
                                    </div>  
                                }
                                {nome && next <= 5 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 5) return 
                                            setNext(6)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }
                            {next >= 6 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <p>Qual sua cidade?</p>
                                    {next == 6 ? 
                                    <select
                                    onChange={(el) => {
                                        setCidade(el.target.value)
                                    }}
                                    >
                                    <option>--</option>
                                    {usuario.listCidades.map(dados => {
                                        return (
                                            <option>{dados.local}</option>
                                            )
                                    })}
                                    </select>
                                    :
                                    <div>
                                        {!editCidade ?
                                        <strong>{cidade}</strong> :
                                        <select
                                        onChange={(el) => {
                                        setCidade(el.target.value)
                                        }}
                                        >
                                         <option>--</option>
                                         {usuario.listCidades.map(dados => {
                                         return (
                                             <option>{dados.local}</option>
                                            )
                                          })}
                                        </select>
                                        }
                                        {next > 6 && !editCidade ? next < 14 && <FaEdit 
                                        type="button"
                                        onClick={()=> setEditCidade(true)}
                                        className={styles.icon_edit}
                                        /> :
                                        <FaSave
                                        onClick={()=> setEditCidade(false)}
                                        type="button"
                                        className={styles.icon_edit}
                                        />
                                        } 
                                    </div>  

                                    
                                    }
                                    {cidade && cidade != '--' && next <= 6 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 6) return 
                                            setNext(7)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }
                            {next >= 7 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <p>Qual seu Bairro?</p>
                                    {next == 7 ? <select
                                    onChange={(el) => {
                                        setBairro(el.target.value)
                                    }}
                                    >
                                    <option>--</option>
                                    {usuario.listBairros.map(dados => {
                                        return (
                                            <option
                                            >{dados.local} - ({FormataValor(parseFloat(dados.taxa))}) </option>
                                            )
                                    })}
                                    </select>
                                    :
                                    <div>
                                    {!editBairro ?
                                    <strong>{bairro}</strong> :
                                    <select
                                    onChange={(el) => {
                                    setBairro(el.target.value)
                                    }}
                                    >
                                     <option>--</option>
                                     {usuario.listBairros.map(dados => {
                                     return (
                                         <option>{dados.local}</option>
                                        )
                                      })}
                                    </select>
                                    }
                                    {next > 7 && !editBairro ? next < 14 && <FaEdit 
                                    type="button"
                                    onClick={()=> setEditBairro(true)}
                                    className={styles.icon_edit}
                                    /> :
                                    <FaSave
                                    onClick={()=> setEditBairro(false)}
                                    type="button"
                                    className={styles.icon_edit}
                                    />
                                    } 
                                </div>  
                                    }
                                    {bairro && bairro != '--' && next <= 7 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 7) return 
                                            setNext(8)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }
                            {next >= 8 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <p>Qual o nome da Rua?</p>
                                    {next == 8 ? 
                                    <input type="text"
                                    onChange={(el)=> setRua(el.target.value)}
                                    className={styles.input}
                                    />
                                    :
                                    <div>
                                    {!editRua ?
                                    <strong>{rua}</strong> :
                                    <input type="text"
                                    onChange={(el)=> setRua(el.target.value)}
                                    className={styles.input}
                                    />
                                    }
                                    {next > 8 && !editRua ? next < 14 && <FaEdit 
                                    type="button"
                                    onClick={()=> setEditRua(true)}
                                    className={styles.icon_edit}
                                    /> :
                                    <FaSave
                                    onClick={()=> setEditRua(false)}
                                    type="button"
                                    className={styles.icon_edit}
                                    />
                                    } 
                                </div>  
                                    }
                                    {rua && next <= 8 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 8) return 
                                            setNext(9)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }


                            {next >= 9 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <p>Casa ou Apartamento ?</p>
                                    {next == 9 ?
                                    <select
                                    onChange={(el) => {
                                        setMoradia(el.target.value)
                                    }}
                                    >
                                    <option>--</option>
                                    <option>Casa</option>
                                    <option>Apartamento</option>
                                    </select>
                                    :
                                    <div>
                                    {!editMoradia ?
                                    <strong>{moradia}</strong> :
                                    <select
                                    onChange={(el) => {
                                    setMoradia(el.target.value)
                                    }}
                                    >
                                     <option>--</option>
                                     <option>Casa</option>
                                     <option>Apartamento</option>
                                    </select>
                                    }
                                    {next > 9 && !editMoradia ? next < 14 && <FaEdit 
                                    type="button"
                                    onClick={()=> setEditMoradia(true)}
                                    className={styles.icon_edit}
                                    /> :
                                    <FaSave
                                    onClick={()=> setEditMoradia(false)}
                                    type="button"
                                    className={styles.icon_edit}
                                    />
                                    } 
                                </div>  
                                    }

                                    {moradia && moradia != '--' && next <= 9 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 9) return 
                                            setNext(10)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }


                            {next >= 10 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}> 

                                    {next == 10 ?
                                        <>
                                            {moradia == "Casa" &&
                                            <div>
                                                <p>Qual o numero da Casa?</p>
                                                <input type="text" onChange={(el)=> setNumero(el.target.value)}/>
                                            </div>
                                            }
                                            {moradia == "Apartamento" &&
                                            <div>
                                                <p>Qual o bloco? Qual o Andar? (separe por '/') </p>
                                                <input type="text" onChange={(el)=> setNumero(el.target.value)}
                                                placeholder="ex: A / 8"
                                                />
                                            </div>
                                            }
                                        </>:
                                        <div>
                                            <p>End.</p>
                                        {!editNumero ?
                                          <strong>{numero}</strong> :
                                        <input type="text" onChange={(el)=> setNumero(el.target.value)}
                                        className={styles.input}
                                        placeholder="Numero"
                                        />
                                        }
                                        {next > 10 && !editNumero ? next < 14 && <FaEdit 
                                        type="button"
                                        onClick={()=> setEditNumero(true)}
                                        className={styles.icon_edit}
                                        /> :
                                        <FaSave
                                        onClick={()=> setEditNumero(false)}
                                        type="button"
                                        className={styles.icon_edit}
                                        />
                                        } 
                                        </div>  
                                      }
                                    {numero && next <= 10 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 10) return 
                                            setNext(11)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }

                                </div>
                            </li>
                            }

                            {next >= 11 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}> 
                                    <p>Ponto de Referência</p>
                                    {next == 11 ? 
                                    <textarea
                                    className={styles.text_area}
                                    onChange={(el)=> setReferencia(el.target.value)}
                                    />:
                                    <div>
                                        {!editReferencia ?
                                          <strong>{referencia}</strong> :
                                          <textarea
                                          className={styles.text_area}
                                          onChange={(el)=> setReferencia(el.target.value)}
                                          />
                                        }
                                        {next > 11 && !editReferencia ? next < 14 &&<FaEdit 
                                        type="button"
                                        onClick={()=> setEditReferencia(true)}
                                        className={styles.icon_edit}
                                        /> :
                                        <FaSave
                                        onClick={()=> setEditReferencia(false)}
                                        type="button"
                                        className={styles.icon_edit}
                                        />
                                        } 
                                    </div>  
                                    }

                                    {referencia && next <= 11 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 11) return 
                                            setNext(12)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }


                            {next >= 12 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}> 
                                    <p>Telefone</p>
                                    {next == 12 ? 
                                    <input
                                    type="number"
                                    className={styles.input}
                                    onChange={(el)=> setTelefone(el.target.value)}
                                    />:
                                    <div>
                                        {!editTelefone ?
                                          <strong>{telefone}</strong> :
                                          <input
                                          type="number"
                                          className={styles.input}
                                          onChange={(el)=> setTelefone(el.target.value)}
                                          />
                                        }
                                        {next > 12 && !editTelefone ? next < 14 &&<FaEdit 
                                        type="button"
                                        onClick={()=> setEditTelefone(true)}
                                        className={styles.icon_edit}
                                        /> :
                                        <FaSave
                                        onClick={()=> setEditTelefone(false)}
                                        type="button"
                                        className={styles.icon_edit}
                                        />
                                        } 
                                    </div>  
                                    }

                                    {telefone && next <= 12 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 12) return 
                                            setNext(13)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }




                            {next >= 13 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}> 
                                    <p>Que Legal que chegamos até aqui!</p>
                                    <p>Revise seus dados e podemos finalizar.</p>
                                    {next <= 13 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 13) return 
                                            setNext(14)
                                            DescePágina()
                                        }}
                                        >Confirmar</button>
                                    }
                                </div>
                            </li>
                            }

                            {next >= 14 &&
                            <li
                            className={`${styles.box} ${styles.rem}`}
                            >
                                <div className={styles.li}>
                                    <p>Tudo Certo por aqui!</p>
                                </div>
                            </li>
                            }
                            {next >= 14 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>
                                    <p>Qual a forma de pagamento?</p>
                                    {next == 14 ? 
                                    <select
                                    onChange={(el)=> setPagamento(el.target.value)}
                                    >
                                        <option>--</option>
                                        <option>Cartão</option>
                                        <option>Pix</option>
                                        <option>Ávista</option>

                                    </select>
                                        :
                                        <div>
                                        {!editPagamento ?
                                        <strong>{pagamento}</strong> :
                                        <select
                                        onChange={(el) => {
                                        setPagamento(el.target.value)
                                        }}
                                        >
                                         <option>--</option>
                                         <option>Cartão</option>
                                         <option>Pix</option>
                                         <option>Àvista</option>
                                        </select>
                                        }
                                        {next > 14 && !editPagamento ? next < 14 && <FaEdit 
                                        type="button"
                                        onClick={()=> setEditPagamento(true)}
                                        className={styles.icon_edit}
                                        /> :
                                        <FaSave
                                        onClick={()=> setEditPagamento(false)}
                                        type="button"
                                        className={styles.icon_edit}
                                        />
                                        } 
                                    </div>  
                                    }
                                    {pagamento && pagamento != "--" && next <= 14 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 14) return 
                                            setNext(15)
                                            AddPedidoStorage()
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }

                            {next >= 15 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>
                                    <p>Total do Pedido: <strong>{FormataValor(Total)}</strong></p>
                                </div>
                            </li>
                            }
                            {next >= 15 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>
                                    <p>Aguarde, seu Pedido será confirmado.</p>
                                    <p>Acompanhe por aqui apenas pelo aparelho em que foi realizado o pedido.</p>
                                </div>
                            </li>
                            }

                        </ul>
                    </div>
                </div>: 
                !pedido ? setPedido(!pedido)
                : 
                <BoxPedido usuario={usuario && usuario}/>
                }


                

                

                <div className={styles1.digitation}>
                    <FaRegLaughBeam className={styles1.icon}/>
                    <FaPlus className={styles1.icon}/>
                    <input type="text"
                    placeholder="Clique nas opções acima"
                    disabled
                    />
                    <FaRegPaperPlane className={styles1.icon}
                    />
                </div>
                <ToastContainer/>
            </>
        )
}