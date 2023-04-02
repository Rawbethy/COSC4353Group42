module.exports = (req, res, next) => {
    const cred = req.body.credentials;
    if(!cred || !cred.username || !cred.password) {
        res.status(400).json({error: 'Invalid credentials'});
        return;
    }
    next();
}