const Router = require('express')
const  router = new Router 
const ticketController = require('../controllers/ticketController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, ticketController.buyTicket)


module.exports = router