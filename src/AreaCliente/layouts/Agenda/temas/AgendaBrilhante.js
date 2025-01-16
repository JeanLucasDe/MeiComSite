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
    const db = getFirestore(App)
    
    const [selectedTime, setSelectedTime] = useState(false);
    const {razao,especialidade, descrição,abre, fecha,telefone} = cliente && cliente[0]

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
                    dados.agenda.map(item => {horas.push(item.hora)})
                }
            })
            const max = Math.max.apply(null, horas)


            if (result - 1  <= max) {
                setFinalHour(result - 1)
                for (let i = parseInt(item.hora); i < result; i++) {
                    listHour.push({'hora': i.toString()})
                }
                setListHoras(listHour)
                const numbers = [];
                agenda && agenda.map(dados => {
                    if (dados.date == date.date) {
                        dados.agenda.map(item => {
                            listHour.map(horas => {
                                if (horas.hora == item.hora) {
                                    numbers.push(item.disp)
                                }
                            })
                        })
                        
                    }
                })


                const allTrue = numbers.every(function(number) {
                    return number == true;
                });

                if (allTrue) {
                    agenda && agenda.map(dados => {
                        if (dados.date == date.date) {
                            dados.agenda.map(item => {
                                listHour.map(horas => {
                                    if (horas.hora == item.hora) {
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
                            if (horas.hora == item.hora) {
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

    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (user && targetNumber) {
            const message = `Olá,me chamo ${user} e gostaria de confirmar meu agendamento para o dia ${moment(selectedDate.date).format('DD/MM/YYYY')} as ${selectHora}h para o serviço: ${selectedService.nome}, id: ${id}`; 
            
            const whatsappUrl = `https://wa.me/${targetNumber}?text=${message}`;
            Confirmar()
            window.open(whatsappUrl, '_blank');
            window.location.reload()
        } else {
            alert('Por favor, preencha os dois campos corretamente.');
        }
    };

    const formatPhoneNumber = (number) => {
        if (!number) return '';
        const cleanNumber = number.replace(/\D/g, '');
        const formatted = cleanNumber.replace(
            /^(\d{2})(\d{2})(\d{5})(\d{4})$/, 
            "+$1 ($2) $3-$4"
        );
        return formatted;
    };

     const Confirmar = async () => {
            if(user, targetNumber) {
    
                let result = []
                agenda && agenda.map(dados => {
                    if (dados.id == selectedDate.date) {
                        dados.agenda.map(item=> {
                            listHoras.map(horas => {
                                if (horas.hora == item.hora) {
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
            } 
        }


    return (
        <div className="cont">
            <section id="professional">
                <div className="container">
                    <div className="profile">
                        <div class="profile-image">
                            <img src="https://img.freepik.com/fotos-gratis/mulher-de-negocios-do-smiley-que-levanta-e-que-escreve-em-seu-diario_23-2147656474.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted" alt="Profissional"/>
                        </div>
                        <div className="profile-info">
                            <h2 className="name">{razao}</h2>
                            <p className="title">{especialidade && especialidade}</p>
                            <p className="description">{descrição && descrição}</p>
                        </div>
                    </div>

                <div className="schedule">
                        {stage == 1 && (
                            <div className="service-selection">
                            <h2 className="schedule-title">Escolha o serviço</h2>
                            <div className="service-btns">
                                {servicos && servicos.map((service) => (
                                <button
                                    key={service.id}
                                    className="service-btn"
                                    onClick={() => handleServiceSelect(service)}
                                >
                                    {service.nome} - {FormataValor(parseInt(service.valor))}
                                </button>
                                ))}
                            </div>
                            </div>
                        )}

                        {stage == 2  && (
                            <div className="time-selection">
                                <h1 className="schedule-title">{selectedService.nome}</h1>
                                <h4 className="schedule-title h4">Escolha o horário</h4>
                                <p>Dura {selectedService.hora} hora{parseInt(selectedService.hora) > 0 ? 's': ''}</p>
                                <p className="service-price">Preço: {FormataValor(parseInt(selectedService.valor))}</p>
                                {selectedTime && <button className="back-btn" onClick={CancelaHora}>
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
                                                selectedService && (
                                                <SwiperSlide>
                                                    <div key={dados.id} className="time-slot">
                                                        <div className="day">{moment(dados.date).format('DD/MM/YYYY')}</div>
                                                        <div className="day">{obterDiaDaSemana(dados.date)}</div>
                                                        <div className="hours">
                                                            {dados.agenda.map(item => (
                                                                <button
                                                                key={item.id}
                                                                className={`time-btn ${!item.disp ? 'selected' : ''}
                                                                ${item.selected && 'selecionado'}
                                                                `}
                                                                onClick={() => {
                                                                    SeparaHoras(item, dados)
                                                                    setSelectedDate(dados)
                                                                    setSelectHora(item.hora)
                                                                }}
                                                                >
                                                                {formatarHoraParaAMPM(item.hora)}
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
                                    <button className="back-btn" onClick={handleBack}>
                                        Voltar
                                    </button>
                                    <button className="back-btn confirm" onClick={()=> {
                                        if (selectedTime ) {
                                            setStage(3)
                                        }
                                        }}
                                        >
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        )}
                        {stage == 3 &&(
                        <div className="confirmation-container">
                            <h1 className="schedule-title">Confirmação via WhatsApp</h1>
                            <form onSubmit={handleSubmit}>
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
                                    value={formatPhoneNumber(targetNumber)} 
                                    onChange={(e) => setTargetNumber(e.target.value)} 
                                    placeholder="Número de destino (com DDD)" 
                                    required 
                                    className="formatted-input"
                                />
                                <div >
                                    <button type="submit" className="confirmation-button back-btn">Enviar Confirmação</button>
                                    <button type="submit" className="confirmation-button back-btn dash" onClick={()=>setStage(stage-1)}>Voltar</button>
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