'use strict';

const base64 = require('base-64');

//create basic auth middleware
module.exports = (req, res, next) => {
  //check if authorization header exists
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  } else if (!username || !password) {
    next('Invalid Login');
    return;
  }
  //split the authorization header into username and password
  let basicEncodedString = req.headers.authorization.split(' ').pop();
  let [username, password] = base64.decode(basicEncodedString).split(':');

  // return the username and password and function to next middleware
  req.user = { username, password };
  next();
};



