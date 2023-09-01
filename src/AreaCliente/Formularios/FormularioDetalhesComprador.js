import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "./FormularioDetalhesComprador.module.css"
import '@firebase/firestore';
import { getFirestore, collection, getDocs, updateDoc, doc, setDoc} from "@firebase/firestore";
import App from "../../Hooks/App";
import moment from "moment";


export default function FormularioDetalhesComprador () {
    const {site} = useParams()
    const {theme} = useOutletContext()
    const [nome, setNome] = useState()
    const [rua, setRua] = useState()
    const [cidade, setCidade] = useState()
    const [bairro, setBairro] = useState()
    const [numero, setNumero] = useState()
    const [pagamento, setPagamento] = useState()
    const [telefone, setTelefone] = useState()
    const db = getFirestore(App)
   
    const [vendas, setVendas] = useState([])
    const [Users, setUsers] = useState([])
    const usuario = Users && Users.filter(item => item.site.toLowerCase().replaceAll(' ', '') == site)
    const UserCollection = collection(db, "MeiComSite")
    const VendasCollection = collection(db, `MeiComSite/${usuario.length > 0 && usuario[0].email}/vendas`)

    useEffect(()=> {
        const getUsers = async () => {
            const data = await getDocs(UserCollection);
            setUsers((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
            const dataVendas = await getDocs(VendasCollection);
            setVendas((dataVendas.docs.map((doc) => ({...doc.data(), id: doc.id}))))
        };
        getUsers()
    }, [])

    

    function pegaItems() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        
        if (listGeral.length == 0) {
            return 0
        } else {
            let listPrecos = []
            
            listGeral.map(item => {listPrecos.push(item.qtd)})
            var soma = listPrecos.reduce((soma, i) => {return soma + i})
            return soma
        }
        
    }
    
    function pegaPreco() {
        let listGeral = []
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            listGeral = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        if (listGeral.length === 0) {
            return 0
        } else {
            let listPrecos = []
            let list = []
            listGeral.map(item => {return listPrecos.push({qtd: item.qtd, preço: item.preço})})
            listPrecos.map(item => {return list.push(item.qtd * item.preço)})
            var soma = list.reduce((soma, i) => {return soma + i})

            return soma
        }
    }
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    function pegaDados() {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }

        return produtosSalvos
    }


    var total = pegaPreco()
    var qtd = pegaItems()
    const dados = pegaDados()

   function createWhatsAppLink(phoneNumber, message) {
        return `https://api.whatsapp.com/send?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}`;
    }

    const message = usuario[0] && usuario[0].mod == "Restaurante" ?
     `Olá! Me chamo ${nome} estou comprando no ${site},
    endereço- Cidade:${cidade} Bairro: ${bairro} Rua:${rua}, Nº ${numero} 
    ,segue minhas compras:
    ${dados && dados.map(dados => {
        if (dados.saboresEscolhidos.length > 0) {
            return (`${dados.nome} x${dados.qtd} ${FormataValor(dados.preço)}.
        Sabores: ${dados.saboresEscolhidos.map(item=> {return item.sabor})}
        Total do pedido: ${FormataValor(total)}
        `)
        }
        }
            )
        }`: 
        
        
        usuario[0] && usuario[0].mod == "Loja Virtual" && 
        `Olá! Me chamo ${nome} estou comprando no ${site},
        endereço- Cidade:${cidade} Bairro: ${bairro} Rua:${rua}, Nº ${numero} 
        ,segue minhas compras: ${dados.map(dados => {
            return (`${dados.nome} x${dados.qtd} ${FormataValor(dados.preço)}  /  `)
        })}
        Total do pedido: ${FormataValor(total)}
        `; 
    

    const href = createWhatsAppLink('71981298548', message)


    var listIDs = []
    
    vendas && vendas.map(item => listIDs.push(parseInt(item.id)))
    
    var max = listIDs.reduce(function(a, b) {
        return Math.max(a, b);
    }, 0);
    
    var id = max + 1
    

    const salvavenda = async() => {
        if (usuario[0]) {
            if (usuario[0].mod == "Restaurante") {
                await setDoc(doc(db, `MeiComSite/${usuario[0].email}/vendas`, `${id}`), {
                    nome,
                    telefone,
                    cidade,
                    bairro,
                    rua,
                    numero,
                    pagamento,
                    status: "Aguardando confirmação",
                    data: moment().format('DD/MM/YYYY'),
                    hora: moment().format('HH:MM'),
                    pedido: dados && dados,
                    total: total && parseFloat(total)
                });
            }
            if (usuario[0].mod == "Loja Virtual") {
                await setDoc(doc(db, `MeiComSite/${usuario[0].email}/vendas`, `${id}`), {
                    nome,
                    telefone,
                    cidade,
                    bairro,
                    rua,
                    numero,
                    pagamento,
                    status: "Aguardando confirmação",
                    data: moment().format('DD/MM/YYYY'),
                    hora: moment().format('HH:MM'),
                    pedido: dados && dados,
                    total: total && parseFloat(total)
                });
            }
        } 
    }
    



    return (
            <>
                <h4>Já estamos finalizando...</h4>
                <form className={styles[theme && theme]}>
                    <h5>Nome *</h5>
                    <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                    <h5>Telefone *</h5>
                    <input type="text" onChange={(el)=> setTelefone(el.target.value)}/>
                    <h5>Cidade *</h5>
                    <select
                    onChange={(el)=> setCidade(el.target.value)}
                    >
                        <option>--</option>
                        {usuario.length > 0 && usuario[0].listCidades.map(dados => {
                            return (
                                <option value={dados.local}> {dados.local}</option>
                                )
                        })}
                    </select>
                    <h5>Bairro *</h5>
                    <select
                    onChange={(el)=> setBairro(el.target.value)}
                    >
                        <option>--</option>
                        {usuario.length > 0 && usuario[0].listBairros.map(dados => {
                            return (
                                <option value={dados.local}> {dados.local}</option>
                                )
                        })}
                    </select>
                    <h5>Rua *</h5>
                    <input type="text" onChange={(el)=> setRua(el.target.value)}/>
                    <h5>Numero *</h5>
                    <input type="number" onChange={(el)=> setNumero(el.target.value)}/>
                    <h5>Pagamento *</h5>
                    <select onChange={(el) => setPagamento(el.target.value)}
                    >
                        <option>--</option>
                        <option value="Cartão de crédito">Cartão de crédito</option>
                        <option value="Cartão de débito">Cartão de débito</option>
                        <option value="Dinheiro">Dinheiro</option>
                    </select>
                    <div className={styles.cont_total}>
                        <h4>Total: {FormataValor(total)}</h4>
                    </div>
                    <div className={styles.line}/>
                    {telefone && nome && cidade && rua && bairro && numero && pagamento ?
                        <a href={href} target="_blank"  className={styles.btn_finalizar}
                        onClick={salvavenda}
                        >Finalizar pelo Wpp</a>
                        :
                        <button className={styles.btn_disabled} type="button" disabled>Complete as informações</button>
                    }
                </form>
            </>
        )
}