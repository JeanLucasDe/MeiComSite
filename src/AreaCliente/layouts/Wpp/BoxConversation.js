import { useEffect, useState } from "react"
import styles from "./BoxConversation.module.css"
import { toast, ToastContainer } from "react-toastify"
import { FaEdit, FaMinusCircle, FaPlus, FaPlusCircle, FaRegLaughBeam, FaRegPaperPlane, FaSave, FaTrashAlt } from "react-icons/fa"
import styles1 from "./Conversation.module.css"
import { useOutletContext, useParams } from "react-router-dom"
import App from "../../../Hooks/App"
import '@firebase/firestore';
import { doc, getFirestore, setDoc} from "@firebase/firestore";
import moment from "moment/moment"
import BoxPedido from "./BoxPedido"

export default function BoxConversation (props) {
    
    const lista = props.produtos && props.produtos
    const usuario = props.usuario && props.usuario

    const db = getFirestore(App)
    const [produtoss, usuarios, vendas] = useOutletContext()

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
    const [escolheSalvar, setEscolheSalvar] = useState()
    const [save, setSave] = useState()
    const [obs, setObs] = useState()
    

    const [next, setNext] = useState(0)
    const [categoria, setCategoria] = useState()
    var [saboresEscolhidos, setSaboresEscolhidos] = useState([])
    var [saboresEscolhidosAdicional, setsaboresEscolhidosAdicional] = useState([])
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
    
    const removeListaEscolhidos = (id, nome, sabor,mod, preço) => {

        if (mod == 'sabor') {
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
        if (mod == 'saborAdicional') {
            const indexFirst = lista && lista.filter(dados => dados.id == id)
            const indexSecond = indexFirst && indexFirst[0].produtos.filter(dados => dados.nome == nome)
            const indexThree = indexSecond && indexSecond[0].adicionais.filter (dados => dados.saborAdicional == sabor)
            const index = saboresEscolhidosAdicional.findIndex(dados => dados.sabor == sabor) 

            if (indexThree[0].qtd == 0 || !indexThree[0].qtd) return

            if (saboresEscolhidosAdicional[index].qtd == 1) {
                saboresEscolhidosAdicional.splice(index, 1)
            } else {
                saboresEscolhidosAdicional[index].qtd -= 1 
            }
            indexThree[0].qtd -= 1
            setSeed(seed += 1)  
        }




    }
    const addListaEscolhidos = (id, nome, sabor, mod, preço) => {
        if (mod == 'sabor') {
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
        }
        if (mod == 'saborAdicional') {
            const indexFirst = lista && lista.filter(dados => dados.id == id)
            const indexSecond = indexFirst && indexFirst[0].produtos.filter(dados => dados.nome == nome)
            const indexThree = indexSecond && indexSecond[0].adicionais.filter(dados => dados.saborAdicional == sabor)
            const index = saboresEscolhidosAdicional.findIndex(dados => dados.sabor == sabor)

            if (index < 0) {
                setsaboresEscolhidosAdicional([...saboresEscolhidosAdicional, {sabor, preço, qtd:1}])
                indexThree[0].qtd = 1
            } else {
                saboresEscolhidosAdicional[index].qtd += 1
                indexThree[0].qtd += 1
            }
            
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
                    item.adicionais.map(sabor => {
                        if (sabor.qtd) {
                            sabor.qtd = 0
                        }
                    })
                })
            }
        })
    }
    function pegaDadosUser() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`DadosUserSave.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`DadosUserSave.${site}`))
        }
        return produtosSalvos
       
    }
    function pegaDadosCompra() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}.compra`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}.compra`))
        }
        return produtosSalvos
    }

    const UserSave = pegaDadosUser()
    const Compra = pegaDadosCompra()

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
    function pegaBairro() {
        var bairroS = bairro && bairro.toString().split('-')
        const index =  usuario && bairroS && usuario.listBairros.filter(dados => dados.local == bairroS[0].trim())
        let Bairro = index && index[0].local
        return Bairro
    }

    const Bairro = pegaBairro()
    const taxa = PegaTaxa()



    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (!listGeral.length) return false
        
        let listPreços = []
        let listPreçosAdicionais = []
        listGeral.map(item => {
            listPreços.push({preço: item.valor})
            if (item.adicionais) {
                item.adicionais.map(sabor => {
                    listPreçosAdicionais.push({preço: sabor.preço, qtd: sabor.qtd})
                })
            }
        })
        var soma = listPreços.reduce((soma, i) => {return soma + i.preço}, 0)
        return soma 
        
    }


    const PegaPreçoProduto = () => {
        let listPreçosAdicionais = []
        saboresEscolhidosAdicional.map(item => {
            listPreçosAdicionais.push({preço: item.preço, qtd:item.qtd})
        })
        var somaAdicional = listPreçosAdicionais.reduce((soma, i) => {return soma + i.qtd * i.preço}, valor)
        return somaAdicional 
         
    }
    var sub_Total = PegaPreçoProduto()
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
        await setDoc(doc(db, `MeiComSite/${usuario && usuario.email}/vendas`, `${id}`), {
            nome: escolheSalvar ? UserSave[0].nome : nome, 
            data:moment().format('DD/MM/YYYY'),
            hora:moment().format('hh:mm') ,
            telefone: escolheSalvar ? UserSave[0].telefone : telefone, 
            cidade: escolheSalvar ? UserSave[0].cidade : cidade , 
            bairro: escolheSalvar ? UserSave[0].bairro : Bairro,
            taxa: escolheSalvar ? parseFloat(UserSave[0].taxa) : parseFloat(taxa),
            rua: escolheSalvar ? UserSave[0].rua : rua,
            moradia: escolheSalvar ? UserSave[0].moradia : moradia,
            numero : escolheSalvar ? UserSave[0].numero : numero, 
            referencia: escolheSalvar ? UserSave[0].referencia : referencia,
            pagamento: escolheSalvar ? UserSave[0].pagamento : pagamento, 
            Total: parseFloat(Total), 
            lugar: 1,
            state: 1, 
            iden: id,
            produtos: ListaEscolha,
            obs: obs ? obs : false
            });
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify([]))

        localStorage.setItem(`DadosUserSave.${site}`,JSON.stringify([
            {
            nome: escolheSalvar ? UserSave[0].nome : nome, 
            data:moment().format('DD/MM/YYYY'),
            hora:moment().format('hh:mm') ,
            telefone: escolheSalvar ? UserSave[0].telefone : telefone, 
            cidade: escolheSalvar ? UserSave[0].cidade : cidade , 
            bairro: escolheSalvar ? UserSave[0].bairro : Bairro,
            taxa: escolheSalvar ? parseFloat(UserSave[0].taxa) : parseFloat(taxa),
            rua: escolheSalvar ? UserSave[0].rua : rua,
            moradia: escolheSalvar ? UserSave[0].moradia : moradia,
            numero : escolheSalvar ? UserSave[0].numero : numero, 
            referencia: escolheSalvar ? UserSave[0].referencia : referencia,
            pagamento: escolheSalvar ? UserSave[0].pagamento : pagamento, 
        }
        ]))
        

        setTimeout(() => {
            window.location.reload()
        }, 3000);
    };
    
    const VerificaState = () => {
        var VendaEfetuada = Compra.length > 0 && vendas && vendas.filter(dados => dados.iden == Compra[0].id)
        if (VendaEfetuada.length > 0) {
            if (VendaEfetuada[0].state == 4) {
                VendaEfetuada = []
            }
        } else VendaEfetuada = []
        return VendaEfetuada
    }

    const VendaEfetuada = VerificaState()

    const SalvaEscolha = () => {
        LimpaQtds()
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (!saboresEscolhidos.length) return 

        
        produtosSalvos.push({valor: sub_Total, categoria, produtos: saboresEscolhidos, adicionais: saboresEscolhidosAdicional})
        
        
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        toast.success('Produto adicionado ao carrinho')
        setSaboresEscolhidos([])
        setsaboresEscolhidosAdicional([])
    }




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
                {usuario && usuario.admin && !VendaEfetuada.length > 0 ? !pedido && 
                <div className={styles.container}>
                    <div>
                    <div className={`${styles.header} dropdown`}>
                        <button className={`${styles.btn_tog} btn btn-secondary dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" className={styles.user_logo}  xmlns="http://www.w3.org/2000/svg"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                            </svg>
                            <div className={styles.cont_button}>
                                <h5 className={styles.razao}>{usuario && usuario.razao}</h5>
                                <span className={styles.razao}>Ver endereço da loja</span>
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
                    </div>


                    <div className={`conten ${styles.content}`} id="cont">
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
                                    <p>Clique para continuar</p>
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
                                    <h5>{categoria} - {FormataValor(valor)}</h5>
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
                                                                            <p className={styles.p_title}>{sabor.sabor}</p>
                                                                            <p className={styles.ingredientes}>{sabor.ingredientes}</p>
                                                                            <div className={styles.cont_buttons}>
                                                                                <FaPlusCircle
                                                                                onClick={()=> {
                                                                                    if (next > 2) return
                                                                                    addListaEscolhidos(dados.id, item.nome, sabor.sabor,'sabor')
                                                                                }}
                                                                                className={styles.btn_control}
                                                                                type="button"
                                                                                />
                                                                                <FaMinusCircle
                                                                                onClick={()=> {
                                                                                    if (next > 2) return
                                                                                    removeListaEscolhidos(dados.id, item.nome, sabor.sabor,'sabor')
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
                                                            {saboresEscolhidos.length > 0 &&
                                                            <div>
                                                                <h5 className={styles.title_adicionais}>Adicionais</h5>
                                                                {item.adicionais && item.adicionais.map(sabor => {
                                                                    return (
                                                                        <>
                                                                        <div className={`row ${sabor.qtd > 0 && styles.select} ${styles.item_sabor}`}>
                                                                            <div className="col-9">
                                                                                <p className={styles.p_title}>{sabor.saborAdicional}</p>
                                                                                <p className={styles.ingredientes}>{sabor.IngredientesAdicional}</p>
                                                                                <p className={styles.p_preço}>{FormataValor(sabor.PreçoAdicional)}</p>
                                                                                <div className={styles.cont_buttons}>
                                                                                    <FaPlusCircle
                                                                                    onClick={()=> {
                                                                                        if (next > 2) return
                                                                                        addListaEscolhidos(dados.id, item.nome, sabor.saborAdicional,'saborAdicional', sabor.PreçoAdicional)
                                                                                    }}
                                                                                    className={styles.btn_control}
                                                                                    type="button"
                                                                                    />
                                                                                    <FaMinusCircle
                                                                                    onClick={()=> {
                                                                                        if (next > 2) return
                                                                                        removeListaEscolhidos(dados.id, item.nome, sabor.saborAdicional, 'saborAdicional', sabor.PreçoAdicional)
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
                                                                        </>
                                                                        )
                                                                })}
                                                            </div>
                                                            }
                                                           {<h5 className={styles.sub_Total}>Total: {FormataValor(sub_Total)}</h5>}

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
                                <div className={`${styles.li}`}>
                                    <strong className={styles.m_bottom}>Quer continuar pedindo?</strong>
                                    
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#detalhes" aria-expanded="false" aria-controls="collapseOne">
                                                Ver Meu Pedido
                                                </button>
                                            </h2>
                                            <div id="detalhes" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <div key={render} className={styles.item}>
                                                        <ul className={styles.list_escolha}>
                                                            {ListaEscolha && ListaEscolha.length > 0 && ListaEscolha.map((item, index)=> {
                                                            return (
                                                                        <li className={styles.item_escolha} key={index}>
                                                                            <div>
                                                                                <div className={styles.header_item}>
                                                                                    <FaTrashAlt
                                                                                    className={styles.btn_delete_item}
                                                                                    onClick={()=> {
                                                                                        DeletaEscolha(index)
                                                                                    }}
                                                                                    />
                                                                                    {item.categoria} - {FormataValor(item.valor)}
                                                                                </div>
                                                                                <p className={styles.p_sabor}>
                                                                                    <span>Sabor: </span>
                                                                                    {item.produtos.map(sabor => {
                                                                                        return (
                                                                                            <strong>{sabor.sabor},</strong>
                                                                                            )
                                                                                    })}
                                                                                </p>
                                                                                {item.adicionais.length > 0 && <p className={styles.p_sabor}>
                                                                                    <span>Adicionais: </span>
                                                                                    {item.adicionais.map(sabor => {
                                                                                        return (
                                                                                            <strong>{sabor.sabor},</strong>
                                                                                            )
                                                                                    })}
                                                                                </p>}
                                                                            </div>
                                                                        </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={styles.p_total}>Total : <strong>{FormataValor(!Total ? sub_Total : Total)}</strong></p>
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
                                        if (UserSave && UserSave.length > 0) {
                                            setNext(5)
                                        } else {
                                            setNext(6)
                                        }
                                        DescePágina()
                                    }}
                                    >Confirmar Pedido</button>
                                    
                                </div>
                            </li>
                            }
                            {next >= 5 && UserSave.length > 0 ? 
                            <li className={`${styles.box} ${styles.dis_table}`}>
                                <p>Quer Utilizar seu cadastro Anterior, {UserSave && UserSave[0].nome}?</p>
                                {escolheSalvar && <strong>Sim!</strong>}
                                {next == 5 &&
                                
                                <div>
                                    <button
                                    className={`${styles.btn_escolha} ${styles.grenn_light}`}
                                    onClick={()=> {
                                        if (next > 5) return
                                        setNext(6)
                                    }}
                                    >Não, obrigado. </button>
                                    <div className={`${styles.btn_user_compra}  accordion`} id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className={`accordion-button`} type="button" data-bs-toggle="collapse" data-bs-target="#detalhes1" aria-expanded="false" aria-controls="collapseOne">
                                                Clique para ver!
                                                </button>
                                            </h2>
                                            <div id="detalhes1" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <div>
                                                        <p>Nome: <strong>{UserSave && UserSave[0].nome}</strong></p>
                                                        <p>Telefone: <strong>{UserSave && UserSave[0].telefone}</strong></p>
                                                        <p>Cidade: <strong>{UserSave && UserSave[0].cidade}</strong></p>
                                                        <p>Bairro: <strong>{UserSave && UserSave[0].bairro}</strong></p>
                                                        <p>Rua: <strong>{UserSave && UserSave[0].rua}</strong></p>
                                                        <p>Número: <strong>{UserSave && UserSave[0].numero}</strong></p>
                                                        <p>P.Ref.: <strong>{UserSave && UserSave[0].referencia}</strong></p>
                                                        <p>Pagamento: <strong>{UserSave && UserSave[0].pagamento}</strong></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className={`${styles.btn_escolha} ${styles.continue}`}
                                        onClick={()=> {
                                            if (next > 5) return
                                            setNext(5)
                                            DescePágina()
                                            setNext(16)
                                            setEscolheSalvar(true)
                                        }}
                                        >Usar Cadastro Anterior</button>
                                </div>
                                }
                            </li>
                            :next >= 5 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <strong>Continuando...</strong>
                            </li>
                            }
                            
                            {!escolheSalvar &&
                            <div>
                            

                            {next >= 6 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>               
                                    <p>Qual seu nome?</p>
                                    {next == 6 ? 
                                    <input type="text" onChange={(el)=> setNome(el.target.value)}
                                    className={styles.input}
                                    placeholder="Nome"
                                    id="1"
                                    />:
                                    <div>
                                        {!editNome ?
                                        <strong>{nome}</strong> :
                                        <input type="text" onChange={(el)=> setNome(el.target.value)}
                                        className={styles.input}
                                        placeholder="Nome"
                                        />
                                        }
                                        {next > 6 && !editNome ? next < 14 && <FaEdit 
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
                                {nome && next <= 6 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}>               
                                    <p>Qual sua cidade?</p>
                                    {next == 7 ? 
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
                                        {next > 7 && !editCidade ? next < 14 && <FaEdit 
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
                                    {cidade && cidade != '--' && next <= 7 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}>               
                                    <p>Qual seu Bairro?</p>
                                    {next == 8 ? <select
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
                                    {next > 8 && !editBairro ? next < 14 && <FaEdit 
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
                                    {bairro && bairro != '--' && next <= 8 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}>               
                                    <p>Qual o nome da Rua?</p>
                                    {next == 9 ? 
                                    <input type="text"
                                    onChange={(el)=> setRua(el.target.value)}
                                    className={styles.input}
                                    id="2"
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
                                    {next > 9 && !editRua ? next < 14 && <FaEdit 
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
                                    {rua && next <= 9 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}>               
                                    <p>Casa ou Apartamento ?</p>
                                    {next == 10 ?
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
                                    {next > 10 && !editMoradia ? next < 14 && <FaEdit 
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

                                    {moradia && moradia != '--' && next <= 10 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}> 

                                    {next == 11 ?
                                        <>
                                            {moradia == "Casa" &&
                                            <div>
                                                <p>Qual o numero da Casa?</p>
                                                <input type="text" onChange={(el)=> setNumero(el.target.value)}
                                                id="3"
                                                />
                                            </div>
                                            }
                                            {moradia == "Apartamento" &&
                                            <div>
                                                <p>Qual o bloco? Qual o Andar? (separe por '/') </p>
                                                <input type="text" onChange={(el)=> setNumero(el.target.value)}
                                                id="3"
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
                                        id="3"
                                        />
                                        }
                                        {next > 11 && !editNumero ? next < 14 && <FaEdit 
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
                                    {numero && next <= 11 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}> 
                                    <p>Ponto de Referência</p>
                                    {next == 12 ? 
                                    <textarea
                                    className={styles.text_area}
                                    onChange={(el)=> setReferencia(el.target.value)}
                                    id="4"
                                    />:
                                    <div>
                                        {!editReferencia ?
                                          <strong>{referencia}</strong> :
                                          <textarea
                                          className={styles.text_area}
                                          onChange={(el)=> setReferencia(el.target.value)}
                                          id="4"
                                          />
                                        }
                                        {next > 12 && !editReferencia ? next < 14 &&<FaEdit 
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

                                    {referencia && next <= 12 &&
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
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}> 
                                    <p>Telefone</p>
                                    {next == 13 ? 
                                    <input
                                    type="number"
                                    className={styles.input}
                                    onChange={(el)=> setTelefone(el.target.value)}
                                    id="5"
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
                                        {next > 13 && !editTelefone ? next < 16 &&<FaEdit 
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

                                    {telefone && next <= 13 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 13) return 
                                            setNext(14)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }




                            {next >= 14 &&
                            <li
                            className={`${styles.box} `}
                            >
                                <div className={styles.li}> 
                                    <p>Que Legal que chegamos até aqui!</p>
                                    <p>Revise seus dados e podemos finalizar.</p>
                                    {next <= 14 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 14) return 
                                            setNext(15)
                                            DescePágina()
                                        }}
                                        >Confirmar</button>
                                    }
                                </div>
                            </li>
                            }

                            {next >= 15 &&
                            <li
                            className={`${styles.box} ${styles.rem}`}
                            >
                                <div className={styles.li}>
                                    <p>Tudo Certo por aqui!</p>
                                </div>
                            </li>
                            }
                            {next >= 15 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>
                                    <p>Qual a forma de pagamento?</p>
                                    {next == 15 ? 
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
                                        {next > 15 && !editPagamento ? next < 14 && <FaEdit 
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
                                    {pagamento && pagamento != "--" && next == 15 &&
                                        <button
                                        className={styles.btn_continue}
                                        onClick={() => {
                                            if (next > 15) return 
                                            setNext(16)
                                            DescePágina()
                                        }}
                                        >Continuar</button>
                                    }
                                </div>
                            </li>
                            }
                            </div>
                            }

                            {next >= 16 &&
                            <li
                            className={`${styles.box}`}
                            >
                                <div className={styles.li}>
                                    <p className={styles.total}>Total do Pedido: <strong>{FormataValor(Total)}</strong></p>
                                    
                                    
                                    <strong className={styles.m_bottom}>Alguma Observação?</strong>
                                    <textarea type="text"
                                    onChange={(el)=> setObs(el.target.value)}
                                    className={styles.input}
                                    placeholder="Digite Aqui"
                                    />

                                    {next == 16 && 
                                    <button
                                    className={styles.btn_cancel}
                                    onClick={() => {
                                        if (next > 16) return 
                                        setNext(1)
                                        ResetaEscolha()
                                    }}
                                    >Cancelar</button>}
                                    {next == 16 && 
                                    <button
                                    className={styles.btn_continue}
                                    onClick={() => {
                                        if (next > 16) return 
                                        setNext(17)
                                        AddPedidoStorage()
                                        DescePágina()
                                    }}
                                    >Confirmar</button>}
                                </div>
                            </li>
                            }

                            {next >= 17 &&
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