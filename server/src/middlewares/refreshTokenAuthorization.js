const jwt = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');
const keys = require('../config/keys');

module.exports = function (req, res, next) {
  //parse the cookie to get the refresh token
  const token = req.cookies.refreshToken;

  //validate the token
  try {
    const decoded = jwt.verify(token, keys.JWT_SECRET);

    //if successful issue new access token and new refresh token
    if (decoded) {
      const userId = decoded.userId;
      const refreshToken = jwtGenerator({ userId }, '20m');
      const accessToken = jwtGenerator({ userId }, '1m');
      req.refreshToken = refreshToken;
      req.accessToken = accessToken;
    }
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};
