import { respondWithError } from '../helpers/messageResponse';
import { ErrorCodes } from '../helpers/constants';

const BaseJoi = require('@hapi/joi');
const Extension = require('@hapi/joi-date');
const Joi = BaseJoi.extend(Extension);

export function paginationValidator(req, res, next) {
    const { query } = req.query
    const validSchema = Joi.object().keys({
        offset: Joi.number().integer().required(),
        limit: Joi.number().integer().positive().required(),
    });

    const result = Joi.validate(query, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function createUserValidator(req, res, next) {
    const { body } = req
    const validSchema = Joi.object().keys({
        first_name: Joi.string().max(255).required(),
        last_name: Joi.string().max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phone: Joi.string().max(255).required(),
        address: Joi.string().max(255)
    });
    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function updateUserValidator(req, res, next) {
    const { body } = req
    const validSchema = Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        first_name: Joi.string().max(255).required(),
        last_name: Joi.string().max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        phone: Joi.string().max(255).required(),
        address: Joi.string().max(255)
    });
    const result = Joi.validate(body, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}

export function userParamsValidator(req, res, next) {
    const { params } = req
    const validSchema = Joi.object().keys({
        id: Joi.number().integer().positive().required(),
    });
    const result = Joi.validate(params, validSchema);

    if (result.error) {
        res.json(respondWithError(ErrorCodes.ERROR_CODE_INVALID_PARAMETER, result.error.message, result.error.details));
        return;
    }
    next();
}
