module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'users',
    });
    return User;
}