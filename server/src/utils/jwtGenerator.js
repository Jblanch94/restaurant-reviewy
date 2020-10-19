const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "server/src/.env" });

module.exports = (userObj = {}) => {
  try {
    return jwt.sign(userObj, process.env.JWT_SECRET, { expiresIn: 60 * 15 });
  } catch (error) {
    console.error(error.message);
  }
};
