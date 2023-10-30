const Product = require('../models/product')
const User = require('../models/user')

exports.getFavorite = async (req, res, next) => {
    const user = await User.findById(req.userId).populate('favorite.items.product')
    res.status(200).json({
        message: "Fetched favorites successfully.",
        favorite: user.favorite.items
    })
}

exports.addToFavorite = async (req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await Product.findById(productId)
        if (!product) {
            const error = new Error('Product was not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(req.userId)
        await user.addToFavorite(product)
        res.status(200).json({
            message: "Added to favorite successfully.",
            favorite: user.favorite
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.removeFromFavorite = async (req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await Product.findById(productId)
        if (!product) {
            const error = new Error('Product was not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(req.userId)
        await user.removeFromFavorite(product)
        res.status(200).json({
            message: "Removed from favorite successfully.",
            favorite: user.favorite
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.removeFavorite = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        await user.removeFavorite()
        res.status(200).json({
            message: "Favorite removed successfully.",
            favorite: user.favorite
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }

}