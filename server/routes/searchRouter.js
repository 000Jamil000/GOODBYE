const Router = require('express');
const router = new Router();
const searchController = require('../controllers/searchController');


router.get('/one-way', searchController.getTicketInfo);

router.get('/departure-cities', searchController.getDepartureCities);

module.exports = router;
