const uri = 'mongodb+srv://admin:yes123@cluster0.l7jtovk.mongodb.net/test'
const mongoose = require('mongoose');
const user = require('../models/user');

beforeAll(async () => {
    
    await mongoose.connect(uri, {
        useNewUrlParser: true
    })
})

afterAll(async () => {
    await user.deleteOne({username: 'test_unique_9231'});
    await mongoose.connection.close();
})


// User.test.js
describe('user', () => {
    test('should create a new user', async () => {

        let newUser = new user({
            username: "test_unique_9231",
            password: "test_test",
            email: "test@egmail.com"
        });

        await newUser.save()

        let savedUser = await user.findOne({username: 'test_unique_9231'});

        expect(savedUser.username).toBe(newUser.username);
        expect(savedUser.password).toBe(newUser.password);
        expect(savedUser.email).toBe(newUser.email);

        await user.deleteOne({username: 'test_unique_9231'});
    })

})