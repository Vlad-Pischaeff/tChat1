'use strict';

const express = require('express');
const usersRouter = express.Router();
const controller = require('#s/controllers/usersController')();
const auth = require('#s/middleware/auth');

usersRouter.route('/users/register')
    .put(controller.registerUser);

usersRouter.route('/users/login')
    .post(controller.loginUser);

usersRouter.route('/users/logout')
    .post(controller.logoutUser);

usersRouter.route('/users/refresh')
    .get(controller.refreshToken);

usersRouter.route('/users/:id')
    .patch(auth, controller.updateUser)
    .get(auth, controller.getUser);

usersRouter.route('/users/exclude/:id')
    .get(auth, controller.getExcludeUser);

usersRouter.route('/users')
    .get(auth, controller.getUsers);

module.exports = usersRouter;
