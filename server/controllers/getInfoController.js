const {Passenger} = require('../models/models')

class getInfo{

    async infoAboutPassenger(req, res){
        const{fullName, passportData, email} = req.query

        try {
          const whereClause = {};
          if (fullName) whereClause.full_name = fullName;
          if (passportData) whereClause.passport_data = passportData;
          if (email) whereClause.email = email;

          const passenger = await Passenger.findAll({
              where: whereClause,
              attributes: ['full_name', 'passport_data', 'email']
            });
        
            return res.json(passenger);
        } catch (error) {
        console.error('Ошибка:', error);    
        return res.status(500).json({ error: 'Ошибка при выполнении запроса' });
        }
        
    }
}

module.exports = new getInfo();