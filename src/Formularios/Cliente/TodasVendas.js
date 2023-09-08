import { useOutletContext } from "react-router-dom";
import styles from "./Vendas.module.css"
import DetalhesVenda from "./DetalhesVenda";
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment/moment";
import { useState } from "react";

export default function TodasVendas (props) {

    
    const [vendas] = useOutletContext()
    const [obj, setObj] = useState()
    const result = []
    const busca = props.busca 


    const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }



    if (busca && !busca.comprador && !busca.telefone && !busca.idvenda) {
        vendas && vendas.filter(dados => {
            //Se não tiver data
            if (!busca.datain) {
                // Se não tiver lugar
                if (!busca.lugar) {
                        //Se não tiver status
                        if (!busca.status) {
                            //Se não tiver pagamento
                            if (!busca.pagamento) {
                                //Se não tiver Cidade
                                if (!busca.cidade) {
                                    //Se não tiver Bairro
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                } else {
                                    if (busca.cidade == dados.cidade) {
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        } else {
                                            if (busca.bairro == dados.bairro) {
                                                result.push(dados)
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (busca.pagamento == dados.pagamento) {
                                    result.push(dados)
                                }
                            }
                        } else {
                            if (busca.status == dados.state) {
                                //Se não tiver Pagamentos
                                if (!busca.pagamento) {
                                    //Se não tiver Cidade
                                    if (!busca.cidade) {
                                        //Se não tiver bairro
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        } else {
                                            if (busca.bairro == dados.bairro) {
                                                result.push(dados)
                                            }
                                        }
                                    } else {
                                        if (busca.cidade == dados.cidade) {
                                            result.push(dados)
                                        }
                                    }
                                } else {
                                    if (busca.pagamento == dados.pagamento) {
                                                result.push(dados)
                                            } 
                                        else {
                                        if(busca.cidade == dados.cidade) {
                                            result.push(dados)
                                        }
                                        
                                    }
                                }
                            }
                        }
                } else {
                    if (busca.lugar == dados.lugar) {
                    //Se não tiver status
                    if (!busca.status) {
                        //Se não tiver pagamento
                        if (!busca.pagamento) {
                            //Se não tiver Cidade
                            if (!busca.cidade) {
                                //Se não tiver Bairro
                                if (!busca.bairro) {
                                    result.push(dados)
                                } else {
                                    if (busca.bairro == dados.bairro) {
                                        result.push(dados)
                                    }
                                }
                            } else {
                                if (busca.cidade == dados.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                }
                            }
                        } else {
                            if (busca.pagamento == dados.pagamento) {
                                result.push(dados)
                            }
                        }
                    } else {
                        if (busca.status == dados.state) {
                            //Se não tiver Pagamentos
                            if (!busca.pagamento) {
                                //Se não tiver Cidade
                                if (!busca.cidade) {
                                    //Se não tiver bairro
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                } else {
                                    if (busca.cidade == dados.cidade) {
                                        result.push(dados)
                                    }
                                }
                            } else {
                                if (busca.pagamento == dados.pagamento) {
                                            result.push(dados)
                                        } 
                                    else {
                                    if(busca.cidade == dados.cidade) {
                                        result.push(dados)
                                    }
                                    
                                }
                            }
                        }
                    }
                    }
                }
            } else {
                //Se tiver data
                if (!busca.lugar) {
                    if (!busca.status) {
                        //Se não tiver status
                        if (!busca.pagamento) {
                            //Se não tiver pagamento
                            if (moment(busca.datain).format('DD/MM/YYYY')== dados.data) {
                                if (!busca.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                } else {
                                    if (busca.cidade == dados.cidade) {
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        } else {
                                            if (busca.bairro == dados.bairro) {
                                                result.push(dados)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (moment(busca.datain).format('DD/MM/YYYY')== dados.data &&
                            busca.pagamento == dados.pagamento
                            ) {
                            result.push(dados)
                            }
                        }
                    } else {
                        if (busca.status == dados.state &&
                            moment(busca.datain).format('DD/MM/YYYY') == dados.data)
                            {
                            if (!busca.pagamento) {
                                if (!busca.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                } else {
                                    if (busca.cidade == dados.cidade) {
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        } else {
                                            if (busca.bairro == dados.bairro){
                                                result.push(dados)
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (busca.pagamento == dados.pagamento) {
                                    if (!busca.cidade) {
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        }
                                    } else {
                                        if (busca.cidade == dados.cidade) {
                                            if (busca.bairro == dados.bairro){
                                                result.push(dados)
                                            }
                                        }
                                    }
                                }
                            }
                            }
    
                    }
                } else {
                    if (busca.lugar == dados.lugar) {
                        if (!busca.status) {
                            //Se não tiver status
                            if (!busca.pagamento) {
                                //Se não tiver pagamento
                                if (moment(busca.datain).format('DD/MM/YYYY')== dados.data) {
                                    if (!busca.cidade) {
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        } else {
                                            if (busca.bairro == dados.bairro) {
                                                result.push(dados)
                                            }
                                        }
                                    } else {
                                        if (busca.cidade == dados.cidade) {
                                            if (!busca.bairro) {
                                                result.push(dados)
                                            } else {
                                                if (busca.bairro == dados.bairro) {
                                                    result.push(dados)
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (moment(busca.datain).format('DD/MM/YYYY')== dados.data &&
                                busca.pagamento == dados.pagamento
                                ) {
                                result.push(dados)
                                }
                            }
                        } else {
                            if (busca.status == dados.state &&
                                moment(busca.datain).format('DD/MM/YYYY') == dados.data)
                                {
                                if (!busca.pagamento) {
                                    if (!busca.cidade) {
                                        if (!busca.bairro) {
                                            result.push(dados)
                                        } else {
                                            if (busca.bairro == dados.bairro) {
                                                result.push(dados)
                                            }
                                        }
                                    } else {
                                        if (busca.cidade == dados.cidade) {
                                            if (!busca.bairro) {
                                                result.push(dados)
                                            } else {
                                                if (busca.bairro == dados.bairro){
                                                    result.push(dados)
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (busca.pagamento == dados.pagamento) {
                                        if (!busca.cidade) {
                                            if (!busca.bairro) {
                                                result.push(dados)
                                            }
                                        } else {
                                            if (busca.cidade == dados.cidade) {
                                                if (busca.bairro == dados.bairro){
                                                    result.push(dados)
                                                }
                                            }
                                        }
                                    }
                                }
                                }
        
                        }
                    }
                }
            }
        })
    }

    //Se tiver ID
    if (busca && busca.idvenda) {
        vendas && vendas.filter(dados => {
            if (dados.iden == busca.idvenda) {
                result.push(dados)
            }
        })
    }

    //Se tiver Comprador
    if (busca && !busca.idvenda && busca.comprador && !busca.telefone) {
        vendas && vendas.filter(dados => {
            if (!busca.datain) {
                //Se não tiver data
                if (busca.comprador == dados.nome) {
                    //Se não tiver status
                    if (!busca.status) {
                        //Se não tiver pagamento
                        if (!busca.pagamento) {
                            //Se não tiver Cidade
                            if (!busca.cidade) {
                                //Se não tiver Bairro
                                if (!busca.bairro) {
                                    result.push(dados)
                                } else {
                                    if (busca.bairro == dados.bairro) {
                                        result.push(dados)
                                    }
                                }
                            } else {
                                if (busca.cidade == dados.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                }
                            }
                        } else {
                            if (busca.pagamento == dados.pagamento) {
                                result.push(dados)
                            }
                        }
                    } else {
                        if (busca.status == dados.state) {
                            //Se não tiver Pagamentos
                            if (!busca.pagamento) {
                                //Se não tiver Cidade
                                if (!busca.cidade) {
                                    //Se não tiver bairro
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                } else {
                                    if (busca.cidade == dados.cidade) {
                                        result.push(dados)
                                    }
                                }
                            } else {
                                if (busca.pagamento == dados.pagamento) {
                                            result.push(dados)
                                        } 
                                    else {
                                    if(busca.cidade == dados.cidade) {
                                        result.push(dados)
                                    }
                                    
                                }
                            }
                        }
                    }
                }

            } else {
                //Se tiver data
                if (!busca.status) {
                    //Se não tiver status
                    if (!busca.pagamento) {
                        //Se não tiver pagamento
                        if (moment(busca.datain).format('DD/MM/YYYY')== dados.data &&
                        busca.comprador == dados.nome) {
                            if (!busca.cidade) {
                                if (!busca.bairro) {
                                    result.push(dados)
                                } else {
                                    if (busca.bairro == dados.bairro) {
                                        result.push(dados)
                                    }
                                }
                            } else {
                                if (busca.cidade == dados.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro) {
                                            result.push(dados)
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (moment(busca.datain).format('DD/MM/YYYY')== dados.data &&
                        busca.comprador == dados.nome &&
                        busca.pagamento == dados.pagamento
                        ) {
                        result.push(dados)
                        }
                    }
                } else {
                    if (busca.status == dados.state &&
                        moment(busca.datain).format('DD/MM/YYYY') == dados.data &&
                        dados.nome == busca.comprador
                        )
                        {
                        if (!busca.pagamento) {
                            if (!busca.cidade) {
                                if (!busca.bairro) {
                                    result.push(dados)
                                } else {
                                    if (busca.bairro == dados.bairro) {
                                        result.push(dados)
                                    }
                                }
                            } else {
                                if (busca.cidade == dados.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    } else {
                                        if (busca.bairro == dados.bairro){
                                            result.push(dados)
                                        }
                                    }
                                }
                            }
                        } else {
                            if (busca.pagamento == dados.pagamento) {
                                if (!busca.cidade) {
                                    if (!busca.bairro) {
                                        result.push(dados)
                                    }
                                } else {
                                    if (busca.cidade == dados.cidade) {
                                        if (busca.bairro == dados.bairro){
                                            result.push(dados)
                                        }
                                    }
                                }
                            }
                        }
                        }

                }
            }
        })
    }

    //Se tiver Telefone
    if (busca && !busca.idvenda && !busca.comprador && busca.telefone) {
        vendas && vendas.filter(dados => {
            if (dados.telefone == busca.telefone) {
                result.push(dados)
            }
        })
    }






    return (
            <>

                    {result && result.length > 0 ? 

                    <>
                    <div className={styles.container}>
                    <h5 className={styles.title_result}>Resultado de busca ({result.length})</h5>
                    <table className={styles.table}>
                        <thead className={styles.header}>
                            <tr>
                                <td className={styles.td_header}>Id <span className={styles.view_desk}>Venda</span></td>
                                <td className={`${styles.td_header} ${styles.view_desk }`}>Status</td>
                                <td className={`${styles.td_header} ${styles.view_desk }`}>Data</td>
                                <td className={styles.td_header}>Comprador</td>
                                <td className={styles.td_header}>Total</td>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {result.map(dados => {
                            return (
                                <>
                                    <tr
                                    data-bs-toggle="modal"
                                    data-bs-target={`#ModalDetalhesVenda`}
                                    className={styles.td_button}
                                    onClick={()=> setObj(dados)}
                                    key={dados.iden}
                                    >
                                        <td className={styles.td}>{dados.iden}</td>
                                        <td className={`${styles.td} ${styles.view_desk }`}>{dados.state}</td>
                                        <td className={`${styles.td} ${styles.view_desk }`}>{dados.data}</td>
                                        <td className={styles.td}>{dados.nome}</td>
                                        <td className={styles.td}>{FormataValor(dados.Total)}</td>
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                    </>
                
                :
                <>
                <h5 className={styles.title_empty}>Sem resultados para esta busca</h5>
                <img src="https://img.freepik.com/free-vector/curious-analyst-investigating-question-mark-with-magnifier_74855-20083.jpg?size=626&ext=jpg&ga=GA1.1.995514839.1678974862&semt=ais" className={styles.img_empty}/>
                </>
                
                }



            <div className="modal fade" id="ModalDetalhesVenda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={`modal-dialog modal-md`}>
                    <div className="modal-content">
                        <DetalhesVenda
                        obj={obj}
                        type="button" 
                        aria_label="Close"
                        data_bs_toggle="modal" 
                        data_bs_target="#ModalDetalhesVenda"
                        />
                    </div>
                </div>
            </div>


            </>


        )
}