import { ErrorCodes } from '../helpers/constants';
import { respondWithError, respondSuccess } from '../helpers/messageResponse';
import { checkIfUserExist, checkIfEmailNotChange } from './userService'
const db = require('../models');
const User = db.users

export async function getUserById(req, res) {
    try {
        const { id } = req.params

        const userData = await User.findOne({
            where: { id }
        })

        return res.json(respondSuccess({
            userData
        }));
    } catch (error) {
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when get user by id!'));
    }
}

export async function getAllUser(req, res) {
    try {
        const { offset, limit } = req.query
        const limitNumber = parseInt(limit)
        const offsetNumber = parseInt(offset)

        const listOfUser = await User.findAndCountAll({
            limit: limitNumber,
            offset: offsetNumber,
        })

        return res.json(respondSuccess({
            listOfUser
        }));
    } catch (error) {
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when get all user!'));
    }
}

export async function create(req, res) {
    try {
        const { first_name, last_name, email, phone, address } = req.body
        const isUserExist = await checkIfUserExist(email)
        if (isUserExist) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST, 'User already exist!'));
        }
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            address,
            phone,
        })
        return res.json(respondSuccess({ newUser }));
    } catch (error) {
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when create new user!'));
    }
}

export async function updateUser(req, res) {
    try {
        const { id, first_name, last_name, email, phone, address } = req.body
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
        const result = await User.update(updateConditions, {
            where: {
                id
            }
        })
        if (result == 0) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'User is not exist!'));
        }
        return res.json(respondSuccess({ result }));

    } catch (error) {
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when update user!'));
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const user = await User.findOne({
            where: { id }
        })
        if (!user) {
            return res.json(respondWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST, 'User is not exist!'));
        }
        const result = await user.destroy()
        return res.json(respondSuccess({ result }));

    } catch (error) {
        return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when delete user!'));
    }
}

