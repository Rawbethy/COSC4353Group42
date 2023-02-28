const router = require('express').Router();
let Quotes = require('../models/quotes');

router.route('/').post((req,res) => {
    const quote = req.body.values; 
    Quotes.findOne({username: quote.username}).then(res1 => {
        if(!res1) {
            const newQuote = new Quotes({
                username: quote.username,
                quotes: {
                    address: quote.address,
                    deliveryDate: quote.deliveryDate,
                    gallonsReq: quote.gallonsReq,
                    pricePerGallon: quote.pricePerGallon,
                    total: quote.total
                }
            });
            newQuote.save();
        }
        else {
            Quotes.updateOne({username: quote.username}, {$push: {
                quotes: {
                    address: quote.address,
                    deliveryDate: quote.deliveryDate,
                    gallonsReq: quote.gallonsReq,
                    pricePerGallon: quote.pricePerGallon,
                    total: quote.total
                }
            }}).then(res2 => {
                console.log(res2);
            })
        }
    });
})

module.exports = router