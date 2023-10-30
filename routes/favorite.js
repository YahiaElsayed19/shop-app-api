const express = require('express');

const isAuth = require('../middlewares/is-auth');
const favoriteController = require('../controllers/favorite');

const router = express.Router();

router.get('/favorite', isAuth, favoriteController.getFavorite);

router.put(
    '/add-to-favorite/:productId',
    isAuth,
    favoriteController.addToFavorite
);

router.put(
    '/remove-from-favorite/:productId',
    isAuth,
    favoriteController.removeFavorite
);

router.put('/remove-favorite', isAuth, favoriteController.removeFavorite);

module.exports = router;
