import styles from './BoxConfirm.module.css'
import App from "../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function BoxConfirm (props) {

    const obj = props.obj && props.obj
    const servicos = props.servicos && props.servicos
    const db = getFirestore(App)
    const [user, setUser] = useState();
    const [nome, setNome] = useState();
    const [hora, setHora] = useState('');
    const [valor, setValor] = useState();
    const [produtos, setProdutos] = useState([])
    const [selecionado, setSelecionado] = useState("");
    const UserCollection = collection(db, "MeiComSite")
    const {site} = useParams()
    
    useEffect (()=>{
        try{
            auth.onAuthStateChanged(user => {
                if (user) {
                    const {uid, displayName, photoURL, email} = user
                    setUser({
                        id: uid,
                        avatar: photoURL ? photoURL : '',
                        name: displayName ? displayName : '',
                        email
                    })
                }
            })
            const getUsers = async () => {
                const data = await getDocs(UserCollection);
                setProdutos((data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                    };
                getUsers()
        } catch (e) {
            <button> tentar novamente </button>
        }
    },[])
    
    const AdicionarUSer = async () => {
        await setDoc(doc(db, `MeiComSite`, `${user.email}`), {
            data: moment().format('DD/MM/YYYY'),
            email: user && user.email,
            mod:obj.mod,
            agenda:[],
            servicos:[],
            iduser:user && user.id,
            idloja: obj && obj.idLoja,
            status:"Em análise",
            nome:obj.nome,
            theme: obj.theme,
            telefone: obj.phone,
            razao:obj.razao,
            abre: obj.abre,
            fecha: obj.fecha,
            site: obj.site,
            nascimento: obj.nascimento,
            listCidades: props.listCidades,
            listBairros: props.listBairros,
            cidade: obj.cidade,
            bairro: obj.bairro,
            numero: obj.numero,
            rua: obj.rua,
            cep: obj.cep,
            admin: false,
            cor:obj.cor,
            pause:true
            });

        window.location.reload()
    };



    const EditaUser = async () => {
        const prod = []

        produtos && produtos.map(item=> {
            if (user && user.id == item.iduser) {
                prod.push(item)
            }
        })    
        await updateDoc(doc(db, "MeiComSite", user.email), {
            nome: !obj.nome ? prod[0].nome : obj.nome
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            razao: !obj.razao ? prod[0].razao : obj.razao
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            telefone: !obj.phone ? prod[0].telefone : obj.phone
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            site: !obj.site ? prod[0].site : obj.site
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            mod: !obj.mod ? prod[0].mod : obj.mod
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            cidade: !obj.cidade ? prod[0].cidade : obj.cidade
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            bairro: !obj.bairro ? prod[0].bairro : obj.bairro
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            rua: !obj.rua ? prod[0].rua : obj.rua
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            cep: !obj.cep ? prod[0].cep : obj.cep
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            numero: !obj.numero ? prod[0].numero : obj.numero
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            abre: !obj.abre ? prod[0].abre : obj.abre
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            fecha: !obj.fecha ? prod[0].fecha : obj.fecha
        });
        await updateDoc(doc(db, "MeiComSite", user.email), {
            cor: !obj.cor ? prod[0].cor : obj.cor
        });
        window.location.reload()
    }

    const EditaNegocio = async () => {
        const prod = []

        produtos && produtos.map(item=> {
            if (user && user.id == item.iduser) {
                prod.push(item)
            }
        }) 
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            mod: !obj.mod ? prod[0].mod : obj.mod
        });
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            theme: !obj.theme ? prod[0].theme : obj.theme
        });
        window.location.reload()
    }   


    const DeletarProduto = async () => {
        let index = obj.lista && obj.dados && obj.lista.findIndex(prop=> prop.nome == obj.dados.nome)
        obj.lista && obj.lista.splice(index, 1)

        await updateDoc(doc(db, `MeiComSite/${user && user.email}/produtos`, obj.id), {
            produtos: obj.lista && obj.lista
        });
        window.location.reload()
    
    }
    const DeletarCategoria = async() => {
        const ref = doc(db, `MeiComSite/${user && user.email}/produtos`, props.dados.id)
        await deleteDoc(ref)
        window.location.reload()
    }


    const deletacompra = (nome) => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        
        let index = produtosSalvos.findIndex(prop => prop.nome == nome)
        
        produtosSalvos.splice(index, 1) 
        
        localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
        window.location.reload()
    }

    const deletarBairro = async () => {
        const index = obj.listBairros.findIndex(prop => prop.local == obj.deletebairro)
        obj.listBairros.splice(index, 1)
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            listBairros: obj.listBairros
        });
         window.location.reload()
    }
    const deletarCidade = async () => {
        const index = obj.listCidades.findIndex(prop => prop.cidade == obj.deleteCidade)
        obj.listCidades.splice(index, 1)
        await updateDoc(doc(db, `MeiComSite`, user.email), {
            listCidades: obj.listCidades
        });
        window.location.reload()
    }
    
    const apagaStorage = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsiteteste`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsiteteste`))
        }
        
        
        let index = props.dados && produtosSalvos.findIndex(prop => prop.categoria == props.dados.categoria)
        
        produtosSalvos.splice(index, 1) 
        
        localStorage.setItem(`meicomsiteteste`,JSON.stringify(produtosSalvos))
        window.location.reload()
        
    }

    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    
    function horaMaiorQueUmaHora() {
        const p = hora && hora.split(':')
        if (parseInt(p[0])>0) {
            return parseInt(p[0])
        }
    }
    
    const horaV = horaMaiorQueUmaHora()
    
    const AddServico = async() => {
        await setDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, `${obj.id}`), {
            nome:obj.nome,
            valor:obj.valor,
            hora:obj.hora,
            precofixo:obj.precoFixo,
            agenda: []
        })
        window.location.reload()
        
    }

    
    const EditServico = async() => {
        try {
            if (!hora) {
                await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                    hora: !hora ? obj.hora: hora
                });
                await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                    nome: !nome ? obj.nome : nome
                });
                await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                    valor: !valor ? obj.valor : valor
                });
                await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                    precofixo: !selecionado ? obj.precofixo: selecionado
                });
                window.location.reload()
            } else {
                if (horaV) {
                    await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                        hora: !hora ? obj.hora: hora
                    });
                    await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                        nome: !nome ? obj.nome : nome
                    });
                    await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                        valor: !valor ? obj.valor : valor
                    });
                    await updateDoc(doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid), {
                        precofixo: !selecionado ? obj.precofixo: selecionado
                    });
                    window.location.reload()
                } else {
                    toast.error('No mínimo 1 hora.')
                }
            }
        } catch(e) {
            console.log(e)
        }

    }
    const DeleteServico = async() => {
        const ref = doc(db, `MeiComSite/${user && user.email}/servicos`, obj.uid)
        await deleteDoc(ref)
        toast.success('Deletado com sucesso!')
        window.location.reload()
    }
    const handleChange = (event) => {
        setSelecionado(event.target.value); // Atualiza o estado com o valor do botão de rádio selecionado
      };

    return (
        <>
        {obj.ação == "Iniciar Cadastro" &&
            <div className={styles.container}>
                    <h4>Confirma seus dados?</h4>
                    <div className='line'></div>
                    <div className={styles.cont_btn}>
            
                        <button className={styles.confirm}
                        onClick={AdicionarUSer}
                        type={props.type}
                        data-bs-toggle={props.data_bs_toggle}
                        data-bs-target={props.data_bs_target}
                        >Confirmar</button>
                        <button className={styles.cancel}
                        type={props.type}
                        data-bs-toggle={props.data_bs_toggle}
                        data-bs-target={props.data_bs_target}
                        >Cancelar</button>
                    </div>
            </div>
        }
         {obj.ação == "Editar" &&
        <div className={styles.container}>
            <h4>Confirmar alterações?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                onClick={EditaUser}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }

        {obj.ação == "Editar negocio" &&
        <div className={styles.container}>
            <h4>Confirmar alterações? Neg</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={EditaNegocio}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        
        {obj.ação == "Deletar categoria" &&
        <div className={styles.container}>
            <h4>Deletar Categoria?</h4>
            <p>- {props.dados.categoria}</p>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={DeletarCategoria}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar categoria teste" &&
        <div className={styles.container}>
            <h4>Deletar Categoria?</h4>
            <p>- {props.dados.categoria}</p>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={apagaStorage}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar Compra" &&
        <div className={styles.container}>
            <h4>Deletar produto?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> deletacompra(props.obj.id)}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar Bairro" &&
        <div className={styles.container}>
            <h4>Deletar Bairro?</h4>
            <strong>{obj.deletebairro}</strong>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> deletarBairro()}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar Cidade" &&
        <div className={styles.container}>
            <h4>Deletar Cidade?</h4>
            <strong>{obj.deleteCidade}</strong>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> deletarCidade()}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "Deletar Produto" &&
        <div className={styles.container}>
            <h4>Deletar Produto?</h4>
            <strong>{obj.dados.nome}</strong>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> {
                    DeletarProduto()
                }}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }

        {obj.ação == "AddServico" &&
        <div className={styles.container}>
            <h4>Adicionar Novo Serviço?</h4>
            <div className='line'></div>
            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                onClick={()=> {
                    AddServico()
                }}
                >Confirmar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        {obj.ação == "EditarServico" &&
        <div className={styles.container}>
            <h4>Editar Serviço?</h4>
            <button
            className={styles.btn_delete}
            onClick={()=> DeleteServico()}
            >Deletar</button>
            <div className='line'></div>
            <div>
                <input type='text'
                placeholder={obj.nome}
                className={styles.input}
                onChange={(el)=> setNome(el.target.value)}
                />
                <input
                    type="radio"
                    id="opcao1"
                    name="opcoes"
                    value="1"
                    checked={selecionado === "1"}
                    onChange={handleChange}
                    />
                    <span className={styles.m_left}>Preço Fixo</span>
                </div>
                <div>
                    <input
                    type="radio"
                    id="opcao2"
                    name="opcoes"
                    value="2"
                    checked={selecionado === "2"}
                    onChange={handleChange}
                    />
                    <span className={styles.m_left}>Apartir</span>
                </div>
                <input type='number'
                placeholder={FormataValor(parseInt(obj.valor))}
                className={styles.input}
                onChange={(el)=> setValor(el.target.value)}
                />
                <div>
                <input type='number'
                placeholder={obj.hora}
                className={styles.input}
                onChange={(el)=> setHora(el.target.value)}
                />
            </div>



            <div className={styles.cont_btn}>

                
                <button className={styles.confirm}
                onClick={()=> {
                    if(hora || valor || nome || selecionado) {
                        EditServico()
                    } else {
                        toast.error('Nenhuma alteração')
                    }
                }}
                >Salvar</button>


                <button className={styles.cancel}
                type={props.type} 
                data-bs-toggle={props.data_bs_toggle} 
                data-bs-target={props.data_bs_target}
                >Cancelar</button>
            </div>
        </div>
        }
        
        <ToastContainer/>
        </>
        )
}