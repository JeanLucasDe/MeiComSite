import { useOutletContext } from "react-router-dom"
import styles from "./Agenda.module.css"
import moment from "moment/moment";
import { useEffect, useState } from "react";
import BoxDate from "./BoxDate";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../Service/firebase";
import { doc, getDocFromCache, getFirestore } from "firebase/firestore";
import App from "../../../Hooks/App";



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
    const [TodosDiasObj, setTodosDiasObj] = useState()
    const [ok, setOk] = useState(false)
    const db = getFirestore(App)

    
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
        let li_temp = []

        totalDias.map(dados => {
            li_temp.push({data:dados})
        })
        setTodosDiasObj(li_temp)

    },[])


   
    let list_dates = []

    usuario.length > 0 && usuario[0].agenda.map(dados => {
        list_dates.push(dados.dia)
    })
    const DateList = usuario.length > 0 && usuario[0].agenda.filter(dados =>  dados.dia == selectDate)


    const FormataMonth = () => {
        let date = new Date
        switch (date.getMonth()) {
            case 0 : return 'Janeiro'
            case 1 : return 'Fevereiro'
            case 2 : return 'Março'
            case 3 : return 'Abril'
            case 4 : return 'Maio'
            case 5 : return 'Junho'
            case 6 : return 'Julho'
            case 7 : return 'Agosto'
            case 8 : return 'Setembro'
            case 9 : return 'Outubro'
            case 10 : return 'Novembro'
            case 11 : return 'Dezembro'
        }

    }

    const month = FormataMonth()




    //Upload

    const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const file = event.target[0]?.files[0];
      if (!file) return;
  
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPorgessPorcent(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgURL(downloadURL);
          });
        }
      );
    };






    return (
        <>
        {usuario.length > 0 && usuario[0].mod =="Agendamento" &&
            <div className={styles.container}>
                <h4>Minha Agenda!</h4>
                <div>
                    <div
                    className={styles.cont_list}
                    >
                        <h4>{month}</h4>
                        <ul
                        className={styles.list_date}
                        >
                            {TodosDiasObj && TodosDiasObj.map(dados => {
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
                                    })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        }

        <div className="modal fade" id="ModalDate" tabindex="-1" aria-labelledby="exampleModalLabel">
            <div className={`modal-dialog modal-md`}>
                <div className="modal-content">
                    <BoxDate obj={DateList.length > 0 ?  DateList[0]: objDate} month={month}/>
                </div>
            </div>
        </div>
        <div>
            <h4>Upload Arquivos</h4>
            <div>
                <form onSubmit={handleSubmit}>
                <input type="file" />
                <button>Enviar</button>
                </form>
                {!imgURL && <p>{progressPorcent}%</p>}
                {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
            </div>
        </div>


        </>
        )
}