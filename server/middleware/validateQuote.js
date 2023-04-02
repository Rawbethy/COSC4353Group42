module.exports = (req, res, next) => {
    const quote = req.body.values;
    if(!quote || !quote.username || !quote.deliveryDate || !quote.gallonsReq)
    {
        res.status(400).json({error: 'Invalid quote information'});
        return;
    } 

    if(isNaN(new Date(quote.deliveryDate).getDate())) {
        res.status(400).json({error: 'Delivery date must be a date'});
        return;
    }
    if(isNaN(quote.gallonsReq)) {
        res.status(400).json({error: 'Gallons requested must be a number'});
        return;
    }
    next();
}