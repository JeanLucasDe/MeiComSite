import { useOutletContext } from "react-router-dom"
import styles from "./Agenda.module.css"
import moment from "moment/moment";
import { useEffect, useState } from "react";
import BoxDate from "./BoxDate";

export default function Agenda () {
    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    var [dias, setDias] = useState([])
    const [DiasAtualizar, setDiasAtualizar] = useState()
    const [diasUteis, setdiasUteis] = useState()
    const [TodosDias, setTodosDias] = useState()
    const [semanas, setSemanas] = useState()
    const [semanaObj, setSemanaObj] = useState()
    const [selectDate, setSelectDate] = useState()
    const [objDate, setObjDate] = useState()
    const [ok, setOk] = useState(false)

    
    useEffect(()=> {
        const getWeekDaysInMonth = (month = parseFloat(moment().format('MM')-1), year = parseFloat(moment().format('YYYYY'))) => {

            return new Array(new Date(year, month+1, 0).getDate()).fill().map((n, i) => {
    
              const weekDay = new Date(year, month, ++i).getDay();
              return weekDay >= 0 && weekDay == 6 && i;
    
            }).filter(val => !!val);
    
        }
        const getWeekDaysInMonthAll = (month = parseFloat(moment().format('MM')-1), year = parseFloat(moment().format('YYYYY'))) => {

            return new Array(new Date(year, month+1, 0).getDate()).fill().map((n, i) => {
    
              const weekDay = new Date(year, month, ++i).getDay();
              return  weekDay >= 0 && i;
    
            }).filter(val => !!val);
    
        }
        const getWeekDaysInMonthUteis = (month = parseFloat(moment().format('MM')-1), year = parseFloat(moment().format('YYYYY'))) => {
            return new Array(new Date(year, month+1, 0).getDate()).fill().map((n, i) => {
            const weekDay = new Date(year, month, ++i).getDay();
            
    
            if (weekDay > 0 && weekDay < 6) {
                return i
            }
    
            }).filter(val => !!val);
        }

        const totalDias = getWeekDaysInMonthAll()
        const diasUteis =  getWeekDaysInMonthUteis()
        const DiasAtualizar = getWeekDaysInMonth()

        setTodosDias(totalDias)
        setdiasUteis(diasUteis)
        setDiasAtualizar(DiasAtualizar)

    },[])


    const SpliWeek = () => {
        if (!ok && TodosDias) {

            let listGeral = []
            var corte = 7
            let obj = []
            let objSplit = []
    
            for (var i = 0; i < TodosDias.length; i = i + corte) {
                listGeral.push(TodosDias.slice(i, i + corte));

            }
            listGeral && listGeral.map(dados => {
                dados.map(item => {
                    obj.push({data:item})
                })
            })
            for (var i = 0; i < obj.length; i = i + corte) {
                objSplit.push(obj.slice(i, i + corte));

            }

            setSemanaObj(objSplit)
            setSemanas(listGeral)
            setOk(true)
        }
    }
    
   SpliWeek()


    const dataAtual = parseFloat(moment().format('DD'))
   
    const list_dates = []

    usuario.length > 0 && usuario[0].agenda.map(dados => {
        list_dates.push(dados.dia)
    })


    
    const DateList = usuario.length > 0 && usuario[0].agenda.filter(dados =>  dados.dia == selectDate)


    return (
        <>
        {usuario.length > 0 && usuario[0].mod =="Agendamento" &&
            <div className={styles.container}>
                <h4>Minha Agenda</h4>
                <div>
                    <p>Esta agenda atualizará todo sábado</p>
                    <h5>Dias Disponíveis</h5>
                    <p>Segunda Quinzena</p>
                    <ul 
                    className={styles.list_date}
                    >
                        {semanaObj && semanaObj.length > 0 && semanaObj[dataAtual >= 15 ? 2 : 0].map(dados => {
                            return (
                                    <li
                                    type="button"
                                    data-bs-toggle="modal" 
                                    data-bs-target="#ModalDate"
                                    className={`${list_dates.includes(dados.data) ? styles.off : styles.off} ${styles.date}`}
                                    key={dados.data}
                                    onClick={() => {
                                        setSelectDate(dados.data)
                                        setObjDate(dados)
                                    }}
                                    >
                                        <p>{dados.data}</p>
                                    </li>
                                    )
                                })
                        }
                    </ul>
                    <ul
                    className={styles.list_date}
                    >
                        {semanaObj && semanaObj.length > 0 && semanaObj[dataAtual >= 15 ? 3 : 1].map(dados => {
                            return (
                                <li
                                type="button"
                                data-bs-toggle="modal" 
                                data-bs-target="#ModalDate"
                                className={`${list_dates.includes(dados.data) ? styles.on : styles.off} ${styles.date}`}
                                key={dados.data}
                                onClick={() => {
                                    setSelectDate(dados.data)
                                    setObjDate(dados)
                                }}
                                >
                                    <p>{dados.data}</p>
                                </li>
                                )
                        })}
                    </ul>
                    <ul
                    className={styles.list_date}
                    >
                        {dataAtual >= 15 && semanas && semanas[4].map(dados => {
                            return (
                                <li
                                className={`${list_dates.includes(dados.dia) ? styles.on : styles.off} ${styles.date}`}
                                key={dados.data}
                                >
                                    <p>{dados}</p>
                                    <div>
                                    <p>{dados.data}</p>
                                    {usuario.length > 0 &&usuario[0].agenda.map(data => {
                                        if (dados.data == data.data) 
                                        return (
                                            <ul className={styles.list_hour}>
                                                {data.horarios.map(item => {
                                                    return (
                                                        <li>{item.hora}</li>
                                                        )
                                                })}
                                            </ul>
                                            )
                                        })
                                        }
                                </div>
                                </li>
                                )
                        })}
                    </ul>
                </div>
            </div>

        }

        <div className="modal fade" id="ModalDate" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <BoxDate obj={DateList.length > 0 ?  DateList[0]: objDate}/>
                </div>
            </div>
        </div>


        </>
        )
}