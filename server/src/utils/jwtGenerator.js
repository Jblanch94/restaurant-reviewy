const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/src/.env' });

module.exports = (userObj = {}, time) => {
  return jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: time });
};
