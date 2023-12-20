const { Passenger} = require('../models/models');



class fillingController {
  async savePassengerData(req, res) {
    const { fullName, passportData} = req.body;
    
    try {

      const passenger = await Passenger.create({

        full_name: fullName,
        passport_data: passportData,
        userId: req.user.id
      });

      return res.json(passenger);
    } catch (error) {
      console.error('Ошибка:', error);
      return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
    }
  }
}

module.exports = new fillingController();
