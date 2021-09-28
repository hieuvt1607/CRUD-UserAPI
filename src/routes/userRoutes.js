import {
    getAllUser, getUserById, createUser, updateUser, deleteUser
} from '../controllers/userController';
import { createUserValidator, updateUserValidator, userParamsValidator, paginationValidator } from '../middleware/userValidator'
const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.post('/users', createUserValidator, createUser);
    router.get('/users', paginationValidator, getAllUser);
    router.get('/users/:id', userParamsValidator, getUserById);
    router.put('/users', updateUserValidator, updateUser);
    router.delete('/users/:id', userParamsValidator, deleteUser)
    app.use('/api', router);
};
