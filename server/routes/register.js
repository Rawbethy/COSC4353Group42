const router = require('express').Router();
let User = require('../models/user');

router.route('/').post((req, res) => {
    const user = req.body.newUser
    User.findOne({username: user.username}).then((result) => {
        if(result == null) {
            const newUser = new User({
                email: user.email,
                username: user.username,
                password: user.password
            });
            newUser.save().then(() => res.json({message: 'Registration Complete!'}))
            .catch(err => res.json(err))
        }
        else {
            res.json({message: 'User already registered'})
        }
    })

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