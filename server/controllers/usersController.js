const Users = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const setJWT = require('./helper/jwtAuth');

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

            const candidate = await Users.findOne({ name });
            const userEmail = await Users.findOne({ email });

            if (candidate) {
                throw new Error(`User login ${name} is already exists...`);
            }

            if (userEmail) {
                throw new Error(`User email ${email} is already exists...`);
            }

            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash = await bcrypt.hashSync(password, salt);

            const user = new Users({ name, email, password: hash });

            await user.save((err, doc) => {
                if (err) {
                    throw new Error(`User ${name} not created...`);
                }

                const jwtPayload = {
                    userId: doc._id.toString(),
                    userName: doc.name
                };

                const jwtToken = setJWT(jwtPayload);
                res.status(201).json({ 
                    id: doc._id.toString(),
                    name: doc.name,
                    email: doc.email,
                    photo: doc.photo,
                    jwtToken 
                });
            });
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
            const candidate = await Users.findOne({ name });

            if (!candidate) {
                throw new Error('No such user or password...');
            }

            isPasswordMatch = await bcrypt.compare(password, candidate.password);
            
            if (!isPasswordMatch) {
                throw new Error('No such user or password...');
            }

            const jwtPayload = {
                userId: candidate._id.toString(),
                userName: candidate.name
            };
            const jwtToken = setJWT(jwtPayload);

            res.status(201).json({ 
                id: candidate._id.toString(),
                name: candidate.name,
                email: candidate.email,
                photo: candidate.photo,
                jwtToken 
            });
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
        updateUser,
        getExcludeUser,
        getUser
    };
};

module.exports = usersController;
