const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] },
            favorite: { items: [] },
        });
        res.status(201).json({
            message: 'User created',
            userId: user._id,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
exports.signin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('User does not exist.');
            error.statusCode = 404;
            throw error;
        }
        const isEqual = bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Authentication faild.');
            error.statusCode = 422;
            throw error;
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )
        res.status(200).json({
            message: 'signed in successfully.',
            userId: user._id,
            token: token,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
