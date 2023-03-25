const mongoose = require('mongoose');
const quoteSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    quotes: [{
        address: {
            type: String,
            required: true
        },
        deliveryDate: {
            type: Date,
            required: true 
        },
        gallonsReq: {
            type: Number,
            required: true
        },
        pricePerGallon: {
            type: Number,
            required: true         
        },
        total: {
            type: Number,
            required: true 
        }
    }] 
}, {
    timestamps: true
});

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;