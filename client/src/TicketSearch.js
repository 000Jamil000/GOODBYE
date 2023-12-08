import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TicketSearch.css'; // Подключаем файл со стилями

function TicketSearch() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    if (selectedEndDate && date > selectedEndDate) {
      setSelectedEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    if (selectedStartDate && date < selectedStartDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(selectedStartDate);
    } else {
      setSelectedEndDate(date);
    }
  };

  const getTickets = (from, to, startDate, endDate) => {
    fetch(`http://localhost:5000/api/searchRouters/get?from=${from}&to=${to}&startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Билеты:', data);
  
        // Отображение билетов на странице
        const ticketList = document.getElementById('ticket-list');
        ticketList.innerHTML = ''; // Очистить содержимое перед обновлением
  
        data.forEach((ticket) => {
          const ticketItem = document.createElement('div');
          ticketItem.classList.add('ticket-item');
  
          const departureCity = document.createElement('p');
          departureCity.textContent = `Город отправления: ${ticket.departure_city}`;
          ticketItem.appendChild(departureCity);
  
          const arrivalCity = document.createElement('p');
          arrivalCity.textContent = `Город прибытия: ${ticket.arrival_city}`;
          ticketItem.appendChild(arrivalCity);
  
          // Добавьте другие данные о билете аналогичным образом
  
          ticketList.appendChild(ticketItem);
        });
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    getTickets(text1, text2, selectedStartDate, selectedEndDate);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Откуда" value={text1} onChange={(e) => setText1(e.target.value)} className="inputField" />
        <input type="text" placeholder="Куда" value={text2} onChange={(e) => setText2(e.target.value)} className="inputField" />
        <div className="datePickerContainer">
          <DatePicker
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Начальная дата"
            isClearable={true}
            showYearDropdown={true}
            className="datePicker"
          />
          <DatePicker
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Конечная дата"
            isClearable={true}
            showYearDropdown={true}
            minDate={selectedStartDate}
            className="datePicker"
          />
        </div>
        <button type="submit" className="submitButton">Найти билеты</button>
      </form>
    </div>
  );
}

export default TicketSearch;
