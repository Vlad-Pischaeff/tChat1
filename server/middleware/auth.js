const TokenService = require('../services/tokenService');

module.exports = async (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        let token = req.headers?.authorization;

        if (!token) {
            return res.status(401).json({ message: 'No authorization...' });
        }

        token = token.split(' ')[1];

        const decoded = await TokenService.validateAccessToken(token);
        const { id, iat, exp, verifyError } = decoded;

        if (verifyError) {
            return res.status(403).json({ message: verifyError });
        }
        // console.log('auth decoded...', id, iat, exp, decoded);
        req.id = id;

        next();
    } catch (e) {
        res.status(401).json({ message: `Your ${e.message}` });
    }
};