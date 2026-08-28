const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingSchema = new Schema({
    customerId: {
        type: String,
        required: true
    },

    products: [
        {
            productId: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Shopping', ShoppingSchema);
