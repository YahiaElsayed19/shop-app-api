const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.post(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom(async (value, { req }) => {
                const existUser = await User.findOne({ email: value });
                if (existUser) {
                    return Promise.reject(
                        'Email exists already, please pick a different one.'
                    );
                }
            }),
        body(
            'password',
            'Please enter a password with atleast 6 characters.'
        ).isLength({ min: 6 }),
        body('name', 'Please enter a name.').notEmpty(),
    ],
    authController.signup
);

router.post(
    '/signin',
    [
        body('email').isEmail().withMessage('Please enter a valid email.'),
        body(
            'password',
            'Please enter a password with atleast 6 characters.'
        ).isLength({ min: 6 }),
    ],
    authController.signin
);

module.exports = router;
