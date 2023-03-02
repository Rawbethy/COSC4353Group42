const router = require('express').Router();
let Quotes = require('../models/quotes');

router.route('/').post(async(req,res) => {
    const quote = req.body.values; 
    await Quotes.findOne({username: quote.username}).then(async(res1) => {
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
            newQuote.save().then(() => {
                res.json({message: 'Quote submitted successfully!'})
            });
        }
        else {
            await Quotes.updateOne({username: quote.username}, {$push: {
                quotes: {
                    address: quote.address,
                    deliveryDate: quote.deliveryDate,
                    gallonsReq: quote.gallonsReq,
                    pricePerGallon: quote.pricePerGallon,
                    total: quote.total
                }
            }}).then(() => {
                res.json({message: 'Quote submitted successfully!'});
            })
        }
    });
})

module.exports = router