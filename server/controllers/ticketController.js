const { Ticket, Passenger } = require('../models/models');

class TicketController {
  async buyTicket(req, res) {
    const { ticketId } = req.body;

    // Получение id пользователя из токена (предполагается, что он доступен в req.user)
    const userId = req.user.id;

    try {
      // Поиск соответствующего пассажира по id пользователя
      const passenger = await Passenger.findOne({ where: { userId } });

      if (!passenger) {
        return res.status(404).json({ error: 'Данные пассажира не найдены' });
      }

      // Поиск билета по id и привязка к пассажиру
      const ticket = await Ticket.findByPk(ticketId);

      if (!ticket) {
        return res.status(404).json({ error: 'Билет не найден' });
      }

      // Привязка билета к пассажиру
      await ticket.update({ passenger_id: passenger.id });

      return res.json(ticket);
    } catch (error) {
      console.error('Ошибка:', error);
      return res.status(500).json({ error: 'Ошибка при покупке билета' });
    }
  }
}

module.exports = new TicketController();
