const express = require('express');
const controller = require('../controllers/usersController')();
const usersRouter = express.Router();
const auth = require('../controllers/middleware/auth');

usersRouter.route('/users')
    .get(auth, controller.getUsers);

usersRouter.route('/users/register')
    .put(controller.registerUser);

usersRouter.route('/users/login')
    .post(controller.loginUser);

usersRouter.route('/users/:id')
    .patch(controller.updateUser);

usersRouter.route('/users/exclude/:id')
    .get(controller.getExcludeUser);

module.exports = usersRouter;