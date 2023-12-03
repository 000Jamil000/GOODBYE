const Router = require('express')
const  router = new Router 

router.post('/')
router.get('/get', (req, res) => {
    res.status(200).json({message: ' sfdsfsdf'})
})

module.exports = router