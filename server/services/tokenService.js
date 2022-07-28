const Tokens = require('../models/tokens');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

class TokenService {
    generateToken(jwtPayload, type = 'ACCESS') {

        const jwtOptions = { 
            expiresIn: config[`${type}_JWT_LIFETIME`]
        };

        const jwtToken = jwt.sign(jwtPayload, config[`${type}_JWT_SECRET`], jwtOptions);

        return jwtToken;
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Tokens.findOne({ user: userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const jwtToken = await Tokens.create({ user: userId, refreshToken });
        return jwtToken;
    }
};

module.exports = new TokenService();
