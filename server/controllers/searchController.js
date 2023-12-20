
const { Ticket } = require('../models/models');


class SearchController {


    async getByCityAndDate(req, res) {
        const { fromCity, toCity, startDate, endDate, } = req.query;
      
        try {
          const tickets = await Ticket.findAll({
            where: {
              from_city: fromCity,
              to_city: toCity,
              departure_date: startDate,
              arrival_date: endDate
            },
            attributes: ['from_city', 'to_city', 'departure_date', 'arrival_date', 'departure_time', 'arrival_time', 'cost', 'departure_time_back', 'arrival_time_back']
          });
      
          return res.json(tickets);
        } catch (error) {
          console.error('Ошибка:', error);    
          return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        }
      }

  async getTicketByParams(req, res) {
    const { fromCity, toCity, departureDate } = req.query;

    try {
      const ticket = await Ticket.findOne({
        where: {
          from_city: fromCity,
          to_city: toCity,
          departure_date: departureDate
        },
        attributes: ['from_city', 'to_city', 'departure_date', 'cost']
      });
      return res.json(ticket);
    } catch (error) {
      console.error('Ошибка:', error);    
      return res.status(500).json({ error: 'Ошибка при выполнении запроса' });

    }
  }
  
  async  getReturnTicketByParams(req, res) {
    const { fromCity, toCity, arrivalDate } = req.query;

    try {
      const returnTicket = await Ticket.findOne({
        where: {
          from_city: toCity,
          to_city: fromCity,
          departure_date: arrivalDate
        },
        attributes: ['from_city', 'to_city', 'departure_date', 'cost']
      });
      return res.json(returnTicket);
      
    } catch (error) {
      console.error('Ошибка:', error);    
      return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
    }
  }
  
  async getDepartureCities(req, res) {
    try {
        const departureCities = await Ticket.findAll({
            attributes: ['from_city'],
            group: ['from_city'],
            raw: true // Добавляем эту опцию, чтобы получить простой массив значений
        });

        const departureCitiesList = departureCities.map(city => city.from_city);

        return res.json(departureCitiesList);
    } catch (error) {
        console.error('Ошибка:', error);
        return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
    }
}

}
module.exports = new SearchController();
