const router = require('express').Router();
let User = require('../models/user')

router.route('/').post((req, res) => {
    const cred = req.body.credentials;
    const userCred = new User({
        username: cred.username,
        password: cred.password
    })

    User.findOne({username: userCred.username, password: userCred.password}).then((result) => {
        if(result != null) {
            res.json({result: true})
        }
        else {
            res.json({result: false})
        }
    })
});

module.exports = router