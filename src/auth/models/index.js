'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { UsersModel } = require('./users-models.js');

const DATABASE_URL = 'sqlite:memory';

console.log('DATABASE_URL', DATABASE_URL);

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Users = UsersModel(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  Users,
};
