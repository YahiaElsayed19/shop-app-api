const express = require('express');

const isAuth = require('../middlewares/is-auth');
const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/cart', isAuth, cartController.getCart);

router.put('/add-to-cart/:productId', isAuth, cartController.addToCart);

router.put(
    '/remove-from-cart/:productId',
    isAuth,
    cartController.removeFromCart
);

router.put('/remove-cart', isAuth, cartController.removeCart);

module.exports = router;
