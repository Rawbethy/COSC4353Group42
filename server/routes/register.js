const router = require('express').Router();
const validateRegister = require('../middleware/validateRegister');
let User = require('../models/user');

router.route('/').post(validateRegister, async (req, res) => {
    const user = req.body.newUser
    let result = await User.findOne({username: user.username})
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
        res.json({message: 'User already registered'})
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