const router = require('express').Router();
const bcrypt = require('bcryptjs');

const validateLogin = require('../middleware/validateLogin');

let User = require('../models/user');

router.route('/').post(validateLogin, async(req, res) => {
    const cred = req.body.credentials;

    const user = await User.findOne({username: cred.username});
    if(user) {
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(cred.password, hashedPassword);

        if(isValid) {
            res.json({result: true});
            return
        }
    }
    res.json({result: false});
});

module.exports = router