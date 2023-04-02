const router = require('express').Router();
const validateQuote = require('../middleware/validateQuote');
let Quotes = require('../models/quotes');

router.route('/').get(async(req, res) => {
    const user = req.query.username
    let res1 = await Quotes.findOne({username: user})
    if(res1) {
        res.json(res1.quotes);
    }
    else {
        res.json({noQuotes: true})
    }
})

router.route('/').post(validateQuote, async(req,res) => {
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