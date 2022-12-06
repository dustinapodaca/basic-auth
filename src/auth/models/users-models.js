'use strict';

const bcrypt = require('bcrypt');

function UsersModel (sequelizeDatabase, DataTypes) {
  const Users = sequelizeDatabase.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 6);
    user.password = hashedPassword;
    console.log('user', user);
    console.log('user.password', user.password);
    return user;
  });

  Users.authenticateUser = async function (username, password) {
    const user = await Users.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  };

  return Users;
}

module.exports = { UsersModel };
