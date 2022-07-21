const Users = require('../models/users');

const usersController = () => {
    /********************************************
     * get all users
     *******************************************/
    const getUsers = async (req, res) => {
        try {
            const users = await Users.find({});
            res.status(201).json(users);
        } catch (e) {
            res.status(500).json({ message: `Something wrong ..., details ${e}` });
        }
    };
    /********************************************
     * register new user
     *******************************************/
    const registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const candidate = await Users.findOne({ name });

            if (candidate) {
                throw new Error(`User login ${name} is already exists...`);
            }

            const user = new Users({ name, email, password });

            await user.save((err, doc) => {
                if (err) {
                    throw new Error(`User ${name} not created...`);
                }
                res.status(201).json({ ...doc._doc });
            });
        } catch (e) {
            res.status(500).json({ message: `${e}` });
        }
    };
    /********************************************
     * login user
     *******************************************/
    const loginUser = async (req, res) => {
        try {
            const { name, password } = req.body;
            const candidate = await Users.findOne({ name, password });

            if (!candidate) {
                throw new Error(`User ${name} not found, or wrong password...`);
            }

            res.status(201).json({ ...candidate._doc });
        } catch (e) {
            res.status(500).json({ message: `${e}` });
        }
    };
    /********************************************
     * update user profile
     *******************************************/
    const updateUser = async (req, res) => {
        try {
            const { id } = req.params;

            await Users.findByIdAndUpdate(id, req.body);
            const newUser = await Users.findOne({ _id: id });
            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({ message: `Something wrong ..., details ${e}` });
        }
    };
    /********************************************
     * get users exclude single user
     *******************************************/
    const getExcludeUser = async (req, res) => {
        try {
            const { id } = req.params;

            const users = await Users.find({ _id: { $ne: id } });
            res.status(201).json(users);
        } catch (e) {
            res.status(500).json({ message: `Something wrong ..., details ${e}` });
        }
    };

    return {
        getUsers,
        registerUser,
        loginUser,
        updateUser,
        getExcludeUser
    };
};

module.exports = usersController;
