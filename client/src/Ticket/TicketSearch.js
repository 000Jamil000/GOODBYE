import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TicketSearch.css';
import TicketList from './TicketList.js'; // Путь к вашему компоненту TicketList



class TicketSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text1: '',
      text2: '',
      selectedStartDate: null,
      selectedEndDate: null,
      foundTickets: [],
    };
  }

  handleStartDateChange = (date) => {
    this.setState({ selectedStartDate: date });
    if (this.state.selectedEndDate && date > this.state.selectedEndDate) {
      this.setState({ selectedEndDate: null });
    }
  };

  handleEndDateChange = (date) => {
    if (this.state.selectedStartDate && date < this.state.selectedStartDate) {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: this.state.selectedStartDate,
      });
    } else {
      this.setState({ selectedEndDate: date });
    }
  };

  getTickets = (from, to, startDate, endDate) => {
    fetch(`http://localhost:5000/api/searchRouters/get?fromCity=${from}&toCity=${to}&startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Билеты:', data);
        this.setState({ foundTickets: data }); // Устанавливаем билеты в состояние
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text1, text2, selectedStartDate, selectedEndDate } = this.state;
    this.getTickets(text1, text2, selectedStartDate, selectedEndDate);
  };

  render() {
    const {
      text1,
      text2,
      selectedStartDate,
      selectedEndDate,
      foundTickets,
    } = this.state;
  
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Откуда"
            value={text1}
            onChange={(e) => this.setState({ text1: e.target.value })}
            className="inputField"
          />
          <input
            type="text"
            placeholder="Куда"
            value={text2}
            onChange={(e) => this.setState({ text2: e.target.value })}
            className="inputField"
          />
          <div className="datePickerContainer">
            <DatePicker
              selected={selectedStartDate}
              onChange={this.handleStartDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Начальная дата"
              isClearable={true}
              showYearDropdown={true}
              className="datePicker"
            />
            <DatePicker
              selected={selectedEndDate}
              onChange={this.handleEndDateChange}
              dateFormat="yyyy/MM/dd"
              placeholderText="Конечная дата"
              isClearable={true}
              showYearDropdown={true}
              minDate={selectedStartDate}
              className="datePicker"
            />
          </div>
          <button type="submit" className="submitButton">
            Найти билеты
          </button>
        </form>
        {foundTickets.length > 0 && <TicketList tickets={foundTickets} />}
      </div>
    );
  }
}  
export default TicketSearch;
