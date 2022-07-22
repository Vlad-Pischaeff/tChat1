const jwt = require('jsonwebtoken');
const config = require('../../config/config');

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
        const { userName, userId, iat, exp } = decoded;
        // console.log('auth decoded...', userName, userId, iat, exp);
        req.user = userName;
        req.userId = userId;

        next();
    } catch (e) {
        res.status(401).json({ message: `Your ${e.message}` });
    }
};