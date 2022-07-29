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

    async removeToken(refreshToken) {
        const tokenData = await Tokens.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await Tokens.findOne({ refreshToken });
        return tokenData;
    }

    async validateAccessToken(accessToken) {
        try {
            const verifyData = await jwt.verify(accessToken, config.ACCESS_JWT_SECRET);
            return verifyData;
        } catch(e) {
            return ({ verifyError: e.message });
        }
    }

    async validateRefreshToken(refreshToken) {
        try {
            const verifyData = await jwt.verify(refreshToken, config.REFRESH_JWT_SECRET);
            return verifyData;
        } catch(e) {
            return ({ verifyError: e.message });
        }
    }
};

module.exports = new TokenService();
