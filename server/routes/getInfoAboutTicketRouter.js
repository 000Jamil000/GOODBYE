const Router = require('express')
const  router = new Router 
const getInfo = require('../controllers/getInfoController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/', getInfo.infoAboutPassenger)


module.exports = router