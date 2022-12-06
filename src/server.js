'use strict';

const express = require('express');
const cors = require('cors');
const authRouter = require('./auth/router.js');
const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

app.get('/', (req, res, next) => {
  res.status(200).send('Connected to API');
});

app.use('*', notFound);
app.use(errorHandler);

module.exports = app;
