import React, { useCallback, useState, useEffect  } from "react";
import Select from "react-select";
import logo from '../assets/white-airplane.png';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

function convertDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

function Form(props) {
    const { setTickets, switchToTicketsTab } = props;
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCityFrom, setSelectedCityFrom] = useState(null);
    const [selectedCityTo, setSelectedCityTo] = useState(null);
  
    useEffect(() => {
      fetch("http://localhost:5000/api/searchRouters/departure-cities")
        .then((response) => response.json())
        .then((data) => {
          const options = data.map((city) => ({
            value: city,
            label: city,
          }));
          setCityOptions(options);
        })
        .catch((error) => {
          console.error("Ошибка при получении городов:", error);
        });
    }, []);


    const getTickets = useCallback((from, to, startDate, endDate) => {
        const convertedStartDate = convertDate(startDate);
        const convertedEndDate = convertDate(endDate);

        const url1 = `http://localhost:5000/api/searchRouters/one-way?fromCity=${from}&toCity=${to}&departureDate=${convertedStartDate}`;
        const url2 = `http://localhost:5000/api/searchRouters/round-trip?fromCity=${from}&toCity=${to}&arrivalDate=${convertedEndDate}`;

        Promise.all([
            fetch(url1).then(res => res.json()),
            fetch(url2).then(res => res.json())
        ])
        .then(([ticketResponse, returnTicketResponse]) => {
            console.log('Билет туда:', ticketResponse);
            console.log('Обратный билет:', returnTicketResponse);
            setTickets([ticketResponse, returnTicketResponse]);
            navigate('/tickets', {   state: { 
                ticketResponse, 
                returnTicketResponse 
            }  });
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
    }, [setTickets, switchToTicketsTab]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        getTickets(selectedCityFrom.value, selectedCityTo.value, startDate, endDate);
    }, [selectedCityFrom, selectedCityTo, startDate, endDate, getTickets]);
    

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        if (startDate && date < startDate) {
            setStartDate(date);
            setEndDate(null);
        } else {
            setEndDate(date);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className='text'>
                    <h1 className="text">GoodBye</h1>
                </div>
                <img src={logo} alt="GoodBye" className='logo' ></img>
                <div className="inputFieldsContainer">
                    <Select
                        options={cityOptions}
                        value={selectedCityFrom}
                        onChange={(selectedOption) => setSelectedCityFrom(selectedOption)}
                        placeholder="Откуда"
                        className="inputField"
                    />

                    <Select
                        options={cityOptions}
                        value={selectedCityTo}
                        onChange={(selectedOption) => setSelectedCityTo(selectedOption)}
                        placeholder="Куда"
                        className="inputField"
                    />
                </div>

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
    );
}

export default Form;