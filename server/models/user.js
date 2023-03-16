const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(err) {
        next(err);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;