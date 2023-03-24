const uri = 'mongodb+srv://admin:yes123@cluster0.l7jtovk.mongodb.net/test'
const mongoose = require('mongoose');
const profileInfo = require('../models/profileInfo');


beforeAll(async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true
    })
})

afterAll(async () => {
    await profileInfo.deleteOne({username: 'test_unique_9221'});
    await mongoose.connection.close();
})


// ProfileInfo.test.js
describe('profileInfo', () => {
    test('should create a new profile', async () => {

        let profile = new profileInfo({
            username: "test_unique_9221",
            fullName: "test",
            address1: "test",
            address2: "test",
            city: "test",
            state: "TX",
            zip: "12345",
            phone: "1234567890",
            email: "test@email.com"
        });

        await profile.save()

        let savedProfile = await profileInfo.findOne({username: 'test_unique_9221'});

        
        expect(savedProfile.username).toBe(profile.username);
        expect(savedProfile.fullName).toBe(profile.fullName);
        expect(savedProfile.address1).toBe(profile.address1);
        expect(savedProfile.address2).toBe(profile.address2);
        expect(savedProfile.city).toBe(profile.city);
        expect(savedProfile.state).toBe(profile.state);
        expect(savedProfile.zip).toBe(profile.zip);
        expect(savedProfile.phone).toBe(profile.phone);
        expect(savedProfile.email).toBe(profile.email);
    
        await profileInfo.deleteOne({username: 'test_unique_9221'});
    });
});
