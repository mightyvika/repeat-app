const jwt = require('jsonwebtoken');
const secret = require('../config/keys').JWTSecret

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Verify token
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' })
    }

}

module.exports = auth;