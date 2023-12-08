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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Добавьте здесь вашу логику для обработки данных формы
    console.log('Отправка данных:', text1, text2, selectedStartDate, selectedEndDate);
  };

  return (
    <div className="container">
      <img src="./assets/white-airplane.svg" alt="" className="logo" />
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