const db = require('../models');
const User = db.users

export async function checkIfUserExist(val) {
    try {
        const userData = await User.findOne({
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
        const oldEmail = await User.findOne({
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