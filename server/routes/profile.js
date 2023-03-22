const router = require('express').Router();
let ProfileInfo = require('../models/profileInfo');

router.route('/').get(async (req, res) => {
    let result = await ProfileInfo.findOne({username: req.query.username})
    if(result != null) {
        res.json(result);
        return
    }

    res.json({message: 'Profile not found'})
})

router.route('/').post(async (req, res) => {
    const profileInfo = req.body.values;
    await ProfileInfo.findOne({username: profileInfo.username})
    .then((result) => {
        const information = new ProfileInfo({
            username: profileInfo.username,
            fullName: profileInfo.fullName,
            address1: profileInfo.address1,
            address2: profileInfo.address2,
            city: profileInfo.city,
            state: profileInfo.state,
            zip: profileInfo.zip,
            phone: profileInfo.phone,
            email: profileInfo.email
        })
        if(result != null) {
            ProfileInfo.updateOne({username: profileInfo.username}, {$set: information}).then(() => {
                res.json({message: 'User updated successfully!'})
            }).catch((err) => {
                res.json({message: {err}})
            })
        }
        else {
            information.save()
            .then(() => {
                res.json({message: "Information successfully submitted!"})})
            .catch((err) => {
                res.json(err)
            })
        }
    })
});

// router.route('/createUser').post((req, res) => {
//     const user = req.body.user;
//     const newUser = new User({
//         username: user.username
//     });

//     newUser.save().then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err))
// });

// router.route('/deleteUser').post((req, res) => {
//     const user = req.body.user
//     User.deleteOne({username : user.username}).catch((err) => {
//         console.log('Error: ' + err)
//     })
//     User.find().then((users) => res.json(users)).catch((err) => {
//         res.status(400).json('Error: ' + err)
//     })
// })

module.exports = router;