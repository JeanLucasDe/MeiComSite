import styles from './BoxConfirm.module.css'
import App from "../Hooks/App"
import '@firebase/firestore';
import { doc, updateDoc,  deleteDoc, getFirestore, collection, getDocs,setDoc} from "@firebase/firestore";
import { useState,useEffect } from "react"
import {auth} from "../Service/firebase"
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';

export default function BoxConfirm (props) {

    const obj = props.obj && props.obj
    const db = getFirestore(App)
    const [user, setUser] = useState();
    const [produtos, setProdutos] = useState([])
    const UserCollection = collection(db, "MeiComSite")
    const {site} = useParams()
    
    useEffect (()=>{
        try{
            auth.onAuthStateChanged(user => {
                if (user) {
                    const {uid, displayName, photoURL, email} = user
                    if (!displayName || !photoURL) {
                        throw new Error('Usuário sem Nome ou foto')
                    }
                    setUser({
                        id: uid,
                        avatar: photoURL,
                        name: displayName,
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
            iduser:user && user.id,
            status:"Em análise",
            nome:obj.nome,
            theme: 'Wpp',
            telefone: obj.phone,
            razao:obj.razao,
            abre: moment(obj.abre).format('HH:mm').toString(),
            fecha: moment(obj.fecha).format('HH:mm').toString(),
            site: obj.site,
            nascimento: obj.nascimento,
            listCidades: props.listCidades,
            listBairros: props.listBairros,
            logo:obj.logo,
            admin: true,
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
            logo: !obj.logo ? prod[0].logo : obj.logo
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

    const apagaStorageProduto = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsiteteste`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsiteteste`))
        }
        
        
        let index = produtosSalvos.findIndex(prop => prop.categoria == obj.categoriaa)

        let listProdutos = produtosSalvos[index]

        let indexProd = listProdutos.produtos.findIndex(dados => dados.nome == props.obj.dados.nome)

        listProdutos.produtos.splice(indexProd, 1)

        localStorage.setItem(`meicomsiteteste`,JSON.stringify(produtosSalvos))
        window.location.reload()


    }




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
                >Confirmo</button>


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
                    if (props.mod) {
                        DeletarProduto()
                    } else {
                        apagaStorageProduto()
                    }
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
        
        
        </>
        )
}