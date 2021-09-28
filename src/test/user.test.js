const { createUserService } = require('../services/userService')

test('create user', async () => {
    const res = await createUserService({
        first_name: 'Hieu',
        last_name: 'Vu',
        email: "tienhieu@gmail.com",
        phone: "0123",
        address: 'Ha Noi'
    }, null)
    expect(res.data.newUser).toEqual({
        "first_name": 'Hieu',
        "last_name": 'Vu',
        "email": "tienhieu@gmail.com",
        "phone" : "0123",
        "address": 'Ha Noi'
    })
})