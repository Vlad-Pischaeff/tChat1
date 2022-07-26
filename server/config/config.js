const config = {};

config.REQUEST_AUTHKEY = 'Authorization';
config.JWT_SECRET = process.env.JWT_SECRET;
config.JWT_LIFETIME = process.env.TOKEN_LIFETIME ;
config.JWT_HEADER = {
    alg: 'RS256',
    typ: 'JWT',
};
config.MDB_SERVER = process.env.MDB_SERVER;
config.MDB_DATABASE = process.env.MDB_DATABASE;

module.exports = config;