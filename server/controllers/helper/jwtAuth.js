const config = require('../../config/config');
const jwt = require('jsonwebtoken');

const setJWT = (payload, type = 'ACCESS') => {
    const jwtOptions = { 
        expiresIn: config[`${type}_JWT_LIFETIME`]
    };

    const jwtPayload = payload;

    const jwtToken = jwt.sign(jwtPayload, config[`${type}_JWT_SECRET`], jwtOptions);

    return jwtToken;
}

module.exports = setJWT;