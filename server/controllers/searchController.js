
const { Ticket, Flight } = require('../models/models');

class SearchController {

  
  async getTicketInfo(req, res) {
    try {
      const { fromCity, toCity, departureDate, departureDateBack } = req.query;
  
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
  
      let ticketBackInfo;
      if(departureDateBack){
        ticketBackInfo = await Ticket.findAll({
          attributes: ['seat_number', 'cost'],
          include: {
            model: Flight,
            attributes: ['from_city', 'to_city', 'departure_date', 'departure_time'],
            where: {
              from_city: toCity,
              to_city: fromCity,
              departure_date: departureDateBack
            }
          }
        });
      }
      const combinedInfo = {
        ticketInfo: ticketInfo,
        ticketBackInfo: ticketBackInfo
      };
      if(ticketBackInfo){
        return res.json(combinedInfo);
      }
      else
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


