const ApiError = require('../error/ApiError');
const { Ticket } = require('../models/models');



class SearchController {
    async getByCityAndDate(req, res) {
        const { fromCity, toCity, startDate, endDate } = req.query;
      
        try {
          const tickets = await Ticket.findAll({
            where: {
              from_city: fromCity,
              to_city: toCity,
              departure_date: startDate,
              arrival_date: endDate
            },
            attributes: ['from_city', 'to_city', 'departure_date', 'arrival_date', 'departure_time', 'arrival_time']
          });
      
          return res.json(tickets);
        } catch (error) {
          console.error('Ошибка:', error);    
          return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        }
      }
      
}

module.exports = new SearchController();
