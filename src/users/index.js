import {
    getAllUser, getUserById, create, updateUser, deleteUser
} from './userController';
import { createUserValidator, updateUserValidator, userParamsValidator, paginationValidator } from './userValidator'
const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.post('/create-new-user', createUserValidator, create);
    router.get('/get-all-user', paginationValidator, getAllUser);
    router.get('/get-user/:id', userParamsValidator, getUserById);
    router.put('/update-user', updateUserValidator, updateUser);
    router.get('/delete-user/:id', userParamsValidator, deleteUser)
    app.use('/api/user', router);
};
