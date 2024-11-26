import styles from "./Categorias.module.css"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import {FaEdit,  FaPlusCircle, FaTrashAlt} from "react-icons/fa"
import { getFirestore, setDoc, doc, updateDoc} from "@firebase/firestore";
import BoxConfirm from "../../components/BoxConfirm"
import { Link, useOutletContext } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";



export default function Informations () {

    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    const db = getFirestore(App)
    const [ação, setAção] = useState([])
    const [mostrar, setMostrar] = useState()
    const [destaque, setDestaque] = useState()
    const [text, setText] = useState()
    const [imagem, setImagem] = useState()
    const [categoria, setCategoria] = useState()
    const [produto, setProduto] = useState()
    const [id, setId] = useState()


    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 10000);
        return numeroAleatorio
    }
    const idCat = geraId()
    const addCategoria = async () => {
        if (categoria) {
            await setDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/produtos`, `${idCat}`), {
                categoria: categoria.trim(),
                produtos: [],
                adicionais: [],
                id:idCat
            });
            window.location.reload()
        } else {
            toast.error('Esse campo não pode ficar vazio.')
        }
        
    }
    const editCategoria = async () => {
        await updateDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/produtos`, `${produto && produto.id}`), {
            categoria: categoria ? categoria : produto.categoria
        });
        await updateDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/produtos`, `${produto && produto.id}`), {
            destaque: destaque 
        });
        await updateDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/produtos`, `${produto && produto.id}`), {
            mostrar: mostrar 
        });
        await updateDoc(doc(db, `MeiComSite/${usuario && usuario[0].email}/produtos`, `${produto && produto.id}`), {
            text: text ?  text  : produto.text
        });
        window.location.reload()
    }
    const obj ={
        ação
    }
    const editCategoriateste = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsiteteste`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsiteteste`))
        }
        
        
        let index = produtosSalvos.findIndex(prop => prop.categoria == produto.categoria)

        let obj = produtosSalvos[index]

        obj['categoria'] =  categoria ? categoria : produto.categoria
        obj['img'] =  imagem ? imagem : produto.img
        obj['destaque'] =  destaque  
        obj['mostrar'] =  mostrar
        obj['text'] =  text ? text : produto.text

        localStorage.setItem(`meicomsiteteste`,JSON.stringify(produtosSalvos))
        window.location.reload()
    }

    
    return (
            <>
            {usuario && 
            <div>
                {usuario.length > 0 && usuario[0].admin ?  
                <>
                    {usuario &&
                    <>
                        {usuario && usuario[0].admin ?
                        <div className={styles.cont_btn}>
                            <button className={styles.btn}
                            type="button" 
                            data-bs-toggle="modal" 
                            data-bs-target={`#ModalAdd`}
                            ><FaPlusCircle/> Nova Categoria</button>
                        </div>:
                        <div className={styles.cont_btn}>
                            <button className={styles.btn}
                            onClick={() => {
                                toast.error('Você ainda não tem permissão no modo real')
                            }}
                            ><FaPlusCircle/> Nova Categoria</button>
                        </div>
                        
                        }
                    </>
                    }

                    <div>
                        <h4 className={styles.title}>Categorias</h4>
                    </div>
                    <div className="line"/>
                    <ul className={styles.list_produtos}>
                        {produtos.length > 0 ? produtos.map(dados => {
                            //Modo Real
                                return (
                                        
                                        <li className={`row ${styles.li}`} key={dados.id}
                                        >
                                            <div className={`col-12`}>
                                                <div className={styles.cont_item}>
                                                    <div className={styles.item}>
                                                        <h5>{dados.categoria}</h5>
                                                    </div>
                                                    <div className={styles.cont_buttons}>
                                                        <FaEdit className={styles.icon}
                                                        type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#ModalEditarCategoria`}
                                                        onClick={()=> {
                                                            setDestaque(dados.destaque)
                                                            setMostrar(dados.mostrar)    
                                                            setProduto(dados)
                                                        }}
                                                        />
                                                        <FaTrashAlt className={styles.icon}
                                                        type="button"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#ModalConfirmTrash`}
                                                        onClick={()=> {
                                                            setAção("Deletar categoria")
                                                            setProduto(dados)
                                                            setId(dados.id)
                                                        }}
                                                        />
                                                    </div>
                                                    <div className={styles.line}/>
                                                    <Link
                                                    to={`/perfil/user/categorias/${dados.id}`}
                                                    >Ver Produtos</Link>
                                                </div>
                                            </div>
                                        
                                        </li>
                                    )
                            
                        }):
                        <div className={styles.cont_empty}>
                            <h3>Ainda não há nada Aqui.</h3>
                            <p>Comece a adicionar</p>
                        </div>}
                        
                    </ul>
                    

                    <div className="modal fade" id="ModalAdd" tabindex="-1" aria-labelledby="exampleModalLabel">
                        <div className={`modal-dialog modal-sm`}>
                            <div className="modal-content">
                                <div className={styles.cont_new_categorie}>
                                    <h4>Nova Categoria</h4>
                                    {imagem && <img src={imagem} className={styles.img}/>}
                                    <div className="line"/>
                                    <div className={styles.info_categorie}>
                                        <strong>Nome:</strong>
                                        <input type="text"
                                        onChange={(el)=> setCategoria(el.target.value)}
                                        />
                                    </div>

                                    <button
                                    onClick={()=> addCategoria()}
                                    >Adicionar</button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>


                    

                    <div className="modal fade" id="ModalEditarCategoria" tabindex="-1" aria-labelledby="exampleModalLabel">
                        <div className={`modal-dialog modal-sm`}>
                            <div className="modal-content">
                                <div className={styles.cont_new_categorie}>
                                    <h4>Editar Categoria</h4>
                                    {imagem && <img src={imagem} className={styles.img}/>}
                                    <div className="line"/>
                                    <div className={styles.info_categorie}>
                                        <strong>Nome:</strong>
                                        <input type="text"
                                        defaultValue={produto && produto.categoria}
                                        onChange={(el)=> setCategoria(el.target.value)}
                                        />
                                        <div className={styles.cont_check_box}>
                                            <div className={styles.cont_input_checkbox}>
                                                <input type="checkbox"
                                                value={mostrar} 
                                                defaultChecked={produto && produto.mostrar}
                                                checked={mostrar}
                                                onChange={() => setMostrar(!mostrar)}/>
                                            
                                                <strong>Mostrar no início</strong>

                                            </div>
                                        </div>


                                        <div className={styles.cont_check_box}>
                                            <div className={styles.cont_input_checkbox}>
                                                <input type="checkbox"
                                                defaultChecked={produto && produto.destaque} 
                                                checked={destaque}
                                                onChange={() => setDestaque(!destaque)}/>
                                                <strong>Destacar</strong>
                                            </div>
                                        </div>

                                        {produto && produto.destaque &&
                                        <div>
                                            <strong>Texto de destaque</strong>
                                            <textarea
                                            defaultValue={produto.text}
                                            className={styles.input}
                                            onChange={(el)=> setText(el.target.value)}
                                            maxLength={35}
                                            />
                                            <span className={styles.contador}>[{produto && produto.text ? produto.text.length : 0} / 35]</span>
                                        </div>
                                        }
                                    </div>
                                    {mod ?
                                    <button
                                    onClick={()=> editCategoria()}
                                    >Salvar</button>:
                                    <button
                                    onClick={()=> editCategoriateste()}
                                    >Salvar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                



                    <div className="modal fade" id="ModalConfirmTrash" tabindex="-1" aria-labelledby="exampleModalLabel">
                        <div className={`modal-dialog modal-sm`}>
                            <div className="modal-content">
                                <BoxConfirm
                                    type="button"
                                    dismiss="modal"
                                    aria_label="Close"
                                    data_bs_toggle="modal" 
                                    data_bs_target={`#ModalConfirmTrash`}
                                    obj={obj}
                                    dados= {produto && produto}
                                    id={id}
                                    email = {usuario && usuario[0].email}
                                    />
                            </div>
                        </div>
                    </div>

                    <ToastContainer/>
                
                
                </>
                :
                <div className={styles.cont_empty}>
                    <img src="https://img.freepik.com/free-vector/hand-drawn-facepalm-illustration_23-2150199871.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais"/>
                    <h4>Desculpe, você ainda não tem permissão para prosseguir</h4>

                </div>
                }

            </div>
            }
            
            </>
        )
}