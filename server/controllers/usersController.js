const Users = require('../models/users');
const bcrypt = require('bcrypt');
const setJWT = require('./helper/jwtAuth');
const UserService = require('../services/userService');

const usersController = () => {
    /********************************************
     * get all users
     *******************************************/
    // const getUsers = async (req, res) => {
    //     try {
    //         const users = await Users.find({});
    //         res.status(201).json(users);
    //     } catch (e) {
    //         res.status(500).json({ message: `Something wrong ..., details ${e}` });
    //     }
    // };
    /********************************************
     * register new user
     *******************************************/
    const registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userData = await UserService.registerUser(name, email, password);
            const { refreshToken, accessToken, id } = userData;

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ jwtToken: accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `${e.message}` });
        }
    };
    /********************************************
     * login user
     *******************************************/
    const loginUser = async (req, res) => {
        try {
            const { name, password } = req.body;
            const userData = await UserService.loginUser(name, password);
            const { refreshToken, accessToken, id } = userData;
            
            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ jwtToken: accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `${e.message}` });
        }
    };
    /********************************************
     * logout user
     *******************************************/
    const logoutUser = async (req, res) => {
        try {
            // const { name, password } = req.body;
            // const cookies = req.cookies;
            // const candidate = await Users.findOne({ name });

            // if (!candidate) {
            //     throw new Error('No such user or password...');
            // }

            // isPasswordMatch = await bcrypt.compare(password, candidate.password);
            
            // if (!isPasswordMatch) {
            //     throw new Error('No such user or password...');
            // }

            // const jwtPayload = {
            //     userId: candidate._id.toString(),
            //     userName: candidate.name
            // };
            // const accessToken = setJWT(jwtPayload, 'ACCESS');
            // const refreshToken = setJWT(jwtPayload, 'REFRESH');

            // candidate.refreshToken = refreshToken;
            // const result = await candidate.save();
            
            // res.status(201).json({ jwtToken: accessToken });
        } catch (e) {
            res.status(500).json({ message: `${e.message}` });
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
    /********************************************
     * get single user
     *******************************************/
    const getUser = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await Users.findOne({ _id: id });
            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ message: `Something wrong ..., details ${e}` });
        }
    };

    return {
        // getUsers,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        getExcludeUser,
        getUser
    };
};

module.exports = usersController;
