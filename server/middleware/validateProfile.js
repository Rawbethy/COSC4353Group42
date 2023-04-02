module.exports = (req, res, next) => {
    const profileInfo = req.body.values;
    if(!profileInfo || !profileInfo.username || !profileInfo.fullName || !profileInfo.address1 || !profileInfo.city || !profileInfo.state || !profileInfo.zip) {
        res.status(400).json({error: 'Invalid profile information'});
        return;
    }
    if(profileInfo.fullName.length > 50) {
        res.status(400).json({error: 'Full name must be less than 50 characters'});
        return;
    }
    if(profileInfo.address1.length > 100) {
        res.status(400).json({error: 'Address 1 must be less than 100 characters'});
        return;
    }
    if(profileInfo.address2 && profileInfo.address2.length > 100) {
        res.status(400).json({error: 'Address 2 must be less than 100 characters'});
        return;
    }
    if(profileInfo.city.length > 100) {
        res.status(400).json({error: 'City must be less than 100 characters'});
        return;
    }
    if(profileInfo.state.length != 2) 
    {
        res.status(400).json({error: 'State must be 2 characters'});
        return;
    }
    if(profileInfo.zip.length < 5) {
        res.status(400).json({error: 'Zip must be at least 5 characters'});
        return;
    }
    if(profileInfo.zip.length > 9) {
        res.status(400).json({error: 'Zip must be less than or equal to 9 characters'});
        return;
    }

    console.log('Profile Validated')

    next();
}
