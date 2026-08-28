const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);
