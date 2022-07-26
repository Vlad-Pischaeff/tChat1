const mongoose = require('mongoose');
const config = require('../config/config');
const { MDB_SERVER, MDB_DATABASE } = config;

module.exports = async () => {
    await mongoose.connect(
        `mongodb://${MDB_SERVER}:27017/${MDB_DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 3000,
        },
        () => { console.log('connected to db'); },
    );
};
