// TicketList.js
import React from 'react';

class TicketList extends React.Component {
    render() {
      const { tickets } = this.props;
  
      // Проверка наличия билетов
      const hasTickets = tickets && tickets.length > 0;
  
      return (
        <div>
          <h2>Список билетов</h2>
          {hasTickets ? (
            <ul>
              {tickets.map((ticket, index) => (
                <li key={index}>
                  <p>Откуда: {ticket.from_city}</p>
                  <p>Куда: {ticket.to_city}</p>
                  <p>Дата отправления: {ticket.departure_date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Нет доступных билетов</p>
          )}
        </div>
      );
    }
  }
  
  export default TicketList;
  