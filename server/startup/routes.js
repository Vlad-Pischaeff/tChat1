const express = require('express');
const path = require('path');
const ROUTER = require('../routes');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = app => {
    app.use('/upload', express.static('./upload'));
    
    app.use('/api', ROUTER.usersRouter);
    app.use('/api', ROUTER.uploadRouter);

    if (isProduction) {
        app.use('/', express.static(path.join(__dirname, 'client', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }
};
