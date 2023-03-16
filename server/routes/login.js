const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user');

router.route('/').post(async(req, res) => {
    const cred = req.body.credentials;

    const user = await User.findOne({username: cred.username});
    const hashedPassword = user.password;
    const isValid = await bcrypt.compare(cred.password, hashedPassword);

    if(isValid) {
        res.json({result: true});
    }
    else {
        res.json({result: false});
    }
});

module.exports = router