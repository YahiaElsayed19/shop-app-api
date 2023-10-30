const User = require('../models/user')
const Order = require('../models/order')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate('cart.items.product')
        let totalAmount = 0
        user.cart.items.forEach(item => {
            totalAmount = totalAmount + (item.product.price * item.quantity)
        })
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2023-10-16' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'EGP',
            customer: customer.id,
        });
        const order = await Order.create({
            products: user.cart.items,
            totalAmount: totalAmount,
            user: {
                email: user.email,
                userId: user._id
            }
        })
        await user.removeCart()
        res.json({
            order: order,
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
            publishableKey: process.env.STRIPE_PUBLIC_kEY
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ 'user.userId': req.userId }).select('products totalAmount')
        res.status(200).json({
            orders: orders,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}