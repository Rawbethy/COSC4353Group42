const uri = 'mongodb+srv://admin:yes123@cluster0.l7jtovk.mongodb.net/test'
const mongoose = require('mongoose');
const testUser = require('../models/testUser');
const mockUser = new testUser({
    username: 'sampleUser',
    password: 'samplePassword',
    email: 'sampleEmail@gmail.com'
})

beforeAll(async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true
    })
})

afterAll(async () => {
    await mongoose.connection.close();
})

describe('Delete and Insert', () => {

    it('delete user if already exists', async() => {
        const alreadyExists = await testUser.findOne({username: mockUser.username});
        if(alreadyExists) {
            await testUser.deleteOne({username: mockUser.username})
            const find = await testUser.findOne({username: mockUser.username});
            expect(find).toBe(null);
        }
        else {
            expect(alreadyExists).toBe(null);
        }
    });


    it('create and save user succesffully', async() => {
        const validUser = new testUser(mockUser);
        const savedUser = await validUser.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(validUser.username);
        expect(savedUser.email).toBe(validUser.email);
        expect(savedUser.password).toBe(validUser.password);
    });
})

describe('Find query', () => {

    it('Test to find previously inserted user', async() => {
        const findUser = await testUser.findOne({username: mockUser.username});
        expect(findUser.username).toBe(mockUser.username);
        expect(findUser.password).toBe(mockUser.password);
        expect(findUser.email).toBe(mockUser.email);
    })
})



