const Router = require('express')
const  router = new Router 
const searchController = require('../controllers/searchController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/', authMiddleware, searchController.getByCityAndDate)

module.exports = router