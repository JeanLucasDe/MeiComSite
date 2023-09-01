import {FaShoppingBag, FaUtensils, FaRegClock} from "react-icons/fa"
import styles from "./Visualizar.module.css"
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import { useState } from "react";

export default function Visualizar (props) {

    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    

    const [select, setSelect] = useState()


    return (
            <div>
                {props.tema == "Dark" &&
                    <>
                        <div className={styles[props.tema && props.tema]}>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className={styles.item}>
                                        <div className={styles.cont_img}>
                                            <img src={props.imagem}  className={styles.first_img}/>
                                        </div>
                                        <div className={styles.cont_bottom}>
                                            <strong>{!props.nome ? 'nome' : props.nome}</strong>
                                            <strong>{!props.preço ? 'R$ 0,00' : FormataValor(parseFloat(props.preço))}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className={styles.cont_text}>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className={styles.cont_img}>
                                                    <img src={!select ? props.imagem : select} className={styles.second_img}/>
                                                </div>
                                                <div>
                                                    {props.imagem &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                    {props.imagem2 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem2)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem2}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                    {props.imagem3 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem3)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem3}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                    {props.imagem4 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem4)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem4}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div >
                                                    <h4 className={styles.title}>{props.nome ? props.nome : "nome"}</h4>
                                                    <p className={styles.desc}>{props.small_desc ? props.small_desc : "desc"}</p>
                                                    <h5>{props.preço ? FormataValor(parseFloat(props.preço)):
                                                        FormataValor(0)
                                                    }</h5>
                                                    <div className={styles.cores}>
                                                        <strong>cores disponiveis</strong>
                                                        {props.cor &&
                                                            <div>
                                                                <input disabled type="color" value={props.cor} className={styles.input_color}></input>
                                                            </div>
                                                        }
                                                    </div>
                                                    <strong>tamanhos</strong>
                                                    <div className={styles.cont_buttons}>
                                                        {props.p > 0 &&
                                                            <div>
                                                                {props.p && <button>P</button>}
                                                            </div>
                                                        }
                                                        {props.m > 0 &&
                                                            <div>
                                                                {props.m && <button>M</button>}
                                                            </div>
                                                        }
                                                        {props.g > 0 &&
                                                            <div>
                                                                {props.g && <button>G</button>}
                                                            </div>
                                                        }
                                                    </div>
                                                    <button className={styles.btn_buy} disabled>Comprar</button>
                                                    <div className="accordion" id="accordionExample">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header">
                                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#detalhes" aria-expanded="false" aria-controls="collapseOne">
                                                                    Detalhes
                                                                    </button>
                                                                </h2>
                                                                <div id="detalhes" className="accordion-collapse collapse">
                                                                    <div className="accordion-body">
                                                                        <p>{props.desc}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {props.tema == "Light" &&
                    <>
                    <div className={styles[props.tema && props.tema]}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className={styles.item}>
                                    <div className={styles.cont_img}>
                                        <img src={props.imagem} className={styles.img}/>
                                    </div>
                                    <div>
                                        <h5 className={styles.nome}>{props.nome ? props.nome : "nome"}</h5>
                                        <p className={styles.small_desc}>{props.small_desc ? props.small_desc : "descrição"}</p>
                                        <h5 className={styles.price}>{props.preço ? FormataValor(parseFloat(props.preço)): FormataValor(0)}</h5>
                                        <div className={styles.cont_buttons}>
                                            <button className={styles.btn_buy}>Comprar</button>
                                            <button className={styles.icon}><FaShoppingBag/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className={styles.cont_bottom}>
                                    <div className={styles.cont_text}>
                                        <div className="row">
                                            <div className="col-md-4 col-lg-6">
                                                <div className={styles.cont_img}>
                                                    <img src={!select ? props.imagem : select} className={styles.img}/>
                                                </div>
                                                <div>
                                                    {props.imagem1 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                    {props.imagem2 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem2)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem2}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                    {props.imagem3 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem3)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem3}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                    {props.imagem4 &&
                                                        <button
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            setSelect(props.imagem4)}}
                                                        className={styles.btn_img}
                                                        >
                                                            <img src={props.imagem4}
                                                            className={styles.img_small}
                                                            />
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-8 col-lg-6">
                                                <div className={styles.cont_info}>
                                                    <div className={styles.info}>
                                                        <div className={styles.header}>
                                                            <h5>{props.nome ? props.nome : "nome"}</h5>

                                                            <div className={styles.cont_ss}>
                                                                <p className={styles.cont_ss}><FaUtensils className={styles.icon}/><strong>serve {props.serve}</strong></p>
                                                                <p className={styles.cont_ss}><FaRegClock className={styles.icon}/><strong>{props.espera} min</strong></p>
                                                            </div>
                                                        </div>
                                                        <div className={styles.cont_price}>
                                                            <h5>{props.preço ? 
                                                            FormataValor(parseFloat(props.preço))
                                                            :
                                                            FormataValor(0)}
                                                            </h5>
                                                            <div className={styles.cont_button_qtd}>
                                                                <button disabled className={styles.btn_disable}>-</button>
                                                                <input type="number" disabled value={1}/>
                                                                <button disabled className={styles.btn_active}>+</button>
                                                            </div>
                                                        </div>
                                                        <div className={styles.desc}>
                                                            <strong>Sobre</strong>
                                                            <p>{props.desc ? props.desc: "descrição"}</p>
                                                        </div>
                                                        <button className={styles.btn_buy} disabled>Comprar {props.preço ? FormataValor(parseFloat(props.preço)): FormataValor(0)}</button>
                                                        <div className="accordion" id="accordionExample">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header">
                                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#saboresExample" aria-expanded="false" aria-controls="collapseOne">
                                                                    Sabores
                                                                    </button>
                                                                </h2>
                                                                <div id="saboresExample" className="accordion-collapse collapse">
                                                                    <div className="accordion-body" >
                                                                        <ul className={styles.listSabores}>
                                                                            {props.listaSabores.map(dados=> {
                                                                                return (
                                                                                        <li key={dados.id}>
                                                                                            <strong>{dados.sabor}</strong>
                                                                                            <p>{dados.Ingredientes}</p>
                                                                                        </li>
                                                                                    )
                                                                            })}

                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </>
                }
            </div>
        )
}