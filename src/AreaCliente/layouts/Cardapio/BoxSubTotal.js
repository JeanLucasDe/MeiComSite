import { useOutletContext, useParams } from "react-router-dom"
import styles from "./BoxSubTotal.module.css"
import {FaTrash} from "react-icons/fa"
import { useState } from "react"
import { doc, getFirestore, setDoc} from "@firebase/firestore";
import {App} from "../../../Hooks/App";
import moment from "moment";

export default function BoxSubTotal (props) {

    const [stage, setStage] = useState(true)
    const show = props.show && props.show
    const {site, idproduto} = useParams()
    const [produtoss, usuario, vendas, funcionamento] = useOutletContext()  
    const db = getFirestore(App)

    const [nome, setNome] = useState()
    const [drive, setDrive] = useState(true)
    const [cidade, setCidade] = useState()
    const [rua, setRua] = useState()
    const [bairro, setBairro] = useState()
    const [telefone, setTelefone] = useState()
    const [numero, setNumero] = useState()
    const [referencia, setReferencia] = useState()
    const [pagamento, setPagamento] = useState()
    const [escolheSalvar, setEscolheSalvar] = useState()
    const [obs, setObs] = useState()

    const PegaDados = () => {
        let produtosSalvos = new Array()
            if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
                produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
            }
        return produtosSalvos
    }
    const Dados = PegaDados()
    const PegaTotal = () => {
        var SomaTotal = Dados.reduce((soma, i) => {return soma + i.valor},0)
        return SomaTotal
    }

    const Total = PegaTotal()

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const PegaTaxa = () => {
        var bairroS = bairro && bairro.toString().split('-')
        const index =  usuario && bairroS && usuario[0].listBairros.filter(dados => dados.local == bairroS[0].trim())
        const taxa = index && index[0].taxa
        return parseFloat(taxa)
    }
    const taxa = PegaTaxa()

    function pegaBairro() {
        var bairroS = bairro && bairro.toString().split('-')
        const index =  usuario && bairroS && usuario[0].listBairros.filter(dados => dados.local == bairroS[0].trim())
        let Bairro = index && index[0].local
        return Bairro
    }
    const Bairro = pegaBairro()


    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 100000);
        return numeroAleatorio
    }
    const id = geraId()

    const geraIdEntrega = () => {
        const numeroAleatorio = Math.floor(Math.random() * 10000);
        return numeroAleatorio
    }
    const identrega = geraIdEntrega()

    function pegaDadosUser() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`DadosUserSave.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`DadosUserSave.${site}`))
        }
        return produtosSalvos
    }
    const UserSave = pegaDadosUser()

    function pegaCompraSave() {
        let produtosSalvos = new Array()
        if (localStorage.hasOwnProperty(`pedido.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`pedido.${site}`))
        }
        return produtosSalvos
    }
    const CompraSave = pegaCompraSave()



    const AdicionarUSer = async () => {
        await setDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/vendas`, `${id}`), {
            nome: escolheSalvar ? UserSave[0].nome : nome, 
            data:moment().format('DD/MM/YYYY'),
            hora:moment().format('HH:mm') ,
            telefone: escolheSalvar ? UserSave[0].telefone : telefone, 
            cidade: cidade ? cidade : '', 
            bairro: Bairro ? Bairro : '',
            taxa: escolheSalvar ? parseFloat(UserSave[0].taxa) : parseFloat(taxa),
            rua: rua ? rua : '',
            numero : numero ? numero : '', 
            referencia: referencia ? referencia : '',
            pagamento: pagamento ? pagamento : '', 
            Total: parseFloat(Total), 
            lugar: 1,
            state: 1, 
            iden: id,
            identrega,
            produtos: Dados,
            obs: obs ? obs : ''
            });

        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify([]))
        localStorage.setItem(`pedido.${site}`,JSON.stringify(
            {identrega}
        ))

        if (escolheSalvar) {
            localStorage.setItem(`DadosUserSave.${site}`,JSON.stringify([
                {
                nome: escolheSalvar ? UserSave[0].nome : nome, 
                data:moment().format('DD/MM/YYYY'),
                hora:moment().format('hh:mm') ,
                telefone: escolheSalvar ? UserSave[0].telefone : telefone, 
                cidade:escolheSalvar ? UserSave[0].cidade : cidade , 
                bairro: escolheSalvar ? UserSave[0].bairro : Bairro,
                taxa: escolheSalvar ? parseFloat(UserSave[0].taxa) : parseFloat(taxa),
                rua: escolheSalvar ? UserSave[0].rua : rua,
                numero : escolheSalvar ? UserSave[0].numero : numero, 
                referencia: escolheSalvar ? UserSave[0].referencia : referencia,
                pagamento: escolheSalvar ? UserSave[0].pagamento : pagamento
            }
            ]))

        }

        setTimeout(() => {
            window.location.reload()
        }, 1000);
    };




    return (
            <>
                {stage ?
                    <div className={`${show ? styles.show: styles.none}`}>
                    <div className={styles.cont_itens}>
                        <ul className={styles.list_itens}>
                            {Dados && Dados.map(dados => {
                                return (
                                    <li key={dados.id}
                                    className={styles.item}
                                    >
                                        <FaTrash/>
                                        <div>
                                            <p>{dados.categoria}</p>
                                            <p>{FormataValor(dados.valor)}</p>
                                        </div>
                                    </li>
                                    )
                            })}
                        </ul>

                    </div>

                    <h5>Total da Compra</h5>
                    <p className={styles.preço}>{FormataValor(Total)}</p>
                    <button className={styles.confirm}
                    onClick={()=>setStage(false)}
                    >Continuar</button>
                </div>:
                <div
                className={`${show ? styles.show: styles.none}`}
                >
                    <form
                    className={styles.formulario}
                    >
                        <h5>Conclua seu Pedido</h5>
                        <p>Nome</p>
                        <input type='text' onChange={(el)=> setNome(el.target.value)}/>
                        <p>Telefone</p>
                        <input type='number' onChange={(el)=> setTelefone(el.target.value)}/>
                        <p>Pagamento</p>
                        <select
                        onChange={(el => setPagamento(el.target.value))}
                        >
                            <option value="" data-default disabled selected></option>
                            <option>Cartão</option>
                            <option>Dinheiro</option>
                            <option>Pix</option>
                        </select>

                        <p>Observação</p>
                        <input type='text' onChange={(el)=> setObs(el.target.value)}/>
                        <div 
                        className={styles.contInpCheck}
                        >
                            <input type="checkbox" className={styles.inputCheck}
                            onChange={()=> setDrive(!drive)}
                            />
                            <p>Retirar no estabelecimento</p>
                        </div>
                        {drive &&
                        <div>
                            <p>Cidade</p>
                            <select
                            onChange={(el => setCidade(el.target.value))}
                            >
                                <option value="" data-default disabled selected></option>
                                {usuario && usuario[0].listCidades.map(dados => {
                                    return (
                                        <option
                                        >{dados.local}</option>
                                        )
                                })}
                            </select>

                            <p>Bairro</p>
                            <select
                            onChange={(el => setBairro(el.target.value))}
                            >
                                <option value="" data-default disabled selected></option>
                                {usuario && usuario[0].listBairros.map(dados => {
                                    return (
                                        <option
                                        >{dados.local} - ({FormataValor(parseFloat(dados.taxa))}) </option>
                                        )
                                })}
                            </select>

                            <p>Rua</p>
                            <input type="text" onChange={(el)=> setRua(el.target.value)}/>
                            
                            <p>Número</p>
                            <input type="number" onChange={(el)=> setNumero(el.target.value)}/>

                            <p>Referência</p>
                            <input type="text" onChange={(el)=> setReferencia(el.target.value)}/>

                        </div>
                        }
                        
                    </form>

                    <button className={`${styles.confirm}`}
                    onClick={()=>AdicionarUSer()}
                    >Confirmar</button>
                    <button className={`${styles.back} ${styles.confirm}`}
                    onClick={()=>setStage(true)}
                    >Voltar</button>
                </div>
                }
            </>
        )
}