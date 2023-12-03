const Router = require('express')
const  router = new Router 
const searchRouter = require('./searchRouter')



router.use('/searchRouters', searchRouter)

module.exports = router