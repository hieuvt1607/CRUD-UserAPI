module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    first_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    last_name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
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
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    }
  });

  return User;
};
