const Product = require('../models/product');

exports.getProducts = async (req, res, next) => {
    const page = +(req.query.page) || 1;
    const itemsPerPage = 10;
    try {
        const itemsCount = await Product.find().countDocuments();
        const lastPage = Math.ceil(itemsCount / itemsPerPage);
        const products = await Product.find()
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);
        res.status(200).json({
            message: 'Fetched products successfully.',
            products: products,
            page: page,
            prevPage: page == 1 ? null : page - 1,
            nextPage: page == lastPage ? null : page + 1,
            hasNextPage: page < lastPage,
            hasPrevPage: page > 1,
            lastPage: lastPage,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getProductsByBrand = async (req, res, next) => {
    const brand = req.params.brand;
    try {
        const products = await Product.find({ brand: new RegExp(brand, 'i') });
        res.status(200).json({
            message: 'Fetched products successfully.',
            products: products,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        res.status(200).json({
            message: 'Fetched product successfully.',
            product: product,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.searchProducts = async (req, res, next) => {
    const searchTerm = req.query.search;
    try {
        const products = await Product.find({ name: new RegExp(searchTerm, 'gi') })
        res.status(200).json({
            message: 'Searched products successfully.',
            products: products,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};