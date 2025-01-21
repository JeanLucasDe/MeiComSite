import { useOutletContext } from "react-router-dom"
import "./AgendaBrilhante.css"
import { useState } from "react";
import moment from "moment";
import { doc, updateDoc, getFirestore} from "@firebase/firestore";
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { App } from "../../../../Hooks/App";

export default function AgendaBrilhante () {
    
    const [ prod, cliente, vendas, agenda, servicos] = useOutletContext()
    var [finalHour, setFinalHour] = useState()
    const [listHoras, setListHoras] = useState()
    const [formattedNumber, setFormattedNumber] = useState('');
    const db = getFirestore(App)
    
    const [selectedTime, setSelectedTime] = useState(false);
    const {razao,especialidade, descrição,telefone, cor, foto} = cliente && cliente[0]

    function formatarHoraParaAMPM(hora) {
        // Garantir que a hora e o minuto estão dentro dos intervalos válidos
        if (hora < 0 || hora > 23) {
          return 'Hora ou minuto inválido';
        }
      
        // Determinar AM ou PM
        const periodo = hora >= 12 ? 'PM' : 'AM';
      
        // Converter a hora para o formato de 12 horas
        const hora12 = hora % 12 || 12; // Se for 0 (meia-noite), exibe 12
      
        // Retornar no formato hh:mm AM/PM
        return `${hora12 < 10 ? '0': ''}${hora12}:00 ${periodo}`;
      }

    function obterDiaDaSemana(data) {
        const diasDaSemana = [
          'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 
          'Quinta-feira', 'Sexta-feira', 'Sábado','Domingo'
        ];
      
        const dataObj = new Date(data); // Converte a data para um objeto Date
      
        // Verifica se a data é válida
        if (isNaN(dataObj)) {
          return 'Data inválida';
        }
      
        // Retorna o dia da semana correspondente à data
        return diasDaSemana[dataObj.getDay()+1];
      }


    const SeparaHoras = (item, date) => {


        if(!selectedTime) {

            const listHour = []
            const horas = []
            const result = (parseInt(item.hora) + parseInt(selectedService.hora))
            agenda && agenda.map(dados => {
                if (dados.date == date.date) {
                    dados.agenda.map(item => {horas.push(item.hora.split(':')[0])})
                }
            })
            const max = Math.max.apply(null, horas)


            if (result - 1  <= max) {
                setFinalHour(result - 1)
                for (let i = parseInt(item.hora.split(':')[0]); i < result; i++) {
                    listHour.push({'hora': i.toString()})
                }
                setListHoras(listHour)
                const numbers = [];
                agenda && agenda.map(dados => {
                    if (dados.date == date.date) {
                        dados.agenda.map(item => {
                            listHour.map(horas => {
                                if (horas.hora == item.hora.split(':')[0]) {
                                    numbers.push(item.disp)
                                }
                            })
                        })
                        
                    }
                })
                console.log(numbers)


                const allTrue = numbers.every(function(number) {
                    return number == true;
                });

                if (allTrue) {
                    agenda && agenda.map(dados => {
                        if (dados.date == date.date) {
                            dados.agenda.map(item => {
                                listHour.map(horas => {
                                    if (horas.hora == item.hora.split(':')[0]) {
                                        item.disp = false
                                        item.selected = true
                                    }
                                })
                            })
                            
                        }
                    })
                    setSelectedTime(true)
                }  
            }
        }
    }




    const CancelaHora = () => {
        if (selectedTime) {
            agenda && agenda.map(dados => {
                if (dados.date == selectedDate.date) {
                    dados.agenda.map(item => {
                        listHoras.map(horas => {
                            if (horas.hora == item.hora.split(':')[0]) {
                                item.disp = true
                                item.selected = false
                            }
                        })
                    })
                    
                }
            })
            setSelectedTime(false)
        }
    }
    
    
    
      const [stage, setStage] = useState(1); // 1: Seleção de serviço, 2: Seleção de horário
      const [selectedService, setSelectedService] = useState(null);
      const [selectedDate, setSelectedDate] = useState('');
      const [selectHora, setSelectHora] = useState('')
    
      const handleServiceSelect = (service) => {
          setSelectedService(service);
          setStage(2); // Vai para a seleção de horário
        };
    
      
    
      const handleBack = () => {
          setStage(stage - 1); // Volta para a seleção de serviço
          setSelectedTime(null); // Reseta o horário
          CancelaHora()
        };
        
      const FormataValor = (valor) => {
        var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return valorFormatado
    }

    const [user, setUser] = useState('');
    const [targetNumber, setTargetNumber] = useState('');
    const geraId = () => {
        const numeroAleatorio = Math.floor(Math.random() * 100000);
        return numeroAleatorio
    }
    const id = geraId()

    

    const formatBrazilianPhone = (number) => {
        if (!number) return '';
    
        // Remove caracteres não numéricos
        const cleanNumber = number.replace(/\D/g, '');
    
        // Adiciona o código do país +55, se não estiver presente
        const fullNumber = cleanNumber.startsWith('55') ? cleanNumber : `55${cleanNumber}`;
        const phoneWithoutCode = fullNumber.slice(2);
    
        // Limita o comprimento para evitar números inválidos
        if (phoneWithoutCode.length > 11) {
            return `+55 (${phoneWithoutCode.slice(0, 2)}) ${phoneWithoutCode.slice(2, 7)}-${phoneWithoutCode.slice(7, 11)}`;
        }
    
        // Formata dinamicamente conforme o número é digitado
        if (phoneWithoutCode.length <= 2) {
            return `+55 (${phoneWithoutCode}`;
        } else if (phoneWithoutCode.length <= 7) {
            return `+55 (${phoneWithoutCode.slice(0, 2)}) ${phoneWithoutCode.slice(2)}`;
        } else {
            return `+55 (${phoneWithoutCode.slice(0, 2)}) ${phoneWithoutCode.slice(2, 7)}-${phoneWithoutCode.slice(7)}`;
        }
    };


    const handleInputChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatBrazilianPhone(rawValue);
        setTargetNumber(formattedValue);
    };

     const Confirmar = async (e) => {
        e.preventDefault()
            if(user, targetNumber) {
    
                let result = []
                agenda && agenda.map(dados => {
                    if (dados.id == selectedDate.date) {
                        dados.agenda.map(item=> {
                            listHoras.map(horas => {
                                if (horas.hora == item.hora.split(':')[0]) {
                                    item.nome = user;
                                    item.telefone = targetNumber;
                                    item.servico = selectedService.nome
                                    item.status = 1
                                    item.valor = selectedService.valor
                                    item.id = id
                                    item.selected = false
                                }
                            })
                        })
                    }
                })
                agenda && agenda.map(dados => {
                    if (dados.id == selectedDate.date) {
                        dados.agenda.map(item => {
                            result.push(item)
                        })
                    }
                })
                
                await updateDoc(doc(db, `MeiComSite/${cliente && cliente[0].email}/agenda`, selectedDate.date), {
                    agenda: result
                });

                if (user && targetNumber) {
                    const message = `Olá,me chamo ${user} e gostaria de confirmar meu agendamento para o dia ${moment(selectedDate.date).format('DD/MM/YYYY')} as ${selectHora}h para o serviço: ${selectedService.nome}, id: ${id}`; 
                    
                    const whatsappUrl = `https://wa.me/${telefone}?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                    setTimeout(()=> {window.location.reload()},1000)
                } else {
                    alert('Por favor, preencha os dois campos corretamente.');
                }



            } 
        }

        function lightenColor(hex, percent) {
            // Remove o # do começo da string, se existir
            hex = hex.replace('#', '');
        
            // Converte a cor hexadecimal para RGB
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);
        
            // Aumenta o brilho de cada componente (RGB)
            r = Math.min(255, Math.floor(r + (255 - r) * percent));
            g = Math.min(255, Math.floor(g + (255 - g) * percent));
            b = Math.min(255, Math.floor(b + (255 - b) * percent));
        
            // Converte de volta para hexadecimal
            let newHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        
            return newHex;
        }
        function darkenColor(hex, percent) {
            // Remove o # do começo da string, se existir
            hex = hex.replace('#', '');
        
            // Converte a cor hexadecimal para RGB
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);
        
            // Reduz o brilho de cada componente (RGB)
            r = Math.max(0, Math.floor(r * (1 - percent)));
            g = Math.max(0, Math.floor(g * (1 - percent)));
            b = Math.max(0, Math.floor(b * (1 - percent)));
        
            // Converte de volta para hexadecimal
            let newHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        
            return newHex;
        }
        
        let brighterColor = lightenColor(cor, 0.9); 
        let mediumColor = lightenColor(cor, 0.7);
        let darkerColor = darkenColor(cor, 0.6); 


    return (
        <div className="cont">
            <section id="professional"
            style={{
                backgroundColor: cor 
            }}
            >
                <div className="container">
                    <div className="profile">
                        <div class="profile-image">
                            <img src={foto ? foto : "https://img.freepik.com/fotos-gratis/mulher-de-negocios-do-smiley-que-levanta-e-que-escreve-em-seu-diario_23-2147656474.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted"} alt="Profissional"/>
                        </div>
                        <div className="profile-info">
                            <h2 className="name"
                            style={{
                                color: darkerColor
                            }}
                            >{razao}</h2>
                            <p className="title"
                            style={{
                                color: mediumColor
                            }}
                            >{especialidade && especialidade}</p>
                            <p className="description"
                            style={{
                                color: brighterColor
                            }}
                            >{descrição && descrição}</p>
                        </div>
                    </div>

                <div className="schedule">
                        {stage == 1 && (
                            <div className="service-selection w100">
                            <h2 className="schedule-title" style={{
                                color:darkerColor
                            }}>Escolha o serviço</h2>
                            <div className="service-btns"

                            >
                                {servicos && servicos.map((service) => (
                                <button
                                    key={service.id}
                                    className="service-btn"
                                    style={{
                                        backgroundColor:darkerColor,
                                        color:darkerColor
                                    }}
                                    onClick={() => handleServiceSelect(service)}
                                >
                                    <div className="sec-servic">
                                        <div>
                                            <p
                                            style={{
                                                color:brighterColor
                                            }}
                                            >{service.nome}</p> 
                                        </div>
                                        <div>
                                            <p
                                            style={{
                                                color:brighterColor
                                            }}
                                            >
                                            {service.precofixo == '2' && <p className="apartir" style={{
                                                color:mediumColor
                                            }}>apartir</p>}
                                            {FormataValor(parseInt(service.valor))}
                                            </p>
                                        </div>

                                    </div>
                                </button>
                                ))}
                            </div>
                            </div>
                        )}

                        {stage == 2  && (
                            <div className="time-selection w100">
                                <h1 className="schedule-title"
                                style={{
                                    color:darkerColor
                                }}
                                >{selectedService.nome}</h1>
                                <h4 className="schedule-title h4"
                                style={{
                                    color:darkerColor
                                }}
                                >Escolha o horário</h4>
                                <p>Dura {selectedService.hora} hora{parseInt(selectedService.hora) > 0 ? 's': ''}</p>

                                <p className='service-details center-f'>
                                    <div><span>Valor: </span> </div> 
                                    <div>
                                    {selectedService.precofixo == '2' && <p className='apartir'>apartir</p>}
                                    <strong style={{color:darkerColor}}>{FormataValor(parseInt(selectedService.valor))}</strong>
                                    </div>
                                </p>




                                {selectedTime && 
                                <button className="back-btn" onClick={CancelaHora}
                                style={{
                                    backgroundColor:cor
                                }}
                                >
                                    Trocar
                                </button>}
                                <Swiper
                                    spaceBetween={50} // Espaçamento entre os slides
                                    pagination={true}
                                    breakpoints={{
                                        576: {
                                          // width: 576,
                                          slidesPerView: 1,
                                        },
                                        768: {
                                          // width: 768,
                                          slidesPerView: 2,
                                        },
                                      }}
                                >
                                    
                                    <div className="schedule-times">
                                            {agenda && agenda.map((dados) =>
                                                (moment(dados.date).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')) && 
                                                selectedService && (
                                                <SwiperSlide
                                                key={dados.date}
                                                >
                                                    <div key={dados.id} className="time-slot">
                                                        <div className="day"
                                                        style={{
                                                            color:darkerColor
                                                        }}
                                                        >{moment(dados.date).format('DD/MM/YYYY')}</div>
                                                        <div className="day"
                                                        style={{
                                                            color:darkerColor
                                                        }}
                                                        >{obterDiaDaSemana(dados.date)}</div>
                                                        <div className="hours">
                                                            {dados.agenda.map(item => (
                                                                <button
                                                                key={item.hora}
                                                                className={`time-btn ${!item.disp && !item.selected ? 'selected' : ''}
                                                                `}
                                                                style={{
                                                                    backgroundColor: !item.selected ? darkerColor: cor,
                                                                    color: item.selected ? brighterColor: brighterColor
                                                                }}
                                                                
                                                                onClick={() => {
                                                                    SeparaHoras(item, dados)
                                                                    setSelectedDate(dados)
                                                                    setSelectHora(item.hora.split(':')[0])
                                                                }}
                                                                >
                                                                {formatarHoraParaAMPM(item.hora.split(':')[0])}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                                )
                                            )}
                                    </div>
                                </Swiper>
                                <div className="cont_btn">
                                    <button className="back-btn confirm" onClick={()=> {
                                        if (selectedTime ) {
                                            setStage(3)
                                        }
                                        }}
                                        style={{
                                            backgroundColor:darkerColor
                                        }}
                                        >
                                        Confirmar
                                    </button>
                                    <button className="back-btn" onClick={handleBack}
                                    style={{
                                        backgroundColor:cor
                                    }}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            </div>
                        )}
                        {console.log(selectedTime)}
                        {stage == 3 &&(
                        <div className="confirmation-container">
                            <div className={`confirmation confi`}>
                                <h2>Confirmação</h2>
                                <p>
                                    Serviço: <strong>{selectedService.nome}</strong>
                                </p>
                                <p className='service-details center-f'>
                                    <div><span>Valor: </span> </div> 
                                    <div>
                                    {selectedService.precofixo == '2' && <p className='apartir'>apartir</p>}
                                    <strong >{FormataValor(parseInt(selectedService.valor))}</strong>
                                    </div>
                                </p>
                                <p>
                                    Data: <strong>{moment(selectedDate.date).format('DD/MM/YYYY')}</strong>
                                </p>
                                <p>
                                    Horário: <strong>{formatarHoraParaAMPM(selectHora)}</strong>
                                </p>
                            </div>
                            <h1 className="schedule-title">Confirmação via WhatsApp</h1>
                            <form >
                                <input 
                                    type="text" 
                                    value={user} 
                                    onChange={(e) => setUser(e.target.value)} 
                                    placeholder="Seu Nome " 
                                    required 
                                    className="formatted-input"
                                />
                                <input 
                                    type="tel" 
                                    defaultValue={'55'}
                                    value={targetNumber}
                                    onChange={handleInputChange}
                                    placeholder="Número de destino (com DDD)" 
                                    required 
                                    className="formatted-input"
                                />
                                <div >
                                    <button className="confirmation-button back-btn"
                                    onClick={(e) => Confirmar(e)}
                                    >Enviar Confirmação</button>
                                    <button className="confirmation-button back-btn dash" onClick={()=>setStage(stage-1)}>Voltar</button>
                                </div>
                            </form>
                            <p className="confirmation-footer">Digite os números no formato internacional, por exemplo: +5511999999999</p>
                        </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}