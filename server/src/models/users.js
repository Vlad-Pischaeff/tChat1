'use strict';

const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    alias: {
        type: String,
        required: false,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: Date.now()
    },
    image: {
        type: String,
        required: true,
        default: ''
    },
    websites: [{
        site: String,
        key: String,
        hash: String
    }]
});

module.exports = model('Users', schema);
