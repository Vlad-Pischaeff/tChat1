const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = async (req, res, next) => {
    const { JWT_SECRET } = config;

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        let token = req.headers.authorization;
        token = token.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No authorization...' });
        }

        const decoded = await jwt.verify(token, JWT_SECRET);
        const { id, iat, exp } = decoded;
        // console.log('auth decoded...', id, iat, exp);
        req.id = id;

        next();
    } catch (e) {
        res.status(401).json({ message: `Your ${e.message}` });
    }
};