const express = require('express');
const router = express.Router();
const Quotes = require('../models/quotes');
const profileInfo = require('../models/profileInfo');

class PricingModule {
    constructor(username, gallonsReq){
        this.username = username;
        this.location = .04;
        this.history = 0;
        this.above = .03;
        this.profit = .1;
        this.gallonsReq = gallonsReq;
        this.pricePerGallon = 0
        this.total = 0
    }

    calc() {
        let margin = 1.50 * (this.location - this.history + this.above + this.profit);
        this.pricePerGallon = 1.50 + margin;
        this.total = this.gallonsReq * this.pricePerGallon;
    }
}

router.route('/').post(async(req, res) => {
    const values = req.body.values;
    let price = new PricingModule(values.username, values.gallonsReq);
    if(values.gallonsReq >= 0) {
        let quotesRes = await Quotes.findOne({username: price.username});
        let stateRes = await profileInfo.findOne({username: price.username});
        if(quotesRes !== null && quotesRes.quotes.length > 0) {
            price.history = .01
        }
        if(stateRes.state === 'TX') {
            price.location = .02
        }
        if(price.gallonsReq >= 1000) {
            price.above = .02
        }
        price.calc();
        res.json(price);
    }
})

module.exports = router;