
import { useOutletContext,  } from "react-router-dom";
import styles from "./FiltroVendas.module.css"
import {FaFilter, FaSearch} from "react-icons/fa"
import TodasVendas from "./TodasVendas";
import { useState } from "react";

export default function FiltroVendas () {


    const [vendas, usuario] = useOutletContext()
    const [showFilter, setShowFilter] = useState(false)
    const [idvenda, setIdVenda] = useState()
    const [datain, setDataIn] = useState()
    const [datater, setDataTer] = useState()
    const [status, setStatus] = useState()
    const [pagamento, setPagamento] = useState()
    const [comprador, setComprador] = useState()
    const [lugar, setLugar] = useState()
    const [cidade, setCidade] = useState()
    const [telefone, setTelefone] = useState()
    const [Bairro, setBairro] = useState()
    const [busca, setBusca] = useState()



    const obj = {
        idvenda,
        datain,
        cidade:cidade != '--' ? cidade : false ,
        status: status != '--' ? parseFloat(status) : false,
        pagamento: pagamento != '--' ? pagamento : false,
        comprador,
        telefone,
        lugar:lugar != '--' ? lugar : false,
        bairro:Bairro != '--' ? Bairro : false,
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
                                            <option value={1}>Aberto</option>
                                            <option value={2}>Preparo</option>
                                            <option value={3}>Entrega</option>
                                            <option value={4}>Finalizado</option>
                                        </select>
                                        <label>Pagamento:</label>
                                        <select
                                        value={pagamento}
                                        onChange={(el)=> setPagamento(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            <option >Cartão</option>
                                            <option >Pix</option>
                                            <option >Avista</option>
                                        </select>

                                        <label>Lugar:</label>
                                        <select
                                        value={lugar}
                                        onChange={(el)=> setLugar(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            <option value={2}>Local</option>
                                            <option value={1}>Entrega</option>
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
                            
                                        <label>Cidade:</label>
                                        <select
                                        onChange={(el)=> setCidade(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            {usuario.length > 0 && usuario[0].listCidades.map(dados => {
                                            return (
                                                <option>{dados.local}</option>
                                                )
                                            })}
                                        </select>
                                        <label>Bairro:</label>
                                        <select
                                        onChange={(el)=> setBairro(el.target.value)}
                                        >
                                            <option value="--">--</option>
                                            {usuario.length > 0 && usuario[0].listBairros.map(dados => {
                                            return (
                                                <option>{dados.local}</option>
                                                )
                                            })}
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