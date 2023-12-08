const ApiError = require('../error/ApiError')
const{Ticket} = require('../models/models')

class searchController {
    async getByCityAndDate(req, res) {
      const { fromCity, toCity, date } = req.query;
  
      try {
        const tickets = await Ticket.findAll({
          where: {
            fromCity,
            toCity,
            departureDate: date, // предположим, что в вашей таблице есть поля fromCity, toCity и departureDate для соответствующих значений
          },
          attributes: ['fromCity', 'toCity', 'departureDate', 'arrivalDate', 'departureTime', 'arrivalTime'], // Выбираем только необходимые столбцы
        });
  
        return res.json(tickets);
      } catch (error) {
        return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
      }
    }
  }
  

module.exports = new searchController()