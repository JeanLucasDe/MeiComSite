import { useEffect, useState } from "react";
import styles from "./FormAdd.module.css"
import '@firebase/firestore';
import {  getFirestore, doc,  setDoc, updateDoc} from "@firebase/firestore";
import App from "../../Hooks/App"
import Visualizar from "./Visualizar";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useOutletContext, useParams } from "react-router-dom";
import moment from "moment/moment";


export default function FormAdd (props) {

    const [modo] = useOutletContext()
    const {categoriaa} = useParams()

    const [nome, setNome]= useState()
    const [qtdSabores, setQtdSabores] = useState()
    const [dados, setDados] = useState([])
    const [desc, setDesc] = useState()
    const [qtdpessoas, setQtdPessoas] = useState()
    const [sabor, setSabor] = useState()
    const [ingredientes, setIngredientes] = useState()
    const [preço, setPreço] = useState()
    const [estoque, setEstoque] = useState()
    const [small_desc, setSmallDesc] = useState()
    const [espera, setEspera] = useState()

    const [img1, setImg1] = useState()
    const [driveimg1, setDriveImg1] = useState(false)

    const [driveimg2, setDriveImg2] = useState(true)
    const [driveimg3, setDriveImg3] = useState(true)
    const [driveimg4, setDriveImg4] = useState(true)

    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()

    
    const [cor, setCor] = useState()
    const [p, setP] = useState()
    const [m, setM] = useState()
    const [g, setG] = useState()
    const [material, setMaterial] = useState()
    const [saborComida,setSaborComida] = useState([])


    const db = getFirestore(App)

    function reiniciar() {
        localStorage.setItem(`sabores`,JSON.stringify([]))
    }

    useEffect(()=> {
        reiniciar()
    },[])


    async function addItem () {

        if (props.modalidade == "Alimentação") {
            props.produtos[0].push(
                {
                    nome:nome.trim(),
                    preço:parseFloat(preço),
                    qtdSabores: parseFloat(qtdSabores),
                    preço: parseFloat(preço),
                    qtdPessoas: parseFloat(qtdpessoas),
                    saborComida,
                }
            )
            await updateDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.categoria.trim()}`), {
                produtos: props.produtos[0]
            });
            window.location.reload()
        }

        {/**if (props.modalidade == "Loja Virtual") {
            if (props.listaProdutos) {
                const indexProd = props.listaProdutos.filter(dados => dados.nome == nome)
                if (indexProd.length > 0) return toast.error('Já existe um produto com esse nome!')

                await updateDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.categoria}`), {
                    produtos: [...props.listaProdutos,
                    {
                        nome:nome.trim(),
                        preço: parseFloat(preço),
                        preçopromo: parseFloat(0),
                        img: img1 ? driveimg1 ? `https://docs.google.com/uc?id=${img2}`: img1: "",
                        img2: img2 ? driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2 : "",
                        img3: img3 ? driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3 : "",
                        img4: img4 ? driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4 : "", 
                        desc:desc.trim(),
                        small_desc: small_desc ? small_desc.trim() : "",
                        material: material.trim()
                    }
                    ]
                    });
                    window.location.reload()
            } else {
                await setDoc(doc(db, `MeiComSite/${props.email}/produtos`, `${props.categoria}`), {
                    categoria: props.categoria,
                    img:props.img,
                    destaque:props.destaque,
                    mostrar:props.mostrar,
                    text: props.text,
                    produtos: [
    
                    {
                        nome:nome.trim(),
                        preço:parseFloat(preço),
                        preçopromo: parseFloat(0),
                        img:  img1 ? driveimg1 ? `https://docs.google.com/uc?id=${img2}`: img1: "",
                        img2: img2 ? driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2 : "",
                        img3: img3 ? driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3 : "",
                        img4: img4 ? driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4 : "",
                        desc:desc.trim(),
                        small_desc: small_desc ? small_desc.trim() : "",
                        material: material.trim()
                    }
                    ]
                    });
                    window.location.reload()
            }
        } */}
    }


    const addSabor = (sabor) => {

        let index = saborComida.findIndex(prop => prop.sabor == sabor)
        
        if (index < 0) {
            setSaborComida([...saborComida, {sabor, ingredientes}])
            setSabor('')
            setIngredientes('')
            toast.success('Sabor adicionado com sucesso!')
        } else {
            toast.error('Sabor já existe!')
        }
    }
    const retirarSabor = (sabor) => {
        let index = saborComida.findIndex(prop => prop.sabor == sabor)
        saborComida.splice(index, 1)
        setSaborComida(saborComida)
        toast.success('Sabor retirado com sucesso!')
    }
    function formataTextoGoogleDrive (texto) {
        texto = texto.split('/')
        return texto[5]
    }
    

    const addProdutoStore = () => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`meicomsiteteste`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`meicomsiteteste`))
        }
        
        
        let index = produtosSalvos.findIndex(prop => prop.categoria == categoriaa)

        if (index >= 0) {
            produtosSalvos[index].produtos.push({
                nome:nome.trim(),
                preço:parseFloat(preço),
                preçopromo: parseFloat(0),
                img:  img1 ? driveimg1 ? `https://docs.google.com/uc?id=${img2}`: img1: "",
                img2: img2 ? driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2 : "",
                img3: img3 ? driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3 : "",
                img4: img4 ? driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4 : "",
                desc:desc.trim(),
                small_desc: small_desc ? small_desc.trim() : "",
                material: material.trim()
            })

            localStorage.setItem(`meicomsiteteste`,JSON.stringify(produtosSalvos))
            window.location.reload()
        } 
    }

    
 

    return (
            <>
            {props.modalidade == "Alimentação" &&
                <div className={styles.container}>
                <form className={styles.form}>
                    <h1>Novo produto</h1>
                    <div className={styles.line}></div>
                    <div>
                        <div className={styles.info}>
                                    
                            <strong>Nome:</strong>
                            <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                            <div>
                                <strong>Escolhe quantos sabores?</strong>
                                <input type="number" onChange={(el)=> setQtdSabores(el.target.value)}/>
                            </div>
                            <strong>Preço:</strong>
                            <input type="number" onChange={(el)=> setPreço(el.target.value)}/>
                            <strong>Servem quantas pessoas:</strong>
                            <input type="number" onChange={(el)=> setQtdPessoas(el.target.value)}/>
                            <div className={`accordion ${styles.box_sabores}`} id="accordionExample" >
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sabores" aria-expanded="false" aria-controls="collapseOne">
                                        Sabores
                                        </button>
                                    </h2>
                                    <div id="sabores" className="accordion-collapse collapse">
                                        <div className="accordion-body" >

                                            <ul className={`${styles.saborescomida} saborescomida`}>
                                                {saborComida.length > 0 && saborComida.map(item => {
                                                    return (
                                                            <li key={item.sabor}>
                                                                <strong>{item.sabor}</strong>
                                                                <FaTrash
                                                                type="button"
                                                                onClick={()=> retirarSabor(item.sabor)}
                                                                />
                                                            </li>
                                                        )
                                                })}
                                            </ul>
                                            <div>
                                                <strong>Sabor</strong>
                                                <input placeholder="Sabor" onChange={(el)=> setSabor(el.target.value)}
                                                value={sabor}
                                                />
                                                <strong>Ingredientes</strong>
                                                <input placeholder="Ingedientes" onChange={(el)=> setIngredientes(el.target.value)}
                                                value={ingredientes}
                                                />
                                                {sabor && ingredientes && <button
                                                onClick={()=> {
                                                    if (!sabor && !ingredientes) return
                                                    addSabor(sabor)}}
                                                className={styles.btn_save}
                                                >Salvar</button>}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles.cont_buttons}>
                            <button
                            onClick={(el)=> {
                                el.preventDefault()
                            }}
                            type={props.type}
                            data-bs-dismiss={props.dismiss}
                            aria-label={props.aria_label}
                            >Cancelar</button>
                            
                            {nome && qtdSabores && preço && qtdpessoas && saborComida.length > 0 ? 
                            <button
                            onClick={(el)=> {
                                el.preventDefault()
                                addItem()
                            }}
                            className={styles.btn_confirm}
                            >Confirmar</button>:
                            <button
                            disabled
                            className={`${styles.btn_disabled} ${styles.btn_confirm}`}
                            >Confirmar</button>
                            }
                        </div>
                    </div>
                </form>
            </div>
            }
            {props.modalidade == "Loja Virtual" &&
                <div className={styles.container}>
                <form className={styles.form}>
                    <h1>Novo Produto</h1>
                    <div className={styles.line}></div>
                    <div className="row">
                        <div className="col-lg-7">
                            <strong>tema: {props.tema}</strong>
                            <div className={styles.view_add}>
                                <div className={styles.visu}>
                                    <Visualizar 
                                    tema={props.tema}
                                    nome={nome}
                                    imagem={driveimg1 ? `https://docs.google.com/uc?id=${img2}`: img1}
                                    imagem2={driveimg2 ? `https://docs.google.com/uc?id=${img2}`: img2}
                                    imagem3={driveimg3 ? `https://docs.google.com/uc?id=${img3}`: img3}
                                    imagem4={driveimg4 ? `https://docs.google.com/uc?id=${img4}`: img4}
                                    preço={preço}
                                    desc={desc}
                                    small_desc={small_desc}
                                    cor={cor}
                                    p={p}
                                    m={m}
                                    g={g}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                                <div className={styles.info}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <strong>Imagem:</strong>
                                            <div className={styles.check_box}>
                                                <input type="checkbox"
                                                checked={driveimg1}
                                                onChange={() => setDriveImg1(!driveimg1)} 
                                                />
                                                <label>Ondrive</label>
                                            </div>
                                            

                                            <input type="text" onChange={(el)=> {
                                                setImg1(el.target.value)
                                            }}/>



                                            <Link to="/suporte/fotos"
                                            target="_blank"
                                            >Não sei adicionar imagens</Link>

                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#imagens" aria-expanded="false" aria-controls="collapseOne">
                                                        Imagens
                                                        </button>
                                                    </h2>
                                                    <div id="imagens" className="accordion-collapse collapse">
                                                        <div className="accordion-body">
                                                            <strong>Imagem 2:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onChange={() => setDriveImg2(!driveimg2)} checked={driveimg2}
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            <input type="text" onChange={(el)=> {setImg2(el.target.value)}}/>


                                                            <strong>Imagem 3:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg3(!driveimg3)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            {driveimg3 ?
                                                            <input type="text" onChange={(el)=> {setImg3(formataTextoGoogleDrive(el.target.value))}}/>: 

                                                            <input type="text" onChange={(el)=> {setImg3(el.target.value)}}/>}

                                                            <strong>Imagem 4:</strong>
                                                            <div className={styles.check_box}>
                                                                <input type="checkbox"
                                                                onClick={() => setDriveImg4(!driveimg4)} defaultChecked
                                                                />
                                                                <label>drive</label>
                                                            </div>
                                                            {driveimg4 ?
                                                            <input type="text" onChange={(el)=> {setImg4(formataTextoGoogleDrive(el.target.value))}}/>: 

                                                            <input type="text" onChange={(el)=> {setImg4(el.target.value)}}/>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <strong>Nome:</strong>
                                            <input type="text" onChange={(el)=> setNome(el.target.value)}/>
                                            <strong>Descrição Curta:</strong>
                                            <input type="text" onChange={(el)=> setSmallDesc(el.target.value)}/>
                                            <strong>Descrição Longa:</strong>
                                            <textarea type="text" onChange={(el)=> setDesc(el.target.value)}/>
                                            <strong>Preço:</strong>
                                            <input type="number" onChange={(el)=> setPreço(el.target.value)}/>




                                            <strong>Cor:</strong>
                                            <input type="color" onChange={(el)=> setCor(el.target.value)}/>
                                            <strong>Tamanhos:</strong>

                                            <div className={styles.cont_tamanhos}>
                                                <strong>P</strong>
                                                <input type="number" onChange={(el)=> setP(el.target.value)}
                                                placeholder="QTD"
                                                />
                                                <strong>M</strong>
                                                <input type="number" onChange={(el)=> setM(el.target.value)}
                                                placeholder="QTD"
                                                />
                                                <strong>G</strong>
                                                <input type="number" onChange={(el)=> setG(el.target.value)}
                                                placeholder="QTD"
                                                />
                                            </div>

                                        </div>

                                        <div className="col-sm-6">
                                            <strong>Material:</strong>
                                            <input type="text" onChange={(el)=> setMaterial(el.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cont_buttons}>
                                    <button
                                    onClick={(el)=> {
                                        el.preventDefault()
                                    }}
                                    type={props.type}
                                    data-bs-dismiss={props.dismiss}
                                    aria-label={props.aria_label}
                                    >Cancelar</button>

                                    {nome && img1 && desc && preço && material ?
                                    <button

                                    onClick={(el)=> {
                                        el.preventDefault()
                                        if (modo) {
                                            addItem()
                                        } else {
                                            addProdutoStore()
                                        }
                                    }}

                                    className={styles.btn_confirm}
                                    >Confirmar</button>

                                    :
                                    <button
                                    disabled
                                    className={`${styles.btn_disabled} ${styles.btn_confirm}`}
                                    >Confirmar</button>
                                    }
                                    
                                </div>
                        </div>
                    </div>
                </form>
            </div>
            }
            <ToastContainer/>
            </>
        )
}