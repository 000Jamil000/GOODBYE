const Router = require('express')
const router = new Router 
const searchRouter = require('./searchRouter')
const fillingRouter = require('./fillingRouter')
const getInfo = require('./getInfoAboutTicketRouter')
const user = require('./userRouter')


router.use('/searchRouters', searchRouter)
router.use('/fillingRouter', fillingRouter)
router.use('/InfoRouter', getInfo)
router.use('/user', user)


module.exports = router