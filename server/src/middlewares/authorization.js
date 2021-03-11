const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(403).send('Unauthorized!');
  }

  try {
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send(err);
  }
  next();
};
