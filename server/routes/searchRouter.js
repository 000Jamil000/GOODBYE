const Router = require('express')
const  router = new Router 
const searchController = require('../controllers/serchController')


router.get('/get', searchController.getByCityAndDate)

module.exports = router