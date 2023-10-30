const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsRoutes = require('./routes/products')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const favoriteRoutes = require('./routes/favorite')
const orderRoutes = require('./routes/order')

const app = express();

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', cartRoutes)
app.use('/api', favoriteRoutes)
app.use('/api', orderRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then((result) => {
        console.log('Connected to db');
        app.listen(4000);
    })
    .catch(error => {
        console.log(error);
    });
