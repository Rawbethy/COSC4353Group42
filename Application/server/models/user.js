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
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;