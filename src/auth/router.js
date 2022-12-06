'use strict';

const express = require('express');
const { Users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js');

const router = express.Router();

const createUser = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const record = await Users.beforeCreate(req.body);
    console.log(record);
    res.status(201).json({user: record});
  } catch (e) {
    res.status(403).send('Error Creating User');
  }
};

const userSignIn = async (req, res) => {
  try {
    const currentUser = await Users.authenticateUser(req.user.username, req.user.password);
    res.status(200).json(currentUser);
  } catch (e) {
    res.status(403).send('Invalid Login');
  }
};

router.post('/signup', createUser);
router.post('/signin', basicAuth, userSignIn);

module.exports = router;
