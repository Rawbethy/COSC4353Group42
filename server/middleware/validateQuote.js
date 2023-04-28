module.exports = (req, res, next) => {
    const quote = req.body.values;
    if(!quote || !quote.username || !quote.deliveryDate || !quote.gallonsReq)
    {
        res.status(400).json({error: 'Invalid quote form information'});
        return;
    } 
    let date = new Date(quote.deliveryDate);
    if(isNaN(date.getDate())) {
        res.status(400).json({error: 'Delivery date must be a valid date'});
        return;
    }
    if(date < Date.now())
    {
        res.status(400).json({error: 'Delivery date must be in the future'});
        return;
    }

    if(isNaN(quote.gallonsReq)) {
        res.status(400).json({error: 'Gallons requested must be a number'});
        return;
    }
    next();
}