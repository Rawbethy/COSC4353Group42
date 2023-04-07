const router = require('express').Router();
const validateProfile = require('../middleware/validateProfile');

let ProfileInfo = require('../models/profileInfo');

router.route('/').get(async (req, res) => {
    let result = await ProfileInfo.findOne({username: req.query.username})
    if(result != null) {
        res.json(result);
    }
    else {
        res.json({message: 'Profile not found'})
    }
})

router.route('/').post(validateProfile, async (req, res) => {
    const profileInfo = req.body.values;
    let profile = await ProfileInfo.findOne({username: profileInfo.username})

    const information = {
        username: profileInfo.username,
        fullName: profileInfo.fullName,
        address1: profileInfo.address1,
        address2: profileInfo.address2,
        city: profileInfo.city,
        state: profileInfo.state,
        zip: profileInfo.zip,
        phone: profileInfo.phone,
        email: profileInfo.email
    }
    if(profile != null) {
        await profile.updateOne({$set: information})
        res.json({message: 'User profile updated successfully!'})
    }
    else {
        await new ProfileInfo(information).save() 
        res.json({message: "Information successfully submitted!"})
    }
});

module.exports = router;