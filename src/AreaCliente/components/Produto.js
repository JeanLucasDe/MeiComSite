import {  Link, useOutletContext, useParams } from "react-router-dom";
import styles from "./Produto.module.css"
import { useState } from "react"
import App from "../../Hooks/App"
import '@firebase/firestore';
import { getFirestore, collection, getDocs} from "@firebase/firestore";
import {FaAngleLeft, FaRegClock, FaUtensils} from "react-icons/fa"
import Loading from "../../components/Loading";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {Swiper, SwiperSlide} from "swiper/react"
import { Pagination, Navigation } from "swiper";
import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css';



export default function Produto () {
    const [produtos, usuario] = useOutletContext()
    const {site, categoria, nome} = useParams()
    const produto = produtos && produtos.filter(dados => dados.categoria == categoria)
    
    const [load, setLoading] = useState(false)

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const [saboresEscolhidos, setSaboresEscolhidos] = useState([])



    const addSacola = (nome, produto) => {
        let produtosSalvos = new Array()
        
        if (localStorage.hasOwnProperty(`itenscarrinho.${site}`)) {
            produtosSalvos = JSON.parse(localStorage.getItem(`itenscarrinho.${site}`))
        }
        
        
        let index = produtosSalvos.findIndex(prop => prop.nome == nome)

        if (index < 0) {
            if (usuario[0] && usuario[0].mod == "Restaurante") {
                if (produto.qtdSabores < saboresEscolhidos.length) return toast.error(`Apenas ${produto.qtdSabores} sabores`)
                if (produto.qtdSabores > saboresEscolhidos.length) return toast.error(`Escolha ${produto.qtdSabores} sabores`)
    
                produtosSalvos.push({
                    nome: produto.nome,
                    img: produto.img,
                    preço: produto.precoDesconto ? produto.precoDesconto : produto.preço,
                    qtd: 1,
                    site: site,
                    estoque: produto.estoque,
                    saboresEscolhidos,
                    categoria
                })
                localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
                toast.success('Produto adicionado ao carrinho')
            }
            if (usuario[0] && usuario[0].mod == "Loja Virtual") {
                produtosSalvos.push({
                    nome: produto.nome,
                    img: produto.img,
                    preço: produto.precoDesconto ? produto.precoDesconto : produto.preço,
                    qtd: 1,
                    site: site,
                    categoria
                })
                localStorage.setItem(`itenscarrinho.${site}`,JSON.stringify(produtosSalvos))
                toast.success('Produto adicionado ao carrinho')
            }
            
        } else {
            toast.error('Produto já adicionado ao carrinho')
        }
    }

    const addSabor = (sabor) => {
        setSaboresEscolhidos([...saboresEscolhidos, {sabor: sabor}])
    }
    const deletaSabor = (sabor) => {
        let index = saboresEscolhidos.findIndex(prop => prop.sabor == sabor)
        saboresEscolhidos.splice(index, 1)
        setSaboresEscolhidos(saboresEscolhidos)
    }

    



    return (
        <>
            <div className={styles.container}>
                

                {usuario.length > 0 && usuario[0].theme == "Light" &&
                    <div className={styles[usuario[0].theme]}>
                        <button className={styles.btn_return}
                        ><FaAngleLeft/></button>
                        <div className="row">
                            <div className="col-md-6">

                            </div>
                            <div className="col-md-6">
                                <div className={styles.cont_card}>
                                    
                                           
                                </div>
                            </div>
                        </div>
                    </div>
                }
                                                        

                
                {usuario.length > 0 && produto.length > 0  && usuario[0].theme == "Dark" &&
                    <div className={styles[usuario[0].theme]}>
                        {!load && <Loading/>}
                        <div className="row">
                            <div className="col-sm-6 offset-sm-1">
                                <Swiper
                                spaceBetween={10}
                                pagination={{ clickable: true }}
                                className={styles.cont_slides}
                                modules={[Navigation, Pagination]}
                                slidesPerView={1}
                                >
                                    {produto[0].img &&
                                        <SwiperSlide>
                                            <img src={produto[0].img} className={styles.img}/>
                                        </SwiperSlide>
                                    }
                                    {produto[0].img2 &&
                                        <SwiperSlide>
                                            <img src={produto[0].img2} className={styles.img}/>
                                        </SwiperSlide>
                                    }
                                    {produto[0].img3 &&
                                        <SwiperSlide>
                                            <img src={produto[0].img3} className={styles.img}/>
                                        </SwiperSlide>
                                    }
                                    {produto[0].img4 &&
                                        <SwiperSlide>
                                            <img src={produto[0].img4} className={styles.img}/>
                                        </SwiperSlide>
                                    }

                                </Swiper>
                            </div>
                            <div className="col-sm-5">
                                <div className={styles.cont_right}>
                                    <div className={styles.header}>
                                        <h3 className={styles.name}>{produto[0].nome}</h3>
                                        <p className={styles.desc}>{produto[0].desc}</p>
                                        <h4>{FormataValor(produto[0].preço)}</h4>
                                    </div>
                                    <button className={styles.btn_buy}
                                    onClick={()=> addSacola(produto[0].nome, produto[0])}
                                    >Comprar</button>
                                    <div className="accordion" id="accordionExample">

                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#detalhes" aria-expanded="false" aria-controls="collapseOne">
                                                Detalhes
                                                </button>
                                            </h2>
                                            <div id="detalhes" className="accordion-collapse collapse">
                                                <div className="accordion-body">
                                                    <p>{produto[0].desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                }
            </div>
            <ToastContainer
            position="top-left"
            reverseOrder={false}
            />
            {!load && <Loading/>}
        </>
        )
}