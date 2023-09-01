
import { useOutletContext,  } from "react-router-dom";
import styles from "./FiltroVendas.module.css"
import {FaFilter, FaSearch} from "react-icons/fa"
import TodasVendas from "./TodasVendas";
import { useState } from "react";

export default function FiltroVendas () {

    const [showFilter, setShowFilter] = useState(false)
    const [idvenda, setIdVenda] = useState()
    const [datain, setDataIn] = useState()
    const [datater, setDataTer] = useState()
    const [status, setStatus] = useState()
    const [pagamento, setPagamento] = useState()
    const [comprador, setComprador] = useState()
    const [telefone, setTelefone] = useState()
    const [região, setRegião] = useState()
    const [busca, setBusca] = useState()



    const obj = {
        idvenda,
        datain,
        datater,
        status,
        pagamento,
        comprador,
        telefone,
        região
    }

    const handleSend = () => {
        setBusca(obj)
        setShowFilter(true)
    }


    return (
            <>
            
                <div className={styles.container}>
                    <h4 className={styles.title}><FaFilter className={styles.icon}/> Filtro</h4>
                    <div className={styles.content}>
                        <div className={styles.cont_inputs}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className={styles.cont_left}>
                                        <label>Id Venda:</label>
                                        <input type="text"
                                        value={idvenda}
                                        onChange={(el)=> setIdVenda(el.target.value)}
                                        />
                                        <label>Data:</label>
                                        <input type="date"
                                        value={datain}
                                        onChange={(el)=> setDataIn(el.target.value)}
                                        />
                                        <label>Status:</label>
                                        <select
                                        value={status}
                                        onChange={(el)=> setStatus(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            <option value="concluido">concluido</option>
                                            <option value="pendente">pendente</option>
                                        </select>
                                        <label>Pagamento:</label>
                                        <select
                                        value={pagamento}
                                        onChange={(el)=> setPagamento(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            <option value="cartão">cartão</option>
                                            <option value="avista">avista</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className={styles.cont_left}>
                                        <label>Comprador:</label>
                                        <input type="search" name="q"
                                        value={comprador}
                                        onChange={(el)=> setComprador(el.target.value)}
                                        />
                                        <label>Telefone:</label>
                                        <input type="text"
                                        value={telefone}
                                        onChange={(el)=> setTelefone(el.target.value)}
                                        />
                            
                                        <label>Região:</label>
                                        <select
                                        value={região}
                                        onChange={(el)=> setRegião(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            <option value="cabula">cabula</option>
                                            <option value="arvoredo">arvoredo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cont_btn_buscar}>
                            <button 
                            className={styles.btn_buscar}
                            onClick={() => handleSend()}
                            >
                            <FaSearch className={styles.icon}/>Buscar
                            </button>
                        </div>
                    </div>
                </div>

                {showFilter && <TodasVendas busca={busca}/>}
                
            </>
        )
}