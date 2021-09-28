const models = require('../models');
import { ErrorCodes } from '../helpers/constants';
import { respondWithError } from '../helpers/messageResponse';

export async function getUserByIdService(userData, res) {
    try {
        const { id } = userData

        const user = await models.User.findOne({
            where: { id }
        })

        return user
    } catch (error) {
        return error
        // return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when get user by id!'));
    }
}

export async function getAllUserService(userData, res) {
    try {
        const { offset, limit } = userData
        const limitNumber = parseInt(limit)
        const offsetNumber = parseInt(offset)

        const listOfUser = await models.User.findAndCountAll({
            limit: limitNumber,
            offset: offsetNumber,
        })

        return listOfUser
    } catch (e) {
        throw e;
    }
}

export async function createUserService(userData, res) {
    try {
        const { first_name, last_name, email, phone, address } = userData
        const isUserExist = await checkIfUserExist(email)
        if (isUserExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'User already exist!'));
        }
        const newUser = await models.User.create({
            first_name,
            last_name,
            email,
            address,
            phone,
        })
        return newUser;
    } catch (e) {
        throw e;
    }
}

export async function deleteUserService(userData, res) {
    try {
        const { id } = userData
        const user = await models.User.findOne({
            where: { id }
        })
        if (!user) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'User is not exist!'));
        }
        const result = await user.destroy()
        return result
    } catch (e) {
        throw e;
    }
}

export async function updateUserService(userData, res) {
    try {
        const { id, first_name, last_name, email, phone, address } = userData
        const updateConditions = {
            id,
            first_name,
            last_name,
            email,
            phone,
            address,
        }
        const isEmailNotChange = await checkIfEmailNotChange(id, email)
        if (!isEmailNotChange) {
            const isUserExist = await checkIfUserExist(email)
            if (isUserExist) {
                return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'User already exist!'));
            }
        }
        const result = await models.User.update(updateConditions, {
            where: {
                id
            }
        })
        if (result == 0) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'User is not exist!'));
        }
        return result;
    } catch (e) {
        throw e;
    }
}

export async function checkIfUserExist(val) {
    try {
        const userData = await models.User.findOne({
            where: {
                email: val
            },
        });
        return userData;
    } catch (e) {
        throw e;
    }
}

export async function checkIfEmailNotChange(id, email) {
    try {
        const oldEmail = await models.User.findOne({
            attributes: ['email'],
            where: {
                id
            },
        });
        const result = oldEmail.email === email;
        return result;
    } catch (e) {
        throw e;
    }
}