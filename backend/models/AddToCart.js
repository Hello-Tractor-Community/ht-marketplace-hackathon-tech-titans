const mongoose = require('mongoose');

const AddToCartModel = new mongoose.Schema(
    {
        product: {
            id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            type: {
                type: String,
                enum: ['tractor', 'spare'],
                required: true,
            },
            images:[String]
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: function () {
                return this.quantity * this.product.price;
            },
        },
        sessionId: {
            type: String,
            required: false, // Use this field for non-logged-in users
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: false, // Use this for logged-in users
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const AddToCart = mongoose.model('AddToCart', AddToCartModel);

module.exports = AddToCart;
