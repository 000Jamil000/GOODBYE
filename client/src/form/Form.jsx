import {  useCallback, useState } from "react"
import logo from '../assets/white-airplane.png'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker'

function convertDate(dateStr) {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day}`
}

function Form(props) {
    const {
        setTickets,
        switchToTicketsTab,
    } = props

    const [cityFrom, setCityFrom] = useState('')
    const [cityTo, setCityTo] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const getTickets = useCallback((from, to, startDate, endDate, cost) => {
        const convertedStartDate = convertDate(startDate)
        const convertedEndDate = convertDate(endDate)
       
        fetch(`http://localhost:5000/api/searchRouters/get?fromCity=${from}&toCity=${to}&startDate=${convertedStartDate}&endDate=${convertedEndDate}&price=${cost}`)
          .then((response) => response.json())
          .then((data) => {
            console.log('Билеты:', data);
            setTickets(data); // Устанавливаем билеты в состояние
            switchToTicketsTab()
          })
          .catch((error) => {
            console.error('Ошибка:', error);
          });
      }, [switchToTicketsTab, setTickets])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        getTickets(cityFrom, cityTo, startDate, endDate)
    }, [cityFrom, cityTo, startDate, endDate])

    const  handleStartDateChange = (date) => {
       setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(null)
        }
      };
    
     const  handleEndDateChange = (date) => {
        if (startDate && date < startDate) {
            setStartDate(date)
            setEndDate(null)
        } else {
            setEndDate(date)
        }
      };

    return  (
        <div className="container">
        <form onSubmit={handleSubmit}>
          <div className='text'>
          <h1>GoodBye</h1>
          </div>
            <img src={logo} alt="GoodBye" className='logo' ></img>
          <input
            type="text"
            placeholder="Откуда"
            value={cityFrom}
            onChange={(e) => setCityFrom(e.target.value)}
            className="inputField"
          />
          <input
            type="text"
            placeholder="Куда"
            value={cityTo}
            onChange={(e) => setCityTo(e.target.value)}
            className="inputField"
          />
          <div className="datePickerContainer">
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Начальная дата"
              isClearable={true}
              showYearDropdown={true}
              className="datePicker"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="Конечная дата"
              isClearable={true}
              showYearDropdown={true}
              minDate={startDate}
              className="datePicker"
            />
          </div>
          <button type="submit" className="submitButton" >
            Найти билеты
          </button>
        </form>
      </div>
    )
}


export {
    Form,
}