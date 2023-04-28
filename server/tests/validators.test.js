let validateLogin = require('../middleware/validateLogin');
let validateProfile = require('../middleware/validateProfile');
let validateQuote = require('../middleware/validateQuote');
let validateRegister = require('../middleware/validateRegister');

let express = require('express');
let supertest = require('supertest');

let app = express();



app.use(express.json());

app.use('/register', validateRegister);
app.use('/login', validateLogin);
app.use('/profile', validateProfile);
app.use('/quotes', validateQuote);

let server;

beforeAll(async () => {
    server = await app.listen(3000);
});

afterAll(async () => {
    await server.close();
});

describe('validateLogin', () => {
    test('should return 400 if no credentials', () => {
        return supertest(app)
            .post('/login')
            .send({})
            .expect(400);
    })

    test('should return 400 if no username', () => {
        return supertest(app)
            .post('/login')
            .send({credentials: {password: 'password'}})
            .expect(400);
    })

    test('should return 400 if no password', () => {
        return supertest(app)
            .post('/login')
            .send({credentials: {username: 'username'}})
            .expect(400);
    })

});

describe('validateRegister', () => {
    test('should return 400 if no user', () => {
        return supertest(app)
            .post('/register')
            .send({})
            .expect(400);
    })
    // password
    test('should return 400 if password too short', () => {
        return supertest(app)
            .post('/register')
            .send({newUser: {username: 'username', email: "testemail@email.com", password: 'pass'}})
            .expect(400);
    })
    test('should return 400 if password too long', () => {
        return supertest(app)
            .post('/register')
            .send({
                newUser: {
                    username: 'username',
                    email: "test@email.com",
                    password: 'password'.repeat(21)
                }
            })
            .expect(400);
    })
    // username
    test('should return 400 if username too short', () => {
        return supertest(app)
            .post('/register')
            .send({
                newUser: {
                    username: 'us',
                    email: "testemail@email.com",
                    password: 'password'
                }
            })
            .expect(400);
    })
    test('should return 400 if username too long', () => {
        return supertest(app)
            .post('/register')
            .send({ 
                newUser: {
                    username: 'username'.repeat(33),
                    email: "test@email.com",
                    password: 'password'
                }
            })
            .expect(400);
    })
    //email
    test('should return 400 if email too short', () => {
        return supertest(app)
            .post('/register')
            .send({
                newUser: {
                    username: 'username',
                    email: "te",
                    password: 'password'
                }
            })
            .expect(400);
    })
    test('should return 400 if email too long', () => {
        return supertest(app)
            .post('/register')
            .send({
                newUser: {
                    username: 'username',
                    email: "email".repeat(64) + "@gmail.com",
                    password: 'password'
                }
            })
            .expect(400);
    })
});

describe('validateProfile', () => {
    test('should return 400 if no profile', () => {
        return supertest(app)
            .post('/profile')
            .send({})
            .expect(400);
    })

    test('should return 400 if no username', () => {
        return supertest(app)
            .post('/profile')
            .send({values: {
                fullName: 'fullName',
                address1: 'address1',
                city: 'city',
                state: 'state',
                zip: '77777'
            }})
            .expect(400);
    })

    test('should return 400 if no fullName', () => {
        return supertest(app)
            .post('/profile')
            .send({values: {
                username: 'username',
                address1: 'address1',
                city: 'city',
                state: 'state',
                zip: '77777'
            }})
            .expect(400);
    })

    test('should return 400 if fullName too long', () => {
        return supertest(app)
            .post('/profile')
            .send({values: {
                username: 'username', 
                fullName: 'fullName'.repeat(101),
                address1: 'address1',
                city: 'city',
                state: 'state',
                zip: '77777'
            }})
            .expect(400);
    })

    test('should return 400 if no address1', () => {
        return supertest(app)
            .post('/profile')
            .send({values: {
                username: 'username', 
                fullName: 'fullName',
                city: 'city',
                state: 'state',
                zip: '77777'
            }})
            .expect(400);
    })

    test('should return 400 if address1 too long', () => {
        return supertest(app)
            .post('/profile')
            .send({
                values: {
                    username: 'username',
                    fullName: 'fullName',
                    address1: 'address1'.repeat(101),
                    city: 'city',
                    state: 'state',
                    zip: '77777'
                }
            })
            .expect(400);
    })

    test('should return 400 if address2 too long', () => {
        return supertest(app)
            .post('/profile')
            .send({
                values: {
                    username: 'username',
                    fullName: 'fullName',
                    address1: 'address1',
                    address2: 'address2'.repeat(101),
                    city: 'city',
                    state: 'state',
                    zip: '77777'
                }
            })
            .expect(400);
    })

    test('should return 400 if city too long', () => {
        return supertest(app)
            .post('/profile')
            .send({
                values: {
                    username: 'username',
                    fullName: 'fullName',
                    address1: 'address1',
                    city: 'city'.repeat(101),
                    state: 'state',
                    zip: '77777'
                }
            })
            .expect(400);
    })

    test('should return 400 if state not 2 characters', () => {
        return supertest(app)
            .post('/profile')
            .send({
                values: {
                    username: 'username',
                    fullName: 'fullName',
                    address1: 'address1',
                    city: 'city',
                    state: 'state',
                    zip: '77777'
                }
            })
            .expect(400);
    })

    test('should return 400 if zip not 5 characters', () => {
        return supertest(app)
            .post('/profile')
            .send({
                values: {
                    username: 'username',
                    fullName: 'fullName',
                    address1: 'address1',
                    city: 'city',
                    state: 'TX',
                    zip: '7777'
                }
            })
            .expect(400);
    })

    test('should return 400 if zip more than 9 chars', () => {
        return supertest(app)
            .post('/profile')
            .send({
                values: {
                    username: 'username',
                    fullName: 'fullName',
                    address1: 'address1',
                    city: 'city',
                    state: 'TX',
                    zip: '7777777777'
                }
            })
            .expect(400);
    })
})

describe('validateQuote', () => {

    test('should return 400 if no quote', () => {
        return supertest(app)
            .post('/quotes')
            .send({})
            .expect(400);
    })

    test('should return 400 if no username', () => {
        return supertest(app)
            .post('/quotes')
            .send({values: {deliveryDate: '2020-01-01', gallonsReq: 100}})
            .expect(400);
    })

    test('should return 400 if no deliveryDate', () => {
        return supertest(app)
            .post('/quotes')
            .send({
                values: {
                    username: 'username',
                    gallonsReq: 100
                }
            })
            .expect(400);
    })
    test('should return 400 if no gallonsReq', () => {
        return supertest(app)
            .post('/quotes')
            .send({
                values: {
                    username: 'username',
                    deliveryDate: '2020-01-01'
                }
            })
            .expect(400);
    })
    test('should return 400 if deliveryDate not a date', () => {
        return supertest(app)
            .post('/quotes')
            .send({
                values: {
                    username: 'username',
                    deliveryDate: 'not a date',
                    gallonsReq: 100
                }
            })
            .expect(400);
    })
    test('should return 400 if deliveryDate not in the future', () => {
        return supertest(app)
            .post('/quotes')
            .send({
                values: {
                    username: 'username',
                    deliveryDate: new Date('2019-01-01'),
                    gallonsReq: 100
                }
            })
            .expect(400);
    })

    test('should return 400 if gallonsReq not a number', () => {
        return supertest(app)
            .post('/quotes')
            .send({
                values: {
                    username: 'username',
                    deliveryDate: new Date(Date.now() + 1000),
                    gallonsReq: '@@@'
                }
            })
            .expect(400);
    })
})