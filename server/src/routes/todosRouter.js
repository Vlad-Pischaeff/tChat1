'use strict';

const express = require('express');
const todosRouter = express.Router();
const controller = require('#s/controllers/todosController')();
const auth = require('#s/middleware/auth');

todosRouter.route('/todos')
    .get(controller.getTodos)
    .post(controller.addTodo);

todosRouter.route('/todos/:id')
    .patch(controller.updateTodo)
    .get(controller.getTodo);

module.exports = todosRouter;
