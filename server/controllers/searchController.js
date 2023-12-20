
const { Ticket, Flight } = require('../models/models');

class SearchController {



  async getTicketInfo(req, res) {
    const { fromCity, toCity, departureDate } = req.query;

    try {

      const ticketInfo = await Ticket.findAll({
        attributes: ['seat_number', 'cost'],
        include: {
          model: Flight,
          attributes: ['from_city', 'to_city', 'departure_date', 'departure_time'],
          where: {
            from_city: fromCity,
            to_city: toCity,
            departure_date: departureDate
          }
        }
      });
      
      return res.json(ticketInfo);
    } catch (error) {
      console.error('Ошибка:', error);
      throw new Error('Ошибка при выполнении запроса');
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
