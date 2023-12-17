const Router = require('express')
const  router = new Router 
const fillingController = require('../controllers/fillingController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, fillingController.savePassengerData)

module.exports = router