const router = require('express').Router();
let ProfileInfo = require('../models/profileInfo');

router.route('/').get((req, res) => {
    ProfileInfo.findOne({username: req.query.username})
    .then((result) => {
        if(res != null) {
            res.json(result);
        }
    })
})

router.route('/').post((req, res) => {
    const profileInfo = req.body.values;
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
    ProfileInfo.findOne({username: information.username})
    .then((result) => {
        if(result) {
            ProfileInfo.updateOne({username: information.username}, {address2: information.address2})
            res.json({'message': 'User updated successfully!'})
        }
        else {
            information.save()
            .then(() => {
                res.json({"message": "Information successfully submitted!"})})
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