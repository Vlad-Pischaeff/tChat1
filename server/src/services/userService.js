'use strict';

const Users = require('#s/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const TokenService = require('./tokenService');
const UserDTO = require('#s/dtos/userDTO');

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
        };
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
        };
    }

    async logoutUser(refreshToken) {
        const token = TokenService.removeToken(refreshToken);
        return token;
    }

    async refreshToken(token) {
        if (!token) {
            throw new Error('Unauthorized user...');
        }

        const userData = await TokenService.validateRefreshToken(token);
        const currentToken = await TokenService.findToken(token);

        if (!userData?.id) {
            throw new Error(userData?.verifyError);
        }

        if (!currentToken) {
            throw new Error('Unauthorized user...');
        }

        const user = await Users.findById(userData.id);

        const userDTO = new UserDTO(user);
        const accessToken = TokenService.generateToken({ ...userDTO }, 'ACCESS');
        const refreshToken = TokenService.generateToken({ ...userDTO }, 'REFRESH');

        await TokenService.saveToken(userDTO.id, refreshToken);

        return {
            accessToken,
            refreshToken,
            ...userDTO
        };
    }
}

module.exports = new UserService();
