'use strict';

const express = require('express');
const basicAuth = require('./middleware/basic.js');
const { Users } = require('./models/index.js');

const router = express.Router();

const createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.status(201).json({user: newUser});
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
