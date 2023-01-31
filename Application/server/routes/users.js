const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req, res) => {
    User.find().then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/createUser').post((req, res) => {
    const user = req.body.user;
    const newUser = new User({
        username: user.username
    });

    newUser.save().then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;