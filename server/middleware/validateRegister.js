module.exports = (req, res, next) => {
    const user = req.body.newUser;
    if(!user || !user.username || !user.password || !user.email) {
        res.status(400).json({error: 'Invalid user information'});
        return;
    }
    next();
}
