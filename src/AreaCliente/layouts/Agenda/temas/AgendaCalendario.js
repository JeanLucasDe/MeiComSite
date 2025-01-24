import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './AgendaCalendario.css';
import { useOutletContext } from "react-router-dom";
import moment from "moment/moment"
import { doc, getFirestore, updateDoc } from '@firebase/firestore';
import {App}from "../../../../Hooks/App"

const AgendaCalendario = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showServiceSelection, setShowServiceSelection] = useState(true);
  const [listHoras, setListHoras] = useState([]);
  const [finalHour, setFinalHour] = useState(null);
  const db = getFirestore(App)
  
  const [prod, cliente, vendas, agenda, servicos,token] = useOutletContext();

  const [updatedAgenda, setUpdatedAgenda] = useState();


  const {razao, descrição, cor,telefone, email,tokenID} = cliente && cliente[0]

  // Função para formatar a data no formato ISO (yyyy-mm-dd)
  const formatDate = (date) => date.toISOString().split('T')[0];

  // Função de clique no calendário
  const handleDateClick = (date) => {
    const formattedDate = formatDate(date);
    const dayAgenda = agenda.find((day) => day.date === formattedDate);
    if (dayAgenda) {
      setSelectedDate(formattedDate);
    } else {
      alert('Nenhum horário disponível nesta data.');
    }
    setStageStates((prev) => ({
        ...prev,
        stage3: true, // Alterna o estado de stage2
      }))
  };

  // Função para separar as horas de acordo com o serviço
  const SeparaHoras = (item, date) => {

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
            setSelectedTime(item.hora)
            setUpdatedAgenda(agenda)
            setStageStates((prev) => ({
                ...prev,
                stage4: true,
              }))
        }  
    }

  };

  // Função de reset
  const reset = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setStageStates((prev) => ({
        ...prev,
        stage2: false,
        stage3: false, // Alterna o estado de stage2
        stage4: false, // Alterna o estado de stage2
      }))
      agenda && agenda.map(dados => {
        if (dados.date == selectedDate) {
            dados.agenda.map(item => {
                listHoras.map(horas => {
                    if (horas.hora == item.hora.split(':')[0]) {
                        item.disp = true
                    }
                })
            })
            
        }
    })
  };
  const FormataValor = (valor) => {
    var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorFormatado
}

const [stageStates, setStageStates] = useState({
    stage1: showServiceSelection,
    stage2: selectedService,
    stage3: false,
    stage4: false,
  });

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

