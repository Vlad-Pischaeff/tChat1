const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: Date.now(),
    },
    photo: {
        type: String,
        required: true,
        default: 'http://localhost:5000/upload/profile.svg',
    },
});

module.exports = model('Users', schema);
