module.exports = (req, res, next) => {
    const user = req.body.newUser;
    if(!user || !user.username || !user.password || !user.email) {
        res.status(400).json({error: 'Invalid user information'});
        return;
    }
    if(user.email.length < 3 || user.email.length > 255) {
        res.status(400).json({error: 'Email must be between 3 and 255 characters'});
        return;
    }
    if(user.username.length < 3 || user.username.length > 128) {
        res.status(400).json({error: 'Username must be between 3 and 128 characters'});
        return;
    }
    if(user.password.length < 8 || user.password.length > 20) {
        res.status(400).json({error: 'Password must be between 8 and 20 characters'});
        return;
    }
    next();
}
