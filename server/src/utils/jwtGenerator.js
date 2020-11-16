const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (userObj = {}, time) => {
  try {
    return jwt.sign(userObj, keys.JWT_SECRET, { expiresIn: time });
  } catch (error) {
    console.error(error.message);
  }
};
