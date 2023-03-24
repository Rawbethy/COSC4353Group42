const mongoose = require('mongoose');

class pricingModule{
    constructor(address, deliveryDate, gallonsReq, pricePerGallon, total){
        this.address = address;
        this.deliveryDate = deliveryDate;
        this.gallonsReq = gallonsReq;
        this.pricePerGallon = pricePerGallon;
        this.total = total;
    }
    
    totalPrice(){
        return this.total;
    }
    // calculatePrice(){
        //do calculation for pricing here
    // }

}

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