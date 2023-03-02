const mongoose = require('mongoose');
const userSchema = new mongoose.Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minLength: 8
    },
    userInfo: {
        fullName: {
            type: String
        },
        address1: {
            type: String
        },
        address2: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String,
            minLength: 2
        },
        zipcode: {
            type: String,
            minLength: 5,
            maxlength: 9
        },
        phoneNum: {
            type: String,
            minLength: 9
        },
        email: {
            type: String,
            minLength: 9
        }        
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;