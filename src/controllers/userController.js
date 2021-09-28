import { respondSuccess } from '../helpers/messageResponse';
import { createUserService, updateUserService, deleteUserService, getAllUserService, getUserByIdService } from '../services/userService'
import { ErrorCodes } from '../helpers/constants';

export async function getUserById(req, res) {
    try {
        const user = await getUserByIdService(req.params, res)

        return res.json(respondSuccess(ErrorCodes.ERROR_CODE_CREATED, {
            user
        }));
    } catch (error) {
        return error
        // return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when get user by id!'));
    }
}

export async function getAllUser(req, res) {
    try {
        const listOfUser = await getAllUserService(req.query, res)
        return res.json(respondSuccess(ErrorCodes.ERROR_CODE_CREATED, {
            listOfUser
        }));
    } catch (error) {
        return error
        // return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when get all user!'));
    }
}

export async function createUser(req, res) {
    try {
        const newUser = await createUserService(req.body, res)
        return res.json(respondSuccess(ErrorCodes.ERROR_CODE_CREATED, { newUser }));
    } catch (error) {
        return error
        // return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when create new user!'));
    }
}

export async function updateUser(req, res) {
    try {
        const result = await updateUserService(req.body, res)
        return res.json(respondSuccess(ErrorCodes.ERROR_CODE_CREATED, { result }));

    } catch (error) {
        return error
        // return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when update user!'));
    }
}

export async function deleteUser(req, res) {
    try {
        const result = await deleteUserService(req.params, res)
        return res.json(respondSuccess(ErrorCodes.ERROR_CODE_CREATED, { result }));

    } catch (error) {
        return error
        // return res.json(respondWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'SYSTEM_ERROR when delete user!'));
    }
}

