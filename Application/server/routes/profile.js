const router = require('express').Router();
let ProfileInfo = require('../models/profileInfo');

router.route('/').post((req, res) => {
    const profileInfo = req.body.values;
    res.json({"message": "Information successfully submitted!"})
    // const information = new ProfileInfo({
    //     fullName: profileInfo.fullName,
    //     address1: profileInfo.address1,
    //     address2: profileInfo.address2,
    //     city: profileInfo.city,
    //     state: profileInfo.state,
    //     zip: profileInfo.zip,
    //     phone: profileInfo.phone,
    //     email: profileInfo.email
    // })
    // console.log(information.fullName);
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