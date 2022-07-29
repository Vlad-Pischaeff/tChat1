const Users = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TokenService = require('./tokenService');
const UserDTO = require('../dtos/userDTO');

class UserService {
    async registerUser(name, email, password) {
        const candidate = await Users.findOne({ name });
        const userEmail = await Users.findOne({ email });

        if (candidate) {
            throw new Error(`User login ${name} is already exists...`);
        }

        if (userEmail) {
            throw new Error(`User email ${email} is already exists...`);
        }

        const hash = await bcrypt.hashSync(password, saltRounds);
        const user = await Users.create({ name, email, password: hash });

        const userDTO = new UserDTO(user);
        const accessToken = TokenService.generateToken({ ...userDTO }, 'ACCESS');
        const refreshToken = TokenService.generateToken({ ...userDTO }, 'REFRESH');

        await TokenService.saveToken(userDTO.id, refreshToken);

        return {
            accessToken,
            refreshToken,
            ...userDTO
        }
    }

    async loginUser(name, password) {
        const user = await Users.findOne({ name });

        if (!user) {
            throw new Error('No such user or password...');
        }

        let isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            throw new Error('No such user or password...');
        }

        const userDTO = new UserDTO(user);
        const accessToken = TokenService.generateToken({ ...userDTO }, 'ACCESS');
        const refreshToken = TokenService.generateToken({ ...userDTO }, 'REFRESH');

        await TokenService.saveToken(userDTO.id, refreshToken);

        return {
            accessToken,
            refreshToken,
            ...userDTO
        }
    }

    async logoutUser(refreshToken) {
        const token = TokenService.removeToken(refreshToken);
        return token;
    }

    async refreshToken(refreshToken) {
        if (!refreshToken) {
            throw new Error('Unauthorized user...');
        }
        
        const userData = await TokenService.validateRefreshToken(refreshToken);
        const currentToken = await TokenService.findToken(refreshToken);
        
        if (!userData?.id) {
            throw new Error(userData?.verifyError);
        }

        if (!currentToken) {
            throw new Error('Unauthorized user...');
        }
        
        const user = await Users.findById(userData.id);

        const userDTO = new UserDTO(user);
        const accessTokenNew = TokenService.generateToken({ ...userDTO }, 'ACCESS');
        const refreshTokenNew = TokenService.generateToken({ ...userDTO }, 'REFRESH');

        await TokenService.saveToken(userDTO.id, refreshTokenNew);

        return {
            accessTokenNew,
            refreshTokenNew,
            ...userDTO
        }
    }
};

module.exports = new UserService();