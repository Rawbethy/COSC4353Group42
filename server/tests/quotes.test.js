const uri = 'mongodb+srv://admin:yes123@cluster0.l7jtovk.mongodb.net/test'
const mongoose = require('mongoose');
const Quotes = require('../models/quotes.js');


beforeAll(async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true
    })
})

afterAll(async () => {
    await Quotes.deleteOne({username: 'test_unique_112'});
    await mongoose.connection.close();
})


// quotes.test.js
describe('quotes', () => {
    test('should create a new quote', async () => {
        const newQuote = new Quotes({
            username: "test_unique_112",
            quotes: {
                address: "test",
                deliveryDate: new Date(),
                gallonsReq: "150",
                pricePerGallon: "1.50",
                total: "225.00",
            }
        });
        await newQuote.save()

        let fetchQuote = await Quotes.findOne({username: 'test_unique_112'});

        expect(fetchQuote.username).toBe(newQuote.username);
        expect(fetchQuote.quotes.address).toBe(newQuote.quotes.address);
        expect(fetchQuote.quotes.deliveryDate).toBe(newQuote.quotes.deliveryDate);
        expect(fetchQuote.quotes.gallonsReq).toBe(newQuote.quotes.gallonsReq);
        expect(fetchQuote.quotes.pricePerGallon).toBe(newQuote.quotes.pricePerGallon);
        expect(fetchQuote.quotes.total).toBe(newQuote.quotes.total);

        await Quotes.updateOne({username: newQuote.username}, {$push: {
            quotes: {
                address: newQuote.address,
                deliveryDate: new Date(),
                gallonsReq: newQuote.gallonsReq,
                pricePerGallon: newQuote.pricePerGallon,
                total: newQuote.total
            }
        }})

        fetchQuote = await Quotes.findOne({username: 'test_unique_112'});

        expect(fetchQuote.username).toBe(newQuote.username);
        expect(fetchQuote.quotes).toHaveLength(2);

    });
});

const PricingModule = require('../models/pricing.js');

describe('pricemodule', () => {
    const ts = new Date();
    let pricingModule = new PricingModule("test", ts, "150", "1.50", "225.00");
    test('should create a new quote',  () => {
        expect(pricingModule.address).toBe("test");
        expect(pricingModule.deliveryDate).toBe(ts);
        expect(pricingModule.gallonsReq).toBe("150");
        expect(pricingModule.pricePerGallon).toBe("1.50");
        expect(pricingModule.total).toBe("225.00");

        expect(pricingModule.totalPrice()).toBe("225.00");
    });
})
