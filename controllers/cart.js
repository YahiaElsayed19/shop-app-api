const Product = require('../models/product')
const User = require('../models/user')

exports.getCart = async (req, res, next) => {
    const user = await User.findById(req.userId).populate('cart.items.product')
    res.status(200).json({
        message: "Fetched cart successfully.",
        cart: user.cart.items
    })
}

exports.addToCart = async (req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await Product.findById(productId)
        if (!product) {
            const error = new Error('Product was not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(req.userId)
        await user.addToCart(product)
        res.status(200).json({
            message: "Added to cart successfully.",
            cart: user.cart
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.removeFromCart = async (req, res, next) => {
    const productId = req.params.productId
    try {
        const product = await Product.findById(productId)
        if (!product) {
            const error = new Error('Product was not found.');
            error.statusCode = 404;
            throw error;
        }
        const user = await User.findById(req.userId)
        await user.removeFromCart(product)
        res.status(200).json({
            message: "Removed from cart successfully.",
            cart: user.cart
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
exports.removeCart = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        await user.removeCart()
        res.status(200).json({
            message: "Cart removed successfully.",
            cart: user.cart
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }

}
