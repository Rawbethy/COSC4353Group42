const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        minLength: 2
    },
    zip: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 9
    },
    phone: {
        type: String,
        required: true,
        minLength: 9
    },
    email: {
        type: String,
        required: true,
        minLength: 9
    }        
}, {
    timestamps: true
});

const profileInfo = mongoose.model('Profile', profileSchema);
module.exports = profileInfo;