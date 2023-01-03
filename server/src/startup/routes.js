'use strict';

const express = require('express');
const path = require('path');
const ROUTER = require('#s/routes/index');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = app => {
    app.use('/upload', express.static(path.join(__dirname, '..', '/public/upload')));

    app.use('/api', ROUTER.usersRouter);
    app.use('/api', ROUTER.todosRouter);
    app.use('/api', ROUTER.notesRouter);
    app.use('/api', ROUTER.uploadRouter);

    if (isProduction) {
        app.use('/', express.static(path.join(__dirname, '../../..', 'dashboard', 'build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../..', 'dashboard', 'build', 'index.html'));
        });
    }
};
