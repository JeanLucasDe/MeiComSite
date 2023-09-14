import { useOutletContext } from "react-router-dom"
import styles from "./Agenda.module.css"
import moment from "moment/moment";
import { useEffect, useState } from "react";

export default function Agenda () {
    const [mod, produtos, usuario, vendas, user] = useOutletContext()
    var [dias, setDias] = useState([])
    const [DiasAtualizar, setDiasAtualizar] = useState()
    const [diasUteis, setdiasUteis] = useState()

    
    useEffect(()=> {
        const getWeekDaysInMonth = (month = parseFloat(moment().format('MM')-1), year = parseFloat(moment().format('YYYYY'))) => {

            return new Array(new Date(year, month+1, 0).getDate()).fill().map((n, i) => {
    
              const weekDay = new Date(year, month, ++i).getDay();
              return weekDay >= 0 && weekDay == 6 && i;
    
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
        const diasUteis =  getWeekDaysInMonthUteis()
        const DiasAtualizar = getWeekDaysInMonth()

    },[])
    
      


    const dataAtual = parseFloat(moment().format('DD'))
    

    






    return (
        <>
        {usuario.length > 0 && usuario[0].mod =="Agendamento" &&
            <div className={styles.container}>
                <h4>Minha Agenda</h4>
                <div>
                    <p>Esta agenda atualizará todo sábado</p>
                    <h5>Dias Disponíveis</h5>
                    <p>Esta Semana</p>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>

        }
        </>
        )
}