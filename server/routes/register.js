const router = require('express').Router();
const validateRegister = require('../middleware/validateRegister');
let User = require('../models/user');

router.route('/').post(validateRegister, async (req, res) => {
    const user = req.body.newUser
    let result = await User.findOne({ $or: [ {username: user.username}, {email: user.email}]})
    if(result == null) {
        const newUser = new User({
            email: user.email,
            username: user.username,
            password: user.password
        });
        await newUser.save();
        res.json({message: 'Registration Complete!'})
    }
    else {
        if(result.username === user.username && result.email !== user.email) {
            res.json({message: 'Username already taken'})
        }
        else if(result.email === user.email && result.username !== user.username) {
            res.json({message: 'Email is already registered'})
        }
    }
})
router.route('/').delete((req, res) => {
    const user = req.body
    User.findOneAndDelete({username: user.username}).then((result) => {
        if(result == null) {
            res.json({message: 'User does not exist'})
        }
        else {
            res.json({message: 'User successfully deleted'})
        }
    })
})

module.exports = router