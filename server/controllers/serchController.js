const ApiError = require('../error/ApiError')
const{Ticket} = require('../models/models')

class searchController{
    
    async getAll(req, res){
        const ticket = await Ticket.findAll()
        return res.json(ticket)
    }

}

module.exports = new searchController()