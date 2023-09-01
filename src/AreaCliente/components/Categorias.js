import { Link, useOutletContext, useParams } from "react-router-dom"
import '@firebase/firestore';
import styles from "./Categorias.module.css"
import NavShop from "./NavShop";
import { Helmet } from "react-helmet";


export default function Categorias () {
    const [produtos, usuario] = useOutletContext()
    const {site, categoria} = useParams()
    
    
    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }
    
    

    return (
            <>
                {usuario.length > 0 && usuario[0].theme == "Dark" &&
                    <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>  
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.list}>
                                    <ul className="row">
                                        {produtos && produtos.map(item => {
                                            if (item.categoria.toLowerCase() == categoria.toLowerCase()) {
                                                if (item.produtos && item.produtos.length > 0) {
                                                    return (
                                                        item.produtos.map(dados => {
                                                            return (
                                                                <li key={dados.id} className={`col-6 col-md-6 col-lg-4 ${styles.li}`}>
                                                                    <div>
                                                                        <div className={styles.cont_img}>
                                                                            <Link
                                                                            to={`/${site}/${item.categoria}/${dados.nome.toLowerCase().replaceAll(' ', '')}`}
                                                                            >
                                                                                <img src={dados.img} className={styles.img}/>
                                                                            </Link>
                                                                        </div>
                                                                        <div className={styles.cont_desc}>
                                                                            <div className={styles.text}>
                                                                                <h4>{dados.nome}</h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                )
                                                        })
                                                        
                                                    )
                                                }
                                            }
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                {usuario.length > 0 && usuario[0].theme == "Light" &&
                    <div className={`${styles.container} row ${styles[usuario && usuario[0].theme]}`}>  
                        <div className="col-lg-3">
                            <NavShop/>
                        </div>
                        <div className="col-lg-8">
                            <div className={styles.list}>
                                    <ul className="row">
                                        {produtos && produtos.map(item => {
                                            if (item.categoria.toLowerCase() == categoria.toLowerCase()) {
                                                if (item.produtos) {
                                                    return (
                                                        item.produtos.map(dados => {
                                                            return (
                                                                <li key={dados.id} className={`col-12 ${styles.li}`}>
                                                                    <div>
                                                                        <div className={styles.cont_img}>
                                                                            <Link
                                                                            to={`/${site}/${item.categoria}/${dados.nome.toLowerCase().replaceAll(' ', '')}`}
                                                                            >
                                                                                <img src={dados.img} className={styles.img}/>
                                                                            </Link>
                                                                        </div>
                                                                        <div className={styles.cont_desc}>
                                                                            <div className={styles.text}>
                                                                                <Link
                                                                                to={`/${site}/${item.categoria}/${dados.nome.toLowerCase().replaceAll(' ', '')}`}
                                                                                >
                                                                                    <h4>{dados.nome}</h4>
                                                                                    <strong>{FormataValor(dados.preço)}</strong>
                                                                                    
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                )
                                                        })
                                                        
                                                    )
                                                }
                                            }
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                }

            <Helmet>
                <title>{categoria}</title>
                <link rel="icon" type="image/url" href={usuario.length > 0 && usuario[0].logo} sizes="16x16" />
            </Helmet>
            </>
        )
}