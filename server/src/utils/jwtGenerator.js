const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'server/src/.env' });

module.exports = (userObj = {}, time) => {
  try {
    return jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: time });
  } catch (error) {
    console.error(error.message);
  }
};
