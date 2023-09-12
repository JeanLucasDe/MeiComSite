import { useState } from "react"
import App from "../../Hooks/App"
import styles from "./NovoPedido.module.css"
import { Form, useOutletContext, useParams } from "react-router-dom"
import '@firebase/firestore';
import { doc, getFirestore, setDoc} from "@firebase/firestore";
import {FaPlusCircle, FaMinusCircle, FaTrash} from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify";
import moment from "moment/moment"



export default function NovoPedido () {
    const db = getFirestore(App)
    const [mod, produtos, usuario, vendas] = useOutletContext()
    const {site} = useParams()


    var listIds = []
    vendas && vendas.map(dados => {
        listIds.push(dados.iden)
    })
    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 1000000000);
        if (!listIds.includes(numeroAleatorio)) return numeroAleatorio
    }
    const idGerado = geraId()

    const [produto, setproduto] = useState([])
    const [id, setId] = useState()
    const [listaEscolha, setListaEscolha] = useState([])
    const [listaPedido, setListaPedido] = useState([])
    const [sabor, setSabor] = useState('')
    var [seed, setSeed] = useState(0)
    const [entrega, setEntrega] = useState(0)
    const [nome, setNome] = useState()
    const [selectProd, setSelectProd] = useState(false)
    const [cidade, setCidade] = useState()
    const [rua, setRua] = useState()
    const [bairro, setBairro] = useState()
    const [moradia, setMoradia] = useState()
    const [telefone, setTelefone] = useState()
    const [numero, setNumero] = useState()
    const [referencia, setReferencia] = useState()
    const [pagamento, setPagamento] = useState()
    const [mesa, setMesa] = useState()
    const [escolhaProduto, SetEscolhaProduto] = useState()

    const [saborAdicional, setsaborAdicional] = useState('')
    
    if (!id) {
        setId(idGerado)
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const listaProdutos = []
    produtos && produtos.map(dados => {
        dados.produtos.map(item => {
            listaProdutos.push(item)
        })
    })
    const FiltroBuscaItem = listaProdutos.length > 0 && listaProdutos.filter(dados => dados.nome == escolhaProduto)

    const FiltroBuscaSabor = produto.saborComida && produto.saborComida.filter(dados => dados.sabor.toLowerCase().includes(sabor.toLowerCase()))

    const FiltroBuscaSaborAdicional = produto.adicionais && produto.adicionais.filter(dados => dados.saborAdicional.toLowerCase().includes(saborAdicional.toLowerCase()))
    

    console.log(FiltroBuscaSaborAdicional)
    const LimpaQtds = () => {
        produtos && produtos.map(dados => {
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


    const AddProduto = () => {
        let produto = listaProdutos.length > 0 && listaProdutos.filter(dados => dados.nome == escolhaProduto)
        setproduto(produto[0])
        setListaEscolha([{categoria:produto[0].nome, valor: produto[0].preço}])
        setSelectProd(!selectProd)
    }

    const AddPedido = () => {
        setListaPedido([...listaPedido, listaEscolha[0]])
        setproduto({})
        setListaEscolha([])
        SetEscolhaProduto('')
        LimpaQtds()
        toast.success('Pedido Adicionado com Sucesso!')
    }
    const ResetaPedido = () => {
        setListaPedido([])
        setproduto({})
        setListaEscolha([])
        SetEscolhaProduto('')
        LimpaQtds()
        toast.error('Pedido Cancelado!')
    }
    


    const AddSabor = (sabor, qtd) => {
        let index = listaEscolha && listaEscolha.findIndex(dados => dados.categoria == produto.nome)
        
        if (!listaEscolha[index].produtos) {
            return listaEscolha[index].produtos = [{sabor, qtd}]
        }
        if (listaEscolha[index].produtos.length < produto.qtdSabores) {
            listaEscolha[index].produtos = [...listaEscolha[index].produtos, {sabor, qtd}]
        } else {
            toast.error('Capacidade Alcançada')
        }
    }
    const DeleteSabor = (sabor, qtd) => {
        const index = listaEscolha && listaEscolha[0].produtos.findIndex(dados => dados.sabor == sabor)
        listaEscolha[0].produtos.splice(index, 1)
    }

    const PegaTaxa = () => {
        var bairroS = bairro && bairro.toString().split('-')
        const index =  usuario && bairroS && usuario[0].listBairros.filter(dados => dados.local == bairroS[0].trim())
        const taxa = index && index[0].taxa
        return parseFloat(taxa)
    }

    
    function pegaPreco() {
        if (listaPedido.length === 0) {
            return 0
        } else {
            let listPrecos = []
            listaPedido.map(item => {return listPrecos.push({valor: item.valor})})
            var soma = listPrecos.reduce((soma, i) => {return soma + i.valor}, 0)
            return taxa ? soma + taxa : soma
        }
    }
    function pegaBairro() {
        var bairroS = bairro && bairro.toString().split('-')
        const index =  usuario && bairroS && usuario[0].listBairros.filter(dados => dados.local == bairroS[0].trim())
        let Bairro = index && index[0].local
        return Bairro
    }

    const Bairro = pegaBairro()
    const taxa = PegaTaxa()
    const Total = pegaPreco()


    const AdicionarVenda = async () => {
        await setDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/vendas`, `${id}`), {
            nome, 
            data:moment().format('DD/MM/YYYY'),
            hora:moment().format('HH:mm') ,
            telefone: telefone ? telefone : '', 
            cidade: cidade? cidade : '', 
            bairro: Bairro ? Bairro : '',
            rua: rua ? rua : '',
            taxa: !taxa ? 0 : parseFloat(taxa),
            moradia: moradia ? moradia : '',
            numero: numero ? numero : '', 
            referencia: referencia ? referencia : '',
            pagamento: pagamento? pagamento : '', 
            state: 1, 
            mesa: mesa ? parseFloat(mesa) : '',
            iden: id,
            lugar: entrega,
            Total,
            produtos: listaPedido,
            });
            toast.success('Venda Registrada com sucesso!')
            
            vendas.push({
                nome, 
                data:moment().format('DD/MM/YYYY'),
                hora:moment().format('HH:mm') ,
                telefone: telefone ? telefone : '', 
                cidade: cidade ? cidade : '', 
                bairro: Bairro ? Bairro : '',
                rua: rua ? rua : '',
                taxa: !taxa ? 0 : parseFloat(taxa),
                moradia: moradia ? moradia : '',
                numero: numero ? numero : '', 
                referencia: referencia ? referencia : '',
                pagamento: pagamento? pagamento : '', 
                state: 1, 
                mesa: mesa ? parseFloat(mesa) : '',
                iden: id,
                lugar: entrega,
                Total,
                produtos: listaPedido,
            })
            window.location.reload()
    };

    const removeCompra = (categoria) => {
        const index = listaPedido && listaPedido.findIndex(dados => dados.categoria == categoria)
        listaPedido.splice(index, 1)
        setSeed(seed += 1)
    }




    return (
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                <h4>Novo Pedido #{id}</h4>
                <button
                className={styles.close}
                data-bs-toggle="modal"
                data-bs-target={`#ModalNovoPedido`}
                >Fechar</button>
            </div>
            <div className={styles.content}>
                <div className="row">
                    <div className="col-md-4">
                        <div>
                            {entrega >= 0 &&
                                <div className={entrega == 0 && styles.cont_btn_local}>
                                <button
                                className={`${entrega == 1 && styles.select} ${styles.btn_entrega}`}
                                onClick={()=> setEntrega(1)}
                                >Viagem</button>
                                <button
                                className={`${entrega == 2 && styles.select} ${styles.btn_entrega}`}
                                onClick={()=> setEntrega(2)}
                                >Local</button>
                            </div>
                            }
                        </div>
                        <div>
                            {entrega == 1 &&
                            <div>
                            <strong>Nome</strong>
                            <input type="text" onChange={(el)=> setNome(el.target.value)}
                            className={styles.input}
                            placeholder="Digite aqui"
                            />
                            <strong>Telefone</strong>
                            <input type="text" onChange={(el)=> setTelefone(el.target.value)}
                            className={styles.input}
                            placeholder="Digite aqui"
                            />
                            <strong>Cidade</strong>
                            <select
                            onChange={(el)=> setCidade(el.target.value)}
                            className={styles.input}
                            >
                                <option>--</option>
                                {usuario && usuario.length > 0 && usuario.map(dados => {
                                return(
                                    dados.listCidades.map(item=>{
                                        return (
                                                <option>{item.local}</option>
                                            )
                                    })
                            
                                    )
                                })}
                            </select>
                            <strong>Bairro</strong>
                            <select
                            onChange={(el)=> setBairro(el.target.value)}
                            className={styles.input}
                            >
                                <option>--</option>
                                {usuario && usuario.length > 0 && usuario.map(dados => {
                                return(
                                    dados.listBairros.map(item=>{
                                        return (
                                                <option>{item.local}-({FormataValor(item.taxa)})</option>
                                            )
                                    })
                            
                                    )
                                })}
                            </select>
                            <strong>Rua</strong>
                            <input type="text" onChange={(el)=> setRua(el.target.value)}
                            className={styles.input}
                            placeholder="Digite aqui"
                            />
                            <strong>Casa / Apartamento:</strong>
                            <select
                            onChange={(el)=> setMoradia(el.target.value)}
                            className={styles.input}
                            >
                                <option>--</option>
                                <option>Casa</option>
                                <option>Apartamento</option>
                            </select>
                            <strong>Número</strong>
                            <input type="text" onChange={(el)=> setNumero(el.target.value)}
                            className={styles.input}
                            placeholder="Digite aqui"
                            />
                            <strong>Ponto de Ref.</strong>
                            <textarea onChange={(el)=> setReferencia(el.target.value)}
                            className={styles.input}
                            placeholder="Digite aqui"
                            />
                            <strong>Pagamento</strong>
                            <select
                            onChange={(el)=> setPagamento(el.target.value)}
                            className={styles.input}
                            >
                                <option>--</option>
                                <option>Cartão</option>
                                <option>Pix</option>
                                <option>Avista</option>
                            </select>
                            </div>
                            }
                        </div>
                        <div>
                            {entrega == 2 &&
                            <div>
                                <strong>Nome</strong>
                                <input type="text" onChange={(el)=> setNome(el.target.value)}
                                className={styles.input}
                                placeholder="Digite aqui"
                                />
                                <strong>Mesa</strong>
                                <input type="text" onChange={(el)=> setMesa(el.target.value)}
                                className={styles.input}
                                placeholder="Digite aqui"
                                />
                                <strong>Pagamento</strong>
                                <select
                                onChange={(el)=> setPagamento(el.target.value)}
                                className={styles.input}
                                >
                                    <option>--</option>
                                    <option>Cartão</option>
                                    <option>Pix</option>
                                    <option>Avista</option>
                                </select>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-8">
                        {listaPedido.length > 0 &&
                        <div key={seed}>
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                    <button className={`${styles.show_compras} accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Ver Compras
                                    </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className={`${styles.cont_pedido} accordion-body`}>
                                        <ul className={styles.list_pedido}>
                                            {listaPedido && listaPedido.map(dados => {
                                            return (
                                                <li>
                                                    
                                                    <strong><FaTrash
                                                    type="button"
                                                    onClick={()=> removeCompra(dados.categoria)}
                                                    /> {dados.categoria} - {FormataValor(dados.valor)}</strong>
                                                    <div>
                                                        <ul className={styles.list_pedido}>
                                                            {dados.produtos.map(item => {
                                                                return (
                                                                    <li> - {item.sabor}</li>
                                                                    )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </li>
                                                )  
                                            })}
                                        </ul>
                                        <div>
                                            <h5 className={styles.total}>Total- {FormataValor(Total)}</h5>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                        }
                        <div>
                            
                            {produto.length > 0 && sabor && <button className={styles.show_compras}>Ver Compras</button>}
                            
                            <div className={styles.box_produto}>
                                <strong>Produto</strong>
                                <input type="text" list="produtos" onChange={(el)=> SetEscolhaProduto(el.target.value)}
                                className={styles.input}
                                placeholder="Pesquise aqui..."
                                value={escolhaProduto}
                                />
                                <datalist id="produtos"
                                className={styles.input}
                                onChange={(el)=> SetEscolhaProduto(el.target.value)}
                                >
                                    {listaProdutos.length > 0 && listaProdutos.map(dados => {
                                        return (
                                        <option
                                        value={dados.nome}
                                        key={dados.nome}
                                        >{dados.nome}</option>
                                        )
                                        })}
                                </datalist>
                                {!selectProd && escolhaProduto && FiltroBuscaItem.length > 0 && <button
                                className={`${styles.btn_add}`}
                                onClick={AddProduto}
                                >Adicionar</button>}
                            </div>



                            {produto && produto.saborComida &&
                            <div className={styles.box_produto}>
                                <strong>Sabor</strong>
                                {produto && 
                                <p>Até {produto.qtdSabores}</p>}
                                <input type="text" onChange={(el)=> setSabor(el.target.value)}
                                className={styles.input}
                                placeholder="Pesquise aqui..."
                                />
                                <ul className={styles.list} key={seed}>
                                    {FiltroBuscaSabor && FiltroBuscaSabor.map(dados => {
                                        return (
                                            <li
                                            key={dados.sabor}
                                            className={dados.qtd && dados.qtd > 0 && styles.select_item}
                                            >
                                                <div>
                                                    <span>{dados.sabor}</span>
                                                    <div>
                                                        <FaPlusCircle className={styles.icon}
                                                            onClick={() => {
                                                                if (!dados.qtd) {
                                                                    dados.qtd = 0
                                                                }
                                                                setSeed(seed+=1)
                                                                if (listaEscolha.length > 0 && listaEscolha[0].produtos && listaEscolha[0].produtos.length == produto.qtdSabores) {
                                                                    return toast.error('Capacidade Alcançada')
                                                                } 
                                                                dados.qtd  += 1
                                                                AddSabor(dados.sabor, dados.qtd)
                                                            }}
                                                            type="button"
                                                        />
                                                        <FaMinusCircle className={styles.icon}
                                                            onClick={() => {
                                                                if (dados.qtd == 0) return
                                                                dados.qtd -= 1
                                                                setSeed(seed+=1)
                                                                DeleteSabor(dados.sabor, dados.qtd)
                                                            }}
                                                            type="button"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    {!dados.qtd ? 0 : dados.qtd}
                                                </div>
                                            </li>
                                            )
                                    })}
                                </ul>
                                {listaEscolha[0].produtos && listaEscolha[0].produtos.length == produto.qtdSabores && 
                                <div>
                                    <button
                                    className={`${styles.btn_add}`}
                                    onClick={AddPedido}
                                    >Confirmar</button>
                                    <button
                                    className={`${styles.btn_cancel}`}
                                    onClick={ResetaPedido}
                                    >Cancelar</button>
                                </div>}

                            </div>}
                            {produto && produto.saborComida &&
                            <div className={styles.box_produto}>
                                <strong>Adicionais</strong>
                                <input type="text" onChange={(el)=> setSabor(el.target.value)}
                                className={styles.input}
                                placeholder="Pesquise aqui..."
                                />
                                <ul className={styles.list} key={seed}>
                                    {FiltroBuscaSaborAdicional && FiltroBuscaSaborAdicional.map(dados => {
                                        return (
                                            <li
                                            key={dados.saborAdicional}
                                            className={dados.qtd && dados.qtd > 0 && styles.select_item}
                                            >
                                                <div>
                                                    <span>{dados.saborAdicional}</span>
                                                    <div>
                                                        <FaPlusCircle className={styles.icon}
                                                            onClick={() => {
                                                                if (!dados.qtd) {
                                                                    dados.qtd = 0
                                                                }
                                                                setSeed(seed+=1)
                                                                if (listaEscolha.length > 0 && listaEscolha[0].produtos && listaEscolha[0].produtos.length == produto.qtdSabores) {
                                                                    return toast.error('Capacidade Alcançada')
                                                                } 
                                                                dados.qtd  += 1
                                                                AddSabor(dados.sabor, dados.qtd)
                                                            }}
                                                            type="button"
                                                        />
                                                        <FaMinusCircle className={styles.icon}
                                                            onClick={() => {
                                                                if (dados.qtd == 0) return
                                                                dados.qtd -= 1
                                                                setSeed(seed+=1)
                                                                DeleteSabor(dados.sabor, dados.qtd)
                                                            }}
                                                            type="button"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    {!dados.qtd ? 0 : dados.qtd}
                                                </div>
                                            </li>
                                            )
                                    })}
                                </ul>
                                {listaEscolha[0].produtos && listaEscolha[0].produtos.length == produto.qtdSabores && 
                                <div>
                                    <button
                                    className={`${styles.btn_add}`}
                                    onClick={AddPedido}
                                    >Confirmar</button>
                                    <button
                                    className={`${styles.btn_cancel}`}
                                    onClick={ResetaPedido}
                                    >Cancelar</button>
                                </div>}

                            </div>}













                        </div>
                    </div>
                </div>
                {entrega == 2 && nome && mesa &&
                listaPedido.length > 0 &&

                    <button
                    className={styles.btn_confirm}
                    onClick={() => AdicionarVenda()}
                    >Confirmar</button>
                }
                {entrega == 1 && nome && telefone && cidade && cidade != "--" &&
                bairro && bairro != "--" && rua && moradia && moradia != "--" && numero && referencia &&
                pagamento && pagamento != "--" &&
                listaPedido.length > 0 &&

                    <button
                    className={styles.btn_confirm}
                    onClick={() => AdicionarVenda()}
                    >Confirmar</button>
                }
            </div>
        </div>  
        <ToastContainer/>
        </>
        )
}