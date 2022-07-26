const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(
        'mongodb://127.0.0.1:27017/tchat1',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            socketTimeoutMS: 3000,
        },
        () => { console.log('connected to db'); },
    );
};
