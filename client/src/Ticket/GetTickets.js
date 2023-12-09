const displayTickets = (tickets) => {
  const ticketContainer = document.getElementById('ticket-container');
  
  ticketContainer.innerHTML = ''; // Очищаем контейнер перед отображением новых билетов
  
  tickets.forEach((ticket) => {
    const ticketElement = document.createElement('div');
    ticketElement.classList.add('ticket');

    const flightNumber = document.createElement('p');
    flightNumber.textContent = `Flight Number: ${ticket.flight_number}`;
    ticketElement.appendChild(flightNumber);

    const seatNumber = document.createElement('p');
    seatNumber.textContent = `Seat Number: ${ticket.seat_number}`;
    ticketElement.appendChild(seatNumber);

    const cost = document.createElement('p');
    cost.textContent = `Cost: ${ticket.cost}`;
    ticketElement.appendChild(cost);

    // Добавьте другие свойства билета, которые хотите отобразить

    ticketContainer.appendChild(ticketElement);
  });
};


const getTickets = (from, to, startDate, endDate) => {
    const url = `http://localhost:5000/api/searchRouters/get?from=${from}&to=${to}&startDate=${startDate}&endDate=${endDate}` ;
        
    
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayTickets(data))
        .catch((error) => console.error('Ошибка:', error));
};