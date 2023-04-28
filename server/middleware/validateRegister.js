module.exports = (req, res, next) => {
    const user = req.body.newUser;
    if(!user || !user.username || !user.password || !user.email) {
        res.status(400).json({error: 'Invalid user information'});
        return;
    }
    if(user.password.length < 8 || user.password.length > 20) {
        res.status(400).json({error: 'Password must be between 8 and 20 characters'});
        return;
    }
    next();
}