let brighterColor = lightenColor(cor, 0.8); 
let mediumColor = lightenColor(cor, 0.7);
let darkerColor = darkenColor(cor, 0.6); 

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
                    if (dados.date == selectedDate) {
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
                    if (dados.date == selectedDate) {
                        dados.agenda.map(item => {
                            result.push(item)
                        })
                    }
                })
                
                await updateDoc(doc(db, `MeiComSite/${email}/agenda`, selectedDate), {
                    agenda: result
                });

                if (user && targetNumber) {
                    const message = `Olá,me chamo ${user} e gostaria de confirmar meu agendamento para o dia ${moment(selectedDate).format('DD/MM/YYYY')} as ${selectedTime}h para o serviço: ${selectedService.nome}, id: ${id}`; 
                    
                    const whatsappUrl = `https://wa.me/${telefone}?text=${message}`;
                    window.open(whatsappUrl, '_blank');
                    handleSendNotification()
                } else {
                    alert('Por favor, preencha os dois campos corretamente.');
                }
            } 
        }
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

        const handleSendNotification = async () => {
          try {
            const res = await fetch('https://sendpushnotification-hfytj6n4kq-uc.a.run.app', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: tokenID,
                title: "Título de teste",
                body: "Corpo de teste",
                url: "https://sitemei.netlify.app/consultas",
              }),
            });
          
            const data = await res.text();
            console.log(data)
            console.log('Resposta da API:', data);
          } catch (error) {
            console.error('Erro ao enviar notificação:', error.message);
          }
        };

        console.log(tokenID)

  return (

    <div className='cont-agenda-calendar'
    style={{
      "--user-color-dark": darkerColor,
      "--user-color-light": brighterColor,
      "--user-color-medium": mediumColor,
      "--user-color": cor // Cor dinâmica definida pelo usuário.
    }}
    >
        <div className='header-main2' style={{backgroundColor:cor}}>
            <h1 className='razao' >{razao}</h1>
            <div className="stage-counter">
            {/* Estágio 1 */}
            <div className="stage-container">
                <div className={`stage`}>
                <div className="circle" style={{backgroundColor:stageStates.stage1 ? darkerColor : ""}}></div>
                <span className="label-span">Serviço</span>
                </div>
                <div
                className={`line-stage `}
                style={{backgroundColor: stageStates.stage2 ? darkerColor : ""}}
                ></div>
            </div>

            {/* Estágio 2 */}
            <div className="stage-container">
                <div className={`stage`}>
                <div className="circle" style={{backgroundColor:stageStates.stage2 ? darkerColor : ""}}></div>
                <span className="label-span">Data</span>
                </div>
                <div
                className={`line-stage `}
                style={{backgroundColor: stageStates.stage3 ? darkerColor : ""}}
                ></div>
            </div>
            {/* Estágio 3 */}
            <div className="stage-container">
                <div className={`stage`}>
                <div className="circle" style={{backgroundColor:stageStates.stage3 ? darkerColor : ""}}></div>
                <span className="label-span">Horário</span>
                </div>
                <div
                className={`line-stage `}
                style={{backgroundColor: stageStates.stage4 ? darkerColor : ""}}
                ></div>
            </div>

            {/* Estágio 4 */}
            <div className="stage-container">
                <div className={`stage`}>
                <div className="circle" style={{backgroundColor:stageStates.stage4 ? darkerColor : ""}}></div>
                <span className="label-span">Confirme</span>
                </div>
            </div>
            </div>
        </div>


      <div className="container-agenda-calendar-stages">
          {showServiceSelection && !selectedService && (
            <div className="service-selection" 
            style={{
                "--user-color-dark": darkerColor,
                "--user-color-light": brighterColor,
                "--user-color-medium": mediumColor,
                "--user-color": cor // Cor dinâmica definida pelo usuário.
              }}
            >
              <h2>Escolha um Serviço</h2>
              <ul className='ul-margin'>
                {servicos.map((service) => (
                  <li
                    key={service.id}
                    className="service-item"
                    onClick={() => {
                        setSelectedService(service)
                        setStageStates((prev) => ({
                        ...prev,
                        stage2: true, // Alterna o estado de stage2
                      }))
                    }}
                  >
                    <div className="service-details">
                      <div>
                        <p className="service-name">{service.nome}</p>
                        <p className="service-duration">{`Duração: ${service.hora}h`}</p>
                      </div>
                      <div>
                        {service.precofixo == '2' && <p className='apartir'>apartir</p>}
                        <span className="service-price">{`${FormataValor(parseInt(service.valor))}`}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedService && !selectedDate && (
            <div className="calendar-container" 
            style={{
                "--user-color-dark": darkerColor,
                "--user-color-light": brighterColor,
                "--user-color-medium": mediumColor,
                "--user-color": cor // Cor dinâmica definida pelo usuário.
              }}>
              <h2>Selecione uma Data</h2>
              <Calendar
                className="calendar"
                 locale="pt-BR"
                onClickDay={handleDateClick}
                tileDisabled={({ date, view }) => {
                // Bloqueia datas no passado no modo de visualização "month"
                if (view === "month") {
                    return date < new Date().setHours(0, 0, 0, 0);
                }
                return false;
                }}
                formatShortWeekday={(locale, date) => {
                  const weekdays = ['Dom','Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                  return weekdays[date.getDay()];
                }}
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    const formattedDate = formatDate(date);
                    const dayAgenda = agenda.find((item) => item.date === formattedDate);
                    return dayAgenda && dayAgenda.agenda.some((slot) => slot.disp)
                      ? 'available-date'
                      : 'unavailable-date';
                  }
                }}
              />
              <div className="calendar-buttons">
                <button className="btn secondary" onClick={reset}>
                  Voltar
                </button>
                <button
                  className="btn tertiary"
                  onClick={() => setSelectedService("")}
                  style={{
                    backgroundColor:darkerColor
                  }}
                >
                  Trocar Serviço
                </button>
              </div>
            </div>
          )}
          {selectedService  && !selectedTime && selectedDate && (
            <div className="time-selection"
            style={{
                "--user-color-dark": darkerColor,
                "--user-color-light": brighterColor,
                "--user-color-medium": mediumColor,
                "--user-color": cor // Cor dinâmica definida pelo usuário.
              }}
            >
                <h1 className='title_service'>{selectedService.nome}</h1>
                <p className='paragh'>Duração {selectedService.hora} hora{parseInt(selectedService.hora) > 1 ? "s": ''}</p>
                <p className='paragh'>Valor: {selectedService.precofixo == '2' && <p className='apartir'>apartir</p>}
                <span className='price' style={{color:darkerColor}}>{FormataValor(parseInt(selectedService.valor))}</span></p>
                <h3>Horários Disponíveis</h3>
                <ul>
                    {agenda
                    .find((item) => item.date === selectedDate)
                    ?.agenda.map((slot, index) => (
                        <li
                        key={index}
                        className={`time-item ${slot.disp ? 'available' : 'unavailable'}`}
                        onClick={() => {
                            if (slot.disp) {
                                SeparaHoras(slot, { date: selectedDate })
                            }
                            setStageStates((prev) => ({
                                ...prev,
                                stage3: true, // Alterna o estado de stage2
                            }))
                        }}
                        >
                        {formatarHoraParaAMPM(parseInt(slot.hora))}
                        </li>
                    ))}
                </ul>
                    <button className="btn secondary center" onClick={()=> {
                        setSelectedDate('')
                        setStageStates((prev) => ({
                            ...prev,
                            stage3: false, // Alterna o estado de stage2
                          }))
                        }}>
                    Voltar
                    </button>
            </div>
          )}
          {selectedService && selectedDate && selectedTime && (
            <div className="confirmation">
              <h2>Confirmação</h2>
              <p>
                Serviço: <strong>{selectedService.nome}</strong>
              </p>
              <p className='service-details center-f'>
                <div>Valor:</div> 
                <div>
                  {selectedService.precofixo == '2' && <p className='apartir'>apartir</p>}
                  <strong>{FormataValor(parseInt(selectedService.valor))}</strong>
                </div>
              </p>
              <p>
                Data: <strong>{moment(selectedDate).format('DD/MM/YYYY')}</strong>
              </p>
              <p>
                Horário: <strong>{selectedTime}</strong>
              </p>
              <div className="confirmation-container">
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
                </form>
                
                <div className="confirmation-buttons">
                    <button className="btn secondary" onClick={reset}>
                    Cancelar
                    </button>
                    <button
                    className="btn primary"
                    onClick={(e) => {
                        Confirmar(e)
                    }}
                    >
                    Confirmar
                    </button>
                </div>
            </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default AgendaCalendario;
