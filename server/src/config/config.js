'use strict';

const config = {};

config.REQUEST_AUTHKEY = 'Authorization';
config.ACCESS_JWT_SECRET = process.env.ACCESS_JWT_SECRET;
config.ACCESS_JWT_LIFETIME = process.env.ACCESS_JWT_LIFETIME;
config.REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET;
config.REFRESH_JWT_LIFETIME = process.env.REFRESH_JWT_LIFETIME;
config.JWT_HEADER = {
    alg: 'RS256',
    typ: 'JWT'
};
config.MDB_SERVER = process.env.MDB_SERVER;
config.MDB_DATABASE = process.env.MDB_DATABASE;

module.exports = config;
