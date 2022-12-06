'use strict';

const base64 = require('base-64');

//create basic auth middleware
module.exports = async (req, res, next) => {
  //check if authorization header exists
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    //if it does, split the header into an array
    let basicEncodedString = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basicEncodedString).split(':');
    //check if username and password exist
    if (username && password) {
      //if they do, add them to the request object
      req.user = { username, password };
      next();
    }
  }
};



