const express = require('express');
const usersRouter = express.Router();
const controller = require('../controllers/usersController')();
const auth = require('../middleware/auth');

usersRouter.route('/users/register')
    .put(controller.registerUser);

usersRouter.route('/users/login')
    .post(controller.loginUser);

usersRouter.route('/users/:id')
    .patch(controller.updateUser)
    .get(auth, controller.getUser);

usersRouter.route('/users/exclude/:id')
    .get(controller.getExcludeUser);

// usersRouter.route('/users')
//     .get(auth, controller.getUsers);

module.exports = usersRouter;