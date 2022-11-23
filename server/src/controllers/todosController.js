'use strict';

const Todos = require('#s/models/todos');
const TodosService = require('#s/services/todosService');

const todosController = () => {
    /** ******************************************
     * get all todos
     * add offset(number), num(number) to query params for pagination
     * host/api/todos?offset=2&num=3
     ****************************************** */
    const getTodos = async (req, res) => {
        try {
            const todos = await TodosService.aggregateTodo(req);

            res.status(201).json(todos);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single todo
     * host/api/todos/637dafa8efa9a1b203f5f6d1
     ****************************************** */
    const getTodo = async (req, res) => {
        try {
            const { id } = req.params;
            // const todo = await Todos.findOne({ _id: id, user: req.id" });
            const todo = await Todos.findOne({ _id: id, user: '62de50dac46c200ab819c69c' });

            res.status(201).json(todo);
        } catch (e) {
            res.status(500).json({ message: `Get todo error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * add new todo
     ****************************************** */
    const addTodo = async (req, res) => {
        try {
            const { description } = req.body;
            console.log('body...', req.body);
            // const todo = await Todos.create({ user: req.id, description });
            const todo = await Todos.create({ user: '62de50dac46c200ab819c69c', description });

            res.status(201).json({ todo });
        } catch (e) {
            res.status(500).json({ message: `Add todo error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update todo
     * host/api/todos/637dafa8efa9a1b203f5f6d1
     ****************************************** */
    const updateTodo = async (req, res) => {
        try {
            const { id } = req.params;
            await Todos.findByIdAndUpdate(id, req.body);
            const newTodo = await Todos.findOne({ _id: id });

            res.status(201).json({ newTodo });
        } catch (e) {
            res.status(500).json({ message: `Update todo error, details... ${e.message}` });
        }
    };

    return {
        getTodos,
        getTodo,
        addTodo,
        updateTodo
    };
};

module.exports = todosController;
