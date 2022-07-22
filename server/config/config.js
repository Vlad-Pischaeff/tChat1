const config = {};

config.REQUEST_AUTHKEY = 'Authorization';
config.JWT_SECRET = process.env.JWT_SECRET;
config.JWT_LIFETIME = process.env.TOKEN_LIFETIME ;
config.JWT_HEADER = {
    alg: 'RS256',
    typ: 'JWT',
};

module.exports = config;