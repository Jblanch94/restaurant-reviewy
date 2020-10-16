const jwt = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');
require('dotenv').config({ path: 'server/src/.env' });

module.exports = function (req, res, next) {
  //parse the cookie to get the refresh token
  const token = req.cookies.refreshToken;

  //validate the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //if successful issue new access token and new refresh token
    if (decoded) {
      const userId = decoded.userId;
      const refreshToken = jwtGenerator({ userId }, '15m');
      const accessToken = jwtGenerator({ userId }, '25m');
      req.refreshToken = refreshToken;
      req.accessToken = accessToken;
    }
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
