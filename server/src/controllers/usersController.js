'use strict';

const config = require('#s/config/config');
const Users = require('#s/models/users');
const UserService = require('#s/services/userService');
const MailService = require('#s/services/mailService');
const TokenService = require('#s/services/tokenService');
const UserDTO = require('#s/dtos/userDTO');
const { fillAnswersTemplates } = require('#s/templates/answersTemplate');

const usersController = () => {
    /** ******************************************
     * get all users
     ****************************************** */
    const getUsers = async (req, res) => {
        try {
            const users = await Users.find();

            res.status(201).json(users);
        } catch (e) {
            res.status(500).json({ message: `Something wrong, details... ${e.message}` });
        }
    };
    /** ******************************************
     * register new user
     ****************************************** */
    const registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const userData = await UserService.registerUser(name, email, password);
            const { refreshToken, accessToken, id } = userData;

            await fillAnswersTemplates(id); // add answers templates to new user

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `Register error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * login user
     ****************************************** */
    const loginUser = async (req, res) => {
        try {
            const { name, password } = req.body;
            const userData = await UserService.loginUser(name, password);
            const { refreshToken, accessToken, id } = userData;

            res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json({ accessToken, id });
        } catch (e) {
            res.status(500).json({ message: `Login error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * logout user
     ****************************************** */
    const logoutUser = async (req, res) => {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logoutUser(refreshToken);

            res.clearCookie('refreshToken');
            res.json({ token });
        } catch (e) {
            res.status(500).json({ message: `Logout error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * update user - host/api/users/637dafa8efa9a1b203f5f6d1
     * @param {string} id - user ID
     ****************************************** */
    const updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            await Users.findByIdAndUpdate(id, req.body);
            const newUser = await Users.findOne({ _id: id });

            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({ message: `Update user error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get users exclude single user
     ****************************************** */
    const getExcludeUser = async (req, res) => {
        try {
            const { id } = req.params;
            const users = await Users.find({ _id: { $ne: id } });

            res.status(201).json(users);
        } catch (e) {
            res.status(500).json({ message: `Get exclude user error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get single user
     ****************************************** */
    const getUser = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findOne({ _id: id });

            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ message: `Get user error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * refresh refreshToken
     ****************************************** */
    const refreshToken = async (req, res) => {
        try {
            const { refreshToken: token } = req.cookies;
            const userData = await UserService.refreshToken(token);

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json(userData);
        } catch (e) {
            res.status(500).json({ message: `Refresh token error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * reset user's password
     * 1. find user email in db
     * 2. if email exists then generate token with liftime 10m
     * 3. send link to user
     ****************************************** */
    const resetPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });

            // send email only if email existed
            if (user) {
                const userDTO = new UserDTO(user);
                const accessToken = TokenService.generateToken({ ...userDTO }, 'ACCESS', config.LIFETIME);
                // TODO change link definition to .env variable
                await MailService.sendResetPasswordMail(email, `${config.HOST}/setpw/${accessToken}`);
            }

            // always send successfull message to sender
            res.status(201).json({ message: `Reset password link sended to ${email}...` });
        } catch (e) {
            res.status(500).json({ message: `Reset password error, details... ${e.message}` });
        }
    };
    /** ******************************************
     * get userID from accessToken
     ****************************************** */
    const getUserID = async (req, res) => {
        try {
            const { token } = req.body;
            const user = await TokenService.validateAccessToken(token);

            if ('verifyError' in user) throw new Error(user.verifyError);

            res.status(201).json(user);
        } catch (e) {
            res.status(500).json({ message: `Get userID error, details... ${e.message}` });
        }
    };

    return {
        getUsers,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        getExcludeUser,
        getUser,
        refreshToken,
        resetPassword,
        getUserID
    };
};

module.exports = usersController;
