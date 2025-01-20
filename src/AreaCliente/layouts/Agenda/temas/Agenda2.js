import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Agenda2.css';

const AppointmentScheduler = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showServiceSelection, setShowServiceSelection] = useState(true);

  const services = [
    { id: 1, name: 'Corte de Cabelo', duration: 1, price: 50 },
    { id: 2, name: 'Manicure', duration: 2, price: 40 },
    { id: 3, name: 'Massagem Relaxante', duration: 1.5, price: 100 },
  ];

  // Agenda de exemplo
  const agenda = [
    {
      date: '2025-01-25',
      schedule: [
        { hour: '10:00', available: true },
        { hour: '11:00', available: false },
        { hour: '14:00', available: true },
      ],
    },
    {
      date: '2025-01-26',
      schedule: [
        { hour: '09:00', available: true },
        { hour: '15:00', available: false },
      ],
    },
    {
      date: '2025-01-27',
      schedule: [
        { hour: '09:00', available: false },
        { hour: '11:00', available: true },
      ],
    },
  ];

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
  };

  // Função de reset
  const reset = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setShowServiceSelection(true);
  };

  // Função para mostrar a seleção de serviço
  const toggleServiceSelection = () => {
    setShowServiceSelection(!showServiceSelection);
  };

  return (
    <div className="scheduler">
      <header className="scheduler-header">
        <h1>Agendamento de Serviços</h1>
        <p>Agende seu serviço de maneira fácil e rápida!</p>
      </header>

      {showServiceSelection && !selectedService && (
        <div className="service-selection">
          <h2>Escolha um Serviço</h2>
          <ul>
            {services.map((service) => (
              <li
                key={service.id}
                className="service-item"
                onClick={() => setSelectedService(service)}
              >
                <div className="service-details">
                  <span className="service-name">{service.name}</span>
                  <span className="service-duration">{`Duração: ${service.duration}h`}</span>
                  <span className="service-price">{`Preço: R$ ${service.price.toFixed(2)}`}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedService && !selectedDate && (
        <div className="calendar-container">
          <h2>Selecione uma Data</h2>
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                const formattedDate = formatDate(date);
                const dayAgenda = agenda.find((item) => item.date === formattedDate);
                return dayAgenda && dayAgenda.schedule.some((slot) => slot.available)
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
              onClick={toggleServiceSelection}
            >
              Trocar Serviço
            </button>
          </div>
        </div>
      )}

      {selectedService && selectedDate && !selectedTime && (
        <div className="time-selection">
          <h2>Horários Disponíveis</h2>
          <ul>
            {agenda
              .find((item) => item.date === selectedDate)
              ?.schedule.map((slot, index) => (
                <li
                  key={index}
                  className={`time-item ${slot.available ? 'available' : 'unavailable'}`}
                  onClick={() => slot.available && setSelectedTime(slot.hour)}
                >
                  {slot.hour}
                </li>
              ))}
          </ul>
        </div>
      )}

      {selectedService && selectedDate && selectedTime && (
        <div className="confirmation">
          <h2>Confirmação</h2>
          <p>
            Serviço: <strong>{selectedService.name}</strong>
          </p>
          <p>
            Data: <strong>{selectedDate}</strong>
          </p>
          <p>
            Horário: <strong>{selectedTime}</strong>
          </p>
          <div className="confirmation-buttons">
            <button className="btn secondary" onClick={reset}>
              Voltar
            </button>
            <button
              className="btn primary"
              onClick={() => alert('Agendamento Confirmado!')}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
