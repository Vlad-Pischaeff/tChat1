const config = require('../../config/config');
const jwt = require('jsonwebtoken');

const setJWT = payload => {
    const { JWT_SECRET, JWT_LIFETIME, JWT_HEADER } = config;

    const jwtOptions = { 
        expiresIn: JWT_LIFETIME
    };

    const jwtPayload = payload;

    const jwtToken = jwt.sign(jwtPayload, JWT_SECRET, jwtOptions);

    return jwtToken;
}

module.exports = setJWT;