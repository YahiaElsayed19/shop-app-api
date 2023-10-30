const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.getProducts);

router.get('/products/search', productsController.searchProducts);

router.get('/products/:brand', productsController.getProductsByBrand);

router.get('/product/:productId', productsController.getProduct);


module.exports = router;
