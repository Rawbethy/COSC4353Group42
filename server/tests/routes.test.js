
const request = require("supertest");
const { app, server } = require('../server');
const mongoose = require('mongoose');

const Quotes = require('../models/quotes');
const Profile = require('../models/profileInfo');

const mockUser = {
    email: 'testuser233@gmailx.com',
    username: 'testuser233',
    password: 'aWorkingPassword966@'
}

const mockUserEmail = {
    email: 'testuser233@gmailx.com',
    username: 'testuser123',
    password: 'aWorkingPassword966@'
}

const mockUserUsername = {
    email: 'testuser123@gmailx.com',
    username: 'testuser233',
    password: 'aWorkingPassword966@'    
}


beforeAll(async () => {
    await Profile.deleteOne({ username: mockUser.username })
    await Quotes.deleteOne({ username: mockUser.username })
})

afterAll(async () => {
    await Profile.deleteOne({ username: mockUser.username })
    await Quotes.deleteOne({ username: mockUser.username })
    await mongoose.connection.close()
    await server.close()
})


describe('POST /register', () => {

    it('should return true if the regiser data is valid', async () => {
        let res = await request(app).post('/register').send({ newUser: mockUser })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Registration Complete!")
    })

    it('try duplicate for email', async () => {
        let res = await request(app).post('/register').send({ newUser: mockUserEmail })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Email is already registered")
    })

    it('try duplicate for username', async() => {
        let res = await request(app).post('/register').send({ newUser: mockUserUsername })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Username already taken")
    })
})

describe('POST /login', () => {
    it('should return true if the user is valid', async () => {
        let res = await request(app).post('/login').send({ credentials: mockUser })
        expect(res.statusCode).toBe(200)
        expect(res.body.result).toBe(true)
    })
    it('should return false as invalid user', async () => {
        let res = await request(app).post('/login').send({ credentials: {...mockUser, password: 'none'} })
        expect(res.statusCode).toBe(200)
        expect(res.body.result).toBe(false)
    })
})

describe('GET /profile', () => {
    it('should NOT return the user profile', async () => {
        let res = await request(app).get('/profile').query({ username: 'none' })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Profile not found")
    })
})

describe('POST /profile', () => {
    it('create new profile', async () => {
        let res = await request(app).post('/profile').send({
            values: {
                username: mockUser.username,
                fullName: "Test User",
                address1: "1234 Main St",
                address2: "Apt 1",
                city: "San Jose",
                state: "CA",
                zip: "95123",
                phone: "123-456-7890",
                email: mockUser.email
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Information successfully submitted!")
    })

    it('update profile', async () => {
        let res = await request(app).post('/profile').send({
            values: {
                username: mockUser.username,
                fullName: "Test Userz",
                address1: "1234 Main Sts",
                address2: "Apt 12223",
                city: "San Jose",
                state: "CA",
                zip: "95123",
                phone: "123-456-7890",
                email: mockUser.email
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("User profile updated successfully!")
    })
})

describe('GET /profile', () => {
    it('should return the user profile', async () => {
        let res = await request(app).get('/profile').query({ username: mockUser.username })
        expect(res.statusCode).toBe(200)
        expect(res.body.username).toBe(mockUser.username)
    })

})

describe('GET /quotes', () => {
    it('should NOT return the user quotes', async () => {
        let res = await request(app).get('/quotes').query({ username: mockUser.username })
        expect(res.statusCode).toBe(200)
        expect(res.body.noQuotes).toBe(true)
    })
})
describe('POST /quotes', () => {
    it('create new quote', async () => {
        let res = await request(app).post('/quotes').send({
            values: {
                username: mockUser.username,
                address: "1234 Main St",
                deliveryDate: new Date(),
                gallonsReq: 100,
                pricePerGallon: 1.50,
                total: 150
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Quote submitted successfully!")
    })

    it('create another new quote', async () => {
        let res = await request(app).post('/quotes').send({
            values: {
                username: mockUser.username,
                address: "12354 Main St",
                deliveryDate: new Date(),
                gallonsReq: 1020,
                pricePerGallon: 1.250,
                total: 1505
            }
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Quote submitted successfully!")
    })
})
describe('GET /quotes with quotes', () => {
    it('should return the user quotes', async () => {
        let res = await request(app).get('/quotes').query({username: mockUser.username})
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveLength(2)
    })

})

describe('DELETE /register', () => {
    it('delete temp user', async () => {
        let res = await request(app).delete('/register').send(mockUser)
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("User successfully deleted")
    })

    it('delete invalid user', async () => {
        let res = await request(app).delete('/register').send({username: 'invalidUser'})
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("User does not exist")
    })
})