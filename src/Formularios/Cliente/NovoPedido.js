import { useState } from "react"
import App from "../../Hooks/App"
import styles from "./NovoPedido.module.css"
import { useOutletContext, useParams } from "react-router-dom"
import '@firebase/firestore';
import { doc, getFirestore, setDoc} from "@firebase/firestore";
import {FaPlusCircle, FaMinusCircle} from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify";



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
    const id = geraId()

    const [produto, setproduto] = useState([])
    const [listaEscolha, setListaEscolha] = useState([])
    const [sabor, setSabor] = useState('')
    var [seed, setSeed] = useState(0)
    const [entrega, setEntrega] = useState(0)
    const [nome, setNome] = useState()
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
    

    const AddProduto = () => {
        let produto = listaProdutos.length > 0 && listaProdutos.filter(dados => dados.nome == escolhaProduto)
        setproduto(produto[0])
        setListaEscolha([{nome:produto[0].nome, preço: produto[0].preço}])
    }
    const AddSabor = (sabor, qtd) => {
        let index = listaEscolha && listaEscolha.findIndex(dados => dados.nome == produto.nome)
        
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
        let index = listaEscolha && listaEscolha.findIndex(dados => dados.nome == produto.nome)
        let indexSabor = index && listaEscolha[index].produtos.filter(dados => dados.sabor == sabor)

        if (!listaEscolha[index].produtos) return

        console.log(indexSabor)

    }



    return (
        <>
        <div className={styles.container}>
            <h4>Novo Pedido</h4>
            <button
            className={`${entrega == 1 && styles.select} ${styles.btn_entrega}`}
            onClick={()=> setEntrega(1)}
            >Viagem</button>
            <button
            className={`${entrega == 2 && styles.select} ${styles.btn_entrega}`}
            onClick={()=> setEntrega(2)}
            >Local</button>
            <div className={styles.content}>
                <div className="row">
                    <div className="col-md-6">
                        <strong>Nome</strong>
                        <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                        <div>
                            {entrega == 1 &&
                            <div>
                            
                            <strong>Telefone</strong>
                            <input type="text" onChange={(el)=> setTelefone(el.target.value)}/>
                            <strong>Cidade</strong>
                            <select
                            onChange={(el)=> setCidade(el.target.value)}
                            >
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
                            >
                                {usuario && usuario.length > 0 && usuario.map(dados => {
                                return(
                                    dados.listBairros.map(item=>{
                                        return (
                                                <option>{item.local}</option>
                                            )
                                    })
                            
                                    )
                                })}
                            </select>
                            <strong>Rua</strong>
                            <input type="text" onChange={(el)=> setRua(el.target.value)}/>
                            <strong>Casa / Apartamento:</strong>
                            <select
                            onChange={(el)=> setMoradia(el.target.value)}
                            >
                                <option>Casa</option>
                                <option>Apartamento</option>
                            </select>
                            <strong>Número</strong>
                            <input type="text" onChange={(el)=> setNumero(el.target.value)}/>
                            <strong>Ponto de Ref.</strong>
                            <textarea onChange={(el)=> setReferencia(el.target.value)}/>
                            <strong>Pagamento</strong>
                            <select
                            onChange={(el)=> setPagamento(el.target.value)}
                            >
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
                                <strong>Mesa</strong>
                                <input type="text" onChange={(el)=> setMesa(el.target.value)}/>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            
                            {produto.length > 0 && sabor && <button className={styles.show_compras}>Ver Compras</button>}
                            
                            <div className={styles.box_produto}>
                                <strong>Produto</strong>
                                <input type="text" list="produtos" onChange={(el)=> SetEscolhaProduto(el.target.value)}/>
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
                                {escolhaProduto && produto.length == 0 && FiltroBuscaItem.length > 0 && <button
                                className={`${styles.btn_add}`}
                                onClick={AddProduto}
                                >Adicionar</button>}
                            </div>



                            {produto && produto.saborComida &&
                            <div className={styles.box_produto}>
                                <strong>Sabor</strong>
                                {produto && 
                                <p>Até {produto.qtdSabores}</p>}
                                <input type="text" onChange={(el)=> setSabor(el.target.value)}/>
                                <ul className={styles.list} key={seed}>
                                    {FiltroBuscaSabor && FiltroBuscaSabor.map(dados => {
                                        return (
                                            <li
                                            key={dados.sabor}
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
                                                                dados.qtd += 1
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
                                
                                {sabor && FiltroBuscaItem.length > 0 && <button
                                className={`${styles.btn_add}`}
                                onClick={AddProduto}
                                >Adicionar</button>}
                            </div>}
                        </div>
                    </div>
                </div>
                <button
                className={styles.btn_confirm}
                >Confirmar</button>
            </div>
        </div>  
        <ToastContainer/>
        </>
        )
}