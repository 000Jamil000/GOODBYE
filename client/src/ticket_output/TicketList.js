import React from 'react';
import styles from './TicketList.module.css';
import logo from '../assets/white-airplane.png';
import ticket_logo from '../assets/image 1.png';

function TicketList({ tickets }) {
  function convertDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  }

  function timeRace(starttime, endtime) {
    if (!starttime || !endtime) {
      return 'Некорректные данные времени';
    }
  
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
      ></img>
      <div className={styles.wrapper}>
        {tickets.map((ticket, index) => (
          <div className={styles.ticket} key={index}>
            <div className={styles.ticket_data_item}>
              <img src={ticket_logo} className={styles.ticket_logo}></img>
              <div className={styles.ticket__price}>{ticket.cost} ₽ </div>
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
                {ticket.departure_time}
              </p>

            </div>
            <div className={styles.ticket_data_item}>
              <p className={styles.ticket_data_time_text}>В пути</p>
              <p className={styles.ticket_time}>
                {ticket.time_race}
              </p>
            </div>
            <div className={styles.ticket_data_item}>
              <p className={styles.ticket_data_time_text}>Без пересадок</p>
              <p className={styles.ticket_data_time_text}>*</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketList;
