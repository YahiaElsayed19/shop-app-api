const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: { type: Number, required: true },
            },
        ],
    },
    favorite: {
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
    },
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(
        (cp) => cp.product.toString() === product._id.toString()
    );
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        updatedCartItems[cartProductIndex].quantity =
            this.cart.items[cartProductIndex].quantity + 1;
    } else {
        updatedCartItems.push({ product: product._id, quantity: 1 });
    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(
        (cp) => cp.product.toString() === product._id.toString()
    );
    let updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        if (updatedCartItems[cartProductIndex].quantity > 1) {
            updatedCartItems[cartProductIndex].quantity =
                updatedCartItems[cartProductIndex].quantity - 1;
        } else {
            updatedCartItems = updatedCartItems.filter(
                (uci) => uci.product.toString() !== product._id.toString()
            );
        }
    } else {
        return;
    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeCart = function () {
    this.cart = { items: [] };
    this.save();
};

userSchema.methods.addToFavorite = function (product) {
    const favProductIndex = this.favorite.items.findIndex(
        (fp) => fp.product.toString() === product._id.toString()
    );
    const updatedFavoriteItems = [...this.favorite.items];
    if (favProductIndex >= 0) {
        return
    }
    updatedFavoriteItems.push({ product: product._id });
    const updatedFavorite = { items: updatedFavoriteItems };
    this.favorite = updatedFavorite;
    return this.save();
};

userSchema.methods.removeFromFavorite = function (product) {
    const updatedFavoriteItems = this.favorite.items.filter(fv => fv.product.toString() !== product._id.toString())
    this.favorite.items = updatedFavoriteItems;
    return this.save();
};

userSchema.methods.removeFavorite = function () {
    this.favorite = { items: [] };
    this.save();
};

module.exports = mongoose.model('User', userSchema);
