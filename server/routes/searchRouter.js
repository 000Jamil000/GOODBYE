const Router = require('express');
const router = new Router();
const searchController = require('../controllers/searchController');


// Роут для поиска билетов в одну сторону
router.get('/one-way', searchController.getTicketInfo);

// Роут для поиска билетов туда и обратно
router.get('/round-trip', searchController.getReturnTicketByParams);

// Роут для получения списка городов вылета
router.get('/departure-cities', searchController.getDepartureCities);

module.exports = router;
