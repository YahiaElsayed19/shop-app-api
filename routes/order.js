const express = require('express');

const isAuth = require('../middlewares/is-auth');
const orderController = require('../controllers/order');

const router = express.Router();

router.post('/checkout', isAuth, orderController.createOrder)

router.get('/orders', isAuth, orderController.getOrders)

module.exports = router;
