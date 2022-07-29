const Users = require('../models/users');
const UserService = require('../services/userService');

const usersController = () => {
    /********************************************
     * get all users
     *******************************************/
    const getUsers = async (req, res) => {
        try {
            const users = await Users.find();
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
            const userData = await UserService.registerUser(name, email, password);
            const { refreshToken, accessToken, id } = userData;

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `${e.message}` });
        }
    }
    /********************************************
     * login user
     *******************************************/
    const loginUser = async (req, res) => {
        try {
            const { name, password } = req.body;
            const userData = await UserService.loginUser(name, password);
            const { refreshToken, accessToken, id } = userData;
            console.log('loginUser...', accessToken)
            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `${e.message}` });
        }
    }
    /********************************************
     * logout user
     *******************************************/
    const logoutUser = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logoutUser(refreshToken);
            res.clearCookie('refreshToken');
            res.json({ token });
        } catch (e) {
            res.status(500).json({ message: `${e.message}` });
        }
    }
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
    }
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
    }
    /********************************************
     * get single user
     *******************************************/
    const getUser = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findOne({ _id: id });
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ message: `Something wrong ..., details ${e.message}` });
        }
    }
    /********************************************
     * refresh refreshToken
     *******************************************/
    const refreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refreshToken(refreshToken);
            const { refreshTokenNew } = userData;

            res.cookie('refreshToken', refreshTokenNew, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json(userData);
        } catch(e) {
            res.status(500).json({ message: `Refresh token error ..., details ${e.message}` });
        }
    }

    return {
        getUsers,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        getExcludeUser,
        getUser,
        refreshToken
    };
};

module.exports = usersController;
