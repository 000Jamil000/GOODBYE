import React from 'react';
import styles from './TicketList.module.css';
import logo from '../assets/white-airplane.png';
import ticket_logo from '../assets/image 1.png';
class TicketList extends React.Component {
  render() {
    const { tickets, switchToForm } = this.props;

    // Проверка наличия билетов
    const hasTickets = tickets && tickets.length > 0;

    function convertDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    }

    function timeRace(starttime, endtime) {
      const [startHours, startMinutes, startSeconds] = starttime.split(':').map(Number);
      const [endHours, endMinutes, endSeconds] = endtime.split(':').map(Number);

      const start = new Date(0, 0, 0, startHours, startMinutes, startSeconds);
      const end = new Date(0, 0, 0, endHours, endMinutes, endSeconds);

      const differenceMs = end - start;

      const hours = Math.floor(differenceMs / (1000 * 60 * 60));
      const minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));

      if (minutes === 0) {
        return `${hours} часа`;
      } else {
        return `${hours} часа ${minutes} минут`;
      }
    }

    return (
      <div className={styles.container}>
        <img
          src={logo}
          alt="GoodBye"
          className={styles.logo}
          onClick={switchToForm}
        ></img>
        <div className={styles.wrapper}>
          {hasTickets ? (
            tickets.map((ticket, index) => (
              <div className={styles.ticket} key={index}>

                <div className={styles.ticket_data_item}>
                <img src={ticket_logo} className={styles.ticket_logo}></img>
                <div className={styles.ticket__price}> {ticket.cost} ₽ </div>
                  <button className={styles.button_for_bye_ticket}> КУПИТЬ БИЛЕТ</button>
                  </div>
                  <div className={styles.ticket_data_item}>
                    <p className={styles.ticket_data_of_city}>
                      {ticket.from_city} - {ticket.to_city}
                    </p>
                    <p className={styles.ticket_date}>
                      {convertDate(ticket.departure_date)} 
                    </p>
                    <p className={styles.ticket_time}>
                      {ticket.departure_time} - {ticket.arrival_time}
                    </p>
                 
                    <p className={styles.ticket_data_of_city}>
                      {ticket.to_city} - {ticket.from_city}
                    </p>
                    <p className={styles.ticket_date}>
                      {convertDate(ticket.arrival_date)}
                      
                    </p>
                    <p className={styles.ticket_time}>
                      {ticket.departure_time_back} - {ticket.arrival_time_back}
                    </p>
                  </div>
                  <div className={styles.ticket_data_item}>
                    <p className={styles.ticket_data_time_text}>В пути</p>
                    <p className={styles.ticket_time}> {timeRace(ticket.departure_time, ticket.arrival_time)}</p>
                    <p className={styles.ticket_data_time_text}>В пути</p>
                    <p className={styles.ticket_time}> {timeRace(ticket.departure_time_back, ticket.arrival_time_back)}</p>
                    </div>
                  <div className={styles.ticket_data_item}>
                    <p className={styles.ticket_data_time_text}>Без пересадок</p>
                    <p className={styles.ticket_data_time_text}>*</p>
                    <p className={styles.ticket_data_time_text}>Без пересадок</p>
                    <p className={styles.ticket_data_time_text}>*</p>
                  </div>
                </div>

            ))
          ) : (
            <p className={styles.no_tickets}>
              Нет билетов по заданному маршруту и дате
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default TicketList;



/* <div className={styles.container}>

<div className={styles.content}>
<h2>Список билетов</h2>
{hasTickets ? (
  <ul>
    {tickets.map((ticket, index) => (
      <li key={index}>
        <p>{ticket.from_city} - {ticket.to_city}</p>
        <p>Дата отправления: {convertDate(ticket.departure_date)}</p>
        <p>Время вылета: {ticket.departure_time}</p>
        <p>Время прибытия: {ticket.arrival_time}</p>
      </li>
    ))}
  </ul>
) : (
  <p>Нет доступных билетов</p>
)}
<button onClick={switchToForm}>
  Вернуться к форме
</button>
</div>
</div> */


