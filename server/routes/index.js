const Router = require('express')
const router = new Router 
const searchRouter = require('./searchRouter')
const fillingRouter = require('./fillingRouter')
const getInfo = require('./getInfoAboutTicketRouter')
const user = require('./userRouter')
const buyRouter = require('./buyRouter')

router.use('/searchRouters', searchRouter)
router.use('/fillingRouter', fillingRouter)
router.use('/InfoRouter', getInfo)
router.use('/user', user)
router.use('/buy', buyRouter)

module.exports = router